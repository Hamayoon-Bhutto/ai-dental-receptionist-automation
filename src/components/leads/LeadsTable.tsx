import React, { useState } from 'react';
import { Lead } from '../../types';
import StatusBadge from '../shared/StatusBadge';
import { formatDateTime, formatShortDate } from '../../lib/utils';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Eye, 
  PhoneCall, 
  FileText,
  Calendar,
  CheckCircle,
  Hash
} from 'lucide-react';
import EmptyState from '../shared/EmptyState';

interface LeadsTableProps {
  leads: Lead[];
  onTriggerCall: (leadId: string) => void;
  onViewDetails: (lead: Lead) => void;
  onViewCallLog: (callId: string) => void;
  onViewAppointment: (leadId: string) => void;
  onResolveLead: (leadId: string) => void;
}

type StatusFilter = 'all' | Lead['Status'];

export default function LeadsTable({
  leads,
  onTriggerCall,
  onViewDetails,
  onViewCallLog,
  onViewAppointment,
  onResolveLead
}: LeadsTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  
  // Sort leads: newest first
  const sortedLeads = [...leads].sort(
    (a, b) => new Date(b.Created_At).getTime() - new Date(a.Created_At).getTime()
  );

  // Filter leads
  const filteredLeads = sortedLeads.filter(lead => {
    const query = search.toLowerCase();
    const matchesSearch = 
      lead.name.toLowerCase().includes(query) ||
      lead.Phone.includes(query) ||
      lead.Email.toLowerCase().includes(query) ||
      lead.Issue.toLowerCase().includes(query) ||
      lead.Lead_ID.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'all' || lead.Status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statuses: { label: string; value: StatusFilter }[] = [
    { label: 'All Statuses', value: 'all' },
    { label: 'New', value: 'new' },
    { label: 'Calling', value: 'calling' },
    { label: 'Contacted', value: 'contacted' },
    { label: 'Booked', value: 'booked' },
    { label: 'No Answer', value: 'not_answered' },
    { label: 'Failed Connection', value: 'failed' },
    { label: 'Cancelled', value: 'cancelled' }
  ];

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden select-none">
      {/* Table search & filter header controls */}
      <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="leads-search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name, phone, issues..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-700"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto text-[11px] font-bold">
          <span className="text-slate-400 shrink-0 text-xs font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter by:
          </span>
          <div className="flex gap-1.5 scrollbar-none">
            {statuses.map((item) => (
              <button
                id={`leads-filter-btn-${item.value}`}
                key={item.value}
                onClick={() => setStatusFilter(item.value)}
                className={`px-3 py-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                  statusFilter === item.value
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table UI */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50/20">
              <th className="py-4 px-6">Lead ID</th>
              <th className="py-4 px-6">Patient Name</th>
              <th className="py-4 px-6">Contact Info</th>
              <th className="py-4 px-6">Dental Concern</th>
              <th className="py-4 px-6">Preferred Time</th>
              <th className="py-4 px-6 text-center">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredLeads.map((lead) => (
              <tr 
                id={`leads-table-row-${lead.Lead_ID}`}
                key={lead.Lead_ID} 
                className={`hover:bg-slate-50/50 transition-colors ${lead.Status === 'calling' ? 'bg-sky-50/10' : ''}`}
              >
                {/* ID */}
                <td className="py-4 px-6 font-mono font-bold text-slate-400">
                  {lead.Lead_ID}
                </td>

                {/* Name */}
                <td className="py-4 px-6">
                  <span className="font-bold text-slate-800 block text-sm">{lead.name}</span>
                  <span className="text-[10px] text-slate-400 font-medium">Telegram source</span>
                </td>

                {/* Contact */}
                <td className="py-4 px-6">
                  <span className="font-mono text-slate-700 block font-medium">{lead.Phone}</span>
                  <span className="text-[10px] text-slate-400 font-medium block lowercase">{lead.Email}</span>
                </td>

                {/* Dental Concern */}
                <td className="py-4 px-6">
                  <span className="px-2 py-1 bg-slate-100/60 text-slate-700 font-semibold rounded-lg text-[11px] inline-block shadow-3xs">
                    {lead.Issue}
                  </span>
                </td>

                {/* Preferred time */}
                <td className="py-4 px-6 text-slate-600 font-medium">
                  {formatShortDate(lead.Preferred_DateTime)} at <span className="text-slate-900 font-bold">{formatDateTime(lead.Preferred_DateTime).split('at')[1]}</span>
                </td>

                {/* Status Badge */}
                <td className="py-4 px-6 text-center">
                  <StatusBadge status={lead.Status} type="lead" />
                </td>

                {/* Actions */}
                <td className="py-4 px-6 text-right space-x-1 whitespace-nowrap">
                  <button
                    id={`lead-btn-view-${lead.Lead_ID}`}
                    onClick={() => onViewDetails(lead)}
                    className="p-1 px-2.5 bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-[10px] font-bold transition-all inline-flex items-center gap-1 shadow-3xs"
                    title="View details details"
                  >
                    <Eye className="w-3 h-3 text-slate-400" />
                    <span>Details</span>
                  </button>

                  {lead.Status === 'new' && (
                    <button
                      id={`lead-btn-call-${lead.Lead_ID}`}
                      onClick={() => onTriggerCall(lead.Lead_ID)}
                      className="p-1 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold transition-all shadow-xs inline-flex items-center gap-1 active:scale-95 animate-pulse"
                      title="Trigger automated phone call now"
                    >
                      <Sparkles className="w-3 h-3 fill-white" />
                      <span>Call AI</span>
                    </button>
                  )}

                  {lead.Retell_Call_ID && (
                    <button
                      id={`lead-btn-log-${lead.Lead_ID}`}
                      onClick={() => onViewCallLog(lead.Retell_Call_ID)}
                      className="p-1 px-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg text-[10px] font-bold transition-all inline-flex items-center gap-1 shadow-3xs"
                      title="Open transcript & audio recording"
                    >
                      <FileText className="w-3 h-3 text-purple-400" />
                      <span>Call Log</span>
                    </button>
                  )}

                  {lead.Status === 'booked' && (
                    <button
                      id={`lead-btn-appt-${lead.Lead_ID}`}
                      onClick={() => onViewAppointment(lead.Lead_ID)}
                      className="p-1 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-[10px] font-bold transition-all inline-flex items-center gap-1 shadow-3xs"
                      title="View active calendar booking Details"
                    >
                      <Calendar className="w-3 h-3 text-emerald-500" />
                      <span>Booking</span>
                    </button>
                  )}

                  {['new', 'calling', 'contacted', 'not_answered'].includes(lead.Status) && (
                    <button
                      id={`lead-btn-resolve-${lead.Lead_ID}`}
                      onClick={() => onResolveLead(lead.Lead_ID)}
                      className="p-1 px-1.5 bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg text-[10px] transition-all"
                      title="Close/Resolve Manual Lead"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLeads.length === 0 && (
          <EmptyState
            title="No Leads Found"
            description="Adjust your filters or look for another search query term."
            icon={Search}
          />
        )}
      </div>
    </div>
  );
}
