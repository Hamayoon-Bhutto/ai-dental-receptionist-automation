import { Lead, Appointment, CallLog } from '../types';

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  totalCalls: number;
  completedCalls: number;
  bookedAppointments: number;
  bookingConversionRate: number;
  todayAppointmentsCount: number;
  missedCalls: number;
  callAnswerRate: number;
}

export function calculateStats(
  leads: Lead[],
  appointments: Appointment[],
  callLogs: CallLog[]
): DashboardStats {
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.Status === 'new').length;
  const totalCalls = callLogs.length;
  
  const completedCalls = callLogs.filter(
    c => c.Call_Status === 'completed' || c.Call_Status === 'ended'
  ).length;

  const bookedAppointments = appointments.filter(
    a => a.Status === 'Confirmed'
  ).length;

  // Let's count today's appointments. Mock today is 2026-06-10.
  const todayAppointmentsCount = appointments.filter(a => {
    // Check if appointment date matches "2026-06-10"
    return a.Appointment_DateTime.includes('2026-06-10') && a.Status !== 'Cancelled';
  }).length;

  const missedCalls = callLogs.filter(
    c => c.Call_Status === 'not_answered' || 
         c.Call_Status === 'busy' || 
         c.Call_Status === 'failed' || 
         c.Call_Status === 'voicemail'
  ).length;

  const bookingConversionRate = totalLeads > 0 
    ? Math.round((bookedAppointments / totalLeads) * 100) 
    : 0;

  const callAnswerRate = totalCalls > 0 
    ? Math.round((completedCalls / totalCalls) * 100) 
    : 0;

  return {
    totalLeads,
    newLeads,
    totalCalls,
    completedCalls,
    bookedAppointments,
    bookingConversionRate,
    todayAppointmentsCount,
    missedCalls,
    callAnswerRate
  };
}
