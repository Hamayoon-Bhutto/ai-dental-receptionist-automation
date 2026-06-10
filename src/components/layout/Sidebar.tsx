import React from 'react';
import { 
  LayoutDashboard, 
  Inbox, 
  PhoneCall, 
  Calendar, 
  CalendarDays, 
  AlertCircle, 
  BarChart3, 
  Puzzle, 
  Settings as SettingsIcon,
  Smile,
  LogOut,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { cn } from '../../lib/utils';

export type NavTab = 
  | 'overview' 
  | 'leads' 
  | 'calls' 
  | 'appointments' 
  | 'calendar' 
  | 'followups' 
  | 'analytics' 
  | 'integrations' 
  | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  unresolvedFollowUpsCount: number;
  newLeadsCount: number;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  unresolvedFollowUpsCount,
  newLeadsCount
}: SidebarProps) {
  
  const menuItems = [
    { id: 'overview' as NavTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'leads' as NavTab, label: 'Lead Inbox', icon: Inbox, badge: newLeadsCount > 0 ? newLeadsCount : undefined, badgeColor: 'bg-blue-600 text-white' },
    { id: 'calls' as NavTab, label: 'AI Calls', icon: PhoneCall },
    { id: 'appointments' as NavTab, label: 'Appointments', icon: Calendar },
    { id: 'calendar' as NavTab, label: 'Calendar', icon: CalendarDays },
    { id: 'followups' as NavTab, label: 'Follow-ups', icon: AlertCircle, badge: unresolvedFollowUpsCount > 0 ? unresolvedFollowUpsCount : undefined, badgeColor: 'bg-amber-500 text-slate-900 font-semibold' },
    { id: 'analytics' as NavTab, label: 'Analytics', icon: BarChart3 },
    { id: 'integrations' as NavTab, label: 'Integrations', icon: Puzzle },
    { id: 'settings' as NavTab, label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside id="sidebar-nav" className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 select-none z-30">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-100 flex-shrink-0">
            <Smile className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight leading-none flex items-center gap-1">
              BrightSmile
              <span className="text-blue-600"><Sparkles className="w-3.5 h-3.5 fill-blue-600" /></span>
            </h1>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">AI Receptionist</p>
          </div>
        </div>
      </div>

      {/* Navigation list */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              id={`sidebar-btn-${item.id}`}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group",
                isActive 
                  ? "bg-slate-900 text-white shadow-sm" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn(
                  "w-4 h-4 transition-transform group-hover:scale-110",
                  isActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-900"
                )} />
                <span>{item.label}</span>
              </div>
              
              {item.badge && (
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-bold shadow-xs", 
                  item.badgeColor
                )}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Admin Profile Area */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center font-bold text-indigo-700">
                HA
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            
            <div className="text-left">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                Hamayoon
                <UserCheck className="w-3 h-3 text-blue-600" title="System Administrator" />
              </div>
              <p className="text-[10px] text-slate-500 leading-none mt-0.5 font-medium">System Admin</p>
            </div>
          </div>
          
          <button 
            id="sidebar-logout"
            onClick={() => {
              if (confirm("Reset application mock data back to factory demo defaults?")) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            title="Reset Mock Database"
            className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50/50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-2 text-center">
          <p className="text-[9px] text-slate-400 font-mono">Synced: June 10, 2026</p>
        </div>
      </div>
    </aside>
  );
}
