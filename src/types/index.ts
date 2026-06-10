export interface Lead {
  Lead_ID: string;
  name: string;
  Phone: string;
  Email: string;
  Issue: string;
  Preferred_DateTime: string;
  Status: 'new' | 'calling' | 'contacted' | 'booked' | 'not_answered' | 'failed' | 'cancelled';
  Retell_Call_ID: string;
  Created_At: string;
  Updated_At: string;
}

export interface Appointment {
  Appointment_ID: string;
  Lead_ID: string;
  Patient_Name: string;
  Phone: string;
  Email: string;
  Issue: string;
  Appointment_DateTime: string;
  Calendar_Event_ID: string;
  Status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled' | 'Rescheduled' | 'No Show';
  Created_At: string;
  Notes: string;
}

export interface CallLog {
  Log_ID: string;
  Lead_ID: string;
  Retell_Call_ID: string;
  Phone: string;
  Patient_Name: string;
  Call_Status: 'completed' | 'ended' | 'not_answered' | 'busy' | 'failed' | 'voicemail' | 'unknown';
  Call_Summary: string;
  Recording_URL: string;
  Transcript: string;
  Created_At: string;
  Outcome: 'Booked' | 'Follow-up Needed' | 'No Answer' | 'Failed' | 'Info Only';
  Raw_Data: string; // JSON string
}

export interface IntegrationStatus {
  id: string;
  name: string;
  status: 'Connected' | 'Active' | 'Syncing' | 'Disconnected';
  description: string;
  details?: string[];
  provider?: string;
  phone?: string;
  agentName?: string;
}
