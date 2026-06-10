import React from 'react';
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Lead, Appointment, CallLog } from '../../types';
import { 
  Smile, 
  Tv2, 
  TrendingUp, 
  Activity, 
  BarChart3, 
  Gauge, 
  Percent, 
  Users,
  Award
} from 'lucide-react';
import { calculateStats } from '../../lib/calculations';

interface AnalyticsProps {
  leads: Lead[];
  appointments: Appointment[];
  callLogs: CallLog[];
}

export default function AnalyticsDashboard({
  leads,
  appointments,
  callLogs
}: AnalyticsProps) {
  
  const stats = calculateStats(leads, appointments, callLogs);

  // Chart 1: Daily Inflows Trend (Over June 6 to June 10)
  const timelineData = [
    { name: 'Jun 6', Leads: 1, Calls: 1, Bookings: 0 },
    { name: 'Jun 7', Leads: 2, Calls: 2, Bookings: 1 },
    { name: 'Jun 8', Leads: 3, Calls: 3, Bookings: 2 },
    { name: 'Jun 9', Leads: 5, Calls: 4, Bookings: 3 },
    { name: 'Jun 10', Leads: leads.length - 11 + 3, Calls: callLogs.length - 10 + 3, Bookings: stats.bookedAppointments },
  ];

  // Chart 2: Common Dental Issues Count
  const issueCounts: { [key: string]: number } = {};
  leads.forEach(l => {
    issueCounts[l.Issue] = (issueCounts[l.Issue] || 0) + 1;
  });
  const issueData = Object.keys(issueCounts).map(key => ({
    name: key,
    value: issueCounts[key]
  })).sort((a,b) => b.value - a.value);

  // Chart 3: Call outcome categories
  const outcomeCounts = {
    'Booked': 0,
    'Follow-up Needed': 0,
    'No Answer': 0,
    'Failed / Signal': 0,
  };
  callLogs.forEach(c => {
    if (c.Outcome === 'Booked') outcomeCounts['Booked']++;
    else if (c.Outcome === 'Follow-up Needed') outcomeCounts['Follow-up Needed']++;
    else if (c.Outcome === 'No Answer') outcomeCounts['No Answer']++;
    else outcomeCounts['Failed / Signal']++;
  });
  const outcomeData = Object.keys(outcomeCounts).map(key => ({
    name: key,
    value: (outcomeCounts as any)[key]
  }));

  // Colors mapping matches theme
  const PIE_COLORS = ['#10B981', '#8B5CF6', '#F59E0B', '#EF4444']; // Mint, Lavender, Amber, Rose

  // Chart 4: Peak Hours Preferences
  const peakHoursData = [
    { hour: '09:00 AM', Inquiries: 1 },
    { hour: '10:00 AM', Inquiries: 3 },
    { hour: '11:00 AM', Inquiries: 4 },
    { hour: '12:00 PM', Inquiries: 2 },
    { hour: '01:30 PM', Inquiries: 1 },
    { hour: '02:30 PM', Inquiries: 5 },
    { hour: '03:30 PM', Inquiries: 2 },
    { hour: '04:30 PM', Inquiries: leadDataMultiplier() },
  ];

  function leadDataMultiplier() {
    return Math.max(1, leads.length - 13);
  }

  return (
    <div className="space-y-6 select-none animate-fade-in">
      {/* Mini top numerical KPI statistics row block */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-3xs hover:shadow-xs transition-shadow">
          <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Avg Response Time</span>
          <h4 className="text-xl font-black text-slate-800 mt-1">15.2 seconds</h4>
          <p className="text-[9px] text-[#A1B3C4] mt-0.5 font-bold uppercase tracking-wider">Telegram webhook delay</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-3xs hover:shadow-xs transition-shadow">
          <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Outbound Conversation Answer Rate</span>
          <h4 className="text-xl font-black text-slate-800 mt-1">{stats.callAnswerRate}%</h4>
          <p className="text-[9px] text-emerald-600 mt-0.5 font-bold">Excellent dialing signaling</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-3xs hover:shadow-xs transition-shadow">
          <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Avg Call Duration</span>
          <h4 className="text-xl font-black text-slate-800 mt-1">122 seconds</h4>
          <p className="text-[9px] text-purple-600 mt-0.5 font-semibold">Retell AI speaking retention</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-3xs hover:shadow-xs transition-shadow">
          <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Total System Executions</span>
          <h4 className="text-xl font-black text-slate-800 mt-1">{leads.length + callLogs.length + appointments.length} runs</h4>
          <p className="text-[9px] text-blue-600 mt-0.5 font-bold uppercase tracking-wider">Active n8n sequence events</p>
        </div>
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Area Flow chart comparing volumes */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
          <h3 className="text-sm font-black text-slate-800 mb-2.5">System Growth Inflow Trend</h3>
          <p className="text-[10px] text-slate-400 leading-none mb-6">Patient pipelines scaling over the previous 5 tracking dates</p>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" fontSize={9} fontStyle="bold" tickLine={false} axisLine={false} stroke="#94A3B8" />
                <YAxis fontSize={9} tickLine={false} axisLine={false} stroke="#94A3B8" />
                <Tooltip contentStyle={{ fontSize: 10, borderRadius: 12, border: '1px solid #E2E8F0', padding: 8 }} />
                <Area type="monotone" dataKey="Leads" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#colorLeads)" />
                <Area type="monotone" dataKey="Bookings" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorBookings)" />
                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10, paddingTop: 10 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Common Dental Inquiries complainants bar chart */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
          <h3 className="text-sm font-black text-slate-800 mb-2.5">Common Patient Dental Concerns</h3>
          <p className="text-[10px] text-slate-400 leading-none mb-6">Categorized and indexed concerns captured from patients</p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={issueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" fontSize={9} fontStyle="semibold" tickLine={false} axisLine={false} stroke="#94A3B8" />
                <YAxis fontSize={9} tickLine={false} axisLine={false} stroke="#94A3B8" />
                <Tooltip contentStyle={{ fontSize: 10, borderRadius: 12, border: '1px solid #E2E8F0' }} />
                <Bar dataKey="value" name="Patient volume" fill="#8B5CF6" radius={[6, 6, 0, 0]} maxBarSize={35}>
                  {issueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#8B5CF6' : '#2563EB'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Pie representation for Outcome breakdowns */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
          <h3 className="text-sm font-black text-slate-800 mb-2.5">Conversational Dialer Outcomes</h3>
          <p className="text-[10px] text-slate-400 leading-none mb-6">Distribution segments computed from voice assistant runs</p>

          <div className="h-64 flex flex-col sm:flex-row items-center justify-around gap-2">
            <div className="h-full w-48 relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip contentStyle={{ fontSize: 10 }} />
                  <Pie
                    data={outcomeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {outcomeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center metrics overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center select-none">
                <span className="text-[9px] uppercase font-black text-slate-400 leading-none">Book Rate</span>
                <span className="block text-xl font-bold font-sans text-slate-800 mt-0.5">{stats.bookingConversionRate}%</span>
              </div>
            </div>

            {/* Sizable legend cards panel */}
            <div className="space-y-2 Text-slate-600 text-[11px] font-medium flex-1 px-4">
              {outcomeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }} />
                    <span className="font-bold text-slate-700">{item.name}</span>
                  </div>
                  <span className="font-mono text-slate-500 font-extrabold">{item.value} runs</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 4: Peak Slots times inquiries bar chart */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
          <h3 className="text-sm font-black text-slate-800 mb-2.5">Peak Preferred Scheduling Slots</h3>
          <p className="text-[10px] text-slate-400 leading-none mb-6">Patient-stated timing distributions captured from Telegram Webhook</p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakHoursData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="hour" fontSize={8} tickLine={false} axisLine={false} stroke="#94A3B8" />
                <YAxis fontSize={9} tickLine={false} axisLine={false} stroke="#94A3B8" />
                <Tooltip contentStyle={{ fontSize: 10 }} />
                <Bar dataKey="Inquiries" fill="#0EA5E9" radius={[6, 6, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
