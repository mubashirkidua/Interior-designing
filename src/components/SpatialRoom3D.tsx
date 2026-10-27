import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  Sun,
  Moon,
  Camera,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Info,
  Check,
  Compass,
  Palette,
  ChevronDown,
  Layers,
  X
} from 'lucide-react';

export type LightingPreset = 'morning' | 'golden' | 'evening';
export type MaterialPreset = 'white-oak' | 'smoked-walnut' | 'warm-terracotta';
export type CameraPreset = 'default' | 'lounge' | 'staircase' | 'topdown';

interface Hotspot {
  id: string;
  name: string;
  subtitle: string;
  position: [number, number, number];
  description: string;
  material: string;
  dimensions: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'sofa',
    name: 'Modular Oatmeal Linen Lounge',
    subtitle: 'Deep-seated residential comfort',
    position: [0.5, 0.9, 0.5],
    description: 'Custom low-profile sectional upholstered in unbleached Belgian linen with memory-foam and down blend fill.',
    material: 'Belgian Linen & Down Feather',
    dimensions: '112" W x 84" D x 29" H'
  },
  {
    id: 'table',
    name: 'Fluted Blonde Oak Center Table',
    subtitle: 'Tactile architectural geometry',
    position: [0.2, 0.5, 2.2],
    description: 'Solid European white oak coffee table featuring precision CNC-fluted base and soft chamfered edge.',
    material: 'European White Oak in Matte Wax',
    dimensions: '42" Diameter x 14" H'
  },
  {
    id: 'staircase',
    name: 'Open-Tread Cantilevered Stair',
    subtitle: 'Vertical architectural circulation',
    position: [-3.2, 2.4, -2.8],
    description: 'Suspended white oak treads anchored with hidden steel armature and matte blackened steel balustrade.',
    material: 'FSC Solid Oak & Blackened Steel',
    dimensions: '38" Tread Width'
  },
  {
    id: 'pendant',
    name: 'Sculptural Woven Cane Lantern',
    subtitle: 'Natural diffused focal lighting',
    position: [0.3, 4.0, 1.2],
    description: 'Hand-woven natural rattan shade casting organic shadow play across the double-height living room.',
    material: 'Natural Cane & Braided Cord',
    dimensions: '28" Diameter x 34" H'
  }
];

interface SpatialRoom3DProps {
  heightClass?: string;
  onConsult?: (topic?: string) => void;
  showCardWrapper?: boolean;
}

export const SpatialRoom3D: React.FC<SpatialRoom3DProps> = ({
  heightClass = 'h-[520px] sm:h-[620px] lg:h-[700px]',
  onConsult,
  showCardWrapper = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [lighting, setLighting] = useState<LightingPreset>('morning');
  const [materialPreset, setMaterialPreset] = useState<MaterialPreset>('white-oak');
  const [activeCamera, setActiveCamera] = useState<CameraPreset>('default');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Auto trigger resize and listen to Escape key when full screen mode changes
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullScreen]);

  // Three.js mutable state refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number>(0);

  // Dynamic light & material references
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const pendantLightRef = useRef<THREE.PointLight | null>(null);
  const woodMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const upholsteryMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const rugMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

  // Camera target animation state
  const targetCamPos = useRef(new THREE.Vector3(5.2, 4.2, 7.5));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.2, 0));

  // Procedural Wood Grain Texture Generator
  const createWoodTexture = (tone: 'light' | 'dark' | 'honey') => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const baseColor = tone === 'light' ? '#D9C8B4' : tone === 'dark' ? '#5E4A3B' : '#B88B63';
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = tone === 'light' ? 'rgba(180, 150, 130, 0.25)' : 'rgba(40, 30, 20, 0.25)';
    ctx.lineWidth = 2;

    for (let i = 0; i < 512; i += 6) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      for (let x = 0; x <= 512; x += 32) {
        const yOffset = Math.sin(x * 0.03 + i * 0.05) * 2;
        ctx.lineTo(x, i + yOffset);
      }
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    return texture;
  };

  // Procedural Plaster / Wall Texture
  const createPlasterTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    ctx.fillStyle = '#F5F2EB';
    ctx.fillRect(0, 0, 256, 256);

    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const gray = Math.floor(220 + Math.random() * 30);
      ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, 0.12)`;
      ctx.fillRect(x, y, 2, 2);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    return texture;
  };

  // 1. Initial Scene Setup
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

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xF0ECE6);
    scene.fog = new THREE.FogExp2(0xF0ECE6, 0.02);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(5.2, 4.2, 7.5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.75));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2 - 0.04; // Don't go below floor
    controls.minDistance = 2.5;
    controls.maxDistance = 14;
    controls.target.set(0, 1.2, 0);
    controlsRef.current = controls;

    // Environment Lighting (Studio Reflection)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Key Directional Sun Light
    const sunLight = new THREE.DirectionalLight(0xFFF7EC, 1.7);
    sunLight.position.set(8, 12, 6);
    sunLight.castShadow = !isSoftwareGl;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0004;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 30;
    sunLight.shadow.camera.left = -8;
    sunLight.shadow.camera.right = 8;
    sunLight.shadow.camera.top = 8;
    sunLight.shadow.camera.bottom = -8;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Soft Hemisphere Fill Light
    const hemiLight = new THREE.HemisphereLight(0xFDFBF7, 0xDDD8CF, 0.9);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    // Pendant Warm Glow Point Light
    const pendantLight = new THREE.PointLight(0xFFDCA8, 1.4, 8);
    pendantLight.position.set(0.3, 3.8, 1.2);
    pendantLight.castShadow = !isSoftwareGl;
    scene.add(pendantLight);
    pendantLightRef.current = pendantLight;

    // ==========================================
    // PROCEDURAL 3D ARCHITECTURAL ROOM ASSEMBLY
    // ==========================================
    woodMaterialsRef.current = [];
    upholsteryMaterialsRef.current = [];

    // Shared Materials
    const floorWoodTex = createWoodTexture('light');
    const wallPlasterTex = createPlasterTexture();

    const floorMat = new THREE.MeshStandardMaterial({
      map: floorWoodTex,
      roughness: 0.5,
      metalness: 0.04,
      color: 0xE2D3C0,
    });
    woodMaterialsRef.current.push(floorMat);

    const wallMat = new THREE.MeshStandardMaterial({
      map: wallPlasterTex,
      roughness: 0.85,
      metalness: 0.02,
      color: 0xF7F4ED,
    });

    const blackSteelMat = new THREE.MeshStandardMaterial({
      color: 0x242424,
      roughness: 0.35,
      metalness: 0.7,
    });

    const whiteOakMat = new THREE.MeshStandardMaterial({
      color: 0xDCCDB8,
      roughness: 0.45,
      metalness: 0.05,
    });
    woodMaterialsRef.current.push(whiteOakMat);

    const linenMat = new THREE.MeshStandardMaterial({
      color: 0xEDE8DD,
      roughness: 0.9,
      metalness: 0.01,
    });
    upholsteryMaterialsRef.current.push(linenMat);

    const terracottaMat = new THREE.MeshStandardMaterial({
      color: 0xB77958,
      roughness: 0.75,
      metalness: 0.05,
    });

    const caramelMat = new THREE.MeshStandardMaterial({
      color: 0xC99168,
      roughness: 0.7,
      metalness: 0.08,
    });

    const travertineMat = new THREE.MeshStandardMaterial({
      color: 0xE8DFD1,
      roughness: 0.55,
      metalness: 0.03,
    });

    // 1. Room Shell (Floor & Walls)
    const roomGroup = new THREE.Group();
    scene.add(roomGroup);

    // Floor Plane
    const floorGeo = new THREE.BoxGeometry(16, 0.2, 16);
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.y = -0.1;
    floorMesh.receiveShadow = true;
    roomGroup.add(floorMesh);

    // Back Wall
    const backWallGeo = new THREE.BoxGeometry(16, 8, 0.3);
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(0, 4, -6.5);
    backWall.receiveShadow = true;
    roomGroup.add(backWall);

    // Left Wall with Large Window Cutout
    const leftWallGeo = new THREE.BoxGeometry(0.3, 8, 7);
    const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
    leftWall.position.set(-6.5, 4, -3);
    leftWall.receiveShadow = true;
    roomGroup.add(leftWall);

    // Floor-to-Ceiling Architectural Steel Window Frame
    const windowGroup = new THREE.Group();
    windowGroup.position.set(-6.4, 3.5, 2.5);
    const frameGeoH = new THREE.BoxGeometry(0.1, 0.1, 5);
    const frameGeoV = new THREE.BoxGeometry(0.1, 6.8, 0.1);

    // Outer & inner mullions
    for (let y = -3.4; y <= 3.4; y += 1.7) {
      const beam = new THREE.Mesh(frameGeoH, blackSteelMat);
      beam.position.y = y;
      windowGroup.add(beam);
    }
    for (let z = -2.5; z <= 2.5; z += 1.25) {
      const col = new THREE.Mesh(frameGeoV, blackSteelMat);
      col.position.z = z;
      windowGroup.add(col);
    }

    // Glass panel
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xEEF5F8,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.1,
      transmission: isSoftwareGl ? 0 : 0.85,
      ior: 1.5,
    });
    const glassMesh = new THREE.Mesh(new THREE.BoxGeometry(0.04, 6.8, 5), glassMat);
    windowGroup.add(glassMesh);
    roomGroup.add(windowGroup);

    // Exterior Garden Foliage Plane through window
    const gardenCanvas = document.createElement('canvas');
    gardenCanvas.width = 256;
    gardenCanvas.height = 256;
    const gctx = gardenCanvas.getContext('2d');
    if (gctx) {
      const grad = gctx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, '#A6C8C5');
      grad.addColorStop(0.5, '#7F9D7C');
      grad.addColorStop(1, '#4A6245');
      gctx.fillStyle = grad;
      gctx.fillRect(0, 0, 256, 256);
    }
    const gardenTex = new THREE.CanvasTexture(gardenCanvas);
    const gardenPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 8),
      new THREE.MeshBasicMaterial({ map: gardenTex })
    );
    gardenPlane.position.set(-9.5, 4, 2.5);
    gardenPlane.rotation.y = Math.PI / 2;
    roomGroup.add(gardenPlane);

    // Wool Area Rug
    const rugMat = new THREE.MeshStandardMaterial({
      color: 0xEEE7DB,
      roughness: 0.95,
      metalness: 0.0,
    });
    rugMatRef.current = rugMat;
    const rugMesh = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.03, 5.8), rugMat);
    rugMesh.position.set(0.2, 0.015, 1.4);
    rugMesh.receiveShadow = true;
    roomGroup.add(rugMesh);

    // 2. Open-Tread Staircase
    const stairGroup = new THREE.Group();
    stairGroup.position.set(-3.6, 0, -4.5);
    const treadGeo = new THREE.BoxGeometry(2.4, 0.12, 0.65);

    for (let i = 0; i < 9; i++) {
      const tread = new THREE.Mesh(treadGeo, whiteOakMat);
      tread.position.set(0, 0.35 + i * 0.38, i * 0.42);
      tread.castShadow = true;
      tread.receiveShadow = true;
      stairGroup.add(tread);

      // Vertical black steel balustrade rods
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.2, 12), blackSteelMat);
      rod.position.set(1.1, 0.35 + i * 0.38 + 0.6, i * 0.42);
      stairGroup.add(rod);
    }

    // Handrail
    const handrailGeo = new THREE.BoxGeometry(0.08, 0.08, 4.2);
    const handrail = new THREE.Mesh(handrailGeo, blackSteelMat);
    handrail.position.set(1.1, 2.8, 1.6);
    handrail.rotation.x = Math.atan(0.38 / 0.42);
    stairGroup.add(handrail);
    roomGroup.add(stairGroup);

    // 3. Contemporary Linen Modular Sofa
    const sofaGroup = new THREE.Group();
    sofaGroup.position.set(0.4, 0, 0.6);

    // Base plinth
    const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.14, 2.0), whiteOakMat);
    sofaBase.position.set(0, 0.07, 0);
    sofaBase.castShadow = true;
    sofaGroup.add(sofaBase);

    // Main Cushions
    const seat1 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.38, 1.9), linenMat);
    seat1.position.set(-0.95, 0.32, 0);
    seat1.castShadow = true;
    seat1.receiveShadow = true;
    sofaGroup.add(seat1);

    const seat2 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.38, 1.9), linenMat);
    seat2.position.set(0.95, 0.32, 0);
    seat2.castShadow = true;
    seat2.receiveShadow = true;
    sofaGroup.add(seat2);

    // Backrest
    const backrest = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.65, 0.45), linenMat);
    backrest.position.set(0, 0.68, -0.75);
    backrest.castShadow = true;
    sofaGroup.add(backrest);

    // Chaise extension on right
    const chaise = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.38, 1.6), linenMat);
    chaise.position.set(1.2, 0.32, 1.6);
    chaise.castShadow = true;
    chaise.receiveShadow = true;
    sofaGroup.add(chaise);

    // Scatter Pillows (Terracotta & Caramel)
    const pillow1 = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.45, 0.22), terracottaMat);
    pillow1.position.set(-1.4, 0.65, -0.45);
    pillow1.rotation.y = 0.2;
    sofaGroup.add(pillow1);

    const pillow2 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.42, 0.2), caramelMat);
    pillow2.position.set(-0.8, 0.63, -0.48);
    pillow2.rotation.y = -0.15;
    sofaGroup.add(pillow2);

    const pillow3 = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.4, 0.2), terracottaMat);
    pillow3.position.set(1.6, 0.62, 0.9);
    pillow3.rotation.y = Math.PI / 2 + 0.1;
    sofaGroup.add(pillow3);

    roomGroup.add(sofaGroup);

    // 4. Fluted Oak Coffee Table & Ceramic Objects
    const tableGroup = new THREE.Group();
    tableGroup.position.set(0.2, 0, 2.3);

    // Circular table top
    const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.08, 48), whiteOakMat);
    tableTop.position.y = 0.42;
    tableTop.castShadow = true;
    tableGroup.add(tableTop);

    // Fluted cylindrical pedestal
    const flutedBase = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.6, 0.38, 36), whiteOakMat);
    flutedBase.position.y = 0.19;
    flutedBase.castShadow = true;
    tableGroup.add(flutedBase);

    // Table Props: Books & Ceramic Vessel
    const book1 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.05, 0.5), linenMat);
    book1.position.set(-0.25, 0.48, -0.1);
    book1.rotation.y = 0.25;
    tableGroup.add(book1);

    const book2 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.04, 0.46), caramelMat);
    book2.position.set(-0.23, 0.52, -0.09);
    book2.rotation.y = 0.18;
    tableGroup.add(book2);

    const vaseGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.32, 24);
    const vase = new THREE.Mesh(vaseGeo, travertineMat);
    vase.position.set(0.28, 0.62, 0.15);
    tableGroup.add(vase);

    roomGroup.add(tableGroup);

    // 5. Two Sculptural Lounge Chairs (Terracotta Velvet)
    const createLoungeChair = (x: number, z: number, rotY: number) => {
      const chair = new THREE.Group();
      chair.position.set(x, 0, z);
      chair.rotation.y = rotY;

      // Base rim
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.72, 0.12, 32), whiteOakMat);
      base.position.y = 0.06;
      base.castShadow = true;
      chair.add(base);

      // Curved bucket seat
      const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.62, 0.35, 32), terracottaMat);
      seat.position.y = 0.28;
      seat.castShadow = true;
      chair.add(seat);

      // Curved wrapping backrest (partial torus)
      const backGeo = new THREE.TorusGeometry(0.58, 0.18, 16, 32, Math.PI * 0.85);
      const back = new THREE.Mesh(backGeo, terracottaMat);
      back.position.set(0, 0.62, 0.05);
      back.rotation.x = Math.PI / 2;
      back.rotation.z = Math.PI * 0.07;
      back.castShadow = true;
      chair.add(back);

      return chair;
    };

    const chair1 = createLoungeChair(-2.2, 2.2, Math.PI * 0.32);
    const chair2 = createLoungeChair(-1.5, 3.8, Math.PI * 0.18);
    roomGroup.add(chair1);
    roomGroup.add(chair2);

    // 6. Sculptural Woven Pendant Lantern
    const pendantGroup = new THREE.Group();
    pendantGroup.position.set(0.3, 4.4, 1.2);

    // Cord
    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 3.2, 12), blackSteelMat);
    cord.position.y = 1.6;
    pendantGroup.add(cord);

    // Woven bell shade
    const shadeMat = new THREE.MeshStandardMaterial({
      color: 0xC8A27A,
      roughness: 0.8,
      metalness: 0.05,
      wireframe: false,
    });
    const shadeGeo = new THREE.SphereGeometry(0.68, 32, 24);
    shadeGeo.scale(1.0, 1.35, 1.0);
    const shade = new THREE.Mesh(shadeGeo, shadeMat);
    pendantGroup.add(shade);

    roomGroup.add(pendantGroup);

    // 7. Potted Ficus Tree in Terracotta Planter
    const plantGroup = new THREE.Group();
    plantGroup.position.set(-5.2, 0, -1.8);

    const potMat = new THREE.MeshStandardMaterial({
      color: 0xB77958,
      roughness: 0.85,
      metalness: 0.02,
    });
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.36, 0.85, 24), potMat);
    pot.position.y = 0.42;
    pot.castShadow = true;
    plantGroup.add(pot);

    // Trunk
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.08, 1.8, 12),
      new THREE.MeshStandardMaterial({ color: 0x5C4A3A, roughness: 0.9 })
    );
    trunk.position.y = 1.4;
    plantGroup.add(trunk);

    // Leaves clusters
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x3E5838,
      roughness: 0.6,
      metalness: 0.05,
    });
    for (let l = 0; l < 8; l++) {
      const branch = new THREE.Mesh(new THREE.SphereGeometry(0.38, 12, 12), leafMat);
      branch.scale.set(1.2, 0.5, 0.9);
      branch.position.set(
        Math.sin(l * 1.1) * 0.45,
        1.8 + Math.cos(l * 0.8) * 0.55,
        Math.cos(l * 1.1) * 0.45
      );
      plantGroup.add(branch);
    }
    roomGroup.add(plantGroup);

    // Handle Resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop with Smooth Camera Transitions
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);

      // Smooth camera position damping to target preset
      if (cameraRef.current && controlsRef.current) {
        cameraRef.current.position.lerp(targetCamPos.current, 0.05);
        controlsRef.current.target.lerp(targetLookAt.current, 0.05);
        if (isRotating) {
          controlsRef.current.autoRotate = true;
          controlsRef.current.autoRotateSpeed = 0.8;
        } else {
          controlsRef.current.autoRotate = false;
        }
        controlsRef.current.update();
      }

      // Subtle breathing motion on pendant lantern
      const t = clock.getElapsedTime();
      pendantGroup.rotation.y = Math.sin(t * 0.4) * 0.03;
      pendantGroup.rotation.z = Math.cos(t * 0.5) * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      controls.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  // 2. Handle Lighting Preset Changes
  useEffect(() => {
    if (!sunLightRef.current || !hemiLightRef.current || !pendantLightRef.current || !sceneRef.current)
      return;

    if (lighting === 'morning') {
      // Crisp, calm, natural Scandinavian morning daylight
      sunLightRef.current.color.set('#FFF8EE');
      sunLightRef.current.intensity = 1.7;
      sunLightRef.current.position.set(8, 12, 6);
      hemiLightRef.current.color.set('#FAF8F2');
      hemiLightRef.current.groundColor.set('#DDD8CF');
      hemiLightRef.current.intensity = 0.95;
      pendantLightRef.current.intensity = 1.2;
      sceneRef.current.background = new THREE.Color(0xF0ECE6);
      if (sceneRef.current.fog) sceneRef.current.fog.color.set(0xF0ECE6);
    } else if (lighting === 'golden') {
      // Warm, rich afternoon golden hour with caramel sunbeams
      sunLightRef.current.color.set('#FFCA9E');
      sunLightRef.current.intensity = 2.2;
      sunLightRef.current.position.set(12, 6, 8);
      hemiLightRef.current.color.set('#F9ECE0');
      hemiLightRef.current.groundColor.set('#C99168');
      hemiLightRef.current.intensity = 0.85;
      pendantLightRef.current.intensity = 1.6;
      sceneRef.current.background = new THREE.Color(0xF2E3D5);
      if (sceneRef.current.fog) sceneRef.current.fog.color.set(0xF2E3D5);
    } else if (lighting === 'evening') {
      // Intimate twilight with glowing woven rattan lantern and soft ambient cove
      sunLightRef.current.color.set('#8EA2C6');
      sunLightRef.current.intensity = 0.45;
      sunLightRef.current.position.set(4, 8, 4);
      hemiLightRef.current.color.set('#2C3442');
      hemiLightRef.current.groundColor.set('#1A1C20');
      hemiLightRef.current.intensity = 0.4;
      pendantLightRef.current.intensity = 2.8; // warm lantern dominates
      pendantLightRef.current.color.set('#FF9D54');
      sceneRef.current.background = new THREE.Color(0x23262E);
      if (sceneRef.current.fog) sceneRef.current.fog.color.set(0x23262E);
    }
  }, [lighting]);

  // 3. Handle Material Preset Changes
  useEffect(() => {
    if (materialPreset === 'white-oak') {
      woodMaterialsRef.current.forEach((m) => {
        m.color.set(0xDCCDB8);
        m.roughness = 0.45;
      });
      upholsteryMaterialsRef.current.forEach((m) => {
        m.color.set(0xEDE8DD);
        m.roughness = 0.9;
      });
      if (rugMatRef.current) rugMatRef.current.color.set(0xEEE7DB);
    } else if (materialPreset === 'smoked-walnut') {
      woodMaterialsRef.current.forEach((m) => {
        m.color.set(0x6A5445);
        m.roughness = 0.55;
      });
      upholsteryMaterialsRef.current.forEach((m) => {
        m.color.set(0xDFD9CD);
        m.roughness = 0.85;
      });
      if (rugMatRef.current) rugMatRef.current.color.set(0xE5DFD5);
    } else if (materialPreset === 'warm-terracotta') {
      woodMaterialsRef.current.forEach((m) => {
        m.color.set(0xB89377);
        m.roughness = 0.5;
      });
      upholsteryMaterialsRef.current.forEach((m) => {
        m.color.set(0xD99A7B);
        m.roughness = 0.75;
      });
      if (rugMatRef.current) rugMatRef.current.color.set(0xEFE6DC);
    }
  }, [materialPreset]);

  // 4. Handle Camera Presets
  const setCameraView = (preset: CameraPreset) => {
    setActiveCamera(preset);
    if (preset === 'default') {
      targetCamPos.current.set(5.2, 4.2, 7.5);
      targetLookAt.current.set(0, 1.2, 0);
    } else if (preset === 'lounge') {
      targetCamPos.current.set(2.8, 1.8, 4.4);
      targetLookAt.current.set(0.4, 0.8, 1.2);
    } else if (preset === 'staircase') {
      targetCamPos.current.set(-1.2, 2.8, 1.5);
      targetLookAt.current.set(-3.2, 2.2, -2.8);
    } else if (preset === 'topdown') {
      targetCamPos.current.set(0.1, 10.5, 0.1);
      targetLookAt.current.set(0, 0, 0);
    }
  };

  const handleHotspotClick = (spot: Hotspot) => {
    setSelectedHotspot(spot);
    // Move camera gently toward hotspot
    targetCamPos.current.set(spot.position[0] + 2.4, spot.position[1] + 1.4, spot.position[2] + 2.8);
    targetLookAt.current.set(spot.position[0], spot.position[1], spot.position[2]);
  };

  const content = (
    <div
      className={`relative w-full overflow-hidden transition-all duration-300 ${
        isFullScreen
          ? 'fixed inset-0 z-50 rounded-none border-0 w-screen h-screen bg-[#111110]'
          : 'rounded-sm border border-[#DDD9D4] bg-[#F0ECE6] shadow-md'
      }`}
    >
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className={`w-full ${isFullScreen ? 'h-full flex-1' : heightClass} cursor-grab active:cursor-grabbing`}
      />

      {/* Top Overlay Badge & Quick Instructions */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <div className="bg-white/92 backdrop-blur-md px-3.5 py-2 rounded-sm border border-[#DDD9D4] shadow-xs pointer-events-auto flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#B77958]" />
          <div>
            <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider font-['Playfair_Display',serif]">
              The Ocean Interiors 3D Spatial Room
            </h4>
            <p className="text-[10px] text-[#6B6864]">
              Drag to orbit · Scroll to zoom · Click pins to inspect
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Full-Screen Full-Page Toggle */}
          <button
            type="button"
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 bg-white/90 hover:bg-white text-[#171717] border border-[#DDD9D4] rounded-sm text-xs font-medium backdrop-blur-md transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            title={isFullScreen ? 'Exit Full Screen View (Esc)' : 'Full Page 3D View'}
          >
            {isFullScreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-[#B77958]" />
                <span className="text-[10px] font-semibold hidden sm:inline">Exit Full Page</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-[#B77958]" />
                <span className="text-[10px] font-semibold hidden sm:inline">Full Page 3D</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-sm text-xs font-medium border transition-colors cursor-pointer backdrop-blur-md shadow-xs ${
              isRotating
                ? 'bg-[#171717] text-white border-[#171717]'
                : 'bg-white/90 text-[#171717] border-[#DDD9D4] hover:bg-white'
            }`}
            title="Toggle Auto-Orbit"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => setCameraView('default')}
            className="p-2 bg-white/90 hover:bg-white text-[#171717] border border-[#DDD9D4] rounded-sm text-xs font-medium backdrop-blur-md transition-colors cursor-pointer shadow-xs"
            title="Reset View"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive 3D Hotspot Buttons on Screen */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {HOTSPOTS.map((spot) => (
          <button
            key={spot.id}
            type="button"
            onClick={() => handleHotspotClick(spot)}
            className={`pointer-events-auto absolute group transition-transform duration-200 cursor-pointer ${
              spot.id === 'sofa'
                ? 'top-[52%] left-[48%]'
                : spot.id === 'table'
                ? 'top-[68%] left-[54%]'
                : spot.id === 'staircase'
                ? 'top-[36%] left-[28%]'
                : 'top-[22%] left-[51%]'
            }`}
            aria-label={`Inspect ${spot.name}`}
          >
            <span className="relative flex h-6 w-6 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B77958] opacity-60" />
              <span className="relative inline-flex rounded-full h-5 w-5 bg-[#171717] text-white border border-white items-center justify-center text-[10px] font-bold shadow-md group-hover:scale-115 transition-transform">
                +
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Selected Hotspot Detail Card */}
      {selectedHotspot && (
        <div className="absolute bottom-24 left-4 right-4 sm:right-auto sm:w-84 bg-white/98 backdrop-blur-md p-4 rounded-sm border border-[#DDD9D4] shadow-xl z-30 animate-fade-in text-xs space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B77958]">
                Architectural Detail
              </span>
              <h5 className="text-sm font-bold text-[#171717] mt-0.5">
                {selectedHotspot.name}
              </h5>
            </div>
            <button
              type="button"
              onClick={() => setSelectedHotspot(null)}
              className="p-1 text-[#6B6864] hover:text-[#171717] rounded-sm cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#6B6864] leading-relaxed">
            {selectedHotspot.description}
          </p>

          <div className="pt-2 border-t border-[#EEEAE5] space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#6B6864]">Finish / Material:</span>
              <span className="font-medium text-[#171717]">{selectedHotspot.material}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B6864]">Scale / Dimensions:</span>
              <span className="font-mono text-[#171717]">{selectedHotspot.dimensions}</span>
            </div>
          </div>

          {onConsult && (
            <button
              type="button"
              onClick={() => onConsult(selectedHotspot.name)}
              className="w-full mt-2 py-1.5 px-3 bg-[#171717] text-white rounded-full text-center font-medium hover:bg-[#252321] transition-colors cursor-pointer"
            >
              Discuss This Feature
            </button>
          )}
        </div>
      )}

      {/* Sleek Collapsible Bottom Dock for 3D Customization */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-2xl bg-white/95 backdrop-blur-md rounded-sm border border-[#DDD9D4] shadow-lg p-2.5 sm:p-3.5 z-20">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          {/* Lighting Presets */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold uppercase text-[#6B6864] tracking-wider shrink-0 mr-1">
              Atmosphere:
            </span>
            <button
              type="button"
              onClick={() => setLighting('morning')}
              className={`px-2.5 py-1 rounded-sm text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                lighting === 'morning'
                  ? 'bg-[#171717] text-white'
                  : 'bg-[#F7F5F2] text-[#6B6864] hover:text-[#171717]'
              }`}
            >
              <Sun className="w-3 h-3 text-[#C99168]" />
              <span>Daylight</span>
            </button>
            <button
              type="button"
              onClick={() => setLighting('golden')}
              className={`px-2.5 py-1 rounded-sm text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                lighting === 'golden'
                  ? 'bg-[#B77958] text-white'
                  : 'bg-[#F7F5F2] text-[#6B6864] hover:text-[#171717]'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Golden</span>
            </button>
            <button
              type="button"
              onClick={() => setLighting('evening')}
              className={`px-2.5 py-1 rounded-sm text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                lighting === 'evening'
                  ? 'bg-[#252321] text-white'
                  : 'bg-[#F7F5F2] text-[#6B6864] hover:text-[#171717]'
              }`}
            >
              <Moon className="w-3 h-3" />
              <span>Evening</span>
            </button>
          </div>

          {/* Material Finishes */}
          <div className="flex items-center gap-1.5 border-t sm:border-t-0 sm:border-l border-[#EEEAE5] pt-2 sm:pt-0 sm:pl-3">
            <span className="text-[10px] font-semibold uppercase text-[#6B6864] tracking-wider shrink-0 mr-1">
              Finishes:
            </span>
            <button
              type="button"
              onClick={() => setMaterialPreset('white-oak')}
              className={`px-2.5 py-1 rounded-sm text-[11px] font-medium transition-colors cursor-pointer ${
                materialPreset === 'white-oak'
                  ? 'bg-[#171717] text-white'
                  : 'bg-[#F7F5F2] text-[#6B6864] hover:text-[#171717]'
              }`}
            >
              White Oak
            </button>
            <button
              type="button"
              onClick={() => setMaterialPreset('smoked-walnut')}
              className={`px-2.5 py-1 rounded-sm text-[11px] font-medium transition-colors cursor-pointer ${
                materialPreset === 'smoked-walnut'
                  ? 'bg-[#171717] text-white'
                  : 'bg-[#F7F5F2] text-[#6B6864] hover:text-[#171717]'
              }`}
            >
              Walnut
            </button>
            <button
              type="button"
              onClick={() => setMaterialPreset('warm-terracotta')}
              className={`px-2.5 py-1 rounded-sm text-[11px] font-medium transition-colors cursor-pointer ${
                materialPreset === 'warm-terracotta'
                  ? 'bg-[#B77958] text-white'
                  : 'bg-[#F7F5F2] text-[#6B6864] hover:text-[#171717]'
              }`}
            >
              Terracotta
            </button>
          </div>

          {/* Camera Angles */}
          <div className="flex items-center gap-1 border-t sm:border-t-0 sm:border-l border-[#EEEAE5] pt-2 sm:pt-0 sm:pl-3">
            <span className="text-[10px] font-semibold uppercase text-[#6B6864] tracking-wider shrink-0 mr-1">
              Angle:
            </span>
            {(['default', 'lounge', 'staircase', 'topdown'] as CameraPreset[]).map((cam) => (
              <button
                key={cam}
                type="button"
                onClick={() => setCameraView(cam)}
                className={`p-1.5 rounded-sm text-[10px] font-medium transition-colors cursor-pointer capitalize ${
                  activeCamera === cam
                    ? 'bg-[#171717] text-white'
                    : 'bg-[#F7F5F2] text-[#6B6864] hover:text-[#171717]'
                }`}
                title={`Switch to ${cam} angle`}
              >
                {cam === 'default' ? 'Main' : cam === 'topdown' ? 'Plan' : cam}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (!showCardWrapper) {
    return content;
  }

  return (
    <section id="studio-3d" className="w-full py-16 lg:py-24 border-t border-[#DDD9D4] scroll-mt-20">
      <div className="mb-8 lg:mb-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B77958]">
              Interactive 3D Spatial Experience
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#171717] text-white rounded-full">
              Live 3D Studio
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-[#171717] leading-[1.14] font-['Playfair_Display',serif]">
            Walk through our spaces in 3D
          </h2>

          {/* Bespoke Luxury Editorial Frame - Black Background with Warm Brown Typography */}
          <div className="mt-4 relative p-5 sm:p-6 rounded-2xl bg-[#141414] border border-[#C99168]/40 shadow-xl shadow-black/30 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-[#C99168]/60 group">
            {/* Architectural Drafting Corner Accents in Warm Bronze Brown */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C99168]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C99168]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C99168]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C99168]" />

            {/* Subtle luxury ambient glow */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#C99168]/15 rounded-full blur-2xl pointer-events-none" />

            {/* Frame Top Header */}
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#C99168]/20">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C99168] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C99168] font-mono">
                  Virtual Reality &amp; Spatial Walkthrough
                </span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#C99168]/15 text-[#E6B38A] font-bold border border-[#C99168]/30">
                Live Simulation
              </span>
            </div>

            {/* The Text in Warm Brown tones on Black */}
            <p className="text-sm sm:text-[14.5px] text-[#D8B494] leading-relaxed relative z-10 font-normal">
              Experience our residential design philosophy in real-time. Orbit through the
              double-height living room, adjust the sun from dawn to dusk, swap material
              finishes, and inspect custom millwork details.
            </p>

            {/* Bottom Actions inside the Frame */}
            <div className="mt-4 pt-3.5 border-t border-[#C99168]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] relative z-10">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C99168]" />
                <span className="font-semibold text-[#F5D5B8]">The Ocean Interiors</span>
                <span className="text-[#A88060]">· 3D Spatial Engine</span>
              </div>

              <button
                type="button"
                onClick={() => onConsult && onConsult('3D Spatial Design Walkthrough')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#C99168] to-[#B77958] hover:from-[#d9a27b] hover:to-[#c68969] text-white font-bold text-xs rounded-full transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 shrink-0 self-start sm:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Design Your Room in 3D</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {content}
    </section>
  );
};
