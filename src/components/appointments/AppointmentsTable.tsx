import React, { useState } from 'react';
import { Appointment } from '../../types';
import StatusBadge from '../shared/StatusBadge';
import { formatDateTime, formatShortDate, formatTimeOnly } from '../../lib/utils';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Calendar, 
  Clock, 
  Plus, 
  FileText, 
  X,
  FileSpreadsheet,
  CheckCircle,
  AlertOctagon,
  ChevronsUpDown,
  Phone
} from 'lucide-react';
import EmptyState from '../shared/EmptyState';

interface AppointmentsTableProps {
  appointments: Appointment[];
  onUpdateStatus: (apptId: string, newStatus: Appointment['Status']) => void;
}

export default function AppointmentsTable({
  appointments,
  onUpdateStatus
}: AppointmentsTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'upcoming' | 'past'>('all');
  
  // Drawer state
  const [activeAppt, setActiveAppt] = useState<Appointment | null>(null);

  // Sorting: today first, then upcoming, newest scheduled first
  const sortedAppts = [...appointments].sort((a, b) => {
    // Wed Jun 10, 2026 is today's datum
    const dateA = new Date(a.Appointment_DateTime).getTime();
    const dateB = new Date(b.Appointment_DateTime).getTime();
    return dateA - dateB; // Chronological order
  });

  // Filter schedules
  const filteredAppts = sortedAppts.filter(app => {
    const query = search.toLowerCase();
    const matchesSearch = 
      app.Patient_Name.toLowerCase().includes(query) ||
      app.Phone.includes(query) ||
      app.Issue.toLowerCase().includes(query) ||
      app.Appointment_ID.toLowerCase().includes(query) ||
      app.Notes.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'all' || app.Status === statusFilter;

    // Dates matching (Today is "2026-06-10")
    const isToday = app.Appointment_DateTime.includes('2026-06-10');
    const apptDate = new Date(app.Appointment_DateTime);
    const todayEnd = new Date('2026-06-10T23:59:59Z');
    
    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = isToday;
    } else if (dateFilter === 'upcoming') {
      matchesDate = apptDate.getTime() > todayEnd.getTime();
    } else if (dateFilter === 'past') {
      matchesDate = apptDate.getTime() < new Date('2026-06-10T00:00:00Z').getTime();
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const apptStatuses = ['Confirmed', 'Pending', 'Completed', 'Cancelled', 'Rescheduled', 'No Show'];

  const triggerGoogleCalendarLink = (eventId: string, patientName: string) => {
    alert(
      `Redirecting to Google Calendar...\n` +
      `Viewing event ID: ${eventId}\n` +
      `Subject: Dental Treatment slot for ${patientName}`
    );
  };

  return (
    <div className="space-y-6 select-none">
      {/* Search and filters blocks */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="appts-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patients, issues, ID, notes..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-700"
            />
          </div>

          {/* Quick timing selector */}
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100/80 rounded-xl text-[10px] font-bold">
            {(['all', 'today', 'upcoming', 'past'] as const).map((opt) => (
              <button
                id={`appts-date-filter-${opt}`}
                key={opt}
                onClick={() => setDateFilter(opt)}
                className={`py-1.5 rounded-lg text-center uppercase tracking-wide transition-all font-sans cursor-pointer ${
                  dateFilter === opt 
                    ? 'bg-white text-slate-900 shadow-sm font-semibold' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Status Dropdown */}
          <div>
            <select
              id="appts-status-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-700 font-bold"
            >
              <option value="all">🗓️ All Statuses</option>
              {apptStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50/20">
                <th className="py-4 px-6 w-24">Booking ID</th>
                <th className="py-4 px-6 font-bold">Patient Details</th>
                <th className="py-4 px-6">Assigned Issue</th>
                <th className="py-4 px-6 text-center">Timing Info</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6">GCal Event ID</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredAppts.map((app) => {
                const isToday = app.Appointment_DateTime.includes('2026-06-10');
                
                return (
                  <tr 
                    id={`appt-row-${app.Appointment_ID}`}
                    key={app.Appointment_ID}
                    className={`hover:bg-slate-50/50 transition-colors ${
                      isToday && app.Status !== 'Cancelled'
                        ? 'bg-emerald-50/10 border-l-4 border-l-emerald-500'
                        : ''
                    }`}
                  >
                    {/* ID */}
                    <td className="py-4 px-6 font-mono text-slate-400 font-bold">
                      {app.Appointment_ID}
                    </td>

                    {/* Patient */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm block">{app.Patient_Name}</span>
                        {isToday && app.Status !== 'Cancelled' && (
                          <span className="text-[8px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-md font-extrabold uppercase tracking-wide animate-pulse">
                            Today
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 block mt-0.5">{app.Phone}</span>
                    </td>

                    {/* Issue */}
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs">
                        {app.Issue}
                      </span>
                    </td>

                    {/* DateTime */}
                    <td className="py-4 px-6 text-center">
                      <div className="font-bold text-slate-800">{formatShortDate(app.Appointment_DateTime)}</div>
                      <div className="font-mono text-[10px] font-bold text-blue-600 mt-0.5">{formatTimeOnly(app.Appointment_DateTime)}</div>
                    </td>

                    {/* Status badge */}
                    <td className="py-4 px-6 text-center">
                      <StatusBadge status={app.Status} type="appointment" />
                    </td>

                    {/* Calendar link code */}
                    <td className="py-4 px-6">
                      {app.Calendar_Event_ID ? (
                        <button
                          id={`appt-gcal-link-${app.Appointment_ID}`}
                          onClick={() => triggerGoogleCalendarLink(app.Calendar_Event_ID, app.Patient_Name)}
                          className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg flex items-center gap-1 hover:bg-blue-100 transition-colors shrink-0"
                        >
                          <span>{app.Calendar_Event_ID}</span>
                          <ExternalLink className="w-3 h-3 text-blue-500" />
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-semibold italic bg-slate-50 p-1 px-1.5 border border-slate-100 rounded-lg">Sync pending</span>
                      )}
                    </td>

                    {/* Actions dropdown simulated list */}
                    <td className="py-4 px-6 text-right whitespace-nowrap space-x-1">
                      <button
                        id={`appt-btn-view-${app.Appointment_ID}`}
                        onClick={() => setActiveAppt(app)}
                        className="p-1 px-2.5 bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-lg text-[10px] font-bold transition-all shadow-3xs hover:bg-slate-100"
                      >
                        Details
                      </button>

                      <select
                        id={`appt-status-changer-${app.Appointment_ID}`}
                        value={app.Status}
                        onChange={(e) => onUpdateStatus(app.Appointment_ID, e.target.value as Appointment['Status'])}
                        className="p-1 border border-slate-200 rounded-lg text-[10px] text-slate-600 bg-white font-bold"
                      >
                        {apptStatuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredAppts.length === 0 && (
            <EmptyState
              title="No Appointments Found"
              description="Check query filters or timing selectors."
              icon={Calendar}
            />
          )}
        </div>
      </div>

      {/* Appointment Detail Overlay Modal Sheets Drawer */}
      {activeAppt && (
        <div id="appointment-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          <div 
            id="appointment-modal-backdrop"
            onClick={() => setActiveAppt(null)}
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs animate-fade-in"
          />

          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative z-10 flex flex-col justify-between border border-slate-200 animate-scale-up">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-3xl">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Appointment Ledger Details</h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">Booking ID: {activeAppt.Appointment_ID}</p>
                </div>
              </div>

              <button
                id="close-appt-modal"
                onClick={() => setActiveAppt(null)}
                className="p-1.5 border border-slate-200 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              {/* Profile card widgets */}
              <div className="bg-slate-50/60 p-4 rounded-2xl border border-slate-100 space-y-3 shadow-3xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Patient Name</h4>
                    <p className="text-sm font-extrabold text-slate-900 mt-1">{activeAppt.Patient_Name}</p>
                  </div>
                  <StatusBadge status={activeAppt.Status} type="appointment" />
                </div>
                
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/50 text-[11px] font-bold">
                  <div>
                    <span className="text-[9px] text-slate-400 block">Phone Line</span>
                    <a href={`tel:${activeAppt.Phone}`} className="text-slate-700 flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                      {activeAppt.Phone}
                    </a>
                  </div>

                  <div>
                    <span className="text-[9px] text-slate-400 block">Email Address</span>
                    <span className="text-slate-700 block truncate">{activeAppt.Email || 'No Email'}</span>
                  </div>
                </div>
              </div>

              {/* Treatment Timing details */}
              <div className="space-y-1.5 border-t border-slate-100 pt-3 text-xs">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Calendar Booking timings</span>
                <div className="flex items-center gap-2 bg-blue-50/50 border border-blue-100/40 p-3 rounded-xl">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <div>
                    <span className="font-bold text-slate-800">{formatDateTime(activeAppt.Appointment_DateTime)}</span>
                    <span className="block text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">Dentist Name: Dr. Harris (Room 12)</span>
                  </div>
                </div>
              </div>

              {/* Treatment Concern notes */}
              <div className="space-y-1.5 border-t border-slate-100 pt-3 text-xs">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Stated Dental Concern & Clinical notes</span>
                <div className="p-3 bg-white border border-slate-100 rounded-xl max-h-24 overflow-y-auto leading-relaxed shadow-3xs font-medium">
                  <div className="font-bold text-slate-800 mb-1">Stated: <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">{activeAppt.Issue}</span></div>
                  <div className="text-[11px] text-slate-500 bg-slate-50/50 p-2 border border-slate-100 mt-2 rounded-lg leading-relaxed italic">{activeAppt.Notes || "No doctor clinical notes or pre-diagnostic memos recorded."}</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 rounded-b-3xl flex items-center justify-between">
              <span className="text-[9px] font-mono text-slate-400">Created At: {formatDateTime(activeAppt.Created_At).split('at')[0]}</span>
              
              {activeAppt.Calendar_Event_ID && (
                <button
                  id="modal-gcal-link-action"
                  onClick={() => triggerGoogleCalendarLink(activeAppt.Calendar_Event_ID, activeAppt.Patient_Name)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-blue-100 active:scale-95"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Calendar event
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
