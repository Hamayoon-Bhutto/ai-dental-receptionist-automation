import React, { useState } from 'react';
import { CallLog } from '../../types';
import StatusBadge from '../shared/StatusBadge';
import { formatDateTime } from '../../lib/utils';
import { 
  Search, 
  Filter, 
  Volume2, 
  Play, 
  Pause, 
  FileText, 
  Code, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Smile, 
  Speech,
  CheckCircle,
  Clock,
  ExternalLink,
  Bot,
  X
} from 'lucide-react';
import EmptyState from '../shared/EmptyState';

interface CallLogsTableProps {
  logs: CallLog[];
}

export default function CallLogsTable({ logs }: CallLogsTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [outcomeFilter, setOutcomeFilter] = useState<string>('all');
  
  // Selected transcript or details modal
  const [activeTranscript, setActiveTranscript] = useState<CallLog | null>(null);
  const [expandedRawJson, setExpandedRawJson] = useState<string | null>(null);

  // Simulated audio player state
  const [playingLogId, setPlayingLogId] = useState<string | null>(null);
  const [playbackSecs, setPlaybackSecs] = useState<number>(0);
  const [playbackInt, setPlaybackInt] = useState<any>(null);

  const startAudioSimulation = (logId: string) => {
    if (playingLogId === logId) {
      clearInterval(playbackInt);
      setPlayingLogId(null);
      return;
    }
    // Clear old intervals
    if (playbackInt) clearInterval(playbackInt);
    
    setPlayingLogId(logId);
    setPlaybackSecs(0);
    
    const interval = setInterval(() => {
      setPlaybackSecs(prev => {
        if (prev >= 15) {
          clearInterval(interval);
          setPlayingLogId(null);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    
    setPlaybackInt(interval);
  };

  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.Created_At).getTime() - new Date(a.Created_At).getTime()
  );

  const filteredLogs = sortedLogs.filter(log => {
    const query = search.toLowerCase();
    const matchesSearch = 
      log.Patient_Name.toLowerCase().includes(query) ||
      log.Phone.includes(query) ||
      log.Call_Summary.toLowerCase().includes(query) ||
      log.Log_ID.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'all' || log.Call_Status === statusFilter;
    const matchesOutcome = outcomeFilter === 'all' || log.Outcome === outcomeFilter;

    return matchesSearch && matchesStatus && matchesOutcome;
  });

  const statuses = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Busy', value: 'busy' },
    { label: 'No Answer', value: 'not_answered' },
    { label: 'Failed Connection', value: 'failed' }
  ];

  const outcomes = [
    { label: 'All Outcomes', value: 'all' },
    { label: 'Booked', value: 'Booked' },
    { label: 'Follow-up Required', value: 'Follow-up Needed' },
    { label: 'No Answer / Timeout', value: 'No Answer' },
    { label: 'Failed Signaling', value: 'Failed' },
    { label: 'Information Only', value: 'Info Only' }
  ];

  return (
    <div className="space-y-6 select-none">
      {/* Search & filters panel */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="calls-search-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search call logs by patient or summaries..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-700"
            />
          </div>

          {/* Call Status Filter */}
          <div className="relative">
            <select
              id="calls-status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-slate-700 font-medium"
            >
              <option value="all">📞 All Call Statuses</option>
              {statuses.filter(s => s.value !== 'all').map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Outcome Filter */}
          <div className="relative">
            <select
              id="calls-outcome-filter"
              value={outcomeFilter}
              onChange={(e) => setOutcomeFilter(e.target.value)}
              className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-slate-700 font-medium"
            >
              <option value="all">🎯 All AI Outcomes</option>
              {outcomes.filter(o => o.value !== 'all').map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50/20">
                <th className="py-4 px-6 w-24">Log ID</th>
                <th className="py-4 px-6">Patient Details</th>
                <th className="py-4 px-6 text-center">Outcome</th>
                <th className="py-4 px-6 text-center">Call Status</th>
                <th className="py-4 px-6 w-96">Summary Preview</th>
                <th className="py-4 px-6">Created At</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredLogs.map((log) => {
                const isExpanded = expandedRawJson === log.Log_ID;
                const isPlaying = playingLogId === log.Log_ID;

                return (
                  <React.Fragment key={log.Log_ID}>
                    <tr id={`calls-table-row-${log.Log_ID}`} className="hover:bg-slate-50/50 transition-colors">
                      {/* ID */}
                      <td className="py-4 px-6 font-mono text-slate-400 font-bold">
                        {log.Log_ID}
                      </td>

                      {/* Patient Details */}
                      <td className="py-4 px-6">
                        <span className="font-extrabold text-slate-900 block text-sm">{log.Patient_Name}</span>
                        <span className="font-mono text-[10px] text-slate-400 mt-0.5 block">{log.Phone}</span>
                      </td>

                      {/* Outcome Badge */}
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg text-center ${
                          log.Outcome === 'Booked' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                          log.Outcome === 'Follow-up Needed' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                          log.Outcome === 'No Answer' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          log.Outcome === 'Failed' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                          'bg-slate-50 text-slate-600 border border-slate-200'
                        }`}>
                          {log.Outcome}
                        </span>
                      </td>

                      {/* Call Status Badge */}
                      <td className="py-4 px-6 text-center">
                        <StatusBadge status={log.Call_Status} type="call" />
                      </td>

                      {/* Summary */}
                      <td className="py-4 px-6">
                        <p className="text-slate-500 font-medium line-clamp-2 max-w-sm whitespace-normal leading-relaxed">
                          {log.Call_Summary || "No vocal summary generated for this call routing."}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-slate-500 font-mono font-medium">
                        {formatDateTime(log.Created_At)}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right space-x-1 whitespace-nowrap">
                        {log.Recording_URL ? (
                          <button
                            id={`calls-play-btn-${log.Log_ID}`}
                            onClick={() => startAudioSimulation(log.Log_ID)}
                            className={`p-1.5 px-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-[10px] inline-flex items-center gap-1 transition-all shadow-3xs hover:bg-slate-100 ${
                              isPlaying ? 'text-blue-600 border-blue-200 bg-blue-50/50' : 'text-slate-600'
                            }`}
                            title="Play simulated voice tape recording"
                          >
                            {isPlaying ? (
                              <>
                                <Pause className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                                <span>0:{playbackSecs < 10 ? `0${playbackSecs}` : playbackSecs}s</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3 text-slate-400 fill-slate-400" />
                                <span>Preview</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-medium font-mono px-2 py-1 bg-slate-100/30 rounded-lg">No Rec</span>
                        )}

                        <button
                          id={`calls-transcript-btn-${log.Log_ID}`}
                          onClick={() => {
                            if (log.Transcript) {
                              setActiveTranscript(log);
                            } else {
                              alert('No transcript available for missed or connection failed logs.');
                            }
                          }}
                          className="p-1.5 px-2 border border-slate-200 rounded-lg text-indigo-600 font-bold text-[10px] inline-flex items-center gap-1 transition-all shadow-3xs bg-slate-50 hover:bg-indigo-50 hover:text-indigo-800"
                        >
                          <FileText className="w-3 h-3 text-indigo-400" />
                          <span>Transcript</span>
                        </button>

                        <button
                          id={`calls-json-btn-${log.Log_ID}`}
                          onClick={() => setExpandedRawJson(isExpanded ? null : log.Log_ID)}
                          className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-800 transition-colors"
                          title="View developer raw JSON details"
                        >
                          <Code className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>

                    {/* Expandable developer raw JSON viewer */}
                    {isExpanded && (
                      <tr id={`calls-expanded-${log.Log_ID}`} className="bg-slate-900 text-slate-300 font-mono text-[10px]">
                        <td colSpan={7} className="p-4 px-8 overflow-x-auto border-t border-slate-200">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                            <span className="text-slate-500 font-extrabold uppercase tracking-wider text-[9px]">Developer API Metadata Payload</span>
                            <span className="text-[9px] bg-sky-950 text-sky-400 border border-sky-900 px-2 py-0.5 rounded-sm uppercase font-bold">Retell call webhook logger</span>
                          </div>
                          <pre className="whitespace-pre-wrap text-emerald-400">{log.Raw_Data}</pre>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>

          {filteredLogs.length === 0 && (
            <EmptyState
              title="No Call Logs audited"
              description="Adjust your filters or look for another patient record search queries."
              icon={Volume2}
            />
          )}
        </div>
      </div>

      {/* Transcript Viewer Overlay Modal */}
      {activeTranscript && (
        <div id="transcript-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* backdrop */}
          <div 
            id="transcript-modal-backdrop"
            onClick={() => setActiveTranscript(null)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs animate-fade-in"
          />

          {/* Modal layout */}
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl relative z-10 flex flex-col justify-between border border-slate-200 h-[85vh] animate-scale-up">
            {/* Modal header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-3xl">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Speech className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Conversational Transcript Log</h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">Patient: {activeTranscript.Patient_Name} ({activeTranscript.Log_ID})</p>
                </div>
              </div>

              <button
                id="close-transcript"
                onClick={() => setActiveTranscript(null)}
                className="p-1.5 border border-slate-200 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation list area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              {activeTranscript.Transcript ? (
                activeTranscript.Transcript.split('\n').map((line, idx) => {
                  const isAssistant = line.startsWith('Assistant:');
                  const speaker = isAssistant ? 'BrightSmile AI Voice Agent' : activeTranscript.Patient_Name;
                  const text = line.replace(/^(Assistant:|Patient:)/, '').trim();

                  return (
                    <div 
                      key={idx} 
                      className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                    >
                      {/* Name tag */}
                      <span className="text-[9px] text-[#A1B3C4] font-bold mb-1 ml-1 uppercase tracking-wider">
                        {speaker}
                      </span>
                      
                      {/* message card block */}
                      <div className={`p-4 rounded-2xl max-w-[85%] text-xs shadow-3xs leading-relaxed ${
                        isAssistant 
                          ? 'bg-white text-slate-800 border border-slate-100 rounded-tl-none font-medium' 
                          : 'bg-indigo-600 text-white rounded-tr-none font-bold'
                      }`}>
                        {text}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-slate-400 text-xs py-8">No vocal conversation transcript log recorded.</p>
              )}
            </div>

            {/* Modal Summary Footer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 rounded-b-3xl">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2 leading-none">Diagnostic n8n Summary</span>
              <p className="text-[11px] text-slate-600 leading-relaxed font-semibold bg-white p-3 rounded-xl border border-slate-100">
                {activeTranscript.Call_Summary}
              </p>
              
              <div className="flex items-center justify-between mt-3 text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Checked Slots: Google Calendar
                </span>
                <span className="text-[9px] font-mono leading-none font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md border border-purple-200">
                  Retell-id: {activeTranscript.Retell_Call_ID.substring(0, 16)}...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
