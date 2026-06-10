import React, { useState } from 'react';
import { Appointment } from '../../types';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Info, 
  Users, 
  ExternalLink,
  ShieldCheck,
  Building,
  Clock,
  CheckCircle,
  HelpCircle,
  X
} from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';
import { formatTimeOnly, formatDateTime } from '../../lib/utils';

interface CalendarViewProps {
  appointments: Appointment[];
}

export default function CalendarView({ appointments }: CalendarViewProps) {
  // June 2026 (Starting Monday Jun 1, ending Tuesday Jun 30)
  const currentYear = 2026;
  const currentMonthName = "June 2026";
  
  // Selected appointment state
  const [selectedApp, setSelectedApp] = useState<Appointment | null>(null);

  // Month structure: June 2026 starts on Monday (index 1 if Monday-based). 
  // Let's create an array representing Sunday to Saturday grids. 
  // Sunday prior is May 31 (grayed out).
  // Monday June 1 to June 30 is active.
  // July 1 to July 4 are grayed out.
  const calendarDays = [
    { dayNum: 31, isCurrentMonth: false, dateStr: "2026-05-31" },
    ...Array.from({ length: 30 }, (_, i) => ({
      dayNum: i + 1,
      isCurrentMonth: true,
      dateStr: `2026-06-${(i + 1) < 10 ? `0${i + 1}` : i + 1}`
    })),
    { dayNum: 1, isCurrentMonth: false, dateStr: "2026-07-01" },
    { dayNum: 2, isCurrentMonth: false, dateStr: "2026-07-02" },
    { dayNum: 3, isCurrentMonth: false, dateStr: "2026-07-03" },
    { dayNum: 4, isCurrentMonth: false, dateStr: "2026-07-04" },
  ];

  const getAppointmentsForDate = (dateStr: string) => {
    return appointments.filter(app => {
      return app.Appointment_DateTime.startsWith(dateStr) && app.Status !== 'Cancelled';
    });
  };

  const getDayColor = (dateStr: string, isCurrent: boolean) => {
    const isToday = dateStr === "2026-06-10";
    if (isToday) return "bg-blue-50/70 border-2 border-blue-500 shadow-xs";
    if (!isCurrent) return "bg-slate-50 text-slate-400";
    
    // Weekend check (Sunday is closed, Saturday optional)
    const d = new Date(dateStr);
    const dayOfWeek = d.getDay();
    if (dayOfWeek === 0) return "bg-rose-50/20 text-slate-400"; // Sunday closed
    
    return "bg-white hover:bg-slate-50/50";
  };

  return (
    <div className="space-y-6 select-none animate-fade-in">
      {/* Calendar Header info card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Operational Schedules Calendar</h3>
            <p className="text-[10px] text-slate-400 font-medium leading-none mt-1">Real-time room routing syncs with Google Calendar API</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold text-slate-500">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Confirmed Treatment</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>n8n Pending Holds</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>Treatment Completed</span>
          </div>
        </div>
      </div>

      {/* Main Calendar Month Grid */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        {/* Month Selector Bar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <h4 className="text-base font-black text-slate-900 tracking-tight">
            {currentMonthName}
          </h4>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg mr-2 leading-none">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>Clinic Hours: 9 AM - 5 PM (Mon - Fri)</span>
            </div>
            
            <button 
              id="prev-month-btn"
              onClick={() => alert("Calendar archives only available for active billing month (June 2026).")}
              className="p-1 px-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-700 transition-colors shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              id="next-month-btn"
              onClick={() => alert("Slots beyond June 2026 are currently locked. Contact support for extension.")}
              className="p-1 px-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-700 transition-colors shrink-0"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Day of week labels */}
        <div className="grid grid-cols-7 text-center border-b border-slate-100 bg-slate-50/20 text-[10px] text-slate-400 font-bold uppercase tracking-widest py-3">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Date cell grids */}
        <div className="grid grid-cols-7 grid-rows-5 divide-x divide-y divide-slate-100 min-h-[500px]">
          {calendarDays.map((day, idx) => {
            const dayAppts = getAppointmentsForDate(day.dateStr);
            const isToday = day.dateStr === "2026-06-10";
            
            return (
              <div 
                id={`cal-cell-${day.dateStr}`}
                key={idx} 
                className={`p-2.5 flex flex-col justify-between transition-all relative ${getDayColor(day.dateStr, day.isCurrentMonth)}`}
              >
                {/* Cell Header: Day number */}
                <div className="flex items-start justify-between">
                  <span className={`text-[11px] font-bold ${
                    isToday ? 'text-blue-600 font-extrabold text-xs' : 
                    day.isCurrentMonth ? 'text-slate-700' : 'text-slate-300'
                  }`}>
                    {day.dayNum}
                  </span>
                  
                  {isToday && (
                    <span className="text-[8px] bg-blue-600 text-white font-extrabold uppercase rounded-md px-1 py-0.5 scale-90">Today</span>
                  )}
                </div>

                {/* Patient capsule list */}
                <div className="mt-1.5 flex-1 overflow-y-auto space-y-1 scrollbar-none max-h-24">
                  {dayAppts.map((app) => {
                    const statusLower = app.Status.toLowerCase();
                    const pillColor = 
                      statusLower === 'confirmed' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100/80 hover:border-emerald-300' :
                      statusLower === 'completed' ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100/80 hover:border-blue-300' :
                      statusLower === 'pending' ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100/80 hover:border-amber-300' :
                      'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100/80 hover:border-purple-300';

                    return (
                      <button
                        id={`cal-appt-slot-${app.Appointment_ID}`}
                        key={app.Appointment_ID}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApp(app);
                        }}
                        className={`w-full text-left p-1 text-[9px] font-extrabold border rounded-md px-1.5 truncate transition-all flex items-center justify-between group/pill cursor-pointer select-none ${pillColor}`}
                        title={`${app.Patient_Name} - ${app.Issue}`}
                      >
                        <span className="truncate max-w-[70%]">{app.Patient_Name}</span>
                        <span className="font-mono scale-90 opacity-70 flex-shrink-0">{formatTimeOnly(app.Appointment_DateTime)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Click Modal Viewer */}
      {selectedApp && (
        <div id="calendar-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            id="calendar-modal-backdrop"
            onClick={() => setSelectedApp(null)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs animate-fade-in"
          />

          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl relative z-10 p-6 border border-slate-200 animate-scale-up">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scheduled Timing</h4>
                  <p className="text-sm font-black text-slate-900 mt-0.5">{formatTimeOnly(selectedApp.Appointment_DateTime)}</p>
                </div>
              </div>

              <button 
                id="close-calendar-modal"
                onClick={() => setSelectedApp(null)}
                className="p-1 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl shadow-3xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Patient Name</span>
                <p className="text-sm font-extrabold text-[#0B1F3A] mt-0.5">{selectedApp.Patient_Name}</p>
                <p className="text-xs font-mono text-slate-500 mt-1">{selectedApp.Phone}</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl shadow-3xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Reason / Issue</span>
                <span className="block text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 inline-block mt-1 rounded-md">
                  {selectedApp.Issue}
                </span>
              </div>

              {selectedApp.Notes && (
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-500 italic leading-relaxed">
                  {selectedApp.Notes}
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <StatusBadge status={selectedApp.Status} type="appointment" />
              
              <button
                id="cal-modal-view-details"
                onClick={() => {
                  alert(`Accessing ledger file for patient ID ${selectedApp.Lead_ID}`);
                  setSelectedApp(null);
                }}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 hover:shadow-md text-white font-bold text-[10px] rounded-xl transition-all"
              >
                Full Profile Ledger
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
