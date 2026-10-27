/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TransformationSlider } from './components/TransformationSlider';
import { CostEstimator } from './components/CostEstimator';
import { CeoProfile } from './components/CeoProfile';
import { Philosophy } from './components/Philosophy';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ExecutionProcess } from './components/ExecutionProcess';
import { Testimonials } from './components/Testimonials';
import { ServicesSection } from './components/ServicesSection';
import { FaqSection } from './components/FaqSection';
import { ConsultationBanner } from './components/ConsultationBanner';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { LookbookModal } from './components/LookbookModal';
import { ThreeBackground } from './components/ThreeBackground';
import { SpatialRoom3D } from './components/SpatialRoom3D';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { MaterialSwatchesExplorer } from './components/MaterialSwatchesExplorer';
import { FloatingContactWidget } from './components/FloatingContactWidget';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Project } from './data/projectsData';

export default function App() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isLookbookModalOpen, setIsLookbookModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [selectedServiceOrProject, setSelectedServiceOrProject] = useState<string>('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  React.useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin' || window.location.hash === '#portal') {
        setIsAdminPanelOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenConsultation = (serviceOrProject?: string) => {
    setSelectedServiceOrProject(serviceOrProject || '');
    setIsConsultationModalOpen(true);
  };

  const handleScrollToProjects = () => {
    setActiveProject(null);
    setTimeout(() => {
      const el = document.querySelector('#projects');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleSelectProject = (project: Project) => {
    setActiveProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setActiveProject(null);
    setTimeout(() => {
      const el = document.querySelector('#projects');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleNavigate = (href: string) => {
    if (activeProject) {
      setActiveProject(null);
      setTimeout(() => {
        if (href === '#home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        let element = document.querySelector(href);
        if (!element && href === '#studio') {
          element = document.querySelector('#philosophy');
        }
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 70);
    } else {
      if (href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      let element = document.querySelector(href);
      if (!element && href === '#studio') {
        element = document.querySelector('#philosophy');
      }
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#171717] font-['Plus_Jakarta_Sans',sans-serif] antialiased selection:bg-[#B77958]/20 selection:text-[#171717] flex flex-col justify-between relative overflow-x-hidden">
      {/* Live 3D Architectural Atmosphere Background */}
      <ThreeBackground />

      {/* Full-Page Layout Container: 100% Full Width, Edge to Edge */}
      <div className="w-full min-h-screen bg-white/95 flex flex-col relative z-10 transition-all duration-300">
        {/* Full-Width Header with Navigation & CEO Contact Pills */}
        <Header
          onOpenConsultation={handleOpenConsultation}
          onNavigate={handleNavigate}
          onOpenLookbook={() => setIsLookbookModalOpen(true)}
          onOpenAdmin={() => setIsAdminPanelOpen(true)}
        />

        {/* Main Content Area */}
        {activeProject ? (
          <main className="w-full flex-1 flex flex-col">
            <ProjectDetailPage
              project={activeProject}
              onBack={handleBackToCatalog}
              onSelectProject={handleSelectProject}
              onConsult={handleOpenConsultation}
            />
          </main>
        ) : (
          <main className="w-full flex-1 flex flex-col">
            {/* Centered responsive container for portfolio editorial sections */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col">
              {/* 1. Hero Section with Short Introduction to The Ocean Interiors */}
              <Hero
                onExploreProjects={handleScrollToProjects}
                onOpenConsultation={() => handleOpenConsultation('Hero Consultation')}
              />

              {/* 2. Interactive Before & After Transformation Slider */}
              <TransformationSlider onConsult={handleOpenConsultation} />

              {/* 3. Interactive Turnkey Cost & Budget Estimator (with 1-click WhatsApp to CEO) */}
              <CostEstimator onConsult={handleOpenConsultation} />

              {/* 4. Interactive 3D Spatial Room Experience */}
              <SpatialRoom3D onConsult={handleOpenConsultation} />

              {/* 5. Featured Projects Portfolio (Featuring 6 curated residences) */}
              <FeaturedProjects
                onSelectProject={handleSelectProject}
                onConsult={handleOpenConsultation}
              />

              {/* 6. 4-Step Turnkey Architectural Execution Methodology */}
              <ExecutionProcess onConsult={handleOpenConsultation} />

              {/* 7. Studio Leadership: CEO Muhammad Mubashir Ali Details, Picture & Direct Contacts */}
              <CeoProfile onOpenConsultation={() => handleOpenConsultation('CEO Consultation')} />

              {/* 8. Client Testimonials & Social Proof (DHA, Bahria, Clifton, Islamabad) */}
              <Testimonials />

              {/* 9. Design Philosophy */}
              <Philosophy onOpenConsultation={() => handleOpenConsultation('Philosophy Discussion')} />

              {/* 10. Interactive Material & Bespoke Texture Swatches Explorer */}
              <MaterialSwatchesExplorer onConsult={handleOpenConsultation} />

              {/* 11. Services Section */}
              <ServicesSection onSelectService={handleOpenConsultation} />

              {/* 12. Frequently Asked Questions (FAQ Section) */}
              <FaqSection />

              {/* 13. Large Photographic Consultation Banner */}
              <ConsultationBanner onOpenConsultation={() => handleOpenConsultation('CTA Banner')} />
            </div>
          </main>
        )}

        {/* Full-Width Footer Rendered for Both Views */}
        <Footer
          onOpenConsultation={() => handleOpenConsultation('Footer Consultation')}
          onNavigate={handleNavigate}
          onOpenLookbook={() => setIsLookbookModalOpen(true)}
          onOpenAdmin={() => setIsAdminPanelOpen(true)}
        />
      </div>

      {/* Global Interactive Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        preSelectedProjectOrService={selectedServiceOrProject}
      />

      {/* Global Printable / Downloadable Studio Lookbook Modal */}
      <LookbookModal
        isOpen={isLookbookModalOpen}
        onClose={() => setIsLookbookModalOpen(false)}
      />

      {/* Global Floating Direct CEO Access Widget (WhatsApp, Direct Call, Email) */}
      <FloatingContactWidget
        onOpenConsultation={() => handleOpenConsultation('Floating CEO Widget')}
        onOpenAdmin={() => setIsAdminPanelOpen(true)}
      />

      {/* Global Studio Team & CEO Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />
    </div>
  );
}
