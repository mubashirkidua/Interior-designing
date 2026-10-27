/**
 * The Ocean Interiors - Centralized Booking & Order Management Service
 * Provides storage, pipeline tracking, notes, and CSV export for Studio Leadership & Team.
 */

export type BookingStatus =
  | 'new'
  | 'contacted'
  | 'survey_done'
  | 'quote_sent'
  | 'awarded'
  | 'completed'
  | 'archived';

export interface BookingLead {
  id: string;
  referenceId: string;
  createdAt: string;
  clientName: string;
  phone: string;
  email: string;
  city?: string;
  projectType: string;
  estimatedBudget?: string;
  squareFeet?: string;
  consultationMethod: string;
  timeframe?: string;
  source: 'Consultation Form' | 'Cost Estimator' | '3D Studio' | 'Direct Walk-in';
  notes?: string;
  status: BookingStatus;
  lastUpdated: string;
  assignedTo?: string;
}

const STORAGE_KEY = 'ocean_interiors_admin_bookings_v1';
const EVENT_NAME = 'ocean_bookings_updated';

const DEFAULT_BOOKINGS: BookingLead[] = [
  {
    id: 'lead-001',
    referenceId: 'OI-2026-8941',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    clientName: 'Syed Kamran Shah',
    phone: '0300-8451299',
    email: 'kamran.shah@residence.pk',
    city: 'DHA Phase 6, Lahore',
    projectType: '1 Kanal Full Turnkey Villa Architecture',
    estimatedBudget: 'PKR 22,500,000',
    squareFeet: '4,500 sq ft',
    consultationMethod: 'In-Studio Meeting',
    timeframe: 'Immediate (Within 1 Month)',
    source: 'Consultation Form',
    notes: 'Interested in fluted walnut wall panelling, imported Calacatta marble, and concealed VRF climate control.',
    status: 'new',
    lastUpdated: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    assignedTo: 'Muhammad Mubashir Ali (CEO)',
  },
  {
    id: 'lead-002',
    referenceId: 'OI-2026-7812',
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    clientName: 'Dr. Ayesha Tariq',
    phone: '0321-9874512',
    email: 'ayesha.tariq@healthnet.org',
    city: 'Bahria Town Phase 8, Rawalpindi',
    projectType: '10 Marla Signature Master Suite & Kitchen',
    estimatedBudget: 'PKR 11,800,000',
    squareFeet: '2,250 sq ft',
    consultationMethod: 'On-Site Visit',
    timeframe: '1 – 3 months',
    source: 'Cost Estimator',
    notes: 'Called yesterday. Site visit scheduled for this Saturday at 11:30 AM with senior site engineer.',
    status: 'contacted',
    lastUpdated: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    assignedTo: 'Studio Lead Engineer',
  },
  {
    id: 'lead-003',
    referenceId: 'OI-2026-6540',
    createdAt: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
    clientName: 'Malik Jahangir',
    phone: '0333-5120984',
    email: 'jahangir.industries@gmail.com',
    city: 'Gulberg III, Lahore',
    projectType: 'Executive Duplex Penthouse',
    estimatedBudget: 'PKR 16,400,000',
    squareFeet: '3,800 sq ft',
    consultationMethod: 'In-Studio Meeting',
    timeframe: '2 – 4 months',
    source: '3D Studio',
    notes: 'Detailed BOQ and 3D renders sent. Client requested sample swatches of Italian porcelain slabs.',
    status: 'quote_sent',
    lastUpdated: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    assignedTo: 'Muhammad Mubashir Ali (CEO)',
  },
  {
    id: 'lead-004',
    referenceId: 'OI-2026-5129',
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    clientName: 'Farhan Qureshi',
    phone: '0345-2108874',
    email: 'farhan.q@qureshigroup.com',
    city: 'Clifton Block 4, Karachi',
    projectType: '2 Kanal Sea-facing Luxury Bungalow',
    estimatedBudget: 'PKR 38,000,000',
    squareFeet: '9,000 sq ft',
    consultationMethod: 'On-Site Visit',
    timeframe: 'Immediate',
    source: 'Consultation Form',
    notes: 'Site survey completed. Structural review approved. Contract draft under review with client legal team.',
    status: 'survey_done',
    lastUpdated: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    assignedTo: 'Studio Projects Director',
  },
  {
    id: 'lead-005',
    referenceId: 'OI-2026-4401',
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    clientName: 'Hamza Sheikh',
    phone: '0302-7714900',
    email: 'hamza.sheikh@techventures.co',
    city: 'F-7/2, Islamabad',
    projectType: 'Grand Double-Height Living Room + Drawing Room',
    estimatedBudget: 'PKR 8,900,000',
    squareFeet: '1,850 sq ft',
    consultationMethod: 'In-Studio Meeting',
    timeframe: 'Completed',
    source: 'Cost Estimator',
    notes: 'Advance deposit received (30%). Material procurement of European white oak initiated.',
    status: 'awarded',
    lastUpdated: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    assignedTo: 'Muhammad Mubashir Ali (CEO)',
  },
];

export const bookingService = {
  /**
   * Retrieves all bookings from localStorage or seeds defaults
   */
  getBookings(): BookingLead[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BOOKINGS));
        return DEFAULT_BOOKINGS;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return DEFAULT_BOOKINGS;
    } catch {
      return DEFAULT_BOOKINGS;
    }
  },

  /**
   * Adds a new booking lead and notifies subscribers
   */
  addBooking(data: Partial<BookingLead>): BookingLead {
    const list = this.getBookings();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newLead: BookingLead = {
      id: `lead-${Date.now()}`,
      referenceId: data.referenceId || `OI-2026-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      clientName: data.clientName || 'Valued Client',
      phone: data.phone || 'N/A',
      email: data.email || 'N/A',
      city: data.city || 'Pakistan',
      projectType: data.projectType || 'Turnkey Interior Architecture',
      estimatedBudget: data.estimatedBudget || 'Under Discussion',
      squareFeet: data.squareFeet || 'Custom Area',
      consultationMethod: data.consultationMethod || 'In-Studio Meeting',
      timeframe: data.timeframe || '1 – 3 months',
      source: data.source || 'Consultation Form',
      notes: data.notes || '',
      status: 'new',
      lastUpdated: new Date().toISOString(),
      assignedTo: 'Muhammad Mubashir Ali (CEO)',
    };

    const updated = [newLead, ...list];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: newLead }));
    } catch {
      // ignore
    }
    return newLead;
  },

  /**
   * Updates status of an existing booking lead
   */
  updateStatus(id: string, status: BookingStatus): void {
    const list = this.getBookings();
    const updated = list.map((lead) =>
      lead.id === id
        ? { ...lead, status, lastUpdated: new Date().toISOString() }
        : lead
    );
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch {
      // ignore
    }
  },

  /**
   * Updates internal team notes
   */
  updateNotes(id: string, notes: string): void {
    const list = this.getBookings();
    const updated = list.map((lead) =>
      lead.id === id
        ? { ...lead, notes, lastUpdated: new Date().toISOString() }
        : lead
    );
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch {
      // ignore
    }
  },

  /**
   * Updates assigned team member
   */
  updateAssignee(id: string, assignedTo: string): void {
    const list = this.getBookings();
    const updated = list.map((lead) =>
      lead.id === id
        ? { ...lead, assignedTo, lastUpdated: new Date().toISOString() }
        : lead
    );
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch {
      // ignore
    }
  },

  /**
   * Deletes a booking lead
   */
  deleteBooking(id: string): void {
    const list = this.getBookings();
    const updated = list.filter((lead) => lead.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch {
      // ignore
    }
  },

  /**
   * Resets bookings to demo baseline
   */
  resetToDefaults(): BookingLead[] {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BOOKINGS));
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
      return DEFAULT_BOOKINGS;
    } catch {
      return DEFAULT_BOOKINGS;
    }
  },

  /**
   * Exports all leads to CSV spreadsheet file
   */
  exportToCSV(): void {
    const leads = this.getBookings();
    const headers = [
      'Reference ID',
      'Date',
      'Client Name',
      'Phone Number',
      'Email',
      'City / Location',
      'Project Type',
      'Covered Area (Sq Ft)',
      'Estimated Budget',
      'Consultation Method',
      'Source',
      'Status',
      'Assigned To',
      'Team Notes',
    ];

    const rows = leads.map((l) => [
      `"${l.referenceId}"`,
      `"${new Date(l.createdAt).toLocaleDateString()}"`,
      `"${l.clientName.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${(l.city || '').replace(/"/g, '""')}"`,
      `"${l.projectType.replace(/"/g, '""')}"`,
      `"${l.squareFeet || ''}"`,
      `"${l.estimatedBudget || ''}"`,
      `"${l.consultationMethod}"`,
      `"${l.source}"`,
      `"${l.status.toUpperCase()}"`,
      `"${(l.assignedTo || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `The_Ocean_Interiors_Orders_Bookings_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  /**
   * Hook for real-time listener
   */
  subscribe(callback: () => void): () => void {
    window.addEventListener(EVENT_NAME, callback);
    window.addEventListener('storage', callback);
    return () => {
      window.removeEventListener(EVENT_NAME, callback);
      window.removeEventListener('storage', callback);
    };
  },
};
