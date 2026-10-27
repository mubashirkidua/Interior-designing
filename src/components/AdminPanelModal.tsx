import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  ShieldCheck,
  Search,
  Filter,
  Download,
  Plus,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  UserCheck,
  Building,
  DollarSign,
  TrendingUp,
  Trash2,
  Edit3,
  RotateCcw,
  Sparkles,
  Lock,
  Unlock,
  Eye,
  LayoutGrid,
  Table as TableIcon
} from 'lucide-react';
import { bookingService, BookingLead, BookingStatus } from '../services/bookingService';
import { Logo } from './Logo';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; color: string; bg: string; border: string; dot: string }
> = {
  new: {
    label: 'New Inquiry',
    color: 'text-amber-300',
    bg: 'bg-amber-950/40',
    border: 'border-amber-500/40',
    dot: 'bg-amber-400',
  },
  contacted: {
    label: 'Contacted / Meeting Fixed',
    color: 'text-sky-300',
    bg: 'bg-sky-950/40',
    border: 'border-sky-500/40',
    dot: 'bg-sky-400',
  },
  survey_done: {
    label: 'Site Survey Completed',
    color: 'text-purple-300',
    bg: 'bg-purple-950/40',
    border: 'border-purple-500/40',
    dot: 'bg-purple-400',
  },
  quote_sent: {
    label: 'BOQ / Quotation Sent',
    color: 'text-orange-300',
    bg: 'bg-orange-950/40',
    border: 'border-orange-500/40',
    dot: 'bg-orange-400',
  },
  awarded: {
    label: 'Project Awarded / Active',
    color: 'text-emerald-300',
    bg: 'bg-emerald-950/40',
    border: 'border-emerald-500/40',
    dot: 'bg-emerald-400',
  },
  completed: {
    label: 'Handover Completed',
    color: 'text-teal-300',
    bg: 'bg-teal-950/40',
    border: 'border-teal-500/40',
    dot: 'bg-teal-400',
  },
  archived: {
    label: 'Archived',
    color: 'text-zinc-400',
    bg: 'bg-zinc-900/50',
    border: 'border-zinc-700/50',
    dot: 'bg-zinc-500',
  },
};

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('ocean_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Data & Filters
  const [bookings, setBookings] = useState<BookingLead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Notes Modal / Editing
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesInput, setNotesInput] = useState('');

  // Manual Add Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClientData, setNewClientData] = useState({
    clientName: '',
    phone: '',
    email: '',
    city: 'Lahore',
    projectType: '1 Kanal Turnkey Villa Architecture',
    estimatedBudget: 'PKR 15,000,000',
    squareFeet: '4,500 sq ft',
    consultationMethod: 'In-Studio Meeting',
    notes: '',
  });

  // Load bookings
  const loadData = () => {
    const list = bookingService.getBookings();
    setBookings(list);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  useEffect(() => {
    const unsubscribe = bookingService.subscribe(() => {
      loadData();
    });
    return () => unsubscribe();
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Auth handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passcode.trim();
    // Default passcodes: "ocean2026", "7860", or "ceo"
    if (clean === 'ocean2026' || clean === '7860' || clean.toLowerCase() === 'ceo') {
      setIsAuthenticated(true);
      sessionStorage.setItem('ocean_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Try "ocean2026" or click Quick Demo Unlock.');
    }
  };

  const handleQuickUnlock = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('ocean_admin_auth', 'true');
    setAuthError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ocean_admin_auth');
    setPasscode('');
  };

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((lead) => {
      const matchesSearch =
        lead.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.city && lead.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
        lead.projectType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.referenceId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === 'all' ? true : lead.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchQuery, selectedStatus]);

  // Executive Metrics
  const metrics = useMemo(() => {
    const total = bookings.length;
    const newCount = bookings.filter((b) => b.status === 'new').length;
    const inProgress = bookings.filter(
      (b) => b.status === 'contacted' || b.status === 'survey_done' || b.status === 'quote_sent'
    ).length;
    const awarded = bookings.filter((b) => b.status === 'awarded' || b.status === 'completed').length;
    return { total, newCount, inProgress, awarded };
  }, [bookings]);

  const handleStatusChange = (id: string, status: BookingStatus) => {
    bookingService.updateStatus(id, status);
  };

  const handleDeleteLead = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the booking for ${name}?`)) {
      bookingService.deleteBooking(id);
    }
  };

  const handleOpenNotes = (lead: BookingLead) => {
    setEditingNotesId(lead.id);
    setNotesInput(lead.notes || '');
  };

  const handleSaveNotes = () => {
    if (editingNotesId) {
      bookingService.updateNotes(editingNotesId, notesInput);
      setEditingNotesId(null);
    }
  };

  const handleCreateNewBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientData.clientName || !newClientData.phone) {
      alert('Please provide client name and contact phone number.');
      return;
    }

    bookingService.addBooking({
      clientName: newClientData.clientName,
      phone: newClientData.phone,
      email: newClientData.email,
      city: newClientData.city,
      projectType: newClientData.projectType,
      estimatedBudget: newClientData.estimatedBudget,
      squareFeet: newClientData.squareFeet,
      consultationMethod: newClientData.consultationMethod,
      notes: newClientData.notes,
      source: 'Direct Walk-in',
    });

    setIsAddModalOpen(false);
    setNewClientData({
      clientName: '',
      phone: '',
      email: '',
      city: 'Lahore',
      projectType: '1 Kanal Turnkey Villa Architecture',
      estimatedBudget: 'PKR 15,000,000',
      squareFeet: '4,500 sq ft',
      consultationMethod: 'In-Studio Meeting',
      notes: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Admin Dialog Container */}
      <div className="relative w-full max-w-7xl max-h-[94vh] bg-[#0E0E0E] text-white rounded-3xl border border-[#C99168]/40 shadow-2xl shadow-black/80 flex flex-col overflow-hidden z-10">
        {/* Architectural Drafting Corner Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#C99168] pointer-events-none" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#C99168] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#C99168] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#C99168] pointer-events-none" />

        {/* Ambient Warm Studio Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C99168]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B77958]/8 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-[#C99168]/30 bg-[#141414]/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 relative z-10 shrink-0">
          <div className="flex items-center gap-3.5">
            <Logo variant="light" size="sm" />
            <div className="h-6 w-[1px] bg-[#C99168]/30 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-[#F5D5B8] font-['Playfair_Display',serif]">
                  Studio Order &amp; Booking Management
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#C99168]/20 text-[#E6B38A] border border-[#C99168]/40 font-semibold uppercase tracking-wider">
                  Admin Portal
                </span>
              </div>
              <p className="text-xs text-[#D8B494]">
                Founded &amp; Led by CEO Muhammad Mubashir Ali · Direct Team Execution Pipeline
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {isAuthenticated && (
              <>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#C99168] to-[#B77958] hover:from-[#d9a27b] hover:to-[#c68969] text-white text-xs font-bold rounded-full transition-all shadow-md cursor-pointer active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Add Booking</span>
                </button>

                <button
                  type="button"
                  onClick={() => bookingService.exportToCSV()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#252525] text-[#F5D5B8] border border-[#C99168]/40 text-xs font-semibold rounded-full transition-all cursor-pointer"
                  title="Export orders to Excel / CSV"
                >
                  <Download className="w-3.5 h-3.5 text-[#C99168]" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-[#A88060] hover:text-white transition-colors"
                  title="Lock Portal"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Lock</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full bg-[#1A1A1A] hover:bg-[#262626] text-[#D8B494] hover:text-white border border-[#C99168]/30 transition-all cursor-pointer"
              aria-label="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Security Passcode Gate Screen */
          <div className="flex-1 overflow-y-auto p-6 sm:p-12 flex items-center justify-center relative z-10">
            <div className="w-full max-w-md p-8 rounded-3xl bg-[#141414] border border-[#C99168]/40 shadow-2xl relative overflow-hidden">
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C99168]" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C99168]" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C99168]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C99168]" />

              <div className="w-14 h-14 rounded-full bg-[#C99168]/15 border border-[#C99168]/40 flex items-center justify-center mx-auto mb-4 text-[#E6B38A]">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-center text-[#F5D5B8] font-['Playfair_Display',serif]">
                CEO &amp; Studio Team Authorization
              </h3>
              <p className="text-xs text-center text-[#D8B494] mt-2 mb-6">
                Enter your administrative passcode to manage turnkey residential orders, site surveys, and client bookings.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F5D5B8] mb-1.5 font-mono uppercase tracking-wider">
                    Studio Passcode
                  </label>
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setAuthError('');
                    }}
                    placeholder="Enter studio PIN (e.g. ocean2026)"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#C99168]/40 text-[#F5D5B8] placeholder:text-[#8A5B3D] focus:outline-none focus:border-[#F5D5B8] text-sm"
                    autoFocus
                  />
                  {authError && (
                    <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{authError}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-[#C99168] to-[#B77958] hover:from-[#d9a27b] hover:to-[#c68969] text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Access Team Panel</span>
                </button>

                <div className="pt-2 border-t border-[#C99168]/20 flex items-center justify-between text-xs">
                  <span className="text-[#A88060]">Quick Testing?</span>
                  <button
                    type="button"
                    onClick={handleQuickUnlock}
                    className="text-[#E6B38A] hover:text-white underline underline-offset-2 font-medium cursor-pointer"
                  >
                    ⚡ Quick Demo Unlock
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 relative z-10">
            {/* KPI Executive Metrics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-[#141414] border border-[#C99168]/30 shadow-md flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#A88060] uppercase tracking-wider block">
                    Total Inquiries
                  </span>
                  <span className="text-2xl font-bold text-[#F5D5B8] font-['Playfair_Display',serif]">
                    {metrics.total}
                  </span>
                  <span className="text-[10px] text-[#C99168] block mt-0.5">Centralized Pipeline</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#C99168]/10 border border-[#C99168]/30 flex items-center justify-center text-[#E6B38A]">
                  <FileText className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#141414] border border-amber-500/30 shadow-md flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wider block">
                    New Action Needed
                  </span>
                  <span className="text-2xl font-bold text-amber-200 font-['Playfair_Display',serif]">
                    {metrics.newCount}
                  </span>
                  <span className="text-[10px] text-amber-300/80 block mt-0.5">Awaiting CEO / Team Callback</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
                  <AlertCircle className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#141414] border border-sky-500/30 shadow-md flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-sky-300 uppercase tracking-wider block">
                    In Progress / Surveys
                  </span>
                  <span className="text-2xl font-bold text-sky-200 font-['Playfair_Display',serif]">
                    {metrics.inProgress}
                  </span>
                  <span className="text-[10px] text-sky-300/80 block mt-0.5">Active Quotations &amp; Visits</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-300">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#141414] border border-emerald-500/30 shadow-md flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-emerald-300 uppercase tracking-wider block">
                    Awarded Projects
                  </span>
                  <span className="text-2xl font-bold text-emerald-200 font-['Playfair_Display',serif]">
                    {metrics.awarded}
                  </span>
                  <span className="text-[10px] text-emerald-300/80 block mt-0.5">Turnkey Execution Underway</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Filter, Search & View Controls Bar */}
            <div className="p-4 rounded-2xl bg-[#141414] border border-[#C99168]/30 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#C99168] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search client name, phone (0300...), city, reference ID..."
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#1A1A1A] border border-[#C99168]/30 rounded-xl text-[#F5D5B8] placeholder:text-[#8A5B3D] focus:outline-none focus:border-[#F5D5B8]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A88060] hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                {[
                  { id: 'all', label: 'All', count: bookings.length },
                  { id: 'new', label: 'New', count: bookings.filter((b) => b.status === 'new').length },
                  { id: 'contacted', label: 'Contacted', count: bookings.filter((b) => b.status === 'contacted').length },
                  { id: 'survey_done', label: 'Survey Done', count: bookings.filter((b) => b.status === 'survey_done').length },
                  { id: 'quote_sent', label: 'Quote Sent', count: bookings.filter((b) => b.status === 'quote_sent').length },
                  { id: 'awarded', label: 'Awarded', count: bookings.filter((b) => b.status === 'awarded').length },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedStatus(tab.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedStatus === tab.id
                        ? 'bg-gradient-to-r from-[#C99168] to-[#B77958] text-white shadow-sm'
                        : 'bg-[#1A1A1A] text-[#D8B494] hover:text-white border border-[#C99168]/20'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/40 font-mono">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-1 p-1 bg-[#1A1A1A] border border-[#C99168]/30 rounded-xl self-end lg:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    viewMode === 'cards'
                      ? 'bg-[#C99168] text-white'
                      : 'text-[#A88060] hover:text-white'
                  }`}
                  title="Card View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    viewMode === 'table'
                      ? 'bg-[#C99168] text-white'
                      : 'text-[#A88060] hover:text-white'
                  }`}
                  title="Table View"
                >
                  <TableIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List / Cards Display */}
            {filteredBookings.length === 0 ? (
              <div className="py-16 text-center rounded-2xl bg-[#141414] border border-[#C99168]/20">
                <FileText className="w-10 h-10 text-[#C99168]/40 mx-auto mb-2" />
                <h4 className="text-base font-semibold text-[#F5D5B8]">No bookings found</h4>
                <p className="text-xs text-[#A88060] mt-1 max-w-sm mx-auto">
                  No client inquiries match the current search or status filter. Try clearing filters or add a new booking.
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedStatus('all');
                    }}
                    className="px-4 py-1.5 bg-[#1A1A1A] text-xs font-semibold text-[#F5D5B8] border border-[#C99168]/40 rounded-full hover:bg-[#252525]"
                  >
                    Clear Filters
                  </button>
                  <button
                    type="button"
                    onClick={() => bookingService.resetToDefaults()}
                    className="px-4 py-1.5 bg-[#C99168]/20 text-xs font-semibold text-[#E6B38A] border border-[#C99168]/40 rounded-full hover:bg-[#C99168]/30"
                  >
                    Restore Demo Data
                  </button>
                </div>
              </div>
            ) : viewMode === 'cards' ? (
              /* Rich Luxury Card View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredBookings.map((lead) => {
                  const statusInfo = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
                  const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                  const waNumber = cleanPhone.startsWith('92')
                    ? cleanPhone
                    : cleanPhone.startsWith('0')
                    ? '92' + cleanPhone.slice(1)
                    : '92' + cleanPhone;

                  const waMessage = encodeURIComponent(
                    `Hello ${lead.clientName},\n\nThis is Muhammad Mubashir Ali (CEO, The Ocean Interiors). Thank you for reaching out regarding your project: "${lead.projectType}" (Ref: ${lead.referenceId}). We would love to coordinate the next steps with you.`
                  );

                  return (
                    <div
                      key={lead.id}
                      className="relative p-5 rounded-2xl bg-[#141414] border border-[#C99168]/40 shadow-xl shadow-black/40 flex flex-col justify-between transition-all duration-300 hover:border-[#C99168]/70 hover:shadow-2xl group"
                    >
                      {/* Corner Accents */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C99168]" />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C99168]" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C99168]" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C99168]" />

                      <div>
                        {/* Top Reference & Status Row */}
                        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#C99168]/20">
                          <span className="font-mono text-[11px] text-[#E6B38A] font-semibold">
                            {lead.referenceId}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusInfo.bg} ${statusInfo.border} ${statusInfo.color}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot} animate-pulse`} />
                            <span>{statusInfo.label}</span>
                          </span>
                        </div>

                        {/* Client Identity */}
                        <h4 className="text-base sm:text-lg font-bold text-[#F5D5B8] font-['Playfair_Display',serif]">
                          {lead.clientName}
                        </h4>

                        {lead.city && (
                          <p className="text-xs text-[#C99168] mt-0.5 flex items-center gap-1">
                            <Building className="w-3.5 h-3.5 shrink-0" />
                            <span>{lead.city}</span>
                          </p>
                        )}

                        {/* Project Specs */}
                        <div className="mt-3 p-3 rounded-xl bg-[#1A1A1A] border border-[#C99168]/20 space-y-1.5">
                          <div className="text-xs font-semibold text-white">
                            {lead.projectType}
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-[#D8B494]">
                            <span>Budget: <strong className="text-[#F5D5B8]">{lead.estimatedBudget}</strong></span>
                            <span>Area: <strong className="text-[#E6B38A] font-mono">{lead.squareFeet}</strong></span>
                          </div>
                          <div className="text-[10px] text-[#A88060] flex items-center justify-between pt-1 border-t border-[#C99168]/15">
                            <span>Format: {lead.consultationMethod}</span>
                            <span>Source: {lead.source}</span>
                          </div>
                        </div>

                        {/* Notes Box */}
                        {lead.notes && (
                          <div className="mt-3 p-2.5 rounded-xl bg-black/40 border border-[#C99168]/15 text-xs text-[#D8B494] italic leading-relaxed">
                            "{lead.notes}"
                          </div>
                        )}
                      </div>

                      {/* Bottom Pipeline Action Bar */}
                      <div className="mt-4 pt-3.5 border-t border-[#C99168]/20 space-y-3">
                        {/* Status Dropdown Selector */}
                        <div className="flex items-center justify-between gap-2">
                          <label className="text-[10px] font-mono text-[#A88060] uppercase tracking-wider shrink-0">
                            Pipeline:
                          </label>
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value as BookingStatus)}
                            className="flex-1 text-xs px-2.5 py-1 bg-[#1A1A1A] border border-[#C99168]/40 rounded-lg text-[#F5D5B8] focus:outline-none focus:border-[#F5D5B8] cursor-pointer"
                          >
                            <option value="new">🟡 New Inquiry</option>
                            <option value="contacted">🔵 Contacted / Meeting Fixed</option>
                            <option value="survey_done">🟣 Site Survey Done</option>
                            <option value="quote_sent">🟠 BOQ Sent</option>
                            <option value="awarded">🟢 Project Awarded</option>
                            <option value="completed">⚪ Completed</option>
                            <option value="archived">Archive</option>
                          </select>
                        </div>

                        {/* 1-Click Communication Action Row */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            {/* WhatsApp Button */}
                            <a
                              href={`https://wa.me/${waNumber}?text=${waMessage}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#25D366]/15 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 rounded-full text-xs font-semibold transition-all shadow-xs"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>

                            {/* Direct Phone Call */}
                            <a
                              href={`tel:${lead.phone}`}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#1A1A1A] hover:bg-[#252525] text-[#D8B494] hover:text-white border border-[#C99168]/30 rounded-full text-xs transition-colors"
                              title={`Call ${lead.phone}`}
                            >
                              <Phone className="w-3.5 h-3.5 text-[#C99168]" />
                              <span className="font-mono text-[11px] hidden sm:inline">{lead.phone}</span>
                            </a>
                          </div>

                          <div className="flex items-center gap-1">
                            {/* Edit Notes */}
                            <button
                              type="button"
                              onClick={() => handleOpenNotes(lead)}
                              className="p-1.5 text-[#A88060] hover:text-[#F5D5B8] hover:bg-[#1A1A1A] rounded-lg transition-colors cursor-pointer"
                              title="Add / Edit Notes"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => handleDeleteLead(lead.id, lead.clientName)}
                              className="p-1.5 text-[#A88060] hover:text-rose-400 hover:bg-[#1A1A1A] rounded-lg transition-colors cursor-pointer"
                              title="Delete Booking"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Creation Timestamp & Assignee */}
                        <div className="flex items-center justify-between text-[10px] text-[#8A5B3D] pt-1">
                          <span>{new Date(lead.createdAt).toLocaleDateString()} · {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          <span className="truncate max-w-[150px]">{lead.assignedTo || 'CEO Office'}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Executive Table View */
              <div className="overflow-x-auto rounded-2xl border border-[#C99168]/30 bg-[#141414] shadow-xl">
                <table className="w-full text-left text-xs text-[#D8B494]">
                  <thead className="bg-[#1A1A1A] text-[#F5D5B8] uppercase font-mono text-[10px] border-b border-[#C99168]/30">
                    <tr>
                      <th className="px-4 py-3">Ref ID</th>
                      <th className="px-4 py-3">Client</th>
                      <th className="px-4 py-3">Project &amp; Location</th>
                      <th className="px-4 py-3">Budget / Sq Ft</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#C99168]/15">
                    {filteredBookings.map((lead) => {
                      const statusInfo = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
                      const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                      const waNumber = cleanPhone.startsWith('92')
                        ? cleanPhone
                        : cleanPhone.startsWith('0')
                        ? '92' + cleanPhone.slice(1)
                        : '92' + cleanPhone;

                      const waMessage = encodeURIComponent(
                        `Hello ${lead.clientName}, this is Muhammad Mubashir Ali (CEO, The Ocean Interiors) regarding your project inquiry: ${lead.projectType}.`
                      );

                      return (
                        <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3 font-mono font-semibold text-[#E6B38A]">
                            {lead.referenceId}
                            <div className="text-[10px] text-[#8A5B3D] font-normal">
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-bold text-white block">{lead.clientName}</span>
                            <span className="font-mono text-[11px] text-[#A88060]">{lead.phone}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-white font-medium block">{lead.projectType}</span>
                            <span className="text-[11px] text-[#C99168]">{lead.city}</span>
                          </td>
                          <td className="px-4 py-3 font-mono">
                            <span className="text-[#F5D5B8] block">{lead.estimatedBudget}</span>
                            <span className="text-[11px] text-[#8A5B3D]">{lead.squareFeet}</span>
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as BookingStatus)}
                              className={`text-xs px-2.5 py-1 rounded-full font-bold border ${statusInfo.bg} ${statusInfo.border} ${statusInfo.color} cursor-pointer focus:outline-none`}
                            >
                              <option value="new">🟡 New Inquiry</option>
                              <option value="contacted">🔵 Contacted</option>
                              <option value="survey_done">🟣 Survey Done</option>
                              <option value="quote_sent">🟠 BOQ Sent</option>
                              <option value="awarded">🟢 Awarded</option>
                              <option value="completed">⚪ Completed</option>
                              <option value="archived">Archive</option>
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <a
                                href={`https://wa.me/${waNumber}?text=${waMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] rounded-full transition-colors"
                                title="Chat on WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`tel:${lead.phone}`}
                                className="p-1.5 bg-[#1A1A1A] hover:bg-[#252525] text-[#D8B494] rounded-full transition-colors"
                                title="Call Client"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <button
                                type="button"
                                onClick={() => handleOpenNotes(lead)}
                                className="p-1.5 hover:text-white transition-colors cursor-pointer"
                                title="Notes"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-[#C99168]" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteLead(lead.id, lead.clientName)}
                                className="p-1.5 hover:text-rose-400 transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-zinc-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Bottom Footer Info Bar */}
        <div className="px-6 py-3 border-t border-[#C99168]/20 bg-[#141414] text-xs text-[#A88060] flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>The Ocean Interiors Studio Real-Time Client Dispatch Active</span>
          </div>
          <div>
            <span>Default PIN: <strong className="text-[#E6B38A] font-mono">ocean2026</strong></span>
            <span className="mx-2">·</span>
            <span>CEO Muhammad Mubashir Ali</span>
          </div>
        </div>
      </div>

      {/* Internal Team Notes Modal */}
      {editingNotesId && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#141414] border border-[#C99168]/50 shadow-2xl relative">
            <h4 className="text-base font-bold text-[#F5D5B8] mb-2 font-['Playfair_Display',serif]">
              Team Execution Notes
            </h4>
            <p className="text-xs text-[#D8B494] mb-3">
              Add internal updates regarding site surveys, client meetings, or BOQ revisions.
            </p>
            <textarea
              rows={4}
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              placeholder="e.g. Client agreed on Signature Ocean finish. Site inspection scheduled for Sunday 3 PM..."
              className="w-full p-3 rounded-xl bg-[#1A1A1A] border border-[#C99168]/40 text-[#F5D5B8] text-xs focus:outline-none focus:border-[#F5D5B8] mb-4"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingNotesId(null)}
                className="px-4 py-2 text-xs text-[#A88060] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-gradient-to-r from-[#C99168] to-[#B77958] text-white text-xs font-bold rounded-full shadow-md"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Manual Client Booking Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-lg p-6 sm:p-7 rounded-3xl bg-[#141414] border border-[#C99168]/50 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C99168]/20">
              <h4 className="text-lg font-bold text-[#F5D5B8] font-['Playfair_Display',serif]">
                Add Walk-in / Direct Client Booking
              </h4>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full text-[#A88060] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewBooking} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#F5D5B8] mb-1">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newClientData.clientName}
                  onChange={(e) =>
                    setNewClientData({ ...newClientData, clientName: e.target.value })
                  }
                  placeholder="e.g. Mian Tariq Mahmood"
                  className="w-full px-3.5 py-2 text-xs bg-[#1A1A1A] border border-[#C99168]/30 rounded-xl text-[#F5D5B8] focus:outline-none focus:border-[#F5D5B8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F5D5B8] mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={newClientData.phone}
                    onChange={(e) =>
                      setNewClientData({ ...newClientData, phone: e.target.value })
                    }
                    placeholder="0300-1234567"
                    className="w-full px-3.5 py-2 text-xs bg-[#1A1A1A] border border-[#C99168]/30 rounded-xl text-[#F5D5B8] focus:outline-none focus:border-[#F5D5B8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F5D5B8] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newClientData.email}
                    onChange={(e) =>
                      setNewClientData({ ...newClientData, email: e.target.value })
                    }
                    placeholder="client@gmail.com"
                    className="w-full px-3.5 py-2 text-xs bg-[#1A1A1A] border border-[#C99168]/30 rounded-xl text-[#F5D5B8] focus:outline-none focus:border-[#F5D5B8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F5D5B8] mb-1">
                    City / Society
                  </label>
                  <input
                    type="text"
                    value={newClientData.city}
                    onChange={(e) =>
                      setNewClientData({ ...newClientData, city: e.target.value })
                    }
                    placeholder="e.g. DHA Phase 5, Lahore"
                    className="w-full px-3.5 py-2 text-xs bg-[#1A1A1A] border border-[#C99168]/30 rounded-xl text-[#F5D5B8] focus:outline-none focus:border-[#F5D5B8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F5D5B8] mb-1">
                    Covered Area (Sq Ft)
                  </label>
                  <input
                    type="text"
                    value={newClientData.squareFeet}
                    onChange={(e) =>
                      setNewClientData({ ...newClientData, squareFeet: e.target.value })
                    }
                    placeholder="e.g. 4,500 sq ft"
                    className="w-full px-3.5 py-2 text-xs bg-[#1A1A1A] border border-[#C99168]/30 rounded-xl text-[#F5D5B8] focus:outline-none focus:border-[#F5D5B8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5D5B8] mb-1">
                  Project Scope / Scope Category
                </label>
                <input
                  type="text"
                  value={newClientData.projectType}
                  onChange={(e) =>
                    setNewClientData({ ...newClientData, projectType: e.target.value })
                  }
                  placeholder="e.g. 1 Kanal Complete Turnkey Luxury Architecture"
                  className="w-full px-3.5 py-2 text-xs bg-[#1A1A1A] border border-[#C99168]/30 rounded-xl text-[#F5D5B8] focus:outline-none focus:border-[#F5D5B8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F5D5B8] mb-1">
                    Estimated Budget (PKR)
                  </label>
                  <input
                    type="text"
                    value={newClientData.estimatedBudget}
                    onChange={(e) =>
                      setNewClientData({ ...newClientData, estimatedBudget: e.target.value })
                    }
                    placeholder="e.g. PKR 18,000,000"
                    className="w-full px-3.5 py-2 text-xs bg-[#1A1A1A] border border-[#C99168]/30 rounded-xl text-[#F5D5B8] focus:outline-none focus:border-[#F5D5B8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F5D5B8] mb-1">
                    Meeting Format
                  </label>
                  <select
                    value={newClientData.consultationMethod}
                    onChange={(e) =>
                      setNewClientData({
                        ...newClientData,
                        consultationMethod: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs bg-[#1A1A1A] border border-[#C99168]/30 rounded-xl text-[#F5D5B8] focus:outline-none focus:border-[#F5D5B8]"
                  >
                    <option value="In-Studio Meeting">In-Studio Meeting</option>
                    <option value="On-Site Visit">On-Site Visit</option>
                    <option value="WhatsApp Video Call">WhatsApp Video Call</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5D5B8] mb-1">
                  Initial Notes / Requirements
                </label>
                <textarea
                  rows={3}
                  value={newClientData.notes}
                  onChange={(e) =>
                    setNewClientData({ ...newClientData, notes: e.target.value })
                  }
                  placeholder="e.g. Bookmatched Italian marble, walnut fluted panelling, smart curtain motors..."
                  className="w-full p-3 text-xs bg-[#1A1A1A] border border-[#C99168]/30 rounded-xl text-[#F5D5B8] focus:outline-none focus:border-[#F5D5B8]"
                />
              </div>

              <div className="pt-3 border-t border-[#C99168]/20 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#A88060] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#C99168] to-[#B77958] text-white text-xs font-bold rounded-full shadow-md hover:from-[#d9a27b] hover:to-[#c68969]"
                >
                  Save to Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
