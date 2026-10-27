import React, { useState } from 'react';
import { ArrowUpRight, Maximize2, Sparkles } from 'lucide-react';
import { FEATURED_PROJECTS, Project } from '../data/projectsData';
import { ImageLightboxModal, LightboxImageItem } from './ImageLightboxModal';

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
  onConsult: (projectTitle?: string) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  onSelectProject,
  onConsult,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(0);

  const categories = ['All', 'Living & Dining', 'Full Residence', 'Retreats'];

  const filteredProjects =
    selectedCategory === 'All'
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === selectedCategory);

  const galleryImages: LightboxImageItem[] = filteredProjects.map((p) => ({
    url: p.mainImage,
    title: p.title,
    subtitle: `${p.style} · ${p.squareFeet}`,
    category: p.category,
    location: p.displayLocation,
  }));

  const handleOpenLightbox = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="projects" className="w-full py-16 lg:py-24 border-t border-[#DDD9D4] scroll-mt-20">
      {/* Centered Editorial Header Matching Reference */}
      <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B77958]">
            Selected Works
          </span>
          <span className="text-xs text-[#6B6864] font-mono">({FEATURED_PROJECTS.length} Residences)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-[#171717] leading-[1.12] font-['Playfair_Display',serif]">
          Recent work &amp; featured spaces
        </h2>

        {/* Bespoke Luxury Editorial Frame - Black Background with Warm Brown Typography */}
        <div className="mt-4 relative p-4.5 sm:p-5 rounded-2xl bg-[#141414] border border-[#C99168]/40 shadow-xl shadow-black/30 overflow-hidden text-left transition-all duration-300 hover:shadow-2xl hover:border-[#C99168]/60 group">
          {/* Architectural Drafting Corner Accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C99168]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C99168]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C99168]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C99168]" />

          {/* Subtle luxury ambient glow */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#C99168]/15 rounded-full blur-2xl pointer-events-none" />

          {/* Frame Top Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#C99168]/20">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C99168] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C99168] font-mono">
                Architectural Portfolio
              </span>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#C99168]/15 text-[#E6B38A] font-bold border border-[#C99168]/30">
              Curated
            </span>
          </div>

          <p className="text-sm sm:text-[14.5px] text-[#D8B494] leading-relaxed relative z-10 font-normal">
            A collection of homes shaped by natural materials, meaningful details,
            and the way people truly live. Handcrafted turnkey execution across Pakistan.
          </p>

          <div className="mt-3 pt-2.5 border-t border-[#C99168]/20 flex items-center justify-between text-[11px] relative z-10">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C99168]" />
              <span className="font-semibold text-[#F5D5B8]">The Ocean Interiors</span>
              <span className="text-[#A88060]">· Turnkey Portfolio</span>
            </div>
            <span className="font-mono text-[10px] text-[#C99168] font-semibold tracking-wider uppercase">
              Bespoke Homes
            </span>
          </div>
        </div>

        {/* Clean Interactive Category Filter */}
        <div className="flex items-center justify-center gap-1.5 mt-7 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-[#171717] text-white shadow-xs'
                  : 'bg-[#F7F5F2] text-[#6B6864] hover:text-[#171717] hover:bg-[#EEEAE5]'
              }`}
            >
              {category === 'All' ? 'All Spaces' : category}
            </button>
          ))}
        </div>
      </div>

      {/* 6-Card Grid: Responsive 3-Column Layout with strictly equal size and shape */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 items-stretch">
        {filteredProjects.map((project, index) => {
          return (
            <div
              key={project.id}
              className="flex flex-col h-full group transition-all duration-300"
            >
              {/* Card Image Container - Strictly Equal Size & Shape */}
              <div
                onClick={() => onSelectProject(project)}
                className="relative w-full aspect-[16/11] overflow-hidden rounded-2xl bg-[#141414] border border-[#C99168]/30 cursor-pointer shadow-lg group/img shrink-0"
              >
                <img
                  src={project.mainImage}
                  alt={project.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Subtle Style Tag on Image */}
                <div className="absolute top-3 left-3 bg-[#141414]/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#F5D5B8] rounded-full border border-[#C99168]/40 shadow-sm">
                  {project.style}
                </div>

                {/* Quick High-Res Lightbox View Button */}
                <button
                  type="button"
                  onClick={(e) => handleOpenLightbox(index, e)}
                  className="absolute top-3 right-3 bg-black/70 hover:bg-black/90 text-[#F5D5B8] p-2 rounded-full backdrop-blur-sm transition-all duration-200 cursor-pointer shadow-sm hover:scale-110 opacity-80 group-hover:opacity-100 border border-[#C99168]/30"
                  title="Expand to Full Screen Lightbox"
                  aria-label={`View full screen image of ${project.title}`}
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#E6B38A]" />
                </button>

                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-[#E6B38A] px-2.5 py-0.5 text-[10px] rounded-full font-mono border border-[#C99168]/30">
                  {project.category}
                </div>
              </div>

              {/* Bespoke Luxury Editorial Frame Below Photo - Black Background with Warm Brown Typography */}
              <div className="mt-3.5 relative p-5 rounded-2xl bg-[#141414] border border-[#C99168]/40 shadow-xl shadow-black/40 overflow-hidden text-left transition-all duration-300 hover:shadow-2xl hover:border-[#C99168]/70 flex flex-col justify-between flex-1 group/frame">
                {/* Architectural Drafting Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C99168]" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C99168]" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C99168]" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C99168]" />

                {/* Subtle luxury ambient glow */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#C99168]/15 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  {/* Title / Badge Bar with Architectural Index */}
                  <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#C99168]/20">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#C99168] font-bold">
                        {String(index + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
                      </span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-[11px] font-bold text-[#E6B38A] uppercase tracking-wider font-mono">
                        {project.title}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#C99168]/15 text-[#F5D5B8] border border-[#C99168]/30 font-semibold">
                      Residence
                    </span>
                  </div>

                  {/* Location Address */}
                  <h3
                    onClick={() => onSelectProject(project)}
                    className="text-sm sm:text-[15px] font-bold text-[#F5D5B8] tracking-tight group-hover/frame:text-white transition-colors cursor-pointer font-['Playfair_Display',serif] leading-snug"
                  >
                    {project.displayLocation}
                  </h3>

                  {/* Summary Description Text */}
                  <p className="text-xs sm:text-[13px] text-[#D8B494] leading-relaxed mt-2.5 font-normal">
                    {project.summary}
                  </p>
                </div>

                {/* Pill Action Button & Dimensions */}
                <div className="mt-4 pt-3.5 border-t border-[#C99168]/20 flex items-center justify-between relative z-10">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#C99168] to-[#B77958] hover:from-[#d9a27b] hover:to-[#c68969] rounded-full transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-95"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/frame:translate-x-0.5 group-hover/frame:-translate-y-0.5" />
                  </button>

                  <span className="text-xs font-mono font-semibold text-[#E6B38A]">
                    {project.squareFeet}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full-Page Gallery Lightbox Modal */}
      <ImageLightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={galleryImages}
        initialIndex={activeLightboxIndex}
      />
    </section>
  );
};
