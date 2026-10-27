import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Check, Instagram, Linkedin, Facebook, MessageSquare, Phone, Mail, Sparkles, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onOpenConsultation: () => void;
  onNavigate?: (href: string) => void;
  onOpenLookbook?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation, onNavigate, onOpenLookbook, onOpenAdmin }) => {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState('');

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ocean_interiors_subscribers');
      if (stored) {
        const list = JSON.parse(stored);
        if (Array.isArray(list) && list.length > 0) {
          // ready
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setErrorMessage('Please enter your email address.');
      setNewsletterStatus('error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      setNewsletterStatus('error');
      return;
    }

    try {
      const existing = localStorage.getItem('ocean_interiors_subscribers');
      const subscribers = existing ? JSON.parse(existing) : [];
      if (!subscribers.includes(cleanEmail)) {
        subscribers.push(cleanEmail);
        localStorage.setItem('ocean_interiors_subscribers', JSON.stringify(subscribers));
      }
    } catch {
      // ignore
    }

    setSubscribedEmail(cleanEmail);
    setNewsletterStatus('success');
    setEmail('');
    setErrorMessage('');
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Before & After', href: '#transformation' },
    { label: 'Cost Estimator', href: '#estimator' },
    { label: '3D Space', href: '#studio-3d' },
    { label: 'Selected Works', href: '#projects' },
    { label: 'Execution Process', href: '#process' },
    { label: 'Client Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
      return;
    }
    let element = document.querySelector(href);
    if (!element && href === '#studio') {
      element = document.querySelector('#philosophy');
    }
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappUrl =
    'https://wa.me/923428156086?text=Hello%20Muhammad%20Mubashir%20Ali,%20I%20am%20interested%20in%20The%20Ocean%20Interiors%20design%20services';

  return (
    <footer id="contact" className="w-full pt-16 pb-12 bg-[#0E0E0E] text-white border-t border-[#C99168]/30 relative overflow-hidden scroll-mt-20">
      {/* Subtle luxury ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C99168]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B77958]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Top 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-12">
          {/* Left Column: Brand Statement & Newsletter Subscription */}
          <div className="lg:col-span-7 space-y-6">
            {/* Bespoke Luxury Editorial Frame - Black Background with Warm Brown Typography */}
            <div className="relative p-6 sm:p-7 rounded-2xl bg-[#141414] border border-[#C99168]/40 shadow-xl shadow-black/40 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-[#C99168]/60 group">
              {/* Architectural Drafting Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C99168]" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C99168]" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C99168]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C99168]" />

              {/* Subtle luxury ambient glow */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#C99168]/15 rounded-full blur-2xl pointer-events-none" />

              {/* Frame Header with Logo */}
              <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-[#C99168]/20">
                <Logo variant="light" size="md" />
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#C99168]/15 text-[#E6B38A] font-bold border border-[#C99168]/30">
                  Turnkey Studio
                </span>
              </div>

              {/* Exact Brand Statement Text */}
              <p className="text-sm sm:text-[14.5px] text-[#D8B494] leading-relaxed relative z-10 font-normal">
                The Ocean Interiors blends fluid lines, honest materials, and refined details
                to create residential spaces that feel calm, personal, and grounded.
                Founded and led by CEO <strong className="text-[#E6B38A] font-semibold underline decoration-[#C99168]/50 underline-offset-2">Muhammad Mubashir Ali</strong>.
              </p>

              {/* Bottom Leadership Attribution */}
              <div className="mt-4 pt-3 border-t border-[#C99168]/20 flex items-center justify-between text-[11px] relative z-10">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C99168]" />
                  <span className="font-semibold text-[#F5D5B8]">Muhammad Mubashir Ali</span>
                  <span className="text-[#A88060]">· CEO &amp; Principal</span>
                </div>
                <span className="font-mono text-[10px] text-[#C99168] font-semibold tracking-wider uppercase">
                  Bespoke Residences
                </span>
              </div>
            </div>

            {/* Design Inspiration Updates Newsletter Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#141414] border border-[#C99168]/30 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C99168] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#F5D5B8] font-mono">
                  Design Inspiration Updates
                </span>
              </div>
              <p className="text-xs text-[#D8B494] leading-relaxed mb-4">
                Join our private mailing list for seasonal interior edits, material palette guides, and architectural notes.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-2.5" noValidate>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="relative flex-1">
                    <label htmlFor="footer-newsletter-email" className="sr-only">
                      Email address for design inspiration updates
                    </label>
                    <input
                      id="footer-newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (newsletterStatus === 'error') setNewsletterStatus('idle');
                      }}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#1A1A1A] border border-[#C99168]/40 rounded-full focus:outline-none focus:border-[#F5D5B8] text-[#F5D5B8] placeholder:text-[#8A5B3D] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#C99168] to-[#B77958] hover:from-[#d9a27b] hover:to-[#c68969] rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-md active:scale-95"
                  >
                    Get Updates
                  </button>
                </div>

                {newsletterStatus === 'success' && (
                  <div className="flex items-start gap-2 p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-xs text-emerald-200 animate-fade-in">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-emerald-300">You are now subscribed!</span>
                      <span className="text-emerald-200/90">
                        We have captured <strong className="text-white">{subscribedEmail}</strong>. You'll receive our next design inspiration dispatch.
                      </span>
                    </div>
                  </div>
                )}

                {newsletterStatus === 'error' && (
                  <p className="text-xs text-rose-400 pt-0.5 font-medium">{errorMessage}</p>
                )}

                <p className="text-[11px] text-[#A88060]">
                  Thoughtful, occasional dispatches only. You can unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>

          {/* Right Column: Clean Navigation Links & Studio Contact */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {/* Column 1: Navigate */}
              <div>
                <span className="text-xs font-bold text-[#F5D5B8] block mb-3.5 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C99168]" />
                  <span>Navigate</span>
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-[#D8B494]">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => handleAnchorClick(e, link.href)}
                        className="hover:text-white transition-colors block py-0.5"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Studio */}
              <div>
                <span className="text-xs font-bold text-[#F5D5B8] block mb-3.5 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C99168]" />
                  <span>Studio</span>
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-[#D8B494]">
                  <li>
                    <a href="#leadership" onClick={(e) => handleAnchorClick(e, '#leadership')} className="hover:text-white transition-colors block py-0.5">
                      CEO Leadership
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenConsultation}
                      className="hover:text-white transition-colors cursor-pointer text-left block py-0.5"
                    >
                      Consultations
                    </button>
                  </li>
                  <li>
                    <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')} className="hover:text-white transition-colors block py-0.5">
                      Capabilities
                    </a>
                  </li>
                  <li>
                    <a href="#projects" onClick={(e) => handleAnchorClick(e, '#projects')} className="hover:text-white transition-colors block py-0.5">
                      Selected Works
                    </a>
                  </li>
                  {onOpenLookbook && (
                    <li className="pt-1">
                      <button
                        type="button"
                        onClick={onOpenLookbook}
                        className="text-[#E6B38A] hover:text-white font-semibold transition-colors cursor-pointer text-left flex items-center gap-1.5 py-0.5"
                      >
                        <span>Studio Lookbook</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#C99168]/20 border border-[#C99168]/40 text-[9px] font-mono text-[#F5D5B8]">PDF</span>
                      </button>
                    </li>
                  )}
                  {onOpenAdmin && (
                    <li className="pt-1.5">
                      <button
                        type="button"
                        onClick={onOpenAdmin}
                        className="text-[#E6B38A] hover:text-white font-semibold transition-colors cursor-pointer text-left flex items-center gap-1.5 py-0.5"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#C99168]" />
                        <span>Team Admin Portal</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#C99168]/20 border border-[#C99168]/40 text-[9px] font-mono text-[#F5D5B8]">CEO</span>
                      </button>
                    </li>
                  )}
                </ul>
              </div>

              {/* Column 3: Direct Contact */}
              <div className="col-span-2 sm:col-span-1">
                <span className="text-xs font-bold text-[#F5D5B8] block mb-3.5 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C99168]" />
                  <span>Direct Contact</span>
                </span>
                <div className="p-4 rounded-xl bg-[#141414] border border-[#C99168]/30 space-y-2 shadow-md">
                  <p className="font-bold text-sm text-[#F5D5B8] font-['Playfair_Display',serif]">Muhammad Mubashir Ali</p>
                  <p className="text-[10px] font-mono text-[#C99168] uppercase tracking-wider">CEO &amp; Principal</p>

                  <div className="pt-2 border-t border-[#C99168]/20 space-y-2 text-xs">
                    <a
                      href="mailto:alimuhammd98573@gmail.com"
                      className="flex items-center gap-1.5 text-[#D8B494] hover:text-white transition-colors truncate"
                      title="Email CEO Directly"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#C99168] shrink-0" />
                      <span className="truncate text-[11px]">alimuhammd98573@gmail.com</span>
                    </a>

                    <a
                      href="tel:03232930657"
                      className="flex items-center gap-1.5 text-[#D8B494] hover:text-white transition-colors font-mono"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C99168] shrink-0" />
                      <span>0323-2930657</span>
                    </a>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[#25D366] hover:underline font-mono font-medium text-[11px]"
                    >
                      <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                      <span>0342-8156086 (WhatsApp)</span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={onOpenConsultation}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-gradient-to-r from-[#C99168] to-[#B77958] hover:from-[#d9a27b] hover:to-[#c68969] text-white font-bold text-xs rounded-full transition-all shadow-sm cursor-pointer active:scale-95"
                    >
                      <span>Book Consultation</span>
                      <ArrowUpRight className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Row with Socials & Dynamic Copyright */}
        <div className="pt-8 border-t border-[#C99168]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#A88060]">
            &copy; {currentYear} The Ocean Interiors. All rights reserved.
          </p>

          {/* Social Icons matching luxury theme */}
          <div className="flex items-center gap-3 text-[#D8B494]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Ocean Interiors on Instagram"
              className="w-8 h-8 rounded-full border border-[#C99168]/30 bg-[#141414] flex items-center justify-center hover:border-[#F5D5B8] hover:text-white hover:bg-[#C99168]/20 transition-all cursor-pointer"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Ocean Interiors on LinkedIn"
              className="w-8 h-8 rounded-full border border-[#C99168]/30 bg-[#141414] flex items-center justify-center hover:border-[#F5D5B8] hover:text-white hover:bg-[#C99168]/20 transition-all cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Ocean Interiors on Facebook"
              className="w-8 h-8 rounded-full border border-[#C99168]/30 bg-[#141414] flex items-center justify-center hover:border-[#F5D5B8] hover:text-white hover:bg-[#C99168]/20 transition-all cursor-pointer"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
