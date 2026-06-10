/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import { NavTab } from './components/layout/Sidebar';
import { 
  getLeads, 
  getAppointments, 
  getCallLogs, 
  getIntegrations,
  saveLeads,
  saveAppointments,
  saveCallLogs,
  saveIntegrations,
  simulateAIVoiceCall,
  initializeDatabase,
  restoreOriginalDemoData
} from './lib/api';
import { calculateStats } from './lib/calculations';
import { Lead, Appointment, CallLog } from './types';

// Shared Components
import PageHeader from './components/shared/PageHeader';
import KPICard from './components/shared/KPICard';
import LoadingSkeleton from './components/shared/LoadingSkeleton';

// Lucide
import { 
  Users, 
  Inbox, 
  PhoneOutgoing, 
  CheckCircle2, 
  CalendarCheck, 
  Clock, 
  Layers, 
  PhoneMissed,
  Sparkles,
  PhoneCall,
  RefreshCw,
  PlusCircle,
  TrendingUp,
  Sliders,
  Calendar,
  AlertTriangle
} from 'lucide-react';

// Page Views
import AutomationHealth from './components/dashboard/AutomationHealth';
import ConversionFunnel from './components/dashboard/ConversionFunnel';
import { 
  LatestTelegramLeads, 
  TodayAppointments, 
  RecentAICallLogs 
} from './components/dashboard/ActivityPanels';

import LeadsTable from './components/leads/LeadsTable';
import LeadDetailDrawer from './components/leads/LeadDetailDrawer';
import CallLogsTable from './components/calls/CallLogsTable';
import AppointmentsTable from './components/appointments/AppointmentsTable';
import CalendarView from './components/calendar/CalendarView';
import FollowUpBoard from './components/followups/FollowUpBoard';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';
import IntegrationsView from './components/integrations/IntegrationsView';
import SettingsForm from './components/settings/SettingsForm';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [isSyncing, setIsSyncing] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  
  // Real database states
  const [leads, setLeads] = useState<Lead[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [integrations, setIntegrations] = useState([]);
  const [apiError, setApiError] = useState<string | null>(null);

  // Detail sheets triggers
  const [selectedLeadForDrawer, setSelectedLeadForDrawer] = useState<Lead | null>(null);

  // Initial Load
  useEffect(() => {
    const init = async () => {
      initializeDatabase();
      setIsSyncing(true);
      await refreshLocalStates();
      setIsSyncing(false);
    };
    init();
  }, []);

  // Set up automatic 30-second polling refresh sync!
  useEffect(() => {
    const interval = setInterval(() => {
      triggerBackgroundSync();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const refreshLocalStates = async () => {
    try {
      const [leadsData, appsData, logsData] = await Promise.all([
        getLeads(),
        getAppointments(),
        getCallLogs()
      ]);
      setLeads(leadsData);
      setAppointments(appsData);
      setCallLogs(logsData);
      setIntegrations(getIntegrations() as any);
      setApiError(null);
    } catch (err: any) {
      console.error("API Fetch Error:", err);
      setApiError(err?.message || "Failed to fetch datasets from n8n endpoints.");
    }
  };

  const triggerBackgroundSync = async () => {
    setIsSyncing(true);
    setApiError(null);
    try {
      const [leadsData, appsData, logsData] = await Promise.all([
        getLeads(),
        getAppointments(),
        getCallLogs()
      ]);
      setLeads(leadsData);
      setAppointments(appsData);
      setCallLogs(logsData);
      setIntegrations(getIntegrations() as any);
    } catch (err: any) {
      console.error("Sync error:", err);
      setApiError("Using offline cached data. Failed to reach n8n webhook API endpoints.");
    } finally {
      setIsSyncing(false);
    }
  };

  // Simulated Voice Call Pipeline n8n -> Retell
  const handleStartSimulatedCall = (leadId: string) => {
    simulateAIVoiceCall(leadId, (refreshedLeads, refreshedApps, refreshedLogs) => {
      setLeads(refreshedLeads);
      setAppointments(refreshedApps);
      setCallLogs(refreshedLogs);
      
      // If a lead details drawer is currently open for this, update it dynamically in state!
      if (selectedLeadForDrawer && selectedLeadForDrawer.Lead_ID === leadId) {
        const found = refreshedLeads.find(l => l.Lead_ID === leadId);
        if (found) setSelectedLeadForDrawer(found);
      }
    });

    // Temporarily switch active tab to Calls so the user can watch the "calling" pulse and completed log appear!
    setActiveTab('calls');
  };

  const handleResolveLeadStatus = (leadId: string) => {
    const updated = leads.map(l => {
      if (l.Lead_ID === leadId) {
        return { ...l, Status: 'booked' as const, Updated_At: new Date().toISOString() };
      }
      return l;
    });
    saveLeads(updated);
    setLeads(updated);
  };

  const handleResolveFollowUp = (leadId: string) => {
    const updatedLeads = leads.map(l => {
      if (l.Lead_ID === leadId) {
        return { ...l, Status: 'booked' as const, Updated_At: new Date().toISOString() };
      }
      return l;
    });
    saveLeads(updatedLeads);
    setLeads(updatedLeads);
  };

  const handleUpdateAppointmentStatus = (apptId: string, newStatus: Appointment['Status']) => {
    const updatedApps = appointments.map(a => {
      if (a.Appointment_ID === apptId) {
        return { ...a, Status: newStatus };
      }
      return a;
    });
    saveAppointments(updatedApps);
    setAppointments(updatedApps);
  };

  const handleCreateAppointmentManually = (lead: Lead) => {
    const newAppId = `A-${500 + appointments.length + 1}`;
    const newApp: Appointment = {
      Appointment_ID: newAppId,
      Lead_ID: lead.Lead_ID,
      Patient_Name: lead.name,
      Phone: lead.Phone,
      Email: lead.Email,
      Issue: lead.Issue,
      Appointment_DateTime: lead.Preferred_DateTime || new Date().toISOString(),
      Calendar_Event_ID: `gcal_evt_man_${Math.random().toString(36).substr(2, 6)}`,
      Status: 'Confirmed',
      Created_At: new Date().toISOString(),
      Notes: "Booked manually by Admin override on Follow-up board."
    };
    
    const updatedApps = [newApp, ...appointments];
    saveAppointments(updatedApps);
    setAppointments(updatedApps);

    const updatedLeads = leads.map(l => {
      if (l.Lead_ID === lead.Lead_ID) {
        return { ...l, Status: 'booked' as const, Updated_At: new Date().toISOString() };
      }
      return l;
    });
    saveLeads(updatedLeads);
    setLeads(updatedLeads);

    alert(`Manual slot override successfully registered in Google Calendar for ${lead.name}!`);
  };

  const createDummyDemoLead = () => {
    const newId = `L-${100 + leads.length + 1}`;
    const names = ["Zafar Iqbal", "Kiran Shah", "Adnan Malik", "Shazia Parveen", "Waseem Jutt"];
    const issues = ["Tooth pain", "Teeth cleaning", "Whitening", "Root canal inquiry", "Emergency toothache"];
    const phones = ["+92 315 2221144", "+92 323 8887755", "+92 305 4441113", "+92 346 9900112", "+92 331 4455667"];
    
    const chosenName = names[Math.floor(Math.random() * names.length)];
    const chosenIssue = issues[Math.floor(Math.random() * issues.length)];
    const chosenPhone = phones[Math.floor(Math.random() * phones.length)];

    const newLead: Lead = {
      Lead_ID: newId,
      name: chosenName,
      Phone: chosenPhone,
      Email: `${chosenName.toLowerCase().replace(' ', '.')}@gmail.com`,
      Issue: chosenIssue,
      Preferred_DateTime: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days in future
      Status: 'new',
      Retell_Call_ID: '',
      Created_At: new Date().toISOString(),
      Updated_At: new Date().toISOString()
    };

    const updated = [newLead, ...leads];
    saveLeads(updated);
    setLeads(updated);
    
    // Switch to Inbox
    setActiveTab('leads');
  };

  // Perform operational metrics calculations
  const stats = calculateStats(leads, appointments, callLogs);

  // Unresolved counts for red badges
  const unresolvedFollowUpsCount = leads.filter(
    l => ['not_answered', 'failed', 'cancelled'].includes(l.Status)
  ).length;

  const newLeadsCount = leads.filter(l => l.Status === 'new').length;

  // Global details mapping for drawer opening shortcuts
  const handleOpenLeadDetailsDrawer = (lead: Lead) => {
    setSelectedLeadForDrawer(lead);
  };

  const getRelatedCallLog = (leadId: string) => {
    return callLogs.find(c => c.Lead_ID === leadId) || null;
  };

  const getRelatedAppointment = (leadId: string) => {
    return appointments.find(a => a.Lead_ID === leadId) || null;
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onRefresh={triggerBackgroundSync}
      isSyncing={isSyncing}
      searchTerm={globalSearch}
      setSearchTerm={setGlobalSearch}
      unresolvedFollowUpsCount={unresolvedFollowUpsCount}
      newLeadsCount={newLeadsCount}
    >
      {isSyncing ? (
        <div className="space-y-6">
          <PageHeader
            title="Synchronizing Node pipelines..."
            subtitle="Fetching sheets datasets and polling current telephony triggers..."
          />
          <LoadingSkeleton />
        </div>
      ) : (
        <>
          {apiError && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-850 text-xs flex items-center justify-between gap-3 shadow-3xs animate-fade-in text-left">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="font-bold">Offline Sync Fallback:</span> {apiError}. Implemented Local Storage backup to preserve dashboard status.
                </div>
              </div>
              <button 
                id="dismiss-api-error-alert"
                onClick={() => setApiError(null)} 
                className="text-amber-550 hover:text-amber-800 font-bold px-2 py-1 select-none cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}
          {/* RENDER ACTIVE TAB PAGE */}
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in text-left">
              <PageHeader
                title="AI Receptionist CRM Dashboard"
                subtitle="Real-time clinic operations across Telegram leads, Retell calls, and appointment bookings."
                actions={
                  <>
                    <button
                      id="overview-quick-lead"
                      onClick={createDummyDemoLead}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-100 transition-all select-none cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add Sandbox Lead
                    </button>
                    
                    <button
                      id="overview-refresh-btn"
                      onClick={triggerBackgroundSync}
                      className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-3xs"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                      Sync System
                    </button>
                  </>
                }
              />

              {/* 8 Pastel KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
                <KPICard
                  id="total-leads"
                  label="Total Telegram Leads"
                  value={stats.totalLeads}
                  icon={Users}
                  bgColor="bg-sky-50"
                  iconColor="text-sky-600"
                  trend={{ value: "+24%", isUp: true, label: "vs last week" }}
                />

                <KPICard
                  id="new-leads"
                  label="New Unacted Leads"
                  value={stats.newLeads}
                  icon={Inbox}
                  bgColor="bg-blue-50"
                  iconColor="text-blue-600"
                  trend={{ value: "Hot", isUp: true, label: "leads pending" }}
                />

                <KPICard
                  id="calls-started"
                  label="AI Outbound Started"
                  value={stats.totalCalls}
                  icon={PhoneOutgoing}
                  bgColor="bg-purple-50"
                  iconColor="text-purple-600"
                  trend={{ value: `${stats.callAnswerRate}%`, isUp: true, label: "connect rate" }}
                />

                <KPICard
                  id="calls-completed"
                  label="Vocal Calls Completed"
                  value={stats.completedCalls}
                  icon={CheckCircle2}
                  bgColor="bg-emerald-50"
                  iconColor="text-emerald-500"
                  trend={{ value: "100%", isUp: true, label: "logged in GSheets" }}
                />

                <KPICard
                  id="appts-booked"
                  label="Appointments Booked"
                  value={stats.bookedAppointments}
                  icon={CalendarCheck}
                  bgColor="bg-emerald-100/60"
                  iconColor="text-emerald-700"
                  trend={{ value: "+12%", isUp: true, label: "GCal slots synced" }}
                />

                <KPICard
                  id="conv-rate"
                  label="Book Conversion Rate"
                  value={`${stats.bookingConversionRate}%`}
                  icon={TrendingUp}
                  bgColor="bg-violet-50"
                  iconColor="text-violet-600"
                  trend={{ value: "Target 40%", isUp: true, label: "conversion goal" }}
                />

                <KPICard
                  id="today-appts"
                  label="Today's Active Slots"
                  value={stats.todayAppointmentsCount}
                  icon={Clock}
                  bgColor="bg-indigo-50"
                  iconColor="text-indigo-600"
                  trend={{ value: "Wed", isUp: true, label: "June 10 schedules" }}
                />

                <KPICard
                  id="failed-calls"
                  label="Failed / Missed Calls"
                  value={stats.missedCalls}
                  icon={PhoneMissed}
                  bgColor="bg-rose-50"
                  iconColor="text-rose-600"
                  trend={{ value: "Follow-up", isUp: false, label: "enqueued retry" }}
                />
              </div>

              {/* Conversion Funnel & System health widgets */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ConversionFunnel 
                    totalLeads={stats.totalLeads} 
                    totalCalls={stats.totalCalls} 
                    completedCalls={stats.completedCalls} 
                    bookedAppointments={stats.bookedAppointments} 
                  />
                </div>
                <div>
                  <AutomationHealth />
                </div>
              </div>

              {/* Sub panels row: Latest Telegram leads, Today's appointments, recent call logs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <LatestTelegramLeads 
                  leads={leads} 
                  onTriggerCall={handleStartSimulatedCall} 
                  onViewLead={handleOpenLeadDetailsDrawer}
                  onNavigateToInbox={() => setActiveTab('leads')}
                />

                <TodayAppointments 
                  appointments={appointments} 
                  onViewAppointment={(app) => {
                    const matchedLead = leads.find(l => l.Lead_ID === app.Lead_ID);
                    if (matchedLead) handleOpenLeadDetailsDrawer(matchedLead);
                  }}
                  onNavigateToCalendar={() => setActiveTab('appointments')}
                />

                <RecentAICallLogs 
                  logs={callLogs} 
                  onViewLog={(log) => {
                    // Temporarily mapping views
                    setActiveTab('calls');
                  }}
                  onNavigateToLogs={() => setActiveTab('calls')}
                />
              </div>
            </div>
          )}

          {/* TAB 2: LEAD INBOX */}
          {activeTab === 'leads' && (
            <div className="space-y-6 animate-fade-in text-left">
              <PageHeader
                title="Telegram Leads Inbox"
                subtitle="Captured patient requests from Telegram bots, mapped directly to outbound voice automation queues."
                actions={
                  <button
                    id="inbox-add-lead"
                    onClick={createDummyDemoLead}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-100 transition-all select-none"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Simulate Inbound Telegram Lead
                  </button>
                }
              />

              <LeadsTable
                leads={leads}
                onTriggerCall={handleStartSimulatedCall}
                onViewDetails={handleOpenLeadDetailsDrawer}
                onViewCallLog={(callId) => {
                  setActiveTab('calls');
                }}
                onViewAppointment={(leadId) => {
                  setActiveTab('appointments');
                }}
                onResolveLead={handleResolveLeadStatus}
              />
            </div>
          )}

          {/* TAB 3: AI CALLS AUDIT */}
          {activeTab === 'calls' && (
            <div className="space-y-6 animate-fade-in text-left">
              <PageHeader
                title="Retell AI Vocal Audits"
                subtitle="Verbatim call recordings, dialog transcripts, and structured outcomes synced with Twilio custom lines."
              />

              <CallLogsTable logs={callLogs} />
            </div>
          )}

          {/* TAB 4: APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="space-y-6 animate-fade-in text-left">
              <PageHeader
                title="Google Calendar Bookings"
                subtitle="Confirmed dental slots checked against slot conflicts, written into Sheets ledger tabs instantly."
              />

              <AppointmentsTable 
                appointments={appointments} 
                onUpdateStatus={handleUpdateAppointmentStatus} 
              />
            </div>
          )}

          {/* TAB 5: CALENDAR VIEW */}
          {activeTab === 'calendar' && (
            <div className="space-y-6 animate-fade-in text-left">
              <PageHeader
                title="Operational Practice Grid"
                subtitle="Interactive month view of registered and confirmed treatment schedules during clinic hours."
              />

              <CalendarView appointments={appointments} />
            </div>
          )}

          {/* TAB 6: FOLLOW-UPS BOARD */}
          {activeTab === 'followups' && (
            <div className="space-y-6 animate-fade-in text-left">
              <PageHeader
                title="Urgency Follow-up Board"
                subtitle="Triage patients who missed outbound calls, canceled holds, or declared dental symptoms."
              />

              <FollowUpBoard
                leads={leads}
                appointments={appointments}
                callLogs={callLogs}
                onTriggerCall={handleStartSimulatedCall}
                onResolveFollowUp={handleResolveFollowUp}
                onCreateAppointment={handleCreateAppointmentManually}
              />
            </div>
          )}

          {/* TAB 7: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fade-in text-left">
              <PageHeader
                title="System Analytics and Metrics"
                subtitle="Performance counters indicating call connect speed, conversion rates, and standard oral issues."
              />

              <AnalyticsDashboard
                leads={leads}
                appointments={appointments}
                callLogs={callLogs}
              />
            </div>
          )}

          {/* TAB 8: INTEGRATIONS */}
          {activeTab === 'integrations' && (
            <div className="space-y-6 animate-fade-in text-left">
              <PageHeader
                title="Connected Automation Stack"
                subtitle="Manage state metrics, verify webhook authorizations, and inspect Twilio routing configs."
              />

              <IntegrationsView integrations={integrations} />
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in text-left">
              <PageHeader
                title="BrightSmile System Configuration"
                subtitle="Fine-tune dialogue triggers, doctor rosters, clinic durations, and webhook callback URLs."
              />

              <SettingsForm />
            </div>
          )}

          {/* LEAD DETAIL SHEET DRAWER */}
          {selectedLeadForDrawer && (
            <LeadDetailDrawer
              lead={selectedLeadForDrawer}
              onClose={() => setSelectedLeadForDrawer(null)}
              onTriggerCall={handleStartSimulatedCall}
              relatedCall={getRelatedCallLog(selectedLeadForDrawer.Lead_ID)}
              relatedAppt={getRelatedAppointment(selectedLeadForDrawer.Lead_ID)}
              onViewCall={(call) => {
                setSelectedLeadForDrawer(null);
                setActiveTab('calls');
              }}
              onViewAppt={(appt) => {
                setSelectedLeadForDrawer(null);
                setActiveTab('appointments');
              }}
            />
          )}
        </>
      )}
    </DashboardLayout>
  );
}
