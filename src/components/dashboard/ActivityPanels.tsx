import React from 'react';
import { 
  Inbox, 
  Calendar, 
  PhoneCall, 
  Sparkles, 
  ArrowRight,
  User,
  Clock,
  Volume2,
  FileText
} from 'lucide-react';
import { Lead, Appointment, CallLog } from '../../types';
import StatusBadge from '../shared/StatusBadge';
import { formatTimeOnly, formatShortDate, formatDateTime } from '../../lib/utils';

// PANEL 1: Latest Telegram Leads
interface LatestLeadsProps {
  leads: Lead[];
  onTriggerCall: (leadId: string) => void;
  onViewLead: (lead: Lead) => void;
  onNavigateToInbox: () => void;
}

export function LatestTelegramLeads({
  leads,
  onTriggerCall,
  onViewLead,
  onNavigateToInbox
}: LatestLeadsProps) {
  // Take top 5 newest leads
  const newestLeads = [...leads]
    .sort((a, b) => new Date(b.Created_At).getTime() - new Date(a.Created_At).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs select-none flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Inbox className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Inbound Telegram Leads</h3>
              <p className="text-[10px] text-slate-400 font-medium">Synced with Telegram Bot Webhook</p>
            </div>
          </div>
          
          <button 
            id="view-all-leads-btn"
            onClick={onNavigateToInbox}
            className="flex items-center gap-1.5 text-[10px] font-black uppercase text-blue-600 tracking-wider hover:text-blue-700 hover:translate-x-0.5 transition-all"
          >
            Manage Inbox
            <ArrowRight className="w-3 w-3" />
          </button>
        </div>

        <div className="space-y-3.5">
          {newestLeads.map((lead) => (
            <div 
              id={`latest-lead-row-${lead.Lead_ID}`}
              key={lead.Lead_ID}
              className="flex items-center justify-between p-3 bg-slate-50 border border-slate-50/50 hover:border-slate-100 hover:bg-white hover:shadow-2xs transition-all duration-200 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center">
                  {lead.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    {lead.name}
                    <span className="text-[9px] font-medium text-slate-400 font-mono">({lead.Lead_ID})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[9px] text-slate-400">
                    <span className="font-medium bg-slate-200/50 px-1.5 py-0.5 rounded-sm">{lead.Issue}</span>
                    <span className="flex items-center gap-0.5 font-mono">
                      <Clock className="w-2.5 h-2.5" />
                      {formatTimeOnly(lead.Preferred_DateTime)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={lead.Status} type="lead" />
                
                {lead.Status === 'new' ? (
                  <button
                    id={`trigger-simulation-${lead.Lead_ID}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTriggerCall(lead.Lead_ID);
                    }}
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg flex items-center gap-1 transition-all shadow-md shadow-blue-100 active:scale-95 animate-pulse"
                    title="Simulate outbound calling pipeline"
                  >
                    <Sparkles className="w-3 h-3 fill-white" />
                    <span>Call AI</span>
                  </button>
                ) : (
                  <button
                    id={`view-lead-details-${lead.Lead_ID}`}
                    onClick={() => onViewLead(lead)}
                    className="p-1 px-2 border border-slate-200 text-[10px] font-bold text-slate-500 rounded-lg hover:bg-slate-50 hover:text-slate-800 transition-colors"
                  >
                    Details
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {leads.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              No recent leads. Try placing a mockup lead!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// PANEL 2: Today's Appointments
interface TodayAppsProps {
  appointments: Appointment[];
  onViewAppointment: (app: Appointment) => void;
  onNavigateToCalendar: () => void;
}

export function TodayAppointments({
  appointments,
  onViewAppointment,
  onNavigateToCalendar
}: TodayAppsProps) {
  // Filter today's appointments (Mock today is June 10, 2026)
  const todayApps = appointments
    .filter(a => a.Appointment_DateTime.includes('2026-06-10') && a.Status !== 'Cancelled')
    .sort((a, b) => new Date(a.Appointment_DateTime).getTime() - new Date(b.Appointment_DateTime).getTime());

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs select-none flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Today's Appointments</h3>
              <p className="text-[10px] text-slate-400 font-medium">Showing active bookings for Wed, Jun 10</p>
            </div>
          </div>
          
          <button 
            id="view-all-apps-btn"
            onClick={onNavigateToCalendar}
            className="flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-600 tracking-wider hover:text-emerald-700 hover:translate-x-0.5 transition-all"
          >
            Schedules
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-3.5">
          {todayApps.map((app) => (
            <div 
              id={`today-app-row-${app.Appointment_ID}`}
              key={app.Appointment_ID}
              className="p-3 bg-emerald-50/20 border border-emerald-100/30 hover:border-emerald-200/50 hover:bg-white rounded-2xl transition-all duration-200 cursor-pointer flex justify-between items-center group/app shadow-3xs hover:shadow-2xs"
              onClick={() => onViewAppointment(app)}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex flex-col items-center justify-center text-emerald-700 font-bold leading-none">
                  <span className="text-[14px]">10</span>
                  <span className="text-[8px] uppercase">Jun</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 group-hover/app:text-emerald-700 transition-colors">
                    {app.Patient_Name}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[9px] text-slate-400">
                    <span className="font-mono bg-emerald-50 text-emerald-700 px-1 py-0.5 rounded-sm font-bold">
                      {formatTimeOnly(app.Appointment_DateTime)}
                    </span>
                    <span className="bg-slate-200/50 px-1 py-0.5 rounded-xs line-clamp-1 max-w-[120px]">
                      {app.Issue}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={app.Status} type="appointment" />
              </div>
            </div>
          ))}

          {todayApps.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              No appointments scheduled for today.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// PANEL 3: Recent AI Call Logs
interface RecentCallsProps {
  logs: CallLog[];
  onViewLog: (log: CallLog) => void;
  onNavigateToLogs: () => void;
}

export function RecentAICallLogs({
  logs,
  onViewLog,
  onNavigateToLogs
}: RecentCallsProps) {
  // Take top 5 recent calls
  const recentLogs = [...logs]
    .sort((a, b) => new Date(b.Created_At).getTime() - new Date(a.Created_At).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs select-none flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <PhoneCall className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Recent Retell AI Logs</h3>
              <p className="text-[10px] text-slate-400 font-medium font-mono">Outbound voice transcriptions</p>
            </div>
          </div>
          
          <button 
            id="view-all-calls-btn"
            onClick={onNavigateToLogs}
            className="flex items-center gap-1.5 text-[10px] font-black uppercase text-purple-600 tracking-wider hover:text-purple-700 hover:translate-x-0.5 transition-all"
          >
            Audit Calls
            <ArrowRight className="w-3" />
          </button>
        </div>

        <div className="space-y-3.5">
          {recentLogs.map((log) => (
            <div 
              id={`recent-call-row-${log.Log_ID}`}
              key={log.Log_ID}
              className="p-3 bg-slate-50 border border-slate-50/50 hover:border-purple-200/50 hover:bg-white rounded-2xl transition-all duration-200 group/call cursor-pointer"
              onClick={() => onViewLog(log)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover/call:text-purple-600 transition-colors">
                      {log.Patient_Name}
                    </h4>
                    <span className="text-[9px] text-[#94A3B8] font-mono mt-0.5 block">{log.Phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-bold border border-purple-100 uppercase tracking-wider">
                    {log.Outcome}
                  </span>
                  <StatusBadge status={log.Call_Status} type="call" />
                </div>
              </div>

              {log.Call_Summary && (
                <div className="mt-2 text-[10px] text-slate-500 line-clamp-2 bg-white/70 border border-slate-100 p-2 rounded-lg font-medium">
                  {log.Call_Summary}
                </div>
              )}

              <div className="mt-2.5 flex items-center justify-between pt-1 border-t border-slate-100/60">
                <span className="text-[9px] text-slate-400 font-mono">
                  {formatShortDate(log.Created_At)} at {formatTimeOnly(log.Created_At)}
                </span>
                
                <div className="flex items-center gap-2 text-[9px] text-purple-600 font-bold">
                  {log.Recording_URL && <Volume2 className="w-3.5 h-3.5 text-purple-500" />}
                  <span className="flex items-center gap-0.5 hover:underline">
                    <FileText className="w-3 h-3 text-purple-400" />
                    Read Transcript
                  </span>
                </div>
              </div>
            </div>
          ))}

          {logs.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              No recent call logs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
