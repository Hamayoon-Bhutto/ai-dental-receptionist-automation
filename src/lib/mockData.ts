import { Lead, Appointment, CallLog, IntegrationStatus } from '../types';

export const mockLeads: Lead[] = [
  {
    Lead_ID: "L-101",
    name: "Muhammad Ali",
    Phone: "+92 300 1234567",
    Email: "ali.m@gmail.com",
    Issue: "Emergency toothache",
    Preferred_DateTime: "2026-06-10T14:30:00Z",
    Status: "booked",
    Retell_Call_ID: "call_retell_8192a83f1",
    Created_At: "2026-06-10T08:15:00Z",
    Updated_At: "2026-06-10T09:00:00Z"
  },
  {
    Lead_ID: "L-102",
    name: "Aisha Khan",
    Phone: "+92 321 9876543",
    Email: "aisha.khan@yahoo.com",
    Issue: "Teeth cleaning",
    Preferred_DateTime: "2026-06-11T11:00:00Z",
    Status: "booked",
    Retell_Call_ID: "call_retell_9918bcde2",
    Created_At: "2026-06-09T10:30:00Z",
    Updated_At: "2026-06-09T11:15:00Z"
  },
  {
    Lead_ID: "L-103",
    name: "Zainab Bibi",
    Phone: "+92 333 4445556",
    Email: "zainab.b@hotmail.com",
    Issue: "Tooth pain",
    Preferred_DateTime: "2026-06-10T10:00:00Z",
    Status: "booked",
    Retell_Call_ID: "call_retell_7162fa920",
    Created_At: "2026-06-10T07:30:00Z",
    Updated_At: "2026-06-10T08:05:00Z"
  },
  {
    Lead_ID: "L-104",
    name: "Hamza Ahmed",
    Phone: "+92 345 5556667",
    Email: "hamza.ahmed@outlook.com",
    Issue: "Root canal inquiry",
    Preferred_DateTime: "2026-06-12T15:00:00Z",
    Status: "contacted",
    Retell_Call_ID: "call_retell_6234ff11a",
    Created_At: "2026-06-09T14:20:00Z",
    Updated_At: "2026-06-09T14:45:00Z"
  },
  {
    Lead_ID: "L-105",
    name: "Sana Malik",
    Phone: "+92 312 3456789",
    Email: "sana.malik@gmail.com",
    Issue: "Braces consultation",
    Preferred_DateTime: "2026-06-15T12:30:00Z",
    Status: "booked",
    Retell_Call_ID: "call_retell_5123ccdd9",
    Created_At: "2026-06-08T11:00:00Z",
    Updated_At: "2026-06-08T11:40:00Z"
  },
  {
    Lead_ID: "L-106",
    name: "Bilal Siddiqui",
    Phone: "+92 322 1112223",
    Email: "bilal.sid@gmail.com",
    Issue: "Gum pain",
    Preferred_DateTime: "2026-06-11T09:30:00Z",
    Status: "calling",
    Retell_Call_ID: "call_retell_4412aa88f",
    Created_At: "2026-06-10T07:05:00Z",
    Updated_At: "2026-06-10T07:18:00Z"
  },
  {
    Lead_ID: "L-107",
    name: "Fatima Yusuf",
    Phone: "+92 331 7778889",
    Email: "fatima.y@yahoo.com",
    Issue: "Whitening",
    Preferred_DateTime: "2026-06-13T16:00:00Z",
    Status: "new",
    Retell_Call_ID: "",
    Created_At: "2026-06-10T06:50:00Z",
    Updated_At: "2026-06-10T06:50:00Z"
  },
  {
    Lead_ID: "L-108",
    name: "Usman Raza",
    Phone: "+92 301 4443322",
    Email: "usman.raza@gmail.com",
    Issue: "Tooth pain",
    Preferred_DateTime: "2026-06-09T14:00:00Z",
    Status: "not_answered",
    Retell_Call_ID: "call_retell_2193cb41e",
    Created_At: "2026-06-09T09:00:00Z",
    Updated_At: "2026-06-09T09:35:00Z"
  },
  {
    Lead_ID: "L-109",
    name: "Maryem Tariq",
    Phone: "+92 324 5551122",
    Email: "maryem.t@gmail.com",
    Issue: "Dental checkup",
    Preferred_DateTime: "2026-06-12T10:00:00Z",
    Status: "booked",
    Retell_Call_ID: "call_retell_3311da55b",
    Created_At: "2026-06-08T09:30:00Z",
    Updated_At: "2026-06-08T10:10:00Z"
  },
  {
    Lead_ID: "L-110",
    name: "Omer Sheikh",
    Phone: "+92 335 8887766",
    Email: "omer.sheikh@outlook.com",
    Issue: "Emergency toothache",
    Preferred_DateTime: "2026-06-07T14:30:00Z",
    Status: "failed",
    Retell_Call_ID: "call_retell_1122ab33c",
    Created_At: "2026-06-07T11:00:00Z",
    Updated_At: "2026-06-07T11:15:00Z"
  },
  {
    Lead_ID: "L-111",
    name: "Amna Farooq",
    Phone: "+92 344 1212343",
    Email: "amna.f12@gmail.com",
    Issue: "Braces consultation",
    Preferred_DateTime: "2026-06-14T11:30:00Z",
    Status: "booked",
    Retell_Call_ID: "call_retell_bb771199a",
    Created_At: "2026-06-07T15:20:00Z",
    Updated_At: "2026-06-07T16:00:00Z"
  },
  {
    Lead_ID: "L-112",
    name: "Haris Waheed",
    Phone: "+92 302 9998877",
    Email: "haris.waheed@gmail.com",
    Issue: "Teeth cleaning",
    Preferred_DateTime: "2026-06-11T15:30:00Z",
    Status: "new",
    Retell_Call_ID: "",
    Created_At: "2026-06-10T07:10:00Z",
    Updated_At: "2026-06-10T07:10:00Z"
  },
  {
    Lead_ID: "L-113",
    name: "Nida Hussain",
    Phone: "+92 320 4448880",
    Email: "nida.h@yahoo.com",
    Issue: "Tooth pain",
    Preferred_DateTime: "2026-06-08T16:00:00Z",
    Status: "cancelled",
    Retell_Call_ID: "call_retell_fe883a21b",
    Created_At: "2026-06-08T13:40:00Z",
    Updated_At: "2026-06-08T14:10:00Z"
  },
  {
    Lead_ID: "L-114",
    name: "Zubair Hashmi",
    Phone: "+92 336 2223344",
    Email: "zubair.hashmi@gmail.com",
    Issue: "Dental checkup",
    Preferred_DateTime: "2026-06-13T10:30:00Z",
    Status: "contacted",
    Retell_Call_ID: "call_retell_ee1122bb3",
    Created_At: "2026-06-09T16:00:00Z",
    Updated_At: "2026-06-09T16:25:00Z"
  },
  {
    Lead_ID: "L-115",
    name: "Sadia Qureshi",
    Phone: "+92 311 8889922",
    Email: "sadia.q@gmail.com",
    Issue: "Gum pain",
    Preferred_DateTime: "2026-06-06T15:00:00Z",
    Status: "not_answered",
    Retell_Call_ID: "call_retell_ca3344dd1",
    Created_At: "2026-06-06T11:15:00Z",
    Updated_At: "2026-06-06T11:40:00Z"
  }
];

export const mockAppointments: Appointment[] = [
  {
    Appointment_ID: "A-501",
    Lead_ID: "L-101",
    Patient_Name: "Muhammad Ali",
    Phone: "+92 300 1234567",
    Email: "ali.m@gmail.com",
    Issue: "Emergency toothache",
    Appointment_DateTime: "2026-06-10T14:30:00Z",
    Calendar_Event_ID: "gcal_evt_72819a3b",
    Status: "Confirmed",
    Created_At: "2026-06-10T09:00:00Z",
    Notes: "Patient complaining of severe throbbing pain in lower-left molar. Advised avoidance of cold liquids."
  },
  {
    Appointment_ID: "A-502",
    Lead_ID: "L-102",
    Patient_Name: "Aisha Khan",
    Phone: "+92 321 9876543",
    Email: "aisha.khan@yahoo.com",
    Issue: "Teeth cleaning",
    Appointment_DateTime: "2026-06-11T11:00:00Z",
    Calendar_Event_ID: "gcal_evt_29103bcc",
    Status: "Confirmed",
    Created_At: "2026-06-09T11:15:00Z",
    Notes: "Routine preventative scaling & polishing booking."
  },
  {
    Appointment_ID: "A-503",
    Lead_ID: "L-103",
    Patient_Name: "Zainab Bibi",
    Phone: "+92 333 4445556",
    Email: "zainab.b@hotmail.com",
    Issue: "Tooth pain",
    Appointment_DateTime: "2026-06-10T10:00:00Z",
    Calendar_Event_ID: "gcal_evt_11827ad8",
    Status: "Completed",
    Created_At: "2026-06-10T08:05:00Z",
    Notes: "Sensitivity check. Underwent partial extraction and filling."
  },
  {
    Appointment_ID: "A-504",
    Lead_ID: "L-105",
    Patient_Name: "Sana Malik",
    Phone: "+92 312 3456789",
    Email: "sana.malik@gmail.com",
    Issue: "Braces consultation",
    Appointment_DateTime: "2026-06-15T12:30:00Z",
    Calendar_Event_ID: "gcal_evt_9918bc22",
    Status: "Confirmed",
    Created_At: "2026-06-08T11:40:00Z",
    Notes: "Consultation regarding aligners & conventional braces. Seeking installment plan options."
  },
  {
    Appointment_ID: "A-505",
    Lead_ID: "L-109",
    Patient_Name: "Maryem Tariq",
    Phone: "+92 324 5551122",
    Email: "maryem.t@gmail.com",
    Issue: "Dental checkup",
    Appointment_DateTime: "2026-06-12T10:00:00Z",
    Calendar_Event_ID: "gcal_evt_51293a11",
    Status: "Confirmed",
    Created_At: "2026-06-08T10:10:00Z",
    Notes: "6-month general checkup and preventative screening."
  },
  {
    Appointment_ID: "A-506",
    Lead_ID: "L-111",
    Patient_Name: "Amna Farooq",
    Phone: "+92 344 1212343",
    Email: "amna.f12@gmail.com",
    Issue: "Braces consultation",
    Appointment_DateTime: "2026-06-14T11:30:00Z",
    Calendar_Event_ID: "gcal_evt_aa1298ff",
    Status: "Confirmed",
    Created_At: "2026-06-07T16:00:00Z",
    Notes: "Requested custom cosmetic assessment. Orthodontist appointment assigned."
  },
  {
    Appointment_ID: "A-507",
    Lead_ID: "L-113",
    Patient_Name: "Nida Hussain",
    Phone: "+92 320 4448880",
    Email: "nida.h@yahoo.com",
    Issue: "Tooth pain",
    Appointment_DateTime: "2026-06-08T16:00:00Z",
    Calendar_Event_ID: "gcal_evt_ba9911ee",
    Status: "Cancelled",
    Created_At: "2026-06-08T14:10:00Z",
    Notes: "Patient cancelled via follow-up call due to traveling plans. Needs rescheduling later."
  },
  {
    Appointment_ID: "A-508",
    Lead_ID: "L-101",
    Patient_Name: "Muhammad Ali",
    Phone: "+92 300 1234567",
    Email: "ali.m@gmail.com",
    Issue: "Emergency toothache",
    Appointment_DateTime: "2026-06-10T16:00:00Z",
    Calendar_Event_ID: "",
    Status: "Pending",
    Created_At: "2026-06-10T08:30:00Z",
    Notes: "Alternate slot held in case the 14:30 slot event gets delayed."
  },
  {
    Appointment_ID: "A-509",
    Lead_ID: "L-104",
    Patient_Name: "Hamza Ahmed",
    Phone: "+92 345 5556667",
    Email: "hamza.ahmed@outlook.com",
    Issue: "Root canal inquiry",
    Appointment_DateTime: "2026-06-12T15:00:00Z",
    Calendar_Event_ID: "",
    Status: "Rescheduled",
    Created_At: "2026-06-09T14:45:00Z",
    Notes: "Initial requested date was 2026-06-11. Rescheduled via n8n integration workflow."
  },
  {
    Appointment_ID: "A-510",
    Lead_ID: "L-114",
    Patient_Name: "Zubair Hashmi",
    Phone: "+92 336 2223344",
    Email: "zubair.hashmi@gmail.com",
    Issue: "Dental checkup",
    Appointment_DateTime: "2026-06-13T10:30:00Z",
    Calendar_Event_ID: "gcal_evt_aaee1122",
    Status: "Confirmed",
    Created_At: "2026-06-09T16:25:00Z",
    Notes: "Booked through automated Retell outbound call system."
  }
];

export const mockCallLogs: CallLog[] = [
  {
    Log_ID: "LOG-901",
    Lead_ID: "L-101",
    Retell_Call_ID: "call_retell_8192a83f1",
    Phone: "+92 300 1234567",
    Patient_Name: "Muhammad Ali",
    Call_Status: "completed",
    Call_Summary: "Muhammad Ali was experiencing severe, persistent tooth pain over the last 48 hours. The AI assistant successfully suggested slots and confirmed a dental booking on June 10, 2026 at 2:30 PM. Calendar event created, confirmation email queued.",
    Recording_URL: "https://api.retellai.com/recordings/call_retell_8192a83f1.mp3",
    Transcript: `Assistant: Hello, thank you for reaching out to BrightSmile Dental. I'm your AI dental receptionist. Am I speaking with Muhammad Ali?
Patient: Yes, yes. This is Muhammad Ali. I have a terrible toothache.
Assistant: I'm very sorry to hear that, Mr. Ali. We want to get you treated as soon as possible. Where is the pain located and how long has it been bothering you?
Patient: It's in my lower left side, back molar. Since two days, I haven't slept, it's very bad.
Assistant: That sounds severe, possible emergency root issue. I can check our earliest slots for today. I see we have an emergency slot available today, June 10, at 2:30 PM. Would that work for you?
Patient: Please yes! Secure that 2:30 PM slot!
Assistant: Excellent, I have booked a Confirmed emergency slot for you on June 10, at 2:30 PM with Dr. Harris. You will receive an SMS and an email summary shortly. Please try to avoid very cold liquids in the meantime. We will see you at 2:30!
Patient: Perfect, thank you, thank you very much!
Assistant: You are very welcome. Take care, goodbye!`,
    Outcome: "Booked",
    Created_At: "2026-06-10T08:16:00Z",
    Raw_Data: JSON.stringify({
      call_id: "call_retell_8192a83f1",
      agent_id: "agent_smile_receptionist_v3",
      duration_seconds: 142,
      latency_ms: 180,
      recording_status: "saved",
      telephony_provider: "twilio",
      from_number: "+15075411703",
      to_number: "+923001234567",
      call_analysis: {
        dental_urgency: "High",
        patient_temperament: "anxious/pain",
        sentiment: "positive",
        booked_slot: "2026-06-10T14:30:00Z",
        gcal_synced: true,
        sheets_updated: true
      }
    }, null, 2)
  },
  {
    Log_ID: "LOG-902",
    Lead_ID: "L-102",
    Retell_Call_ID: "call_retell_9918bcde2",
    Phone: "+92 321 9876543",
    Patient_Name: "Aisha Khan",
    Call_Status: "completed",
    Call_Summary: "Aisha requested a routine preventative scaling & polishing cleaning appointment. The AI checked availability on Google Calendar and booked her on June 11, 2026 at 11:00 AM.",
    Recording_URL: "https://api.retellai.com/recordings/call_retell_9918bcde2.mp3",
    Transcript: `Assistant: Hello, thank you for contacting BrightSmile Dental Clinic. This is the AI Scheduling assistant. Am I speaking with Aisha Khan?
Patient: Hi, yes this is Aisha. I submitted a form on Telegram for a cleaning.
Assistant: Wonderful, Aisha! Cleanings are highly recommended every six months. I can get you scheduled with our dental hygienist. What dates or times would be most convenient for you?
Patient: Sometime tomorrow late morning would be best if possible.
Assistant: Let me check our real-time calendar... I have a slot available tomorrow, June 11, at 11:00 AM. Does that suit you?
Patient: Yes, 11:00 AM works perfectly.
Assistant: Perfect! I have booked your scaling and clean-up appointment for June 11 at 11:00 AM. Your contact email is registered as aisha.khan@yahoo.com and you'll receive a calendar invitation shortly.
Patient: Great, thank you so much!
Assistant: Our pleasure, Aisha. See you tomorrow at 11:00 AM. Goodbye!`,
    Outcome: "Booked",
    Created_At: "2026-06-09T10:32:00Z",
    Raw_Data: JSON.stringify({
      call_id: "call_retell_9918bcde2",
      agent_id: "agent_smile_receptionist_v3",
      duration_seconds: 110,
      latency_ms: 175,
      recording_status: "saved",
      telephony_provider: "twilio",
      from_number: "+15075411703",
      to_number: "+923219876543",
      call_analysis: {
        dental_urgency: "Low",
        patient_temperament: "friendly",
        sentiment: "neutral",
        booked_slot: "2026-06-11T11:00:00Z",
        gcal_synced: true,
        sheets_updated: true
      }
    }, null, 2)
  },
  {
    Log_ID: "LOG-903",
    Lead_ID: "L-103",
    Retell_Call_ID: "call_retell_7162fa920",
    Phone: "+92 333 4445556",
    Patient_Name: "Zainab Bibi",
    Call_Status: "completed",
    Call_Summary: "Zainab requested slot selection due to recent discomfort. AI booked her on June 10 at 10:00 AM. Patient was satisfied and event was integrated immediately with Google Calendar.",
    Recording_URL: "https://api.retellai.com/recordings/call_retell_7162fa920.mp3",
    Transcript: `Assistant: Assalamualaikum, Zainab. This is BrightSmile Dental's automated assistant calling back regarding your dental pain request. Can you hear me alright?
Patient: Han, ji, beta. Meri dahrh mein buhat dard ho raha hai kal se.
Assistant: I am so sorry to hear about your tooth discomfort. Let's arrange a consultation immediately. We have a slot open today at 10:00 AM.
Patient: Thik hai, 10 baje main aa jaongi apni beti ke sath.
Assistant: Wonderful. I've booked you in for 10:00 AM. Please bring any past dental records if you have them. Allah hafiz.`,
    Outcome: "Booked",
    Created_At: "2026-06-10T07:32:00Z",
    Raw_Data: JSON.stringify({
      call_id: "call_retell_7162fa920",
      agent_id: "agent_smile_receptionist_v3",
      duration_seconds: 94,
      latency_ms: 195,
      recording_status: "saved",
      telephony_provider: "twilio",
      from_number: "+15075411703",
      to_number: "+923334445556",
      call_analysis: {
        dental_urgency: "High",
        patient_temperament: "elderly",
        sentiment: "positive",
        booked_slot: "2026-06-10T10:00:00Z",
        gcal_synced: true
      }
    }, null, 2)
  },
  {
    Log_ID: "LOG-904",
    Lead_ID: "L-104",
    Retell_Call_ID: "call_retell_6234ff11a",
    Phone: "+92 345 5556667",
    Patient_Name: "Hamza Ahmed",
    Call_Status: "ended",
    Call_Summary: "Discussed complex root canal procedure pricing and orthodontist schedule. Hamza requested to consult his family first and requested an email follow-up before finalizing.",
    Recording_URL: "https://api.retellai.com/recordings/call_retell_6234ff11a.mp3",
    Transcript: `Assistant: Hello Hamza, thank you for your query regarding root canal treatments.
Patient: Hi, yes I received your outbound call. I wanted to know what the cost of a root canal is.
Assistant: Our package ranges from 15,000 to 25,000 PKR depending on the tooth severity and choice of crown. That includes consultation and X-rays.
Patient: Okay, I need to check with my father to see if it fits our budget or outline, can you send me this over email?
Assistant: Absolutely. I've dispatched a comprehensive cost breakdown and schedule to hamza.ahmed@outlook.com. I will check in with you in a couple of days.
Patient: Perfect, thank you.`,
    Outcome: "Follow-up Needed",
    Created_At: "2026-06-09T14:23:00Z",
    Raw_Data: JSON.stringify({
      call_id: "call_retell_6234ff11a",
      agent_id: "agent_smile_receptionist_v3",
      duration_seconds: 135,
      latency_ms: 165,
      recording_status: "saved",
      telephony_provider: "twilio",
      from_number: "+15075411703",
      to_number: "+923455556667",
      call_analysis: {
        dental_urgency: "Medium",
        patient_temperament: "analytical",
        sentiment: "neutral",
        email_sent: true
      }
    }, null, 2)
  },
  {
    Log_ID: "LOG-905",
    Lead_ID: "L-105",
    Retell_Call_ID: "call_retell_5123ccdd9",
    Phone: "+92 312 3456789",
    Patient_Name: "Sana Malik",
    Call_Status: "completed",
    Call_Summary: "Braces eligibility and installment plans discussion. Booking secured on Monday, June 15 at 12:30 PM with Orthodontist.",
    Recording_URL: "https://api.retellai.com/recordings/call_retell_5123ccdd9.mp3",
    Transcript: `Assistant: Hello Sana. The orthodontist has slot availability next Monday.
Patient: Yes, braces consultation. Do you support installments?
Assistant: Yes, our braces packages support quarterly installments. I can book you with Dr. Mansoor at 12:30 PM.
Patient: Perfect, sign me up.`,
    Outcome: "Booked",
    Created_At: "2026-06-08T11:02:00Z",
    Raw_Data: JSON.stringify({
      call_id: "call_retell_5123ccdd9",
      agent_id: "agent_smile_receptionist_v3"
    }, null, 2)
  },
  {
    Log_ID: "LOG-906",
    Lead_ID: "L-106",
    Retell_Call_ID: "call_retell_4412aa88f",
    Phone: "+92 322 1112223",
    Patient_Name: "Bilal Siddiqui",
    Call_Status: "busy",
    Call_Summary: "Outbound call rejected by patient's carrier due to network busy tone. n8n automatic retry scheduled.",
    Recording_URL: "",
    Transcript: `[SYSTEM CODES: LINE BUSY / OPERATOR DECLINED]`,
    Outcome: "No Answer",
    Created_At: "2026-06-10T07:06:00Z",
    Raw_Data: JSON.stringify({
      call_id: "call_retell_4412aa88f",
      error: "486 Busy Here",
      telephony_provider: "twilio"
    }, null, 2)
  },
  {
    Log_ID: "LOG-907",
    Lead_ID: "L-108",
    Retell_Call_ID: "call_retell_2193cb41e",
    Phone: "+92 301 4443322",
    Patient_Name: "Usman Raza",
    Call_Status: "not_answered",
    Call_Summary: "Outbound call initiated but timed out after 45 seconds of ringing with no pickup.",
    Recording_URL: "",
    Transcript: `[SYSTEM CODES: NO ANSWER - RINGING TIMEOUT]`,
    Outcome: "No Answer",
    Created_At: "2026-06-09T09:02:00Z",
    Raw_Data: JSON.stringify({
      call_id: "call_retell_2193cb41e",
      duration_seconds: 45,
      error: "timeout"
    }, null, 2)
  },
  {
    Log_ID: "LOG-908",
    Lead_ID: "L-109",
    Retell_Call_ID: "call_retell_3311da55b",
    Phone: "+92 324 5551122",
    Patient_Name: "Maryem Tariq",
    Call_Status: "completed",
    Call_Summary: "Routine checkup consultation booked for June 12 at 10:00 AM.",
    Recording_URL: "https://api.retellai.com/recordings/call_retell_3311da55b.mp3",
    Transcript: `Assistant: Hello Maryem, booking dental checkup.
Patient: Hello, yes please book it. June 12 at 10:00 AM works.
Assistant: Perfect. It is confirmed. See you then.`,
    Outcome: "Booked",
    Created_At: "2026-06-08T09:32:00Z",
    Raw_Data: JSON.stringify({
      call_id: "call_retell_3311da55b"
    }, null, 2)
  },
  {
    Log_ID: "LOG-909",
    Lead_ID: "L-110",
    Retell_Call_ID: "call_retell_1122ab33c",
    Phone: "+92 335 8887766",
    Patient_Name: "Omer Sheikh",
    Call_Status: "failed",
    Call_Summary: "Call failed to connect due to invalid number format or cellular carrier routing issues on Pakistani network.",
    Recording_URL: "",
    Transcript: `[SYSTEM CODES: CALL FAILED - INVALID ROUTING OR NUMBER]`,
    Outcome: "Failed",
    Created_At: "2026-06-07T11:02:00Z",
    Raw_Data: JSON.stringify({
      call_id: "call_retell_1122ab33c",
      error: "invalid telecom signaling"
    }, null, 2)
  },
  {
    Log_ID: "LOG-910",
    Lead_ID: "L-111",
    Retell_Call_ID: "call_retell_bb771199a",
    Phone: "+92 344 1212343",
    Patient_Name: "Amna Farooq",
    Call_Status: "completed",
    Call_Summary: "Amna Farooq wanted an orthodontic braces audit. June 14 at 11:30 AM slot chosen and finalized.",
    Recording_URL: "https://api.retellai.com/recordings/call_retell_bb771199a.mp3",
    Transcript: `Assistant: Amna, I found a slot for June 14 at 11:30 AM.
Patient: Perfect, that fits my calendar. Thanks!
Assistant: Great. See you then!`,
    Outcome: "Booked",
    Created_At: "2026-06-07T15:22:00Z",
    Raw_Data: JSON.stringify({
      call_id: "call_retell_bb771199a"
    }, null, 2)
  },
  {
    Log_ID: "LOG-911",
    Lead_ID: "L-113",
    Retell_Call_ID: "call_retell_fe883a21b",
    Phone: "+92 320 4448880",
    Patient_Name: "Nida Hussain",
    Call_Status: "completed",
    Call_Summary: "Called Nida to confirm her booked appointment. She had to travel, so she canceled the booking. Advised her to reach out when ready to rebook.",
    Recording_URL: "https://api.retellai.com/recordings/call_retell_fe883a21b.mp3",
    Transcript: `Assistant: Hi Nida, confirming your tooth pain appointment.
Patient: Hi, I'm sorry, I have to go out of station suddenly. I need to cancel.
Assistant: No problem, I have canceled the slot and marked your notes. Hope to see you back soon.`,
    Outcome: "Info Only",
    Created_At: "2026-06-08T13:42:00Z",
    Raw_Data: JSON.stringify({
      call_id: "call_retell_fe883a21b"
    }, null, 2)
  },
  {
    Log_ID: "LOG-912",
    Lead_ID: "L-114",
    Retell_Call_ID: "call_retell_ee1122bb3",
    Phone: "+92 336 2223344",
    Patient_Name: "Zubair Hashmi",
    Call_Status: "completed",
    Call_Summary: "Zubair Hashmi confirmed a routine dental checkup scheduler for June 13 at 10:30 AM via automatic Voice Agent dialogue.",
    Recording_URL: "https://api.retellai.com/recordings/call_retell_ee1122bb3.mp3",
    Transcript: `Assistant: Hello Zubair, this is BrightSmile AI. Let's schedule your checkup.
Patient: Hi, how about June 13 at 10:30 AM?
Assistant: Yes, that works. I've booked it. See you on Saturday, June 13 at 10:30 AM!`,
    Outcome: "Booked",
    Created_At: "2026-06-09T16:02:00Z",
    Raw_Data: JSON.stringify({
      call_id: "call_retell_ee1122bb3"
    }, null, 2)
  }
];

export const mockIntegrations: IntegrationStatus[] = [
  {
    id: "telegram",
    name: "Telegram Bot",
    status: "Connected",
    description: "Captures patient leads from Telegram messages and forwards immediate payloads to n8n.",
    details: ["Webhooks active", "Leads captured: 15", "Last lead received: 15 mins ago"]
  },
  {
    id: "n8n",
    name: "n8n Workflows",
    status: "Active",
    description: "Hosts triggers and sequences that orchestrate Retell AI triggers and Google Workspace syncing.",
    details: [
      "Telegram Leads to Retell Call Flow [Active]",
      "Check Availability Webhook [Healthy]",
      "Book Appointment Workflow [Healthy]",
      "Retell Call Status Logger [Active]"
    ]
  },
  {
    id: "retell",
    name: "Retell AI Voice Bot",
    status: "Connected",
    description: "Outbound AI agent that speaks with the patient, coordinates with n8n for real-time calendar queries.",
    phone: "+15075411703",
    agentName: "BrightSmile AI Receptionist",
    details: ["Agent API status: Healthy", "Active phone bindings: 1", "Avg voice latency: 180ms"]
  },
  {
    id: "twilio",
    name: "Twilio Telephony",
    status: "Connected",
    description: "Custom telephony provider linking phone rings, cellular carriers, and carrier routes directly to Retell.",
    provider: "Custom Telephony",
    details: ["Number leased: +1 (507) 541-1703", "Trunk routes: Optimized for Pakistan carriers"]
  },
  {
    id: "sheets",
    name: "Google Sheets Sync",
    status: "Syncing",
    description: "Primary database mirroring system containing sheets for leads, appointments, and call logs.",
    details: [
      "Leads tab: Syncing (15 items)",
      "Appointments tab: Syncing (10 items)",
      "Call Logs tab: Syncing (12 items)"
    ]
  },
  {
    id: "calendar",
    name: "Google Calendar Sync",
    status: "Connected",
    description: "Confirms and structures slot availability, blocking checked times instantly to prevent overbooking.",
    details: ["Clinic calendar: Dental clinic calendar", "Read scope: Active", "Write scope: Active"]
  },
  {
    id: "email",
    name: "Email Notifications",
    status: "Active",
    description: "Admin notices and client confirmation mail alerts dispatched for every state delta.",
    details: ["Admin triggers: Active", "Patient newsletters/receipts: Active"]
  }
];
