import React from 'react';
import { 
  Users, 
  PhoneOutgoing, 
  PhoneCall, 
  CalendarCheck,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

interface ConversionFunnelProps {
  totalLeads: number;
  totalCalls: number;
  completedCalls: number;
  bookedAppointments: number;
}

export default function ConversionFunnel({
  totalLeads,
  totalCalls,
  completedCalls,
  bookedAppointments
}: ConversionFunnelProps) {
  
  // Calculate funnel values
  const step1 = totalLeads;                                     // Total Leads (100%)
  const step2 = Math.min(totalLeads, totalCalls);               // Called 
  const step3 = Math.min(step2, completedCalls);                // Answered
  const step4 = Math.min(step3, bookedAppointments);            // Booked

  // Percentages relative to step 1
  const pct1 = 100;
  const pct2 = step1 > 0 ? Math.round((step2 / step1) * 100) : 0;
  const pct3 = step1 > 0 ? Math.round((step3 / step1) * 100) : 0;
  const pct4 = step1 > 0 ? Math.round((step4 / step1) * 100) : 0;

  const funnelSteps = [
    { 
      label: 'New Leads', 
      meta: 'Telegram triggers', 
      count: step1, 
      pct: pct1, 
      icon: Users, 
      color: 'bg-blue-600', 
      text: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      label: 'Calls Placed', 
      meta: 'AI outbound ring', 
      count: step2, 
      pct: pct2, 
      icon: PhoneOutgoing, 
      color: 'bg-sky-500', 
      text: 'text-sky-600',
      bgColor: 'bg-sky-50'
    },
    { 
      label: 'Answered', 
      meta: 'Conversations completed', 
      count: step3, 
      pct: pct3, 
      icon: PhoneCall, 
      color: 'bg-purple-500', 
      text: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      label: 'Booked', 
      meta: 'G-Cal sync event', 
      count: step4, 
      pct: pct4, 
      icon: CalendarCheck, 
      color: 'bg-emerald-500', 
      text: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs select-none relative overflow-hidden group">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Operational Conversion Funnel</h3>
          <p className="text-[10px] text-slate-400 font-medium">Tracking lead journey from Telegram form to calendar event</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-xl font-bold">
          <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
          <span>{pct4}% Overall Booking Rate</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
        {funnelSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div 
              id={`funnel-step-${index}`}
              key={index} 
              className="p-4 rounded-2xl bg-slate-50 border border-slate-100/50 flex flex-col justify-between group/step hover:bg-white hover:shadow-md hover:border-slate-200 transition-all duration-300 relative"
            >
              <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-xl ${step.bgColor} ${step.text} transition-transform group-hover/step:rotate-3`}>
                  <Icon className="w-4 h-4" />
                </div>
                
                <span className="font-mono text-xs font-extrabold text-slate-300">
                  0{index + 1}
                </span>
              </div>

              <div className="mt-4">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                  {step.meta}
                </span>
                <h4 className="text-sm font-bold text-slate-800 mt-0.5">{step.label}</h4>
                
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-xl font-black text-slate-900">{step.count}</span>
                  <span className="text-xs text-slate-400 font-medium">patients</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3.5 space-y-1">
                <div className="flex justify-between items-center text-[9px] font-bold text-slate-500">
                  <span>Conversion</span>
                  <span>{step.pct}%</span>
                </div>
                <div className="w-full bg-slate-200/50 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${step.color}`}
                    style={{ width: `${step.pct}%` }}
                  />
                </div>
              </div>

              {/* Step indicator arrow (Desktop-only) */}
              {index < 3 && (
                <div className="hidden sm:flex absolute -right-2 top-12 translate-x-1 py-1 z-10">
                  <div className="w-4 h-4 rounded-full bg-white border border-slate-200 shadow-3xs flex items-center justify-center text-slate-400">
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
