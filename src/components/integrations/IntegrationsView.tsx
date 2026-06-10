import React from 'react';
import { 
  Send, 
  Sparkles, 
  Layers, 
  FileSpreadsheet, 
  Calendar, 
  Mail, 
  Database,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  Check,
  Play
} from 'lucide-react';
import { IntegrationStatus } from '../../types';
import StatusBadge from '../shared/StatusBadge';

interface IntegrationsViewProps {
  integrations: IntegrationStatus[];
}

export default function IntegrationsView({ integrations }: IntegrationsViewProps) {
  
  // Custom icons maps
  const getIcon = (id: string) => {
    switch (id) {
      case 'telegram': return Send;
      case 'retell': return Sparkles;
      case 'n8n': return Layers;
      case 'sheets': return FileSpreadsheet;
      case 'calendar': return Calendar;
      case 'email': return Mail;
      default: return Database;
    }
  };

  const getIconColor = (id: string) => {
    switch (id) {
      case 'telegram': return 'text-indigo-600 bg-indigo-50 border-indigo-100';
      case 'retell': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'n8n': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'sheets': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'calendar': return 'text-sky-600 bg-sky-50 border-sky-100';
      case 'email': return 'text-purple-600 bg-purple-50 border-purple-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="space-y-6 select-none animate-fade-in text-left">
      {/* Overview Info Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-black text-slate-800">Connected Automation Architecture Stack</h3>
          <p className="text-[11px] text-slate-400 font-medium">Monitoring n8n sequences, phone routers, and workspace datasets</p>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl text-[10px] font-bold text-slate-500 font-mono">
          Last Webhook validation: Jun 10, 07:18 UTC (Healthy)
        </div>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {integrations.map((item) => {
          const IconComponent = getIcon(item.id);
          const iconStyling = getIconColor(item.id);

          return (
            <div 
              id={`integrations-card-${item.id}`}
              key={item.id}
              className="bg-white border border-slate-200/80 rounded-3xl p-5 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-300 group relative"
            >
              {/* Card top row: name and status */}
              <div>
                <div className="flex items-start justify-between">
                  <div className={`p-2.5 rounded-xl border ${iconStyling} transition-transform group-hover:rotate-2`}>
                    <IconComponent className="w-4 h-4" />
                  </div>

                  <StatusBadge status={item.status} type="integration" />
                </div>

                {/* Content info */}
                <div className="mt-4">
                  <h4 className="text-base font-extrabold text-slate-800 flex items-center gap-1.5">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 lines-clamp-3 leading-relaxed font-semibold">
                    {item.description}
                  </p>
                </div>

                {/* Specific features listings, like twilio phone number */}
                {item.phone && (
                  <div className="mt-3 p-2 bg-slate-50 border border-slate-100 rounded-lg text-xs leading-none">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Rotell AI Assigned Caller Number</span>
                    <span className="font-mono font-bold text-slate-700">{item.phone}</span>
                  </div>
                )}

                {item.agentName && (
                  <div className="mt-2 p-2 bg-slate-50 border border-slate-100 rounded-lg text-xs leading-none">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Active Conversational Voice Agent</span>
                    <span className="font-bold text-blue-600">{item.agentName}</span>
                  </div>
                )}
              </div>

              {/* Status details array */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-1.5 text-[10px] text-slate-500 font-medium">
                {item.details && item.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {/* Quick links to credentials panel */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[8px] font-mono uppercase text-slate-400">api verified</span>
                <button
                  id={`integration-btn-check-${item.id}`}
                  onClick={() => alert(`Webhook verification sent to ${item.name} API. Response received: HTTP 200 OK`)}
                  className="px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-xl font-bold text-[9px] uppercase tracking-wider transition-all shadow-3xs flex items-center gap-1"
                >
                  <Check className="w-3 h-3 text-emerald-500" />
                  Verify API
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
