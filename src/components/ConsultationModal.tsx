import React, { useState, useEffect } from 'react';
import { X, Check, Calendar, Phone, Mail, User, Clock, DollarSign, Home, ShieldCheck, MessageSquare } from 'lucide-react';
import { bookingService } from '../services/bookingService';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedProjectOrService?: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  consultationMethod: string;
  budget: string;
  timeframe: string;
  description: string;
  consent: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  projectType?: string;
  consultationMethod?: string;
  consent?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  preSelectedProjectOrService = '',
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    projectType: 'Full-Service Interior Design',
    consultationMethod: 'In-Studio Meeting',
    budget: '$50k – $100k',
    timeframe: '1 – 3 months',
    description: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    referenceId: string;
    submittedAt: string;
    data: FormData;
  } | null>(null);

  useEffect(() => {
    if (preSelectedProjectOrService) {
      setFormData((prev) => ({
        ...prev,
        description: prev.description
          ? prev.description
          : `Inquiring regarding: ${preSelectedProjectOrService}`,
      }));
    }
  }, [preSelectedProjectOrService]);

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

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please provide your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project category.';
    }

    if (!formData.consultationMethod) {
      newErrors.consultationMethod = 'Please select your preferred consultation method.';
    }

    if (!formData.consent) {
      newErrors.consent = 'Please confirm you consent to The Ocean Interiors contacting you.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Realistic client-side submission processing & save to Centralized Admin Panel
    setTimeout(() => {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const referenceId = `OI-2026-${randomSuffix}`;
      const submittedAt = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      // Centralized order & booking tracking for CEO & team
      bookingService.addBooking({
        referenceId,
        clientName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        projectType: formData.projectType,
        estimatedBudget: formData.budget,
        consultationMethod: formData.consultationMethod,
        timeframe: formData.timeframe,
        notes: formData.description,
        source: 'Consultation Form',
      });

      setSubmittedData({
        referenceId,
        submittedAt,
        data: { ...formData },
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      projectType: 'Full-Service Interior Design',
      consultationMethod: 'In-Studio Meeting',
      budget: '$50k – $100k',
      timeframe: '1 – 3 months',
      description: '',
      consent: false,
    });
    setErrors({});
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-sm border border-[#DDD9D4] shadow-2xl overflow-y-auto z-10 flex flex-col focus:outline-none">
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-[#DDD9D4]">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B77958]">
              Private Design Consultation
            </span>
            <h2
              id="consultation-modal-title"
              className="text-xl font-bold tracking-tight text-[#171717] font-['Playfair_Display',serif]"
            >
              Start Your Project Inquiry
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#6B6864] hover:text-[#171717] hover:bg-[#F7F5F2] rounded-full transition-colors cursor-pointer"
            aria-label="Close consultation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          {submittedData ? (
            /* Submission Confirmation Screen */
            <div className="space-y-6">
              <div className="p-6 bg-[#F7F5F2] rounded-sm border border-[#DDD9D4] text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#171717] text-white flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-[#C99168]" />
                </div>
                <h3 className="text-2xl font-bold text-[#171717] font-['Playfair_Display',serif]">
                  Inquiry Received
                </h3>
                <p className="text-sm text-[#6B6864] mt-2 max-w-md mx-auto">
                  Thank you, <strong className="text-[#171717]">{submittedData.data.fullName}</strong>.
                  Our senior design team reviews every portfolio inquiry personally.
                </p>

                <div className="mt-5 inline-block px-4 py-2 bg-white rounded-sm border border-[#DDD9D4] text-xs font-mono text-[#171717]">
                  Inquiry Reference: <span className="font-bold text-[#B77958]">{submittedData.referenceId}</span>
                </div>
              </div>

              {/* Summary Details */}
              <div className="border border-[#DDD9D4] rounded-sm p-5 space-y-3 text-xs">
                <h4 className="font-bold uppercase tracking-wider text-[#6B6864] text-[11px] pb-2 border-b border-[#EEEAE5]">
                  Inquiry Summary
                </h4>
                <div className="grid grid-cols-2 gap-3 text-[#171717]">
                  <div>
                    <span className="text-[#6B6864] block">Project Focus:</span>
                    <span className="font-medium">{submittedData.data.projectType}</span>
                  </div>
                  <div>
                    <span className="text-[#6B6864] block">Consultation Format:</span>
                    <span className="font-medium">{submittedData.data.consultationMethod}</span>
                  </div>
                  <div>
                    <span className="text-[#6B6864] block">Target Timeframe:</span>
                    <span className="font-medium">{submittedData.data.timeframe}</span>
                  </div>
                  <div>
                    <span className="text-[#6B6864] block">Estimated Budget:</span>
                    <span className="font-medium">{submittedData.data.budget}</span>
                  </div>
                </div>

                {submittedData.data.description && (
                  <div className="pt-2 border-t border-[#EEEAE5]">
                    <span className="text-[#6B6864] block">Project Notes:</span>
                    <p className="mt-1 text-[#171717] italic">{submittedData.data.description}</p>
                  </div>
                )}
              </div>

              {/* Next Steps */}
              <div className="bg-[#EEEAE5]/60 p-4 rounded-sm text-xs text-[#6B6864] space-y-1.5">
                <p className="font-semibold text-[#171717]">What happens next?</p>
                <p>1. CEO Muhammad Mubashir Ali and the senior team review your architectural inquiry within 24 hours.</p>
                <p>2. We will contact you at <span className="font-medium text-[#171717]">{submittedData.data.email}</span> {submittedData.data.phone && <span>or <span className="font-medium text-[#171717] font-mono">{submittedData.data.phone}</span></span>} to schedule your on-site walkthrough.</p>
              </div>

              {/* Instant WhatsApp Forwarding Card */}
              <div className="p-4 bg-[#25D366]/10 border border-[#25D366]/40 rounded-sm text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-[#171717] block">Want an immediate response?</span>
                  <p className="text-[11px] text-[#6B6864]">
                    Forward your inquiry directly to CEO Muhammad Mubashir Ali on WhatsApp now.
                  </p>
                </div>
                <a
                  href={`https://wa.me/923428156086?text=${encodeURIComponent(
                    `Hello CEO Muhammad Mubashir Ali,\nI submitted an inquiry on The Ocean Interiors website (Ref: ${submittedData.referenceId}):\n- Name: ${submittedData.data.fullName}\n- Project: ${submittedData.data.projectType}\n- Meeting Format: ${submittedData.data.consultationMethod}\n- Budget: ${submittedData.data.budget}\n- Timeline: ${submittedData.data.timeframe}\n- Phone: ${submittedData.data.phone || 'N/A'}\n- Notes: ${submittedData.data.description || 'N/A'}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs rounded-full transition-colors cursor-pointer shrink-0 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>Send on WhatsApp (0342-8156086)</span>
                </a>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-[#6B6864] hover:text-[#171717] underline cursor-pointer"
                >
                  Submit another inquiry
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-medium text-white bg-[#171717] rounded-full hover:bg-[#252321] transition-colors cursor-pointer"
                >
                  Return to Studio
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Consultation Form */
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <p className="text-xs sm:text-sm text-[#6B6864] leading-relaxed">
                Whether you are remodeling an existing home or designing a new sanctuary from the ground up,
                we would be delighted to hear about your vision.
              </p>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-[#171717] mb-1.5">
                    Full Name <span className="text-[#B77958]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className={`w-full px-3.5 py-2.5 text-sm bg-[#F7F5F2] border rounded-sm focus:outline-none transition-colors ${
                        errors.fullName
                          ? 'border-red-500 focus:border-red-600'
                          : 'border-[#DDD9D4] focus:border-[#171717]'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#171717] mb-1.5">
                    Email Address <span className="text-[#B77958]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="eleanor@domain.com"
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#F7F5F2] border rounded-sm focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-[#DDD9D4] focus:border-[#171717]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone (Optional) */}
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-[#171717] mb-1.5">
                  Phone Number <span className="text-[#6B6864] font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F2] border border-[#DDD9D4] rounded-sm focus:border-[#171717] focus:outline-none transition-colors"
                />
              </div>

              {/* Project Type Selection */}
              <div>
                <label htmlFor="projectType" className="block text-xs font-semibold text-[#171717] mb-1.5">
                  Project Type <span className="text-[#B77958]">*</span>
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F2] border border-[#DDD9D4] rounded-sm focus:border-[#171717] focus:outline-none cursor-pointer"
                >
                  <option value="Full-Service Interior Design">Full-Service Interior Design</option>
                  <option value="Space Planning & Architectural Flow">Space Planning &amp; Architectural Flow</option>
                  <option value="Material & Finish Selection">Material &amp; Finish Selection</option>
                  <option value="Custom Furnishing & Interior Styling">Custom Furnishing &amp; Interior Styling</option>
                  <option value="Initial Design Consultation">Initial Design Consultation (90-min session)</option>
                  <option value="General Residential Inquiry">General Residential Inquiry</option>
                </select>
              </div>

              {/* Consultation Format & Budget in 2 cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="consultationMethod" className="block text-xs font-semibold text-[#171717] mb-1.5">
                    Preferred Meeting Format <span className="text-[#B77958]">*</span>
                  </label>
                  <select
                    id="consultationMethod"
                    name="consultationMethod"
                    value={formData.consultationMethod}
                    onChange={(e) => setFormData({ ...formData, consultationMethod: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F2] border border-[#DDD9D4] rounded-sm focus:border-[#171717] focus:outline-none cursor-pointer"
                  >
                    <option value="In-Studio Meeting">In-Studio Studio Meeting</option>
                    <option value="On-Site Property Walkthrough">On-Site Property Walkthrough</option>
                    <option value="Virtual Video Session">Virtual Video Session</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-xs font-semibold text-[#171717] mb-1.5">
                    Estimated Furnishing / Scope Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F2] border border-[#DDD9D4] rounded-sm focus:border-[#171717] focus:outline-none cursor-pointer"
                  >
                    <option value="Under $25,000">Under $25,000</option>
                    <option value="$25,000 – $50,000">$25,000 – $50,000</option>
                    <option value="$50,000 – $100,000">$50,000 – $100,000</option>
                    <option value="$100,000 – $250,000">$100,000 – $250,000</option>
                    <option value="$250,000+">$250,000+</option>
                    <option value="Still Defining">Still Defining</option>
                  </select>
                </div>
              </div>

              {/* Timeframe */}
              <div>
                <label htmlFor="timeframe" className="block text-xs font-semibold text-[#171717] mb-1.5">
                  Target Project Timeline
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Immediate', '1 – 3 months', '3 – 6 months', 'Planning Ahead'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeframe: opt })}
                      className={`py-2 px-3 text-xs rounded-sm border text-center transition-all cursor-pointer ${
                        formData.timeframe === opt
                          ? 'border-[#171717] bg-[#171717] text-white font-medium'
                          : 'border-[#DDD9D4] bg-[#F7F5F2] text-[#6B6864] hover:border-[#171717]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description / Notes */}
              <div>
                <label htmlFor="description" className="block text-xs font-semibold text-[#171717] mb-1.5">
                  Brief Project Overview &amp; Goals
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Share a few words about your property, rooms to address, or any natural materials and feelings you envision..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5F2] border border-[#DDD9D4] rounded-sm focus:border-[#171717] focus:outline-none transition-colors"
                />
              </div>

              {/* Consent Checkbox */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 accent-[#B77958] rounded-xs cursor-pointer"
                  />
                  <span className="text-xs text-[#6B6864]">
                    I consent to The Ocean Interiors contacting me to discuss this project inquiry.
                    Your details will remain strictly confidential and will never be shared.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.consent}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between border-t border-[#EEEAE5]">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-[#6B6864] hover:text-[#171717] transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#171717] hover:bg-[#252321] rounded-full transition-all cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isSubmitting ? 'Transmitting Details...' : 'Request Consultation'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
