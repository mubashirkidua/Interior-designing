import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, MessageSquare, Phone, BookOpen, ShieldCheck, ChevronDown, Sparkles, Layers, Star, HelpCircle } from 'lucide-react';
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
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary navigation links shown directly in the desktop bar
  const primaryNavLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Before & After', href: '#transformation', badge: 'New' },
    { label: 'Estimator', href: '#estimator', badge: 'PKR' },
    { label: '3D Space', href: '#studio-3d' },
    { label: 'CEO', href: '#leadership' },
  ];

  // Secondary navigation links housed in the sleek "Explore / More" dropdown
  const secondaryNavLinks = [
    { label: 'Materials Library', href: '#materials', desc: 'Tactile stone, wood & metal textures', icon: Layers },
    { label: 'Execution Process', href: '#process', desc: '4-step turnkey architectural methodology', icon: Sparkles },
    { label: 'Client Reviews', href: '#reviews', desc: 'Testimonials from Karachi, Lahore & Islamabad', icon: Star },
    { label: 'FAQ & Advisory', href: '#faq', desc: 'Frequently asked questions & timeline details', icon: HelpCircle },
  ];

  // Complete list for mobile drawer
  const allNavLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Before & After', href: '#transformation', badge: 'New' },
    { label: 'Estimator', href: '#estimator', badge: 'PKR' },
    { label: '3D Space', href: '#studio-3d' },
    { label: 'Materials', href: '#materials', badge: 'Library' },
    { label: 'Process', href: '#process' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'CEO', href: '#leadership' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
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
          ? 'bg-white/95 backdrop-blur-xl border-b border-[#DDD9D4] shadow-xs py-2 sm:py-2.5'
          : 'bg-white/90 backdrop-blur-md border-b border-[#DDD9D4]/70 py-2.5 sm:py-3.5'
      }`}
    >
      {/* Top micro gold accent shimmer line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C99168] to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-4">
        {/* Brand Zone: Beautiful The Ocean Interiors Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77958] rounded-sm shrink-0"
          aria-label="The Ocean Interiors Home"
        >
          <Logo size="md" />
        </a>

        {/* Zone 2: Desktop Navigation Links (Responsive, fits comfortably on 1280px-1440px screens) */}
        <nav
          className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#6B6864]"
          aria-label="Main Navigation"
        >
          {primaryNavLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative px-2 xl:px-2.5 py-1.5 rounded-md hover:text-[#171717] hover:bg-[#F5F2ED] transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-1 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B77958]"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-[8px] font-mono font-bold tracking-tight text-[#C99168] group-hover:text-[#8A5B3D] transition-colors ml-0.5">
                  ·{link.badge}
                </span>
              )}
            </a>
          ))}

          {/* More / Explore Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`px-2 xl:px-2.5 py-1.5 rounded-md transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B77958] ${
                moreDropdownOpen ? 'bg-[#F5F2ED] text-[#171717]' : 'text-[#6B6864] hover:text-[#171717] hover:bg-[#F5F2ED]'
              }`}
              aria-expanded={moreDropdownOpen}
              aria-label="More navigation options"
            >
              <span>More</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  moreDropdownOpen ? 'rotate-180 text-[#B77958]' : 'text-[#8A5B3D]'
                }`}
              />
            </button>

            {/* Dropdown Menu Card */}
            {moreDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#DDD9D4] py-2 z-50 animate-fade-in divide-y divide-[#F0EDE8]">
                <div className="py-1">
                  {secondaryNavLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="flex items-start gap-3 px-4 py-2.5 hover:bg-[#F7F5F2] transition-colors group"
                      >
                        <div className="p-1.5 rounded-md bg-[#FAF9F6] border border-[#DDD9D4] group-hover:border-[#C99168] group-hover:bg-[#C99168]/10 text-[#8A5B3D] shrink-0 mt-0.5">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#171717] group-hover:text-[#B77958] transition-colors">
                            {link.label}
                          </div>
                          <div className="text-[10px] text-[#6B6864] font-normal tracking-normal lowercase first-letter:uppercase">
                            {link.desc}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Additional Quick Actions in Dropdown */}
                <div className="py-2 px-3 space-y-1.5 bg-[#FAF9F6]/60">
                  {onOpenLookbook && (
                    <button
                      type="button"
                      onClick={() => {
                        setMoreDropdownOpen(false);
                        onOpenLookbook();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#171717] hover:text-[#B77958] hover:bg-white rounded-lg border border-transparent hover:border-[#DDD9D4] transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-[#B77958]" />
                        Studio Lookbook
                      </span>
                      <span className="text-[9px] font-mono uppercase text-[#8A5B3D] bg-[#C99168]/15 px-1.5 py-0.5 rounded">PDF</span>
                    </button>
                  )}

                  {onOpenAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        setMoreDropdownOpen(false);
                        onOpenAdmin();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#171717] hover:text-[#C99168] hover:bg-[#141414] hover:text-[#F5D5B8] rounded-lg border border-transparent hover:border-[#C99168]/40 transition-all cursor-pointer group"
                    >
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#C99168]" />
                        Team &amp; CEO Portal
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: Direct Actions (WhatsApp & Consultation CTA) */}
        <div className="flex items-center gap-2 lg:gap-2.5 shrink-0">
          {/* Quick WhatsApp Pill with Live Availability Pulse */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-[#171717] bg-white hover:bg-[#25D366]/8 hover:text-[#1EBE5D] border border-[#DDD9D4] hover:border-[#25D366]/70 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shadow-2xs hover:shadow-xs"
            title="Chat directly on WhatsApp with CEO Muhammad Mubashir Ali"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
            </span>
            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
            <span className="hidden xl:inline font-mono font-semibold text-[11px]">0342-8156086</span>
            <span className="xl:hidden text-[11px] font-semibold">WhatsApp</span>
          </a>

          {/* Primary Consultation Pill Button */}
          <button
            type="button"
            onClick={() => onOpenConsultation()}
            className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 lg:px-4.5 py-1.5 sm:py-2 text-xs font-semibold text-white bg-[#171717] hover:bg-[#252321] rounded-full transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77958] cursor-pointer whitespace-nowrap shrink-0 overflow-hidden active:scale-98"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            <span className="text-[11px] sm:text-xs">Book Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C99168] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
          </button>

          {/* Mobile & Tablet Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-[#171717] hover:text-[#B77958] bg-[#F7F5F2] hover:bg-[#EEEAE5] border border-[#DDD9D4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77958] rounded-full cursor-pointer ml-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bottom-0 bg-white/98 backdrop-blur-xl border-t border-[#DDD9D4] z-50 flex flex-col justify-between px-6 py-6 overflow-y-auto animate-fade-in shadow-2xl">
          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
            {allNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center justify-between text-sm sm:text-base font-semibold text-[#171717] hover:text-[#B77958] transition-colors py-2.5 px-3 rounded-lg hover:bg-[#F7F5F2] border-b border-[#EEEAE5]/60"
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
            <div className="p-4 bg-[#F7F5F2] rounded-xl border border-[#DDD9D4] space-y-3 text-xs shadow-2xs">
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
                  <span className="font-bold text-[#171717] block font-['Playfair_Display',serif] text-sm truncate">
                    Muhammad Mubashir Ali
                  </span>
                  <span className="text-[10px] text-[#B77958] uppercase font-bold tracking-wider block">
                    CEO · The Ocean Interiors
                  </span>
                </div>
              </div>

              {/* CEO Contact Badges */}
              <div className="pt-2 border-t border-[#DDD9D4] grid grid-cols-2 gap-2 text-[11px]">
                <a
                  href="tel:03232930657"
                  className="flex items-center gap-1.5 p-2 bg-white rounded-lg border border-[#DDD9D4] hover:border-[#171717] text-[#171717]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B77958] shrink-0" />
                  <span className="font-mono truncate">0323-2930657</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 p-2 bg-white rounded-lg border border-[#25D366]/40 text-[#1EBE5D] font-semibold"
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
                className="w-full text-center py-2.5 px-4 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
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
                className="w-full text-center py-2.5 px-4 text-xs font-semibold text-white bg-[#171717] rounded-full hover:bg-[#252321] transition-colors cursor-pointer shadow-xs"
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
