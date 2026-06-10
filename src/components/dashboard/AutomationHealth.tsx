import React from 'react';
import { 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Layers, 
  Calendar, 
  FileSpreadsheet,
  Activity
} from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';

export default function AutomationHealth() {
  const healthItems = [
    { 
      name: 'Telegram Lead Trigger', 
      status: 'Active', 
      desc: 'Handles new inbound messages and polls clinic contacts', 
      icon: Send, 
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      ping: '14ms'
    },
    { 
      name: 'Retell Outbound Engine', 
      status: 'Active', 
      desc: 'Speaks with patient post-Telegram registration', 
      icon: Sparkles, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      ping: '180ms'
    },
    { 
      name: 'CheckAvailability Webhook', 
      status: 'Active', 
      desc: 'n8n endpoint checking Google Calendar openings', 
      icon: Layers, 
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      ping: '45ms'
    },
    { 
      name: 'BookAppointment Webhook', 
      status: 'Active', 
      desc: 'n8n endpoint to register finalized events and Sheets', 
      icon: Layers, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      ping: '52ms'
    },
    { 
      name: 'Google Calendar Sync', 
      status: 'Connected', 
      desc: 'Injects confirmed G-Cal appointments instantly', 
      icon: Calendar, 
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
      ping: '65ms'
    },
    { 
      name: 'Google Sheets DB Mirror', 
      status: 'Connected', 
      desc: 'Logs leads, appointments, and conversational summaries', 
      icon: FileSpreadsheet, 
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      ping: '38ms'
    }
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs select-none relative overflow-hidden group">
      {/* Decors */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 group-hover:bg-slate-100/70 transition-colors" />

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Automation Pipeline Health</h3>
            <p className="text-[10px] text-slate-400 font-medium">Outbound receptionist & microservice status</p>
          </div>
        </div>
        
        <StatusBadge status="active" type="integration" />
      </div>

      <div className="space-y-3.5">
        {healthItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              id={`health-item-${index}`}
              key={index} 
              className="flex items-center justify-between p-3 border border-slate-50 hover:border-slate-100 rounded-2xl hover:bg-slate-50/50 transition-all group/item"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${item.bgColor} ${item.color} group-hover/item:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-700">{item.name}</h4>
                  <p className="text-[9px] text-slate-400 mt-0.5 line-clamp-1">{item.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[9px] text-slate-400 bg-slate-100/60 px-1.5 py-0.5 rounded-md">
                  {item.ping}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50/50 border border-emerald-100/50 px-2 py-0.5 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-50 animate-bounce" />
                  <span className="text-[10px]">Healthy</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
