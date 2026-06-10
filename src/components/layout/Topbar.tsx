import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  Send,
  Calendar,
  Layers,
  FileSpreadsheet,
  Globe,
  Sparkles
} from 'lucide-react';

interface TopbarProps {
  onRefresh: () => void;
  isSyncing: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function Topbar({ 
  onRefresh, 
  isSyncing, 
  searchTerm, 
  setSearchTerm 
}: TopbarProps) {
  
  const [secondsAgo, setSecondsAgo] = useState(0);

  // Time elapsed since last sync
  useEffect(() => {
    setSecondsAgo(0);
    const interval = setInterval(() => {
      setSecondsAgo(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isSyncing]);

  const liveState = secondsAgo < 5 
    ? 'Just now' 
    : secondsAgo < 60 
      ? `${secondsAgo}s ago` 
      : `${Math.floor(secondsAgo / 60)}m ago`;

  const connectionChips = [
    { label: 'Telegram', status: 'connected', icon: Send, color: 'text-indigo-600' },
    { label: 'Retell AI', status: 'connected', icon: Sparkles, color: 'text-blue-600' },
    { label: 'n8n Webhook', status: 'active', icon: Layers, color: 'text-amber-500' },
    { label: 'Google Sheets', status: 'syncing', icon: FileSpreadsheet, color: 'text-emerald-500' },
    { label: 'Google Calendar', status: 'connected', icon: Calendar, color: 'text-sky-500' }
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 select-none z-20 shadow-xs">
      {/* Search Input */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            id="global-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads, transcripts, patients, notes..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-700"
          />
        </div>
      </div>

      {/* Connection Trackers / Status Monitors (Desktop-only) */}
      <div className="hidden lg:flex items-center gap-2 px-4 border-r border-slate-100 mr-4">
        {connectionChips.map((chip, i) => {
          const Icon = chip.icon;
          return (
            <div 
              id={`connection-chip-${chip.label.toLowerCase().replace(/\s+/g, '-')}`}
              key={i} 
              className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors rounded-lg text-[10px] font-medium text-slate-600 shadow-3xs"
            >
              <Icon className={`w-3 h-3 ${chip.color}`} />
              <span>{chip.label}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
          );
        })}
      </div>

      {/* Sync Status Controls, Bell notification, and Admin Avatar */}
      <div className="flex items-center gap-4">
        {/* Sync Indicator */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
          <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-0.5 text-emerald-700 font-semibold font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Live Sync</span>
          </div>
          <span className="hidden sm:inline">Synced {liveState}</span>
        </div>

        {/* Refresh Button */}
        <button
          id="topbar-refresh-btn"
          onClick={onRefresh}
          disabled={isSyncing}
          className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-500 hover:text-slate-800 transition-all hover:rotate-12 active:scale-95 disabled:opacity-50 relative shrink-0 shadow-3xs"
          title="Manual Refresh"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-blue-600' : ''}`} />
        </button>

        {/* System Notifications with dropdown placeholder */}
        <button 
          id="topbar-notifications-btn"
          className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-500 hover:text-slate-800 relative shrink-0 transition-all shadow-3xs"
        >
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 border border-white rounded-full"></span>
        </button>

        {/* Admin Avatar Detail */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            H
          </div>
          <div className="hidden md:block text-left leading-none select-none">
            <div className="text-xs font-bold text-slate-800">Hamayoon</div>
            <span className="text-[9px] text-slate-400 font-medium">Dental Clinic Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
