import React from 'react';
import Sidebar, { NavTab } from './Sidebar';
import Topbar from './Topbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onRefresh: () => void;
  isSyncing: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  unresolvedFollowUpsCount: number;
  newLeadsCount: number;
}

export default function DashboardLayout({
  children,
  activeTab,
  setActiveTab,
  onRefresh,
  isSyncing,
  searchTerm,
  setSearchTerm,
  unresolvedFollowUpsCount,
  newLeadsCount
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex font-sans antialiased text-[#0F172A]">
      {/* Sidebar - Fixed Left */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        unresolvedFollowUpsCount={unresolvedFollowUpsCount}
        newLeadsCount={newLeadsCount}
      />

      {/* Main Content Area - Left-margin offsets sidebar */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        {/* Topbar - Sticky Top */}
        <Topbar 
          onRefresh={onRefresh} 
          isSyncing={isSyncing} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />

        {/* Dynamic Nav Page Workspace */}
        <main className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
