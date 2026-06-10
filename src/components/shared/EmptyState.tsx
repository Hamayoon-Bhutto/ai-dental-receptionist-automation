import React from 'react';
import { HelpCircle, Search, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: any;
  actionText?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  icon: Icon = HelpCircle,
  actionText,
  onAction
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-dashed border-slate-200 rounded-3xl shadow-3xs max-w-lg mx-auto animate-fade-in my-6">
      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4 shadow-3xs">
        <Icon className="w-6 h-6" />
      </div>
      
      <h4 className="text-sm font-bold text-slate-900">{title}</h4>
      <p className="text-xs text-slate-400 mt-1 max-w-sm font-medium">{description}</p>
      
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-100 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {actionText}
        </button>
      )}
    </div>
  );
}
