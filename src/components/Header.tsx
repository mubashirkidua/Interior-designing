import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageSquare, Phone, Sparkles, UserCheck, BookOpen, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  onOpenConsultation: (serviceOrProject?: string) => void;
  onNavigate?: (href: string) => void;
  onOpenLookbook?: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation, onNavigate, onOpenLookbook, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Before & After', href: '#transformation', badge: 'New' },
    { label: 'Estimator', href: '#estimator', badge: 'PKR' },
    { label: 'Projects', href: '#projects' },
    { label: 'Materials', href: '#materials', badge: 'Library' },
    { label: '3D Space', href: '#studio-3d' },
    { label: 'Process', href: '#process' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'CEO', href: '#leadership' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-xl border-b border-[#DDD9D4] shadow-xs py-2.5 sm:py-3'
          : 'bg-white/85 backdrop-blur-md border-b border-[#DDD9D4]/60 py-3.5 sm:py-4'
      }`}
    >
      {/* Top micro gold accent shimmer line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C99168] to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
        {/* Brand Zone: Beautiful The Ocean Interiors Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77958] rounded-sm shrink-0"
          aria-label="The Ocean Interiors Home"
        >
          <Logo size="md" />
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          className="hidden xl:flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B6864]"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative px-3 py-1.5 rounded-md hover:text-[#171717] hover:bg-[#F5F2ED] transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-1 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B77958]"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-[8.5px] font-mono font-bold tracking-tight text-[#C99168] group-hover:text-[#8A5B3D] transition-colors ml-0.5">
                  ·{link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Zone 3: Direct Actions (WhatsApp, Direct Call & Consultation) */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-2.5 shrink-0">
          {/* Direct Phone Call Pill */}
          <a
            href="tel:03232930657"
            className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#171717] hover:text-[#B77958] bg-[#F7F5F2] hover:bg-[#EEEAE5] border border-[#DDD9D4] rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap font-mono shadow-2xs hover:border-[#B77958]/50"
            title="Call CEO Muhammad Mubashir Ali"
          >
            <Phone className="w-3.5 h-3.5 text-[#B77958]" />
            <span>0323-2930657</span>
          </a>

          {/* Quick WhatsApp Pill with Live Availability Pulse */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-[#171717] bg-white hover:bg-[#25D366]/8 hover:text-[#1EBE5D] border border-[#DDD9D4] hover:border-[#25D366]/70 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shadow-2xs hover:shadow-xs"
            title="Chat directly on WhatsApp with CEO Muhammad Mubashir Ali"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
            </span>
            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
            <span className="hidden lg:inline font-mono font-semibold">0342-8156086</span>
            <span className="lg:hidden">WhatsApp</span>
          </a>

          {/* Lookbook Profile Button */}
          {onOpenLookbook && (
            <button
              type="button"
              onClick={onOpenLookbook}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#171717] hover:text-[#B77958] bg-[#F7F5F2] hover:bg-[#EEEAE5] border border-[#DDD9D4] hover:border-[#B77958]/40 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shadow-2xs"
              title="View & Download The Ocean Interiors Studio Profile"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#B77958]" />
              <span>Lookbook</span>
            </button>
          )}

          {/* Team & CEO Admin Portal Button */}
          {onOpenAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#171717] hover:text-[#C99168] bg-[#F7F5F2] hover:bg-[#141414] hover:text-[#F5D5B8] border border-[#DDD9D4] hover:border-[#C99168]/50 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shadow-2xs group"
              title="Studio Team & CEO Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C99168]" />
              <span>Team Portal</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </button>
          )}

          {/* Primary Consultation Pill Button */}
          <button
            type="button"
            onClick={() => onOpenConsultation()}
            className="group relative inline-flex items-center gap-2 px-4.5 lg:px-5 py-2 text-xs font-semibold text-white bg-[#171717] hover:bg-[#252321] rounded-full transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77958] cursor-pointer whitespace-nowrap shrink-0 overflow-hidden active:scale-98"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            <span>Book Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C99168] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Action Icons & Toggle Button */}
        <div className="flex xl:hidden items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden p-2 text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/20 rounded-full transition-colors flex items-center justify-center"
            aria-label="Chat on WhatsApp"
            title="WhatsApp CEO Muhammad Mubashir Ali"
          >
            <MessageSquare className="w-4 h-4" />
          </a>

          <a
            href="tel:03232930657"
            className="sm:hidden p-2 text-[#171717] bg-[#F7F5F2] hover:bg-[#EEEAE5] rounded-full transition-colors flex items-center justify-center border border-[#DDD9D4]"
            aria-label="Call Mobile"
            title="Call 0323-2930657"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 text-[#171717] hover:text-[#B77958] bg-[#F7F5F2] hover:bg-[#EEEAE5] border border-[#DDD9D4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77958] rounded-full cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[62px] bottom-0 bg-white/98 backdrop-blur-xl border-t border-[#DDD9D4] z-50 flex flex-col justify-between px-6 py-6 overflow-y-auto animate-fade-in">
          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center justify-between text-base font-semibold text-[#171717] hover:text-[#B77958] transition-colors py-2.5 px-3 rounded-md hover:bg-[#F7F5F2] border-b border-[#EEEAE5]"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#B77958]/12 text-[#B77958]">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Mobile Executive CEO Card */}
          <div className="mt-6 pt-5 border-t border-[#DDD9D4] space-y-3">
            <div className="p-4 bg-[#F7F5F2] rounded-sm border border-[#DDD9D4] space-y-3 text-xs shadow-2xs">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/ceo.jpg_c45767d3.jpg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/public/assets/aistudio/ceo.jpg_c45767d3.jpg';
                  }}
                  alt="Muhammad Mubashir Ali - CEO The Ocean Interiors"
                  className="w-12 h-12 rounded-full object-cover object-top border-2 border-[#C99168] shadow-xs shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#171717] block font-['Playfair_Display',serif] text-sm truncate">
                      Muhammad Mubashir Ali
                    </span>
                    <UserCheck className="w-3.5 h-3.5 text-[#B77958] shrink-0" />
                  </div>
                  <span className="text-[10px] text-[#B77958] uppercase font-bold tracking-wider block">
                    CEO · The Ocean Interiors
                  </span>
                </div>
              </div>

              {/* CEO Contact Badges */}
              <div className="pt-2 border-t border-[#DDD9D4] grid grid-cols-2 gap-2 text-[11px]">
                <a
                  href="tel:03232930657"
                  className="flex items-center gap-1.5 p-2 bg-white rounded border border-[#DDD9D4] hover:border-[#171717] text-[#171717]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B77958] shrink-0" />
                  <span className="font-mono truncate">0323-2930657</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 p-2 bg-white rounded border border-[#25D366]/40 text-[#1EBE5D] font-semibold"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span className="font-mono truncate">0342-8156086</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 px-4 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Directly on WhatsApp</span>
              </a>

              {onOpenLookbook && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLookbook();
                  }}
                  className="w-full text-center py-2.5 px-4 text-xs font-semibold text-[#171717] bg-[#F7F5F2] hover:bg-[#EEEAE5] border border-[#DDD9D4] rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <BookOpen className="w-4 h-4 text-[#B77958]" />
                  <span>View &amp; Print Studio Lookbook</span>
                </button>
              )}

              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full text-center py-2.5 px-4 text-xs font-semibold text-[#F5D5B8] bg-[#141414] hover:bg-[#202020] border border-[#C99168]/40 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C99168]" />
                  <span>Team &amp; CEO Admin Portal</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation('Mobile Navbar');
                }}
                className="w-full text-center py-3 px-4 text-xs font-semibold text-white bg-[#171717] rounded-full hover:bg-[#252321] transition-colors cursor-pointer shadow-xs"
              >
                Book a Design Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
