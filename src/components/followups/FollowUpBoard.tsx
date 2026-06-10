import React, { useState } from 'react';
import { Lead, Appointment, CallLog } from '../../types';
import { 
  AlertTriangle, 
  HelpCircle, 
  PhoneCall, 
  CheckCircle, 
  Sparkles, 
  Trash, 
  Smile, 
  FileText,
  Clock,
  Coins,
  ShieldAlert,
  CalendarPlus,
  ArrowRight
} from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';
import { formatDateTime, formatRelativeTime } from '../../lib/utils';
import EmptyState from '../shared/EmptyState';

interface FollowUpBoardProps {
  leads: Lead[];
  appointments: Appointment[];
  callLogs: CallLog[];
  onTriggerCall: (leadId: string) => void;
  onResolveFollowUp: (leadId: string) => void;
  onCreateAppointment: (lead: Lead) => void;
}

export default function FollowUpBoard({
  leads,
  appointments,
  callLogs,
  onTriggerCall,
  onResolveFollowUp,
  onCreateAppointment
}: FollowUpBoardProps) {
  
  // Calculate unhandled or follow-up entities
  // Conditions: 
  // 1. Lead has Status = 'not_answered' or 'failed' or 'cancelled'
  // 2. Lead has Status = 'contacted' and no confirmed appointment exists
  // 3. Appointment cancelled (needs replacement)
  const getFollowUpList = () => {
    const list: {
      id: string;
      lead: Lead;
      reason: string;
      lastContactedStr: string;
      priority: 'high' | 'medium' | 'low';
      issue: string;
    }[] = [];

    leads.forEach(lead => {
      const isBooked = appointments.some(a => a.Lead_ID === lead.Lead_ID && a.Status === 'Confirmed');
      const isCompleted = appointments.some(a => a.Lead_ID === lead.Lead_ID && a.Status === 'Completed');
      const isCancelled = appointments.some(a => a.Lead_ID === lead.Lead_ID && a.Status === 'Cancelled');

      let reason = "";
      let priority: 'high' | 'medium' | 'low' = 'low';

      // Decide urgency priority based on dental issue
      const isUrgentIssue = 
        lead.Issue.toLowerCase().includes('pain') || 
        lead.Issue.toLowerCase().includes('toothache') || 
        lead.Issue.toLowerCase().includes('emergency');

      if (lead.Status === 'not_answered') {
        reason = "Outbound Call: No Answer";
        priority = isUrgentIssue ? 'high' : 'medium';
      } else if (lead.Status === 'failed') {
        reason = "Automated Dialer: Signaling Error";
        priority = isUrgentIssue ? 'high' : 'medium';
      } else if (lead.Status === 'cancelled') {
        reason = "Patient Cancelled Lead / Dialogue closed";
        priority = 'low';
      } else if (lead.Status === 'contacted' && !isBooked && !isCompleted) {
        reason = "Spoke with AI but booking incomplete";
        priority = isUrgentIssue ? 'high' : 'medium';
      } else if (isCancelled && lead.Status !== 'booked') {
        reason = "Confirmed slot cancelled by client";
        priority = isUrgentIssue ? 'high' : 'medium';
      }

      if (reason) {
        list.push({
          id: lead.Lead_ID,
          lead,
          reason,
          lastContactedStr: lead.Updated_At,
          priority,
          issue: lead.Issue
        });
      }
    });

    // Sort by priority: High first, then Medium, then Low
    const priorityWeight = { high: 3, medium: 2, low: 1 };
    return list.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
  };

  const followUps = getFollowUpList();

  return (
    <div className="space-y-6 select-none animate-fade-in">
      {/* Overview stats cards for followups */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-rose-50 border border-rose-100 p-5 rounded-3xl flex items-center justify-between shadow-3xs">
          <div>
            <span className="text-[10px] font-black tracking-wider text-rose-500 uppercase">Emergency Pain Hold</span>
            <h4 className="text-2xl font-black text-rose-950 mt-1">
              {followUps.filter(f => f.priority === 'high').length}
            </h4>
            <p className="text-[10px] text-rose-700 font-medium mt-1">Urgent toothaches requiring manual/AI retry calls</p>
          </div>
          <div className="p-3 bg-white rounded-2xl text-rose-500 shadow-3xs">
            <ShieldAlert className="w-5 h-5 animate-bounce" />
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 p-5 rounded-3xl flex items-center justify-between shadow-3xs">
          <div>
            <span className="text-[10px] font-black tracking-wider text-amber-600 uppercase">Unresolved Contacts</span>
            <h4 className="text-2xl font-black text-amber-950 mt-1">
              {followUps.filter(f => f.priority === 'medium').length}
            </h4>
            <p className="text-[10px] text-amber-700 font-medium mt-1">Spoke with AI but deferred scheduling</p>
          </div>
          <div className="p-3 bg-white rounded-2xl text-amber-500 shadow-3xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-100/80 border border-slate-200 p-5 rounded-3xl flex items-center justify-between shadow-3xs">
          <div>
            <span className="text-[10px] font-black tracking-wider text-slate-500 uppercase">Total Follow-ups</span>
            <h4 className="text-2xl font-black text-slate-800 mt-1">{followUps.length}</h4>
            <p className="text-[10px] text-slate-500 font-medium mt-1">Pending action leads saved in CRM</p>
          </div>
          <div className="p-3 bg-white rounded-2xl text-slate-400 shadow-3xs">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Grid view of follow up files */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {followUps.map((item) => (
          <div 
            id={`followup-card-${item.id}`}
            key={item.id}
            className={`bg-white border text-left p-5 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
              item.priority === 'high' ? 'border-l-4 border-l-rose-500' : 
              item.priority === 'medium' ? 'border-l-4 border-l-amber-500' : 'border-l-4 border-l-slate-400'
            }`}
          >
            {/* Urgent glowing background accent */}
            {item.priority === 'high' && (
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-rose-500 rounded-full opacity-5 blur-xl group-hover:scale-125 transition-transform" />
            )}

            <div>
              {/* Header: Priority and reason badge */}
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                <StatusBadge status={item.priority} type="priority" />
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg border border-slate-200/50 font-bold font-mono text-right shrink-0">{item.id}</span>
              </div>

              {/* Patient and reason description */}
              <div className="space-y-1.5">
                <h4 className="text-sm font-black text-slate-800 flex items-center gap-1">
                  {item.lead.name}
                </h4>
                <p className="text-xs text-rose-600 font-bold flex items-center gap-1.5 bg-rose-50/50 border border-rose-100/40 p-1.5 px-2.5 rounded-xl">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.reason}</span>
                </p>

                {/* Patient coordinates */}
                <div className="text-[11px] space-y-1 pt-2 font-medium">
                  <span className="block text-slate-500 font-mono">Phone: <b className="text-slate-800">{item.lead.Phone}</b></span>
                  <span className="block text-slate-500">Stated Issue: <b className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md font-semibold text-[10px] inline-block mt-0.5">{item.issue}</b></span>
                  {item.lead.Preferred_DateTime && (
                    <span className="block text-slate-400 font-mono text-[10px] pt-1">Preferred Time passed: {formatDateTime(item.lead.Preferred_DateTime).split('at')[0]}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions panel row */}
            <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[9px] text-[#A1B3C4] font-mono">Saved {formatRelativeTime(item.lastContactedStr)}</span>
              
              <div className="flex gap-1">
                {/* Resolve/Close */}
                <button
                  id={`followup-resolve-${item.id}`}
                  onClick={() => onResolveFollowUp(item.id)}
                  className="p-2 border border-slate-200 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors shrink-0"
                  title="Mark patient inquiry resolved/removed"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                </button>

                {/* Calendar Manual Input holds */}
                <button
                  id={`followup-appt-${item.id}`}
                  onClick={() => onCreateAppointment(item.lead)}
                  className="p-2 border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors shrink-0"
                  title="Register manual slot overriding dialer"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                </button>

                {/* Call Outbound Re-Dialer Trigger */}
                <button
                  id={`followup-call-${item.id}`}
                  onClick={() => onTriggerCall(item.id)}
                  className="p-1 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-bold transition-all shadow-xs flex items-center gap-1 active:scale-95 animate-pulse"
                  title="Fire Retell AI queue callback again"
                >
                  <Sparkles className="w-3 h-3 fill-white" />
                  <span>Call back</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {followUps.length === 0 && (
          <div className="col-span-3 py-10">
            <EmptyState
              title="All caught up!"
              description="No unresolved patients or failed call records pending."
              icon={Smile}
            />
          </div>
        )}
      </div>
    </div>
  );
}
