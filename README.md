# AI Dental Receptionist Automation

## Screenshots

Add the project screenshots to `assets/screenshots/` and they will render here without breaking the page.

| Overview | Lead Inbox | AI Calls |
| --- | --- | --- |
| Put `assets/screenshots/overview.png` here | Put `assets/screenshots/lead-inbox.png` here | Put `assets/screenshots/ai-calls.png` here |

| Calendar | Follow-ups | Analytics |
| --- | --- | --- |
| Put `assets/screenshots/calendar.png` here | Put `assets/screenshots/follow-ups.png` here | Put `assets/screenshots/analytics.png` here |

| Workflow 1 | Workflow 2 | Webhook Flow |
| --- | --- | --- |
| Put `assets/screenshots/workflow-1.png` here | Put `assets/screenshots/workflow-2.png` here | Put `assets/screenshots/webhook-flow.png` here |

---

A modern AI-powered dental appointment automation system built with Retell AI, n8n, Telegram, Twilio, Google Sheets, Google Calendar, and a real-time dashboard.

This project automates the complete patient appointment workflow for a dental clinic, from lead capture to AI outbound calling, appointment availability checking, calendar booking, call logging, and operational dashboard monitoring.

## Overview

AI Dental Receptionist Automation helps dental clinics reduce manual receptionist workload by using an AI voice agent to call patients, collect appointment details, check availability, book appointments, and keep clinic records updated automatically.

The system captures leads from Telegram, stores them in Google Sheets, triggers outbound AI calls through Retell AI, checks availability using Google Calendar, books appointments through n8n workflows, and displays real-time operational data in a dashboard.

## Key Features

- Telegram-based patient lead capture
- Automatic lead saving into Google Sheets
- Retell AI outbound voice calls
- Twilio custom telephony integration
- AI receptionist for dental appointment booking
- Real-time appointment availability checking
- Google Calendar event creation
- Appointment record saving in Google Sheets
- Call logs, transcripts, summaries, and recording links
- Admin and patient email notifications
- Real-time operational dashboard
- Lead, call, appointment, and follow-up tracking
- Developer-friendly architecture using n8n as the automation backend

## Tech Stack

### Frontend Dashboard

- React
- TypeScript
- Tailwind CSS
- shadcn/ui style components
- Recharts
- Lucide React

### Automation Backend

- n8n
- Webhooks
- HTTP Request nodes
- Google Sheets nodes
- Google Calendar nodes
- Email nodes

### AI Voice Agent

- Retell AI
- Single Prompt Agent
- Custom tools for availability checking and appointment booking

### Telephony

- Twilio
- Elastic SIP Trunking
- Custom telephony connection with Retell AI

### Data Storage

- Google Sheets

### Calendar

- Google Calendar

### Lead Source

- Telegram Bot

## System Workflow

```text
Telegram Lead
    ↓
n8n Telegram Trigger
    ↓
Parse Lead Message
    ↓
Save Lead to Google Sheets
    ↓
Format Phone Number
    ↓
Start Retell AI Outbound Call
    ↓
AI Receptionist Talks to Patient
    ↓
Check Appointment Availability
    ↓
Google Calendar Availability Check
    ↓
Patient Confirms Appointment
    ↓
Book Appointment
    ↓
Create Google Calendar Event
    ↓
Save Appointment in Google Sheets
    ↓
Send Confirmation Emails
    ↓
Save Call Logs and Summary
    ↓
Dashboard Displays Real-Time Data
```

## Dashboard Modules

### 1. Overview

A command center for clinic operations, showing:

- Total leads
- New leads
- AI calls started
- Calls completed
- Appointments booked
- Booking conversion rate
- Today's appointments
- Failed or missed calls
- Automation health status

### 2. Lead Inbox

Tracks all patient leads captured from Telegram.

Features:

- Search leads
- Filter by status
- View patient details
- Track call status
- Open related appointment or call log

### 3. AI Calls

Shows all Retell AI call activity.

Features:

- Call status tracking
- Call summaries
- Transcript viewer
- Recording links
- Raw JSON developer view
- Call outcome badges

### 4. Appointments

Displays booked dental appointments.

Features:

- Appointment list
- Status badges
- Patient details
- Google Calendar event reference
- Today and upcoming appointments

### 5. Calendar

A calendar-style appointment view with clinic working hours.

### 6. Follow-ups

Prioritizes leads that need manual or automated follow-up.

Examples:

- No-answer leads
- Failed calls
- Pending confirmations
- Cancelled appointments
- High-priority dental pain cases

### 7. Analytics

Shows performance metrics such as:

- Lead volume
- Call answer rate
- Booking conversion rate
- Appointment trends
- Common dental issues
- Failed call trends

### 8. Integrations

Displays connected services:

- Telegram Bot
- n8n workflows
- Retell AI
- Twilio
- Google Sheets
- Google Calendar
- Email notifications

### 9. Settings

Admin configuration area for:

- Clinic profile
- Business hours
- Webhook URLs
- AI agent settings
- Notification settings
- API configuration

## Google Sheets Structure

The project uses three main Google Sheets tabs.

### `leads`

```text
Lead_ID
name
Phone
Email
Issue
Preferred_DateTime
Status
Retell_Call_ID
Created_At
Updated_At
```

### `appointments`

```text
Appointment_ID
Lead_ID
Patient_Name
Phone
Email
Issue
Appointment_DateTime
Calendar_Event_ID
Status
Created_At
Notes
```

### `call_logs`

```text
Log_ID
Lead_ID
Retell_Call_ID
Phone
Patient_Name
Call_Status
Call_Summary
Recording_URL
Transcript
Created_At
Raw_Data
```

## n8n Workflows

### 1. Telegram Leads to Retell Call

Captures Telegram messages, parses lead information, saves the lead into Google Sheets, formats the phone number, and starts an outbound Retell AI call.

### 2. Check Availability

Receives appointment time from Retell AI, checks Google Calendar availability, and returns whether the requested slot is available.

### 3. Book Appointment

Creates a Google Calendar event, saves the appointment in Google Sheets, and sends confirmation emails.

### 4. Retell Call Status Logger

Receives Retell webhook events after calls, saves call summaries, transcripts, statuses, and recording links into Google Sheets.

### 5. Dashboard API Workflows

Exposes Google Sheets data through n8n webhook APIs for the dashboard.

Example endpoints:

```text
GET /webhook/api/leads
GET /webhook/api/appointments
GET /webhook/api/call-logs
```

## Retell AI Agent

The AI agent acts as a professional dental clinic receptionist.

Responsibilities:

- Greet patients
- Ask for appointment reason
- Collect patient details
- Ask preferred appointment date and time
- Check availability
- Confirm appointment details
- Book appointment only after patient confirmation
- Escalate urgent or complex cases to clinic staff

## Example Lead Message Format

```text
Name: Dara Khan
Phone: 03018249617
Email: patient@example.com
Issue: Dental checkup
Preferred time: 2026-12-21T11:00:00+05:00
```

The system converts the phone number into E.164 format:

```text
03018249617 -> +923018249617
```

## Environment Variables

Create a `.env` file for frontend/API configuration.

```env
NEXT_PUBLIC_API_BASE_URL=https://your-n8n-domain.com/webhook/api
RETELL_API_KEY=your_retell_api_key
```

Do not expose private API keys in frontend code.

## Installation

```bash
npm install
npm run dev
```

Open the app at:

```text
http://localhost:3000
```

## Data Integration

By default, the dashboard can use mock data for development.

To connect real data:

1. Create n8n webhook APIs.
2. Connect each API to the correct Google Sheets tab.
3. Update the dashboard API layer.
4. Replace mock data with live API responses.

Example API response:

```json
{
  "success": true,
  "data": []
}
```

## Real-Time Sync

The dashboard is designed to refresh data every 30 seconds.

It also includes:

- Manual refresh button
- Last synced timestamp
- Loading states
- Error states
- Empty states

For true real-time updates, this architecture can be upgraded to Supabase Realtime or WebSocket-based updates.

## Project Status

Current implementation includes:

- Telegram lead capture
- Google Sheets lead storage
- Retell AI outbound calling
- Twilio custom telephony integration
- Appointment availability workflow
- Appointment booking workflow
- Call status logging workflow
- Dashboard UI
- API-ready data layer

## Future Improvements

- Supabase database migration
- Real-time dashboard with live subscriptions
- WhatsApp lead capture
- Patient SMS reminders
- Admin role management
- Multi-clinic support
- Appointment rescheduling flow
- AI call quality scoring
- Payment collection integration
- Advanced analytics
- Patient CRM timeline

## Admin

```text
Name: Hamayoon
Role: Admin
```

## Disclaimer

This project is built for appointment scheduling and operational automation. The AI agent does not provide medical diagnosis, prescriptions, or emergency medical advice. Urgent or complex dental cases should be escalated to qualified clinic staff.

## License

This project is for portfolio, demo, and client automation use. Add your preferred license before public distribution.
