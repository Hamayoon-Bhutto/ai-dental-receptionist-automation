import { Lead, Appointment, CallLog, IntegrationStatus } from '../types';
import { mockLeads, mockAppointments, mockCallLogs, mockIntegrations } from './mockData';

// Storage keys
const LEADS_KEY = 'brightsmile_leads';
const APPS_KEY = 'brightsmile_appointments';
const LOGS_KEY = 'brightsmile_call_logs';
const INT_KEY = 'brightsmile_integrations';

export function initializeDatabase() {
  if (!localStorage.getItem(LEADS_KEY)) {
    localStorage.setItem(LEADS_KEY, JSON.stringify(mockLeads));
  }
  if (!localStorage.getItem(APPS_KEY)) {
    localStorage.setItem(APPS_KEY, JSON.stringify(mockAppointments));
  }
  if (!localStorage.getItem(LOGS_KEY)) {
    localStorage.setItem(LOGS_KEY, JSON.stringify(mockCallLogs));
  }
  if (!localStorage.getItem(INT_KEY)) {
    localStorage.setItem(INT_KEY, JSON.stringify(mockIntegrations));
  }
}

export async function getLeads(): Promise<Lead[]> {
  try {
    const response = await fetch('https://hamayoon.app.n8n.cloud/webhook/api/leads');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    if (result && result.success && Array.isArray(result.data)) {
      saveLeads(result.data);
      return result.data;
    }
    throw new Error('API response success is false or missing data');
  } catch (error) {
    console.warn('Failed to fetch leads from real API, falling back to local/mock data:', error);
    initializeDatabase();
    return JSON.parse(localStorage.getItem(LEADS_KEY) || '[]');
  }
}

export function saveLeads(leads: Lead[]) {
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
}

export async function getAppointments(): Promise<Appointment[]> {
  try {
    const response = await fetch('https://hamayoon.app.n8n.cloud/webhook/api/appointments');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    if (result && result.success && Array.isArray(result.data)) {
      saveAppointments(result.data);
      return result.data;
    }
    throw new Error('API response success is false or missing data');
  } catch (error) {
    console.warn('Failed to fetch appointments from real API, falling back to local/mock data:', error);
    initializeDatabase();
    return JSON.parse(localStorage.getItem(APPS_KEY) || '[]');
  }
}

export function saveAppointments(apps: Appointment[]) {
  localStorage.setItem(APPS_KEY, JSON.stringify(apps));
}

export async function getCallLogs(): Promise<CallLog[]> {
  try {
    const response = await fetch('https://hamayoon.app.n8n.cloud/webhook/api/call-logs');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    if (result && result.success && Array.isArray(result.data)) {
      saveCallLogs(result.data);
      return result.data;
    }
    throw new Error('API response success is false or missing data');
  } catch (error) {
    console.warn('Failed to fetch call logs from real API, falling back to local/mock data:', error);
    initializeDatabase();
    return JSON.parse(localStorage.getItem(LOGS_KEY) || '[]');
  }
}

export function saveCallLogs(logs: CallLog[]) {
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
}

export function getIntegrations(): IntegrationStatus[] {
  initializeDatabase();
  return JSON.parse(localStorage.getItem(INT_KEY) || '[]');
}

export function saveIntegrations(ints: IntegrationStatus[]) {
  localStorage.setItem(INT_KEY, JSON.stringify(ints));
}

/**
 * Simulates a Retell AI call sequence through n8n
 */
export async function simulateAIVoiceCall(
  leadId: string,
  onCallUpdate: (leads: Lead[], appointments: Appointment[], logs: CallLog[]) => void
) {
  const leads = await getLeads();
  const appointments = await getAppointments();
  const logs = await getCallLogs();

  const leadIndex = leads.findIndex(l => l.Lead_ID === leadId);
  if (leadIndex === -1) return;

  const lead = leads[leadIndex];
  
  // Step 1: Change lead status to 'calling'
  const callId = `call_retell_${Math.random().toString(36).substr(2, 9)}`;
  leads[leadIndex] = {
    ...lead,
    Status: 'calling',
    Retell_Call_ID: callId,
    Updated_At: new Date().toISOString()
  };
  saveLeads(leads);
  onCallUpdate(leads, appointments, logs);

  // Step 2: Set timeout for Retell AI speaking and checking calendar
  setTimeout(async () => {
    const currentLeads = await getLeads();
    const currentApps = await getAppointments();
    const currentLogs = await getCallLogs();

    const idx = currentLeads.findIndex(l => l.Lead_ID === leadId);
    if (idx === -1) return;

    const refreshedLead = currentLeads[idx];
    
    // Choose simulation outcome based on the issue
    let outcome: 'Booked' | 'Follow-up Needed' | 'No Answer' = 'Booked';
    let callStatus: 'completed' | 'not_answered' | 'busy' = 'completed';
    let newStatus: Lead['Status'] = 'booked';
    let summary = '';
    let transcript = '';
    let appointmentTime = refreshedLead.Preferred_DateTime || "2026-06-11T14:00:00Z";

    if (refreshedLead.Issue.toLowerCase().includes('clean')) {
      outcome = 'Booked';
      newStatus = 'booked';
      summary = `The patient requested a teeth cleaning. The AI Receptionist checked availability in Google Calendar and scheduled the appointment for ${new Date(appointmentTime).toLocaleString()}. Synchronization completed they showed enthusiastic interest in orthodontic details.`;
      transcript = `Assistant: Hello, thank you for contacting BrightSmile. This is your AI receptionist calling. Am I speaking with ${refreshedLead.name}?
Patient: Yes, this is me. I wanted to book my teeth cleaning.
Assistant: Wonderful, ${refreshedLead.name}. I see you preferred tomorrow at 11 AM. Is that still a good time?
Patient: Actually, yes, that is perfect for me.
Assistant: Exceptional. Google Calendar and Google Sheets have been updated. We are excited to welcome you.`;
    } else if (refreshedLead.Issue.toLowerCase().includes('pain') || refreshedLead.Issue.toLowerCase().includes('toothache')) {
      outcome = 'Booked';
      newStatus = 'booked';
      summary = `Emergency appointment requested for severe toothache. AI checked nearest gaps, reserved immediate slot, notified n8n, and sent SMS alert.`;
      transcript = `Assistant: Hi ${refreshedLead.name}, I am following up on your emergency toothache lead. Are you okay?
Patient: Oh, thank goodness. No, I am having awful dental pain.
Assistant: I'm booking you in for dr. Mansoor immediately. Our first open slot is today in 3 hours. Will you make it?
Patient: Absolutely. Yes, thank you.`;
    } else {
      // 20% follow up rate
      const roll = Math.random();
      if (roll < 0.4) {
        outcome = 'Follow-up Needed';
        newStatus = 'contacted';
        callStatus = 'completed';
        summary = `Spoke with patient who inquired about braces. Demanded custom payment arrangements. Handled pricing queries but deferred final scheduling until consulting family.`;
        transcript = `Assistant: This is BrightSmile AI. We are calling to outline our Braces installment plan.
Patient: Thanks, your rates are fine, but I need to talk with my husband. Can you call me back tomorrow?
Assistant: Certainly, I have updated Google Sheets. Have a great day!`;
      } else if (roll < 0.6) {
        outcome = 'No Answer';
        newStatus = 'not_answered';
        callStatus = 'not_answered';
        summary = `Outbound phone ring timed out. No answer received. Marked for n8n-telegram automated retry sequence.`;
        transcript = `[SYSTEM CODES: RING TIMEOUT - UNANSWERED OUTBOUND]`;
      } else {
        outcome = 'Booked';
        newStatus = 'booked';
        summary = `AI agent confirmed checkup schedule after patient checked open slots. Confirmed event details.`;
        transcript = `Assistant: Hi, checking slot availability.
Patient: Sounds great, please reserve that slot.
Assistant: Completed. Confirmations sent.`;
      }
    }

    // Update Lead
    currentLeads[idx] = {
      ...refreshedLead,
      Status: newStatus,
      Updated_At: new Date().toISOString()
    };
    saveLeads(currentLeads);

    // Add Call Log
    const newLogId = `LOG-${100 + currentLogs.length + 1}`;
    const newCallLog: CallLog = {
      Log_ID: newLogId,
      Lead_ID: leadId,
      Retell_Call_ID: callId,
      Phone: refreshedLead.Phone,
      Patient_Name: refreshedLead.name,
      Call_Status: callStatus,
      Call_Summary: summary,
      Recording_URL: callStatus === 'completed' ? `https://api.retellai.com/recordings/${callId}.mp3` : '',
      Transcript: transcript,
      Outcome: outcome,
      Created_At: new Date().toISOString(),
      Raw_Data: JSON.stringify({
        call_id: callId,
        duration_seconds: callStatus === 'completed' ? 104 : 0,
        telephony_provider: "twilio",
        outcome_logged: outcome,
        sync_pipeline: ["sheets", "n8n", "google_calendar"]
      }, null, 2)
    };
    currentLogs.unshift(newCallLog);
    saveCallLogs(currentLogs);

    // If booked, create Appointment
    if (newStatus === 'booked') {
      const newAppId = `A-${500 + currentApps.length + 1}`;
      const newApp: Appointment = {
        Appointment_ID: newAppId,
        Lead_ID: leadId,
        Patient_Name: refreshedLead.name,
        Phone: refreshedLead.Phone,
        Email: refreshedLead.Email,
        Issue: refreshedLead.Issue,
        Appointment_DateTime: appointmentTime,
        Calendar_Event_ID: `gcal_evt_${Math.random().toString(36).substr(2, 8)}`,
        Status: "Confirmed",
        Created_At: new Date().toISOString(),
        Notes: `Booked via AI Voice simulator Call ID: ${callId}. Patient reported: ${refreshedLead.Issue}.`
      };
      currentApps.unshift(newApp);
      saveAppointments(currentApps);
    }

    onCallUpdate(currentLeads, currentApps, currentLogs);
  }, 4000); // 4 seconds of simulated live calling
}

export function restoreOriginalDemoData() {
  localStorage.setItem(LEADS_KEY, JSON.stringify(mockLeads));
  localStorage.setItem(APPS_KEY, JSON.stringify(mockAppointments));
  localStorage.setItem(LOGS_KEY, JSON.stringify(mockCallLogs));
  localStorage.setItem(INT_KEY, JSON.stringify(mockIntegrations));
}
