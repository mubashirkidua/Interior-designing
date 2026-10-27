import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Box,
  Image as ImageIcon,
  Check,
  Maximize2,
  X
} from 'lucide-react';
import { Project, FEATURED_PROJECTS } from '../data/projectsData';
import { SpatialRoom3D } from './SpatialRoom3D';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (proj: Project) => void;
  onConsult: (projectTitle: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
  onSelectProject,
  onConsult,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'photos' | '3d'>('photos');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
    setViewMode('photos');
    setIsLightboxOpen(false);
  }, [project.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % project.detailImages.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + project.detailImages.length) % project.detailImages.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, project.detailImages.length]);

  const currentIndex = FEATURED_PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject =
    FEATURED_PROJECTS[(currentIndex - 1 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length];
  const nextProject = FEATURED_PROJECTS[(currentIndex + 1) % FEATURED_PROJECTS.length];

  const currentImage = project.detailImages[activeImageIndex] || project.mainImage;

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % project.detailImages.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + project.detailImages.length) % project.detailImages.length);
  };

  return (
    <article className="w-full bg-white pb-20 animate-fade-in flex flex-col">
      {/* Sticky Top Project Bar - Full Width with Centered Max Container */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#DDD9D4] py-3.5 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-xs font-semibold text-[#171717] hover:text-[#B77958] transition-colors cursor-pointer py-1.5 focus-visible:outline-none focus-visible:underline"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Projects</span>
          </button>

          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs font-semibold text-[#171717] font-['Playfair_Display',serif]">{project.title}</span>
            <span className="text-xs text-[#DDD9D4]">|</span>
            <span className="text-xs text-[#6B6864]">{project.category}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onConsult(project.title)}
              className="group inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#171717] hover:bg-[#252321] rounded-full transition-all cursor-pointer whitespace-nowrap shadow-xs"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12">
        {/* Project Header & Metadata */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#DDD9D4]">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 mb-3 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B77958]">
                {project.style}
              </span>
              <span className="text-xs text-[#DDD9D4]">·</span>
              <span className="text-xs text-[#6B6864] font-medium">{project.category}</span>
              <span className="text-xs text-[#DDD9D4]">·</span>
              <span className="text-xs font-mono text-[#6B6864]">{project.year}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#171717] leading-[1.08] font-['Playfair_Display',serif]">
              {project.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-[#6B6864] mt-3">
              <MapPin className="w-4 h-4 text-[#B77958] shrink-0" />
              <span>{project.displayLocation}</span>
            </div>
          </div>

          {/* Quick Metrics Badge Strip */}
          <div className="flex items-center gap-6 text-xs text-[#171717] self-start lg:self-end border-t lg:border-t-0 pt-4 lg:pt-0 border-[#EEEAE5]">
            <div>
              <span className="text-[#6B6864] block text-[11px] uppercase tracking-wider">Footprint</span>
              <span className="font-mono font-bold text-sm sm:text-base">{project.squareFeet}</span>
            </div>
            <div className="h-8 w-px bg-[#DDD9D4]" />
            <div>
              <span className="text-[#6B6864] block text-[11px] uppercase tracking-wider">Completed</span>
              <span className="font-mono font-bold text-sm sm:text-base">{project.year}</span>
            </div>
            <div className="h-8 w-px bg-[#DDD9D4]" />
            <div>
              <span className="text-[#6B6864] block text-[11px] uppercase tracking-wider">Scope</span>
              <span className="font-medium text-xs max-w-44 truncate block">{project.scope}</span>
            </div>
          </div>
        </div>

        {/* Media Showcase: 2D Photo Gallery vs 3D Spatial Walkthrough */}
        <div className="py-8 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-[#EEEAE5]">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1.5 p-1 bg-[#F7F5F2] border border-[#DDD9D4] rounded-full">
              <button
                type="button"
                onClick={() => setViewMode('photos')}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'photos'
                    ? 'bg-white text-[#171717] shadow-xs font-semibold'
                    : 'text-[#6B6864] hover:text-[#171717]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Editorial Photography ({project.detailImages.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('3d')}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === '3d'
                    ? 'bg-[#171717] text-white shadow-xs font-semibold'
                    : 'text-[#6B6864] hover:text-[#171717]'
                }`}
              >
                <Box className="w-3.5 h-3.5 text-[#C99168]" />
                <span>Live 3D Spatial Walkthrough</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#6B6864]">
                {viewMode === '3d'
                  ? 'Interactive 3D model with lighting and material controls'
                  : `Viewing image ${activeImageIndex + 1} of ${project.detailImages.length}`}
              </span>

              {viewMode === 'photos' && (
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#171717] hover:text-[#B77958] bg-[#F7F5F2] hover:bg-[#EEEAE5] border border-[#DDD9D4] rounded-full transition-colors cursor-pointer"
                  title="Expand to Full Page Lightbox"
                >
                  <Maximize2 className="w-3 h-3 text-[#B77958]" />
                  <span>Full Page View</span>
                </button>
              )}
            </div>
          </div>

          {viewMode === '3d' ? (
            <div className="w-full rounded-sm overflow-hidden shadow-sm">
              <SpatialRoom3D
                heightClass="h-[520px] sm:h-[620px] lg:h-[700px]"
                showCardWrapper={false}
                onConsult={() => onConsult(project.title)}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Main Lead Image Container */}
              <div className="relative aspect-16/10 sm:aspect-16/9 w-full bg-[#EEEAE5] rounded-sm overflow-hidden border border-[#DDD9D4] shadow-sm group">
                <img
                  src={currentImage}
                  alt={`${project.title} - Main Photograph ${activeImageIndex + 1}`}
                  loading="eager"
                  className="w-full h-full object-cover transition-opacity duration-300 cursor-pointer"
                  onClick={() => setIsLightboxOpen(true)}
                />

                {/* Full-Page Lightbox Trigger Overlay */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#171717] px-3 py-1.5 rounded-full text-xs font-medium border border-[#DDD9D4] shadow-md backdrop-blur-md flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-105"
                  title="Open Full Page Lightbox"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#B77958]" />
                  <span>Full Screen</span>
                </button>

                {project.detailImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white text-[#171717] rounded-full backdrop-blur-sm transition-all shadow-md cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white text-[#171717] rounded-full backdrop-blur-sm transition-all shadow-md cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 text-xs rounded-sm font-mono">
                  {activeImageIndex + 1} / {project.detailImages.length}
                </div>
              </div>

              {/* Thumbnail Gallery Strip */}
              {project.detailImages.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-1">
                  {project.detailImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-4/3 rounded-sm overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#B77958] scale-102 shadow-xs'
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Narrative, Materials & Specifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 py-12 border-t border-[#DDD9D4]">
          {/* Left: Design Concept Narrative & Key Architectural Features */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B77958] block mb-2">
                Concept &amp; Brief
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171717] font-['Playfair_Display',serif]">
                A sanctuary shaped around everyday living
              </h2>
              <p className="text-base sm:text-lg text-[#171717] leading-relaxed mt-4">
                {project.narrative}
              </p>
              <p className="text-sm sm:text-base text-[#6B6864] leading-relaxed mt-3">
                {project.summary} Every surface and fixture was selected to promote a deep sense of stillness,
                tactile connection, and effortless residential functionality.
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B6864] block mb-3">
                Architectural Highlights &amp; Interventions
              </span>
              <div className="space-y-3">
                {project.keyFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 bg-[#F7F5F2] rounded-sm border border-[#DDD9D4]/60">
                    <Check className="w-4 h-4 text-[#B77958] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#171717]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Materials Palette & Detailed Specifications */}
          <div className="lg:col-span-5 space-y-8">
            {/* Project Specifications Card */}
            <div className="bg-[#F7F5F2] p-6 rounded-sm border border-[#DDD9D4] space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#171717] pb-2 border-b border-[#DDD9D4]">
                Project Overview &amp; Parameters
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-start pb-2 border-b border-[#EEEAE5]">
                  <span className="text-[#6B6864]">Project Scope:</span>
                  <span className="font-semibold text-[#171717] text-right max-w-56">{project.scope}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#EEEAE5]">
                  <span className="text-[#6B6864]">Total Area:</span>
                  <span className="font-mono font-semibold text-[#171717]">{project.squareFeet}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#EEEAE5]">
                  <span className="text-[#6B6864]">Completed Year:</span>
                  <span className="font-mono font-semibold text-[#171717]">{project.year}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#EEEAE5]">
                  <span className="text-[#6B6864]">Design Style:</span>
                  <span className="font-semibold text-[#B77958]">{project.style}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B6864]">Lead Studio:</span>
                  <span className="font-semibold text-[#171717]">The Ocean Interiors</span>
                </div>
              </div>
            </div>

            {/* Curated Material Swatches */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-[#B77958]" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                  Curated Material Palette
                </h3>
              </div>

              <div className="space-y-2">
                {project.materials.map((mat, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-white border border-[#DDD9D4] rounded-sm text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#171717] block">{mat.name}</span>
                      <span className="text-[11px] text-[#6B6864]">{mat.type}</span>
                    </div>
                    <span className="w-3 h-3 rounded-full border border-[#DDD9D4] bg-[#EEEAE5]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Next & Previous Project Navigation */}
        <div className="py-10 border-t border-[#DDD9D4] grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            type="button"
            onClick={() => onSelectProject(prevProject)}
            className="group p-5 bg-[#F7F5F2] hover:bg-[#EEEAE5] rounded-sm border border-[#DDD9D4] text-left transition-all cursor-pointer flex items-center justify-between"
          >
            <div>
              <span className="text-[11px] text-[#6B6864] uppercase tracking-wider block">
                &larr; Previous Residence
              </span>
              <span className="text-base font-bold text-[#171717] group-hover:text-[#B77958] transition-colors font-['Playfair_Display',serif]">
                {prevProject.title}
              </span>
            </div>
            <span className="text-xs text-[#6B6864] font-mono">{prevProject.category}</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectProject(nextProject)}
            className="group p-5 bg-[#F7F5F2] hover:bg-[#EEEAE5] rounded-sm border border-[#DDD9D4] text-right transition-all cursor-pointer flex items-center justify-between"
          >
            <span className="text-xs text-[#6B6864] font-mono">{nextProject.category}</span>
            <div>
              <span className="text-[11px] text-[#6B6864] uppercase tracking-wider block">
                Next Residence &rarr;
              </span>
              <span className="text-base font-bold text-[#171717] group-hover:text-[#B77958] transition-colors font-['Playfair_Display',serif]">
                {nextProject.title}
              </span>
            </div>
          </button>
        </div>

        {/* Bottom Consultation Banner */}
        <div className="mt-8 p-8 sm:p-12 bg-[#171717] text-white rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C99168] block mb-2">
              Private Commission
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display',serif]">
              Envisioning a similar space for your home?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
              From architectural layouts to custom furniture fabrication and finish selection,
              we bring this exact level of intention to your project.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onBack}
              className="px-5 py-2.5 text-xs font-medium text-white border border-white/40 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              All Projects
            </button>
            <button
              type="button"
              onClick={() => onConsult(project.title)}
              className="px-6 py-2.5 text-xs font-medium text-[#171717] bg-white rounded-full hover:bg-[#F7F5F2] transition-colors cursor-pointer shadow-xs"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Immersive Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fade-in"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-10 pb-2">
            <div>
              <h4 className="text-base sm:text-lg font-bold font-['Playfair_Display',serif]">
                {project.title}
              </h4>
              <p className="text-xs text-white/70">
                {activeImageIndex + 1} of {project.detailImages.length} · {project.displayLocation}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(false);
                  onConsult(project.title);
                }}
                className="hidden sm:inline-flex px-4 py-1.5 text-xs font-medium text-[#171717] bg-white rounded-full hover:bg-[#F7F5F2] transition-colors cursor-pointer"
              >
                Inquire About This Space
              </button>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                title="Close Full Page View (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Centered High Res Image */}
          <div className="relative flex-1 flex items-center justify-center my-2 overflow-hidden">
            <img
              src={currentImage}
              alt={`${project.title} Full Page Photograph`}
              className="max-h-[82vh] max-w-[95vw] object-contain rounded-xs shadow-2xl"
            />

            {project.detailImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-all cursor-pointer shadow-lg"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-all cursor-pointer shadow-lg"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          {project.detailImages.length > 1 && (
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-10">
              {project.detailImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-12 rounded-xs overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activeImageIndex === idx ? 'border-[#B77958] scale-105' : 'border-white/30 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
};
