import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Eye, Sun, Moon, Pause, Play, RefreshCw } from 'lucide-react';

export type ThemeMode = 'sanctuary' | 'terracotta' | 'japandi';

interface ThreeBackgroundProps {
  initialTheme?: ThemeMode;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ initialTheme = 'sanctuary' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialTheme);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(false);

  // Mutable refs to interact with Three.js loop without re-mounting
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialsRef = useRef<{
    stoneMat?: THREE.MeshStandardMaterial;
    accentMat?: THREE.MeshStandardMaterial;
    pedestalMat?: THREE.MeshStandardMaterial;
    particlesMat?: THREE.PointsMaterial;
  }>({});
  const lightsRef = useRef<{
    sunLight?: THREE.DirectionalLight;
    ambientLight?: THREE.HemisphereLight;
    mouseLight?: THREE.PointLight;
  }>({});
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollPosRef = useRef(0);

  // Handle Theme Palette Transitions in Three.js
  useEffect(() => {
    const { stoneMat, accentMat, pedestalMat, particlesMat } = materialsRef.current;
    const { sunLight, ambientLight } = lightsRef.current;

    if (!stoneMat || !accentMat || !pedestalMat || !sunLight || !ambientLight) return;

    if (themeMode === 'sanctuary') {
      // Warm ivory and limestone alabaster
      stoneMat.color.set('#E6E0D8');
      stoneMat.roughness = 0.55;
      accentMat.color.set('#C89F82'); // soft terracotta accent
      accentMat.roughness = 0.45;
      pedestalMat.color.set('#EDE9E3');
      if (particlesMat) particlesMat.color.set('#C99168');
      sunLight.color.set('#FFF6EA');
      sunLight.intensity = 1.4;
      ambientLight.color.set('#FAF6F0');
      ambientLight.groundColor.set('#D9D2C9');
      if (rendererRef.current) rendererRef.current.setClearColor(0xEBE8E3, 1);
      if (sceneRef.current?.fog) sceneRef.current.fog.color.set(0xEBE8E3);
    } else if (themeMode === 'terracotta') {
      // Rich warm caramel and terracotta dusk
      stoneMat.color.set('#DFC5B4');
      stoneMat.roughness = 0.6;
      accentMat.color.set('#B77958'); // deep terracotta
      accentMat.roughness = 0.4;
      pedestalMat.color.set('#D6B69E');
      if (particlesMat) particlesMat.color.set('#B77958');
      sunLight.color.set('#FFDECA');
      sunLight.intensity = 1.6;
      ambientLight.color.set('#F9ECE4');
      ambientLight.groundColor.set('#C99168');
      if (rendererRef.current) rendererRef.current.setClearColor(0xF4E8DF, 1);
      if (sceneRef.current?.fog) sceneRef.current.fog.color.set(0xF4E8DF);
    } else if (themeMode === 'japandi') {
      // Natural light oak, travertine, and serene stone
      stoneMat.color.set('#DCD8CF');
      stoneMat.roughness = 0.7;
      accentMat.color.set('#A48972'); // warm walnut
      accentMat.roughness = 0.5;
      pedestalMat.color.set('#E5E1D8');
      if (particlesMat) particlesMat.color.set('#8A5B3D');
      sunLight.color.set('#FFF9F2');
      sunLight.intensity = 1.3;
      ambientLight.color.set('#F4F1EB');
      ambientLight.groundColor.set('#CDC7BE');
      if (rendererRef.current) rendererRef.current.setClearColor(0xE6E2D8, 1);
      if (sceneRef.current?.fog) sceneRef.current.fog.color.set(0xE6E2D8);
    }
  }, [themeMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL guard
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0xEBE8E3, 0.035);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.5, 12);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0xEBE8E3, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Lighting Rig
    const ambientLight = new THREE.HemisphereLight(0xFAF6F0, 0xD9D2C9, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xFFF6EA, 1.4);
    sunLight.position.set(6, 10, 8);
    scene.add(sunLight);

    const mouseLight = new THREE.PointLight(0xF4DCC9, 1.2, 14);
    mouseLight.position.set(0, 0, 5);
    scene.add(mouseLight);

    lightsRef.current = { sunLight, ambientLight, mouseLight };

    // 5. Materials
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0xE6E0D8,
      roughness: 0.55,
      metalness: 0.08,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0xC89F82,
      roughness: 0.45,
      metalness: 0.12,
    });
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xEDE9E3,
      roughness: 0.6,
      metalness: 0.04,
    });

    materialsRef.current = { stoneMat, accentMat, pedestalMat };

    // 6. Sculptural Architectural Geometry Group
    const architecturalGroup = new THREE.Group();
    scene.add(architecturalGroup);

    // Object A: Monumental Architectural Arch (Slender Curved Torus Arc)
    const archGeo = new THREE.TorusGeometry(3.6, 0.16, 24, 64, Math.PI);
    const archMesh = new THREE.Mesh(archGeo, stoneMat);
    archMesh.position.set(-4.5, -0.5, -2);
    archMesh.rotation.z = Math.PI * 0.05;
    archMesh.rotation.y = Math.PI * 0.18;
    architecturalGroup.add(archMesh);

    // Object B: Right Architectural Arch (Harmonizing opposite side)
    const arch2Geo = new THREE.TorusGeometry(3.2, 0.14, 24, 64, Math.PI * 0.9);
    const arch2Mesh = new THREE.Mesh(arch2Geo, accentMat);
    arch2Mesh.position.set(4.8, 0.8, -3);
    arch2Mesh.rotation.z = -Math.PI * 0.12;
    arch2Mesh.rotation.y = -Math.PI * 0.25;
    architecturalGroup.add(arch2Mesh);

    // Object C: Fluted Pedestal (Cylinder with fluting)
    const pedestalGeo = new THREE.CylinderGeometry(0.75, 0.82, 2.2, 36);
    const pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestalMesh.position.set(-3.8, -1.8, 0.5);
    pedestalMesh.rotation.y = Math.PI * 0.2;
    architecturalGroup.add(pedestalMesh);

    // Object D: Floating Smooth Travertine Sphere atop pedestal
    const sphereGeo = new THREE.SphereGeometry(0.48, 32, 32);
    const sphereMesh = new THREE.Mesh(sphereGeo, accentMat);
    sphereMesh.position.set(-3.8, -0.3, 0.5);
    architecturalGroup.add(sphereMesh);

    // Object E: Sculptural Ellipsoid Stone (Organic pebble)
    const pebbleGeo = new THREE.SphereGeometry(0.85, 32, 32);
    pebbleGeo.scale(1.2, 0.65, 0.9);
    const pebbleMesh = new THREE.Mesh(pebbleGeo, stoneMat);
    pebbleMesh.position.set(4.2, -1.5, 0.2);
    pebbleMesh.rotation.z = Math.PI * 0.1;
    pebbleMesh.rotation.y = Math.PI * 0.35;
    architecturalGroup.add(pebbleMesh);

    // Object F: Floating Minimalist Torus Ring (Zen circle / Enso)
    const ringGeo = new THREE.TorusGeometry(1.4, 0.07, 16, 48);
    const ringMesh = new THREE.Mesh(ringGeo, stoneMat);
    ringMesh.position.set(3.2, 2.4, -1.8);
    ringMesh.rotation.x = Math.PI * 0.3;
    ringMesh.rotation.y = Math.PI * 0.15;
    architecturalGroup.add(ringMesh);

    // Object G: Floating Warm Light Dust Motes / Architectural Particles
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 22;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Simple procedural circular canvas sprite for clean particles
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const ctx = particleCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255,255,255,0.95)');
      gradient.addColorStop(0.4, 'rgba(255,245,235,0.6)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);
    particleTexture.colorSpace = THREE.SRGBColorSpace;

    const particlesMat = new THREE.PointsMaterial({
      size: 0.18,
      map: particleTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xC99168,
    });
    materialsRef.current.particlesMat = particlesMat;

    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // 7. Mouse and Scroll Listeners
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized device coordinates [-1, 1]
      mousePosRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollPosRef.current = window.scrollY;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // 8. Render Animation Loop
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // Smooth exponential damping for mouse coordinates
      mousePosRef.current.x = THREE.MathUtils.damp(
        mousePosRef.current.x,
        mousePosRef.current.targetX,
        3.5,
        delta
      );
      mousePosRef.current.y = THREE.MathUtils.damp(
        mousePosRef.current.y,
        mousePosRef.current.targetY,
        3.5,
        delta
      );

      if (isPlayingRef.current) {
        // Slow architectural breathing movement
        archMesh.rotation.y = Math.PI * 0.18 + Math.sin(elapsedTime * 0.25) * 0.08;
        arch2Mesh.rotation.y = -Math.PI * 0.25 + Math.cos(elapsedTime * 0.28) * 0.08;
        ringMesh.rotation.z = elapsedTime * 0.05;
        sphereMesh.position.y = -0.3 + Math.sin(elapsedTime * 0.7) * 0.06;
        pebbleMesh.rotation.y = Math.PI * 0.35 + Math.sin(elapsedTime * 0.35) * 0.05;

        // Floating dust motes subtle drift
        particlesMesh.rotation.y = elapsedTime * 0.02;
        particlesMesh.rotation.x = Math.sin(elapsedTime * 0.015) * 0.05;
      }

      // Scroll parallax: translate architectural shapes based on page scroll
      const scrollFactor = (scrollPosRef.current / (document.body.scrollHeight || 3000)) * 6;
      architecturalGroup.position.y = -scrollFactor * 0.45;
      architecturalGroup.rotation.y = scrollFactor * 0.15;

      // Subtle camera tilt following cursor for live 3D depth
      camera.position.x = THREE.MathUtils.damp(
        camera.position.x,
        mousePosRef.current.x * 1.2,
        2.5,
        delta
      );
      camera.position.y = THREE.MathUtils.damp(
        camera.position.y,
        1.5 + mousePosRef.current.y * 0.8,
        2.5,
        delta
      );
      camera.lookAt(0, -scrollFactor * 0.3, 0);

      // Mouse light follows interactive cursor
      mouseLight.position.x = mousePosRef.current.x * 6;
      mouseLight.position.y = mousePosRef.current.y * 4;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up WebGL resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js objects
      archGeo.dispose();
      arch2Geo.dispose();
      pedestalGeo.dispose();
      sphereGeo.dispose();
      pebbleGeo.dispose();
      ringGeo.dispose();
      particlesGeo.dispose();
      particleTexture.dispose();

      stoneMat.dispose();
      accentMat.dispose();
      pedestalMat.dispose();
      particlesMat.dispose();

      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      {/* 3D WebGL Canvas Container mounted fixed behind all page content */}
      <div
        ref={mountRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      />

      {/* Floating 3D Theme Customizer Dock in bottom-right */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
        {showControls && (
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-sm border border-[#DDD9D4] shadow-lg text-xs space-y-3 w-64 animate-fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-[#EEEAE5]">
              <span className="font-semibold text-[#171717] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B77958]" />
                3D Live Atmosphere
              </span>
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 text-[#6B6864] hover:text-[#171717] rounded-sm transition-colors cursor-pointer"
                title={isPlaying ? 'Pause 3D Motion' : 'Play 3D Motion'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#B77958]" />}
              </button>
            </div>

            <div>
              <span className="text-[11px] text-[#6B6864] block mb-1.5">Atmosphere Theme:</span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setThemeMode('sanctuary')}
                  className={`py-1.5 px-2 rounded-xs text-[11px] font-medium border text-center transition-all cursor-pointer ${
                    themeMode === 'sanctuary'
                      ? 'bg-[#171717] text-white border-[#171717]'
                      : 'bg-[#F7F5F2] text-[#6B6864] border-[#DDD9D4] hover:border-[#171717]'
                  }`}
                >
                  Sanctuary
                </button>
                <button
                  type="button"
                  onClick={() => setThemeMode('terracotta')}
                  className={`py-1.5 px-2 rounded-xs text-[11px] font-medium border text-center transition-all cursor-pointer ${
                    themeMode === 'terracotta'
                      ? 'bg-[#B77958] text-white border-[#B77958]'
                      : 'bg-[#F7F5F2] text-[#6B6864] border-[#DDD9D4] hover:border-[#B77958]'
                  }`}
                >
                  Terracotta
                </button>
                <button
                  type="button"
                  onClick={() => setThemeMode('japandi')}
                  className={`py-1.5 px-2 rounded-xs text-[11px] font-medium border text-center transition-all cursor-pointer ${
                    themeMode === 'japandi'
                      ? 'bg-[#8A5B3D] text-white border-[#8A5B3D]'
                      : 'bg-[#F7F5F2] text-[#6B6864] border-[#DDD9D4] hover:border-[#8A5B3D]'
                  }`}
                >
                  Japandi
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-[#EEEAE5] flex items-center justify-between text-[10px] text-[#6B6864]">
              <span>Interactive Mouse &amp; Scroll Parallax</span>
              <span className="font-mono text-[#B77958]">Three.js</span>
            </div>
          </div>
        )}

        {/* Minimal Toggle Pill Button */}
        <button
          type="button"
          onClick={() => setShowControls(!showControls)}
          className="group inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#171717] bg-white/90 hover:bg-white border border-[#DDD9D4] rounded-full shadow-md backdrop-blur-md transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77958]"
          aria-label="Toggle 3D atmosphere controls"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#B77958] transition-transform group-hover:rotate-12" />
          <span className="hidden sm:inline">3D Atmosphere</span>
          <span className="w-2 h-2 rounded-full bg-[#B77958]" />
        </button>
      </div>
    </>
  );
};
