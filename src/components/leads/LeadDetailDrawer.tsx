import React from 'react';
import { Lead, Appointment, CallLog } from '../../types';
import { 
  X, 
  Calendar, 
  Phone, 
  Mail, 
  Clock, 
  Sparkles, 
  FileText, 
  Activity, 
  ArrowRight,
  Smile,
  ShieldCheck,
  Play
} from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';
import { formatDateTime, formatRelativeTime } from '../../lib/utils';

interface LeadDetailDrawerProps {
  lead: Lead | null;
  onClose: () => void;
  onTriggerCall: (leadId: string) => void;
  relatedCall: CallLog | null;
  relatedAppt: Appointment | null;
  onViewCall: (call: CallLog) => void;
  onViewAppt: (appt: Appointment) => void;
}

export default function LeadDetailDrawer({
  lead,
  onClose,
  onTriggerCall,
  relatedCall,
  relatedAppt,
  onViewCall,
  onViewAppt
}: LeadDetailDrawerProps) {
  if (!lead) return null;

  // Compile timeline events based on lead state
  const timelineEvents = [
    {
      title: 'Telegram Lead Captured',
      desc: 'Form submission received via Telegram Bot Hook saved into Google Sheets.',
      time: lead.Created_At,
      completed: true,
      icon: Mail,
      color: 'bg-blue-500'
    },
    {
      title: 'Outbound AI Telephony Triggered',
      desc: lead.Retell_Call_ID 
        ? `Outbound dialing started via Retell AI. Call ID: ${lead.Retell_Call_ID}.`
        : 'Awaiting phone queue instructions.',
      time: lead.Retell_Call_ID ? lead.Created_At : null,
      completed: !!lead.Retell_Call_ID,
      icon: Phone,
      color: 'bg-sky-500'
    },
    {
      title: 'Dialer Run Summary Logged',
      desc: relatedCall 
        ? `Patient spoke with voice agent. Outcome: ${relatedCall.Outcome}.` 
        : lead.Status === 'calling' ? 'Continuous dialing in progress...' : 'Call has not been successfully completed.',
      time: relatedCall ? relatedCall.Created_At : null,
      completed: !!relatedCall,
      icon: FileText,
      color: 'bg-purple-500'
    },
    {
      title: 'Slot booked in Google Calendar',
      desc: relatedAppt 
        ? `Slot reserved: ${formatDateTime(relatedAppt.Appointment_DateTime)} with G-Cal Event ID: ${relatedAppt.Calendar_Event_ID || 'Pending'}.`
        : 'No appointment confirmed.',
      time: relatedAppt ? relatedAppt.Created_At : null,
      completed: !!relatedAppt,
      icon: Calendar,
      color: 'bg-emerald-500'
    }
  ];

  return (
    <div id="lead-drawer-overlay" className="fixed inset-0 z-50 flex justify-end select-none">
      {/* Background glass overlay */}
      <div 
        id="lead-drawer-backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Slide-out Panel */}
      <div 
        id="lead-drawer-panel"
        className="w-full max-w-lg bg-white h-screen shadow-2xl relative z-10 flex flex-col justify-between border-l border-slate-200 animate-slide-in"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center font-bold text-blue-700">
              {lead.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">{lead.name}</h3>
              <p className="text-[10px] text-slate-400 font-mono font-bold mt-0.5">ID: {lead.Lead_ID}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <StatusBadge status={lead.Status} type="lead" />
            <button 
              id="close-lead-drawer"
              onClick={onClose}
              className="p-1.5 hover:bg-slate-200/60 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer border border-slate-200/50 shadow-3xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Patient Details Cards Grid */}
          <div className="grid grid-cols-2 gap-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-3xs">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Phone Line</span>
              <a href={`tel:${lead.Phone}`} className="text-xs font-bold text-slate-700 flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {lead.Phone}
              </a>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</span>
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 text-ellipsis overflow-hidden block">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {lead.Email}
              </span>
            </div>

            <div className="space-y-1 col-span-2 pt-2 border-t border-slate-200/50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Stated Dental Concern</span>
              <span className="text-xs font-bold text-slate-800 bg-white border border-slate-100 px-2.5 py-1 rounded-lg inline-block">
                {lead.Issue}
              </span>
            </div>

            <div className="space-y-1 col-span-2 pt-2 border-t border-slate-200/50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Aspirative Preference Booking</span>
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {formatDateTime(lead.Preferred_DateTime)}
                <span className="text-[9px] text-slate-400 bg-slate-200 px-1.5 rounded-sm">
                  ({formatRelativeTime(lead.Preferred_DateTime)})
                </span>
              </span>
            </div>
          </div>

          {/* Connected CRM Entities Shortcut Links */}
          {(relatedCall || relatedAppt) && (
            <div className="space-y-2.5">
              <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">Connected Systems</h4>
              
              <div className="grid grid-cols-1 gap-2">
                {relatedCall && (
                  <button
                    id="drawer-link-call"
                    onClick={() => onViewCall(relatedCall)}
                    className="w-full p-3 bg-purple-50 hover:bg-purple-100/70 border border-purple-100 rounded-xl text-left flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg text-purple-600 shadow-3xs">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-purple-900">Conversational Transcript Log</div>
                        <p className="text-[9px] text-purple-400 leading-none mt-0.5 uppercase tracking-wider">Outcome: {relatedCall.Outcome}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}

                {relatedAppt && (
                  <button
                    id="drawer-link-appt"
                    onClick={() => onViewAppt(relatedAppt)}
                    className="w-full p-3 bg-emerald-50/50 hover:bg-emerald-100/50 border border-emerald-100/40 rounded-xl text-left flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg text-emerald-600 shadow-3xs">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-emerald-950">Active Google Calendar Slot</div>
                        <p className="text-[9px] text-emerald-500 font-mono mt-0.5">{relatedAppt.Calendar_Event_ID || 'Event Synced'}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Timeline Tracking Flow */}
          <div className="space-y-5 pt-2 border-t border-slate-100">
            <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest leading-none flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> Outbound Automation Sequence
            </h4>

            <div className="relative pl-5 border-l-2 border-slate-100 space-y-6">
              {timelineEvents.map((evt, i) => {
                const Icon = evt.icon;
                return (
                  <div id={`timeline-evt-${i}`} key={i} className="relative group/evt">
                    {/* timeline bubble dot */}
                    <span className={`absolute -left-[29px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white ${
                      evt.completed ? evt.color : 'bg-slate-200'
                    }`}>
                      {evt.completed && <ShieldCheck className="w-2.5 h-2.5" />}
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className={`text-xs font-bold leading-none ${
                          evt.completed ? 'text-slate-800' : 'text-slate-400'
                        }`}>
                          {evt.title}
                        </h5>
                        
                        {evt.time && (
                          <span className="text-[9px] font-mono font-medium text-slate-400">
                            {formatDateTime(evt.time).split('at')[1]}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 font-medium leading-relaxed">
                        {evt.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <p className="text-[10px] text-slate-400 font-medium">Auto-synced just now</p>
          
          {lead.Status === 'new' ? (
            <button
              id="drawer-action-call"
              onClick={() => {
                onTriggerCall(lead.Lead_ID);
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-100 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 fill-white" />
              Start Outbound call Now
            </button>
          ) : (
            <button
              id="drawer-action-recontact"
              onClick={() => alert(`Outbound scheduling retry created in n8n for ${lead.name}`)}
              className="px-4 py-2 border border-slate-200 hover:bg-white active:scale-95 text-slate-600 text-xs font-bold rounded-xl flex items-center gap-1.5 hover:text-slate-900 transition-all shadow-3xs"
            >
              <Play className="w-3 h-3 text-slate-400" />
              Enqueue n8n Retry Call
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
