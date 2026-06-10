import React from 'react';
import { cn } from '../../lib/utils';

export type BadgeType = 'lead' | 'appointment' | 'call' | 'priority' | 'integration';

interface StatusBadgeProps {
  status: string;
  type: BadgeType;
  className?: string;
  id?: string;
}

export default function StatusBadge({ status, type, className, id }: StatusBadgeProps) {
  const norm = status.toLowerCase().trim();

  let styles = "bg-slate-100 text-slate-700 border-slate-200";
  let hasDot = false;
  let pulseDot = false;

  // Let's decide badge look based on domain
  if (type === 'lead') {
    switch (norm) {
      case 'new':
        styles = "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100";
        hasDot = true;
        break;
      case 'calling':
        styles = "bg-blue-100 text-sky-800 border-sky-300 font-bold hover:bg-sky-200 animate-pulse";
        hasDot = true;
        pulseDot = true;
        break;
      case 'contacted':
        styles = "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100";
        hasDot = true;
        break;
      case 'booked':
        styles = "bg-emerald-50 text-emerald-700 border-emerald-200 font-medium hover:bg-emerald-100";
        hasDot = true;
        break;
      case 'not_answered':
        styles = "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100";
        break;
      case 'failed':
        styles = "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100";
        break;
      case 'cancelled':
        styles = "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100";
        break;
    }
  } else if (type === 'appointment') {
    switch (norm) {
      case 'confirmed':
        styles = "bg-emerald-50 text-emerald-700 border-emerald-200 font-medium";
        hasDot = true;
        break;
      case 'pending':
        styles = "bg-amber-50 text-amber-700 border-amber-200 animate-pulse";
        hasDot = true;
        pulseDot = true;
        break;
      case 'completed':
        styles = "bg-blue-50 text-blue-700 border-blue-200";
        hasDot = true;
        break;
      case 'cancelled':
        styles = "bg-rose-50 text-rose-700 border-rose-200";
        break;
      case 'rescheduled':
        styles = "bg-purple-50 text-purple-700 border-purple-200";
        break;
      case 'no show':
      case 'no_show':
        styles = "bg-slate-100 text-slate-500 border-slate-200";
        break;
    }
  } else if (type === 'call') {
    switch (norm) {
      case 'completed':
      case 'ended':
        styles = "bg-emerald-50 text-emerald-700 border-emerald-200";
        hasDot = true;
        break;
      case 'busy':
      case 'not_answered':
        styles = "bg-amber-50 text-amber-700 border-amber-200";
        break;
      case 'failed':
        styles = "bg-rose-50 text-rose-700 border-rose-200";
        break;
      case 'voicemail':
        styles = "bg-sky-50 text-sky-700 border-sky-200";
        break;
      default:
        styles = "bg-slate-50 text-slate-500 border-slate-200";
    }
  } else if (type === 'priority') {
    switch (norm) {
      case 'high':
        styles = "bg-rose-50 text-rose-700 border-rose-100 text-[10px] font-bold uppercase tracking-wider";
        hasDot = true;
        pulseDot = true;
        break;
      case 'medium':
        styles = "bg-amber-50 text-amber-700 border-amber-100 text-[10px] font-bold uppercase tracking-wider";
        hasDot = true;
        break;
      case 'low':
        styles = "bg-slate-50 text-slate-500 border-slate-100 text-[10px] uppercase tracking-wider";
        break;
    }
  } else if (type === 'integration') {
    switch (norm) {
      case 'connected':
      case 'active':
        styles = "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold";
        hasDot = true;
        pulseDot = true;
        break;
      case 'syncing':
        styles = "bg-blue-50 text-blue-700 border-blue-200 border-dashed animate-pulse";
        hasDot = true;
        pulseDot = true;
        break;
      case 'disconnected':
        styles = "bg-rose-50 text-rose-600 border-rose-100";
        break;
    }
  }

  return (
    <span 
      id={id}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all duration-200 select-none cursor-default",
        styles,
        className
      )}
    >
      {hasDot && (
        <span className={cn(
          "w-1.5 h-1.5 rounded-full",
          norm === 'booked' || norm === 'confirmed' || norm === 'completed' || norm === 'ended' || norm === 'connected' || norm === 'active' ? "bg-emerald-500" :
          norm === 'new' || norm === 'completed_blue' ? "bg-blue-500" :
          norm === 'calling' ? "bg-sky-500" :
          norm === 'contacted' ? "bg-purple-500" :
          norm === 'high' ? "bg-rose-500" :
          "bg-amber-500",
          pulseDot && "animate-ping"
        )} />
      )}
      <span className="capitalize">{status.replace('_', ' ')}</span>
    </span>
  );
}
