import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCw, Maximize2, RefreshCw, Eye, Layers } from 'lucide-react';

interface ProductViewer3DProps {
  modelType: 'laptop' | 'glasses' | 'robot' | 'hub' | 'headphones' | 'watch' | 'drone' | 'earbuds';
  accentColor: string;
  name: string;
}

export const ProductViewer3D: React.FC<ProductViewer3DProps> = ({ modelType, accentColor, name }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isWireframe, setIsWireframe] = useState(false);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const activeMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Keep track of reset perspective
  const resetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 1.2, 4.0);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 4.0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 2.0;
    controls.maxDistance = 8;
    controls.minDistance = 1.5;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x00d4ff, 2.5, 15);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    const purpleBackLight = new THREE.PointLight(0x7b61ff, 2.5, 15);
    purpleBackLight.position.set(3, -2, -3);
    scene.add(purpleBackLight);

    // Subtle dark circular platform / shadow
    const floorGeo = new THREE.CylinderGeometry(2.0, 2.0, 0.04, 48);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x070d18,
      roughness: 0.7,
      metalness: 0.4,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(0, -1.2, 0);
    scene.add(floor);

    // Glowing rim around platform
    const floorRingGeo = new THREE.RingGeometry(1.98, 2.04, 64);
    const floorRingMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const floorRing = new THREE.Mesh(floorRingGeo, floorRingMat);
    floorRing.rotation.x = Math.PI / 2;
    floorRing.position.set(0, -1.18, 0);
    scene.add(floorRing);

    // Product Model Container
    const productGroup = new THREE.Group();
    scene.add(productGroup);

    // Dynamic accent color material
    const accentColorHex = new THREE.Color(accentColor || '#00d4ff');

    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: isWireframe,
    });

    const lightMetalMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.7,
      roughness: 0.2,
      wireframe: isWireframe,
    });

    const customAccentMat = new THREE.MeshStandardMaterial({
      color: accentColorHex,
      metalness: 0.6,
      roughness: 0.3,
      emissive: accentColorHex,
      emissiveIntensity: 0.25,
      wireframe: isWireframe,
    });

    const glowAccentMat = new THREE.MeshStandardMaterial({
      color: accentColorHex,
      emissive: accentColorHex,
      emissiveIntensity: 1.8,
      wireframe: isWireframe,
    });

    activeMaterialsRef.current = [darkMetalMat, lightMetalMat, customAccentMat, glowAccentMat];

    // Build procedural 3D model according to product type
    if (modelType === 'laptop') {
      // Base
      const baseGeo = new THREE.BoxGeometry(2.4, 0.08, 1.6);
      const baseMesh = new THREE.Mesh(baseGeo, customAccentMat);
      baseMesh.position.set(0, -0.4, 0.3);
      productGroup.add(baseMesh);

      // Keyboard deck inset
      const kbGeo = new THREE.BoxGeometry(2.0, 0.02, 0.9);
      const kbMesh = new THREE.Mesh(kbGeo, darkMetalMat);
      kbMesh.position.set(0, -0.35, 0.1);
      productGroup.add(kbMesh);

      // Trackpad
      const tpGeo = new THREE.BoxGeometry(0.7, 0.02, 0.45);
      const tpMesh = new THREE.Mesh(tpGeo, darkMetalMat);
      tpMesh.position.set(0, -0.35, 0.8);
      productGroup.add(tpMesh);

      // Screen Lid (Angled back 110 degrees)
      const screenGroup = new THREE.Group();
      screenGroup.position.set(0, -0.36, -0.5);

      const lidGeo = new THREE.BoxGeometry(2.4, 1.5, 0.06);
      const lidMesh = new THREE.Mesh(lidGeo, customAccentMat);
      lidMesh.position.set(0, 0.75, 0);
      screenGroup.add(lidMesh);

      // Glowing screen display
      const displayGeo = new THREE.PlaneGeometry(2.2, 1.32);
      const displayMat = new THREE.MeshStandardMaterial({
        color: 0x020817,
        emissive: 0x00d4ff,
        emissiveIntensity: 0.4,
        roughness: 0.1,
      });
      const displayMesh = new THREE.Mesh(displayGeo, displayMat);
      displayMesh.position.set(0, 0.75, 0.035);
      screenGroup.add(displayMesh);

      screenGroup.rotation.x = -Math.PI * 0.15;
      productGroup.add(screenGroup);
    } else if (modelType === 'glasses') {
      // Front frame
      const frameGeo = new THREE.BoxGeometry(2.2, 0.45, 0.12);
      const frameMesh = new THREE.Mesh(frameGeo, customAccentMat);
      productGroup.add(frameMesh);

      // Left Lens
      const lensGeo = new THREE.BoxGeometry(0.85, 0.5, 0.05);
      const lensMat = new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.65,
        roughness: 0.05,
        metalness: 0.9,
      });
      const lensL = new THREE.Mesh(lensGeo, lensMat);
      lensL.position.set(-0.55, -0.05, 0.02);
      productGroup.add(lensL);

      const lensR = lensL.clone();
      lensR.position.set(0.55, -0.05, 0.02);
      productGroup.add(lensR);

      // Temples / Arms extending back
      const armGeo = new THREE.BoxGeometry(0.08, 0.12, 1.7);
      const armL = new THREE.Mesh(armGeo, customAccentMat);
      armL.position.set(-1.05, 0.05, -0.85);
      productGroup.add(armL);

      const armR = armL.clone();
      armR.position.set(1.05, 0.05, -0.85);
      productGroup.add(armR);

      // Glowing waveguide accent line
      const lineGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.8, 12);
      const lineMesh = new THREE.Mesh(lineGeo, glowAccentMat);
      lineMesh.rotation.z = Math.PI / 2;
      lineMesh.position.set(0, 0.18, 0.07);
      productGroup.add(lineMesh);
    } else if (modelType === 'robot') {
      // Robot Body
      const bodyGeo = new THREE.SphereGeometry(0.9, 32, 32);
      bodyGeo.scale(1, 0.85, 0.9);
      const bodyMesh = new THREE.Mesh(bodyGeo, customAccentMat);
      productGroup.add(bodyMesh);

      // Dark face visor
      const faceGeo = new THREE.SphereGeometry(0.78, 32, 24, 0, Math.PI, 0, Math.PI * 0.5);
      const faceMat = new THREE.MeshStandardMaterial({
        color: 0x030712,
        roughness: 0.1,
        metalness: 0.9,
      });
      const faceMesh = new THREE.Mesh(faceGeo, faceMat);
      faceMesh.position.set(0, 0.05, 0.2);
      faceMesh.rotation.x = Math.PI * 0.12;
      productGroup.add(faceMesh);

      // Glowing Cyan Eye / Visor
      const eyeGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.6, 24);
      const eyeMesh = new THREE.Mesh(eyeGeo, glowAccentMat);
      eyeMesh.rotation.z = Math.PI / 2;
      eyeMesh.position.set(0, 0.1, 0.88);
      productGroup.add(eyeMesh);

      // Base ring
      const ringGeo = new THREE.TorusGeometry(1.2, 0.05, 16, 48);
      const ringMesh = new THREE.Mesh(ringGeo, glowAccentMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.set(0, -0.6, 0);
      productGroup.add(ringMesh);
    } else if (modelType === 'hub') {
      // Glowing Core Sphere
      const coreGeo = new THREE.SphereGeometry(0.95, 32, 32);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x050c1e,
        roughness: 0.15,
        metalness: 0.8,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      productGroup.add(core);

      // Outer Frosted Glass Ring
      const ringGeo = new THREE.TorusGeometry(1.3, 0.12, 24, 64);
      const ringMesh = new THREE.Mesh(ringGeo, customAccentMat);
      ringMesh.rotation.x = Math.PI / 2.3;
      productGroup.add(ringMesh);

      // Glowing Equator Ring
      const eqRingGeo = new THREE.TorusGeometry(1.05, 0.03, 16, 64);
      const eqRing = new THREE.Mesh(eqRingGeo, glowAccentMat);
      eqRing.rotation.x = Math.PI / 2;
      productGroup.add(eqRing);

      // Pedestal Base
      const baseGeo = new THREE.CylinderGeometry(0.7, 0.9, 0.35, 32);
      const baseMesh = new THREE.Mesh(baseGeo, darkMetalMat);
      baseMesh.position.set(0, -0.85, 0);
      productGroup.add(baseMesh);
    } else if (modelType === 'headphones') {
      // Headband Arc
      const bandGeo = new THREE.TorusGeometry(1.2, 0.08, 16, 64, Math.PI);
      const bandMesh = new THREE.Mesh(bandGeo, customAccentMat);
      bandMesh.position.set(0, 0.2, 0);
      productGroup.add(bandMesh);

      // Left Earcup
      const cupGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.35, 32);
      const cupL = new THREE.Mesh(cupGeo, customAccentMat);
      cupL.rotation.z = Math.PI / 2;
      cupL.position.set(-1.25, 0.2, 0);
      productGroup.add(cupL);

      // Left Cushion
      const cushionGeo = new THREE.CylinderGeometry(0.58, 0.58, 0.2, 32);
      const cushionL = new THREE.Mesh(cushionGeo, darkMetalMat);
      cushionL.rotation.z = Math.PI / 2;
      cushionL.position.set(-1.08, 0.2, 0);
      productGroup.add(cushionL);

      // Right Earcup
      const cupR = cupL.clone();
      cupR.position.set(1.25, 0.2, 0);
      productGroup.add(cupR);

      // Right Cushion
      const cushionR = cushionL.clone();
      cushionR.position.set(1.08, 0.2, 0);
      productGroup.add(cushionR);

      // Glowing ring accent on left/right outer plates
      const ringOuterGeo = new THREE.TorusGeometry(0.4, 0.03, 16, 32);
      const outerRingL = new THREE.Mesh(ringOuterGeo, glowAccentMat);
      outerRingL.rotation.y = Math.PI / 2;
      outerRingL.position.set(-1.43, 0.2, 0);
      productGroup.add(outerRingL);

      const outerRingR = outerRingL.clone();
      outerRingR.position.set(1.43, 0.2, 0);
      productGroup.add(outerRingR);
    } else if (modelType === 'watch') {
      // Watch body cylinder
      const caseGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.28, 48);
      const caseMesh = new THREE.Mesh(caseGeo, customAccentMat);
      caseMesh.rotation.x = Math.PI / 2;
      productGroup.add(caseMesh);

      // Display face
      const faceGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.02, 48);
      const faceMat = new THREE.MeshStandardMaterial({
        color: 0x020617,
        emissive: 0x00d4ff,
        emissiveIntensity: 0.5,
        roughness: 0.1,
      });
      const faceMesh = new THREE.Mesh(faceGeo, faceMat);
      faceMesh.rotation.x = Math.PI / 2;
      faceMesh.position.set(0, 0, 0.15);
      productGroup.add(faceMesh);

      // Straps Top & Bottom
      const strapGeo = new THREE.BoxGeometry(0.7, 1.2, 0.1);
      const strapTop = new THREE.Mesh(strapGeo, darkMetalMat);
      strapTop.position.set(0, 1.3, 0);
      productGroup.add(strapTop);

      const strapBot = strapTop.clone();
      strapBot.position.set(0, -1.3, 0);
      productGroup.add(strapBot);

      // Digital Crown Button
      const crownGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.15, 24);
      const crownMesh = new THREE.Mesh(crownGeo, glowAccentMat);
      crownMesh.position.set(0.96, 0.2, 0);
      productGroup.add(crownMesh);
    } else if (modelType === 'drone') {
      // Central Fuselage Body
      const bodyGeo = new THREE.BoxGeometry(0.9, 0.35, 1.4);
      const bodyMesh = new THREE.Mesh(bodyGeo, customAccentMat);
      productGroup.add(bodyMesh);

      // 4 Carbon Arms
      const armLength = 1.3;
      const armGeo = new THREE.CylinderGeometry(0.04, 0.04, armLength, 16);

      const makeArm = (angle: number, x: number, z: number) => {
        const arm = new THREE.Mesh(armGeo, darkMetalMat);
        arm.rotation.z = Math.PI / 2;
        arm.rotation.y = angle;
        arm.position.set(x, 0, z);
        productGroup.add(arm);

        // Motor pod
        const motorGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.2, 24);
        const motor = new THREE.Mesh(motorGeo, customAccentMat);
        motor.position.set(x * 1.8, 0.1, z * 1.8);
        productGroup.add(motor);

        // Glowing rotor disk / propellor
        const propGeo = new THREE.TorusGeometry(0.55, 0.015, 12, 32);
        const prop = new THREE.Mesh(propGeo, glowAccentMat);
        prop.rotation.x = Math.PI / 2;
        prop.position.set(x * 1.8, 0.2, z * 1.8);
        productGroup.add(prop);
      };

      makeArm(Math.PI / 4, 0.6, 0.6);
      makeArm(-Math.PI / 4, -0.6, 0.6);
      makeArm((3 * Math.PI) / 4, 0.6, -0.6);
      makeArm((-3 * Math.PI) / 4, -0.6, -0.6);

      // Camera Gimbal Pod
      const camGeo = new THREE.SphereGeometry(0.24, 24, 24);
      const camMesh = new THREE.Mesh(camGeo, darkMetalMat);
      camMesh.position.set(0, -0.22, 0.7);
      productGroup.add(camMesh);
    } else {
      // Earbuds (Pair)
      const earbudGroupL = new THREE.Group();
      earbudGroupL.position.set(-0.6, 0, 0);

      // Body pod
      const podGeo = new THREE.SphereGeometry(0.38, 24, 24);
      const podMesh = new THREE.Mesh(podGeo, customAccentMat);
      earbudGroupL.add(podMesh);

      // Stem
      const stemGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.8, 24);
      const stemMesh = new THREE.Mesh(stemGeo, customAccentMat);
      stemMesh.position.set(0, -0.45, 0.1);
      earbudGroupL.add(stemMesh);

      // Silicone Tip
      const tipGeo = new THREE.ConeGeometry(0.28, 0.35, 24);
      const tipMat = new THREE.MeshStandardMaterial({ color: 0x00d4ff, roughness: 0.1 });
      const tipMesh = new THREE.Mesh(tipGeo, tipMat);
      tipMesh.rotation.x = -Math.PI / 2;
      tipMesh.position.set(0, 0.1, 0.35);
      earbudGroupL.add(tipMesh);

      // Glowing charging contacts / touch area
      const touchGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.3, 16);
      const touchMesh = new THREE.Mesh(touchGeo, glowAccentMat);
      touchMesh.position.set(0, -0.3, 0.2);
      earbudGroupL.add(touchMesh);

      productGroup.add(earbudGroupL);

      // Right Earbud (Mirrored)
      const earbudGroupR = earbudGroupL.clone();
      earbudGroupR.position.set(0.6, 0, 0);
      earbudGroupR.rotation.y = Math.PI;
      productGroup.add(earbudGroupR);
    }

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelType, accentColor, isWireframe]);

  // Update autoRotate when state changes
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotate;
    }
  }, [isAutoRotate]);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] rounded-2xl glass-panel overflow-hidden border border-cyan-500/20 shadow-2xl bg-gradient-to-b from-[#0a0f1d] to-[#0f172a]">
      {/* Three canvas element */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Control Overlay Bar */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          className={`p-2 rounded-xl backdrop-blur-md border text-xs flex items-center gap-1.5 transition-all ${
            isAutoRotate
              ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(0,212,255,0.3)]'
              : 'bg-slate-900/70 border-white/10 text-slate-400 hover:text-white'
          }`}
          title="Toggle Auto Rotation"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Rotate</span>
        </button>

        <button
          onClick={() => setIsWireframe(!isWireframe)}
          className={`p-2 rounded-xl backdrop-blur-md border text-xs flex items-center gap-1.5 transition-all ${
            isWireframe
              ? 'bg-purple-500/20 border-purple-400/40 text-purple-300 shadow-[0_0_15px_rgba(123,97,255,0.3)]'
              : 'bg-slate-900/70 border-white/10 text-slate-400 hover:text-white'
          }`}
          title="Toggle Wireframe Architecture"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Wireframe</span>
        </button>

        <button
          onClick={resetCamera}
          className="p-2 rounded-xl bg-slate-900/70 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/40 backdrop-blur-md transition-all text-xs flex items-center gap-1.5"
          title="Reset Camera View"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Bottom Hint Indicator */}
      <div className="absolute bottom-4 left-4 pointer-events-none flex items-center gap-2 text-xs text-slate-400 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        <Eye className="w-3.5 h-3.5 text-cyan-400" />
        <span>3D Interactive Orbit • Drag to rotate, scroll to zoom</span>
      </div>
    </div>
  );
};
