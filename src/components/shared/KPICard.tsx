import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface KPICardProps {
  id: string;
  label: string;
  value: string | number;
  icon: LucideIcon;
  bgColor: string;     // e.g. "bg-blue-100" or custom code
  iconColor: string;   // e.g. "text-blue-600"
  trend?: {
    value: string;
    isUp: boolean;
    label?: string;
  };
  tooltip?: string;
}

export default function KPICard({
  id,
  label,
  value,
  icon: Icon,
  bgColor,
  iconColor,
  trend,
  tooltip
}: KPICardProps) {
  return (
    <div 
      id={`kpi-card-${id}`}
      className={cn(
        "rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col justify-between bg-white relative overflow-hidden group"
      )}
      title={tooltip}
    >
      {/* Decorative Pastel Background Glow in the corner */}
      <div className={cn("absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-10 blur-xl transition-all group-hover:scale-125", bgColor)} />

      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold text-slate-500 tracking-tight">{label}</span>
        <div className={cn("p-2 rounded-xl transition-transform group-hover:scale-110", bgColor, iconColor)}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-2xl font-bold font-sans tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
          {value}
        </h3>
        
        {trend && (
          <div className="flex items-center gap-1 mt-1.5">
            <span className={cn(
              "text-[10px] font-bold flex items-center py-0.5 px-1.5 rounded-md", 
              trend.isUp 
                ? "bg-emerald-50 text-emerald-700" 
                : "bg-rose-50 text-rose-700"
            )}>
              {trend.isUp ? (
                <ArrowUpRight className="w-3 h-3 text-emerald-700 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3 h-3 text-rose-700 mr-0.5" />
              )}
              {trend.value}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {trend.label || 'vs last week'}
            </span>
          </div>
        )}
      </div>

      {/* Modern thin bottom accent line */}
      <div className={cn("absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-70", bgColor)} />
    </div>
  );
}
