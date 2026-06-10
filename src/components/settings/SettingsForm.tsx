import React, { useState } from 'react';
import { 
  Building, 
  Clock, 
  Sparkles, 
  Layers, 
  User, 
  Mail, 
  Save, 
  Settings as SettingsIcon,
  CheckCircle,
  Bell,
  Lock,
  Phone
} from 'lucide-react';

export default function SettingsForm() {
  const [adminName, setAdminName] = useState('Hamayoon');
  const [adminEmail, setAdminEmail] = useState('hamayoonaliai@gmail.com');
  const [clinicName, setClinicName] = useState('BrightSmile Dental');
  const [appointmentDuration, setAppointmentDuration] = useState('30 mins');
  const [isSaved, setIsSaved] = useState(false);

  // Webhook URLs
  const [telegramHook, setTelegramHook] = useState('https://primary-n8n.brightsmile.ai/webhook/v1/telegram-leads');
  const [retellHook, setRetellHook] = useState('https://primary-n8n.brightsmile.ai/webhook/v1/retell-call-logs');

  const triggerSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <form onSubmit={triggerSave} className="space-y-6 select-none animate-fade-in text-left">
      {/* Toast state notifications alert */}
      {isSaved && (
        <div id="save-toast-banner" className="fixed top-8 right-8 z-50 bg-slate-900 border border-slate-800 text-white p-4.5 rounded-2xl flex items-center gap-3.5 shadow-2xl animate-slide-in">
          <div className="p-1 w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-bold block">Configuration Saved</span>
            <span className="text-[10px] text-slate-400 font-medium">Synced with primary Google Sheets database.</span>
          </div>
        </div>
      )}

      {/* Main settings tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: General Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Clinic Profile */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
              <Building className="w-4.5 h-4.5 text-blue-600" />
              <span>Clinic Profile Settings</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Clinic Name</label>
                <input
                  id="settings-clinic-name"
                  type="text"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-slate-700 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Default Slot Duration</label>
                <select
                  id="settings-slot-duration"
                  value={appointmentDuration}
                  onChange={(e) => setAppointmentDuration(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden text-slate-700 font-bold"
                >
                  <option value="15 mins">15 mins (Fast Scaling / Scaling)</option>
                  <option value="30 mins">30 mins (Routine Consults)</option>
                  <option value="45 mins">45 mins (Whitening procedures)</option>
                  <option value="60 mins">60 mins (Root Canals / Braces Install)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: AI Voice Bot Persona Configurations */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-blue-600" />
              <span>Retell Voice Agent Tuning</span>
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Agent Name representation</label>
                  <input
                    id="settings-agent-name"
                    type="text"
                    defaultValue="BrightSmile AI Receptionist"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-bold"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Voice Tone Model</label>
                  <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-bold">
                    <option>Standard Pakistani English Female (Sobia-V2)</option>
                    <option>Standard Urdu-English Bilingual Natural (Aslam-V2)</option>
                    <option>High-Empathy Medical Assistant Female (Fiza-Elite)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">System Dialogue Persona Prompt</label>
                <textarea
                  id="settings-agent-prompt"
                  rows={4}
                  defaultValue="You are Sobia, the compassionate AI dental receptionist for BrightSmile Clinic. Your goal is to receive leads forwarded from Telegram, retrieve calendar spots in under 200ms, and book toothaches with Dr. Mansoor. Be warm, patient, and use gentle Pakistani english expressions..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Section 3: n8n webhook routing configurations */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
              <Layers className="w-4.5 h-4.5 text-blue-600" />
              <span>n8n Direct Callback Webhook URLs</span>
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Telegram Inbound Trigger Webhook</label>
                <input
                  id="settings-telegram-webhook"
                  type="text"
                  value={telegramHook}
                  onChange={(e) => setTelegramHook(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-indigo-700 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Retell CallLogger completed webhook</label>
                <input
                  id="settings-retell-webhook"
                  type="text"
                  value={retellHook}
                  onChange={(e) => setRetellHook(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-indigo-700 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Admin profile, office timings summaries */}
        <div className="space-y-6">
          
          {/* Profile Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 font-black text-xl flex items-center justify-center mx-auto mb-3.5 shadow-sm border border-indigo-200/50">
              HA
            </div>

            <h4 className="text-sm font-black text-slate-800">{adminName}</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">System Administrator</p>

            <div className="mt-5 border-t border-slate-100 pt-4 space-y-3.5">
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Admin Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    id="settings-admin-email"
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-bold"
                  />
                </div>
              </div>

              <button
                id="settings-update-pwd"
                type="button"
                onClick={() => alert("Redirecting to secret-key reset gateway...")}
                className="w-full py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                Change Admin Credentials
              </button>
            </div>
          </div>

          {/* Office hours description summary */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none flex items-center gap-1.5 border-b border-slate-50 pb-2">
              <Clock className="w-4 h-4 text-slate-400" /> Office Timings
            </h4>

            <div className="space-y-2.5 text-xs text-slate-600 font-semibold">
              <div className="flex justify-between items-center">
                <span>Monday - Friday</span>
                <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md leading-none">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Saturday</span>
                <span className="font-mono text-[11px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md leading-none">Emergency Only</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Sunday</span>
                <span className="font-mono text-[11px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md leading-none">Closed</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Trigger Button row */}
      <div className="pt-6 border-t border-slate-200/80 flex items-center justify-end">
        <button
          id="save-settings-btn"
          type="submit"
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-100 transition-all hover:shadow-lg active:scale-95 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Save System Configuration
        </button>
      </div>
    </form>
  );
}
