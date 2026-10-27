import React, { useEffect, useState } from 'react';
import { X, ArrowUpRight, Check, MapPin, Calendar, Maximize2, Sparkles, ChevronLeft, ChevronRight, Box, Image as ImageIcon } from 'lucide-react';
import { Project } from '../data/projectsData';
import { SpatialRoom3D } from './SpatialRoom3D';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onConsult: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onConsult,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'photos' | '3d'>('photos');

  useEffect(() => {
    setActiveImageIndex(0);
    setViewMode('photos');
  }, [project]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentImage = project.detailImages[activeImageIndex] || project.mainImage;

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % project.detailImages.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + project.detailImages.length) % project.detailImages.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-sm border border-[#DDD9D4] shadow-2xl overflow-y-auto z-10 flex flex-col focus:outline-none">
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-[#DDD9D4]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B77958]">
              {project.style}
            </span>
            <span className="text-xs text-[#DDD9D4]" aria-hidden="true">|</span>
            <span className="text-xs text-[#6B6864] hidden sm:inline">{project.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#6B6864] hover:text-[#171717] hover:bg-[#F7F5F2] rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77958]"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-8">
          {/* Main Title & Location Lockup */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2
                id="modal-project-title"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171717] font-['Playfair_Display',serif]"
              >
                {project.title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-[#6B6864] mt-2">
                <MapPin className="w-4 h-4 text-[#B77958] shrink-0" />
                <span>{project.displayLocation}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onConsult(project.title)}
              className="group inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-[#171717] rounded-full hover:bg-[#252321] transition-all cursor-pointer whitespace-nowrap self-start md:self-auto shrink-0"
            >
              <span>Consult on Similar Space</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Media View Mode Selector & Showcase */}
          <div className="space-y-3">
            {/* View Mode Tabs */}
            <div className="flex items-center justify-between pb-1 border-b border-[#EEEAE5]">
              <div className="flex items-center gap-1.5 p-1 bg-[#F7F5F2] border border-[#DDD9D4] rounded-full">
                <button
                  type="button"
                  onClick={() => setViewMode('photos')}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'photos'
                      ? 'bg-white text-[#171717] shadow-xs'
                      : 'text-[#6B6864] hover:text-[#171717]'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Photo Gallery</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === '3d'
                      ? 'bg-[#171717] text-white shadow-xs'
                      : 'text-[#6B6864] hover:text-[#171717]'
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-[#C99168]" />
                  <span>Interactive 3D Walkthrough</span>
                </button>
              </div>

              <span className="text-[11px] text-[#6B6864] hidden sm:inline">
                {viewMode === '3d' ? '3D Room Model' : `${activeImageIndex + 1} of ${project.detailImages.length} Photographs`}
              </span>
            </div>

            {viewMode === '3d' ? (
              <div className="w-full rounded-sm overflow-hidden">
                <SpatialRoom3D
                  heightClass="h-[420px] sm:h-[480px]"
                  showCardWrapper={false}
                  onConsult={(topic) => onConsult(topic || project.title)}
                />
              </div>
            ) : (
              <>
                <div className="relative aspect-16/10 sm:aspect-16/9 w-full bg-[#EEEAE5] rounded-sm overflow-hidden border border-[#DDD9D4]">
                  <img
                    src={currentImage}
                    alt={`${project.title} - View ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />

                  {/* Prev / Next Controls if multiple images */}
                  {project.detailImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/85 hover:bg-white text-[#171717] rounded-full backdrop-blur-sm transition-all shadow-sm cursor-pointer"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/85 hover:bg-white text-[#171717] rounded-full backdrop-blur-sm transition-all shadow-sm cursor-pointer"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 text-[11px] rounded-sm font-mono">
                    {activeImageIndex + 1} / {project.detailImages.length}
                  </div>
                </div>

                {/* Thumbnail Selectors */}
                {project.detailImages.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-1">
                    {project.detailImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-sm overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                          activeImageIndex === idx ? 'border-[#B77958] scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Project Details Grid: Narrative & Metadata */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            {/* Left: Design Concept Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B6864] mb-2">
                  Design Narrative &amp; Approach
                </h3>
                <p className="text-base text-[#171717] leading-relaxed">
                  {project.narrative}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B6864] mb-3">
                  Architectural Highlights
                </h3>
                <ul className="space-y-2.5">
                  {project.keyFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#171717]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B77958] mt-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Project Specifications & Material Swatches */}
            <div className="lg:col-span-5 space-y-6">
              {/* Specs Box */}
              <div className="bg-[#F7F5F2] p-5 rounded-sm border border-[#DDD9D4] space-y-3.5">
                <div className="flex justify-between items-center text-sm pb-2.5 border-b border-[#DDD9D4]/60">
                  <span className="text-[#6B6864]">Scope</span>
                  <span className="font-medium text-[#171717] text-right">{project.scope}</span>
                </div>
                <div className="flex justify-between items-center text-sm pb-2.5 border-b border-[#DDD9D4]/60">
                  <span className="text-[#6B6864]">Footprint</span>
                  <span className="font-medium text-[#171717] font-mono">{project.squareFeet}</span>
                </div>
                <div className="flex justify-between items-center text-sm pb-2.5 border-b border-[#DDD9D4]/60">
                  <span className="text-[#6B6864]">Completed</span>
                  <span className="font-medium text-[#171717] font-mono">{project.year}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#6B6864]">Design Style</span>
                  <span className="font-medium text-[#B77958]">{project.style}</span>
                </div>
              </div>

              {/* Material Palette Swatches */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B6864] mb-3">
                  Curated Material Palette
                </h3>
                <div className="space-y-2">
                  {project.materials.map((mat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 bg-white border border-[#DDD9D4] rounded-sm text-xs"
                    >
                      <span className="font-semibold text-[#171717]">{mat.name}</span>
                      <span className="text-[#6B6864]">{mat.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Consultation Banner */}
          <div className="p-6 bg-[#EEEAE5] rounded-sm border border-[#DDD9D4] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-[#171717] font-['Playfair_Display',serif]">
                Envisioning a similar aesthetic for your home?
              </h4>
              <p className="text-xs sm:text-sm text-[#6B6864] mt-0.5">
                Our lead designers collaborate with you on floor plans, millwork, and custom styling.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onConsult(project.title)}
              className="px-5 py-2.5 text-xs font-medium text-white bg-[#171717] rounded-full hover:bg-[#252321] transition-colors cursor-pointer shrink-0"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
