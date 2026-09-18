import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const HeroScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 550;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 5.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // keep hero background stable
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 1.7;
    controls.minPolarAngle = Math.PI / 2.6;
    controls.autoRotate = false;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00d4ff, 4.5, 20);
    cyanPointLight.position.set(3, 3, 3);
    scene.add(cyanPointLight);

    const purplePointLight = new THREE.PointLight(0x7b61ff, 3.8, 20);
    purplePointLight.position.set(-3, -1, 2);
    scene.add(purplePointLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    rimLight.position.set(0, 5, -3);
    scene.add(rimLight);

    // Starfield particles
    const starCount = 350;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 20;
      starPos[i + 1] = (Math.random() - 0.5) * 15;
      starPos[i + 2] = (Math.random() - 0.5) * 15 - 2;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.65,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // Dark space planet/pedestal at bottom
    const planetGeo = new THREE.SphereGeometry(3.5, 48, 48);
    const planetMat = new THREE.MeshStandardMaterial({
      color: 0x070b14,
      roughness: 0.85,
      metalness: 0.3,
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    planet.position.set(0, -4.6, 0);
    scene.add(planet);

    // Planet atmosphere glowing rim
    const atmGeo = new THREE.RingGeometry(3.48, 3.65, 64);
    const atmMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const atmRing = new THREE.Mesh(atmGeo, atmMat);
    atmRing.rotation.x = Math.PI / 2.15;
    atmRing.position.set(0, -1.15, 0);
    scene.add(atmRing);

    // Floating Robot Mascot Group
    const robotGroup = new THREE.Group();
    robotGroup.position.set(0, 0.4, 0);
    scene.add(robotGroup);

    // Materials for Robot
    const cyberArmorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.2,
    });

    const whiteShellMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.3,
      roughness: 0.15,
    });

    const cyanGlowMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      emissive: 0x00d4ff,
      emissiveIntensity: 2.2,
      roughness: 0.1,
    });

    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x020617,
      metalness: 0.95,
      roughness: 0.05,
    });

    // 1. Robot Head
    const headGroup = new THREE.Group();
    const headGeo = new THREE.SphereGeometry(0.72, 32, 32);
    headGeo.scale(1, 0.9, 0.95);
    const headMesh = new THREE.Mesh(headGeo, whiteShellMat);
    headGroup.add(headMesh);

    // Visor
    const visorGeo = new THREE.SphereGeometry(0.68, 32, 24, 0, Math.PI, 0, Math.PI * 0.48);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0.05, 0.15);
    visorMesh.rotation.x = Math.PI * 0.1;
    headGroup.add(visorMesh);

    // Glowing Eyes / Visor HUD line
    const eyeBarGeo = new THREE.BoxGeometry(0.48, 0.08, 0.1);
    const eyeBar = new THREE.Mesh(eyeBarGeo, cyanGlowMat);
    eyeBar.position.set(0, 0.08, 0.72);
    headGroup.add(eyeBar);

    // Cyber Ear modules
    const earGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.1, 24);
    const earLeft = new THREE.Mesh(earGeo, cyberArmorMat);
    earLeft.rotation.z = Math.PI / 2;
    earLeft.position.set(-0.76, 0.05, 0);
    headGroup.add(earLeft);

    const earRight = earLeft.clone();
    earRight.position.set(0.76, 0.05, 0);
    headGroup.add(earRight);

    // Ear glowing LED rings
    const earRingGeo = new THREE.TorusGeometry(0.15, 0.025, 16, 24);
    const earRingL = new THREE.Mesh(earRingGeo, cyanGlowMat);
    earRingL.rotation.y = Math.PI / 2;
    earRingL.position.set(-0.82, 0.05, 0);
    headGroup.add(earRingL);

    const earRingR = earRingL.clone();
    earRingR.position.set(0.82, 0.05, 0);
    headGroup.add(earRingR);

    // Antenna
    const antStemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.35, 12);
    const antStem = new THREE.Mesh(antStemGeo, cyberArmorMat);
    antStem.position.set(0, 0.8, 0);
    headGroup.add(antStem);

    const antTipGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const antTip = new THREE.Mesh(antTipGeo, cyanGlowMat);
    antTip.position.set(0, 0.98, 0);
    headGroup.add(antTip);

    robotGroup.add(headGroup);

    // 2. Robot Torso
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, -0.95, 0);

    const chestGeo = new THREE.CylinderGeometry(0.48, 0.32, 0.75, 24);
    const chestMesh = new THREE.Mesh(chestGeo, whiteShellMat);
    torsoGroup.add(chestMesh);

    // Central Glowing Arc Reactor / Neural Core
    const coreGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.08, 24);
    const coreMesh = new THREE.Mesh(coreGeo, cyanGlowMat);
    coreMesh.rotation.x = Math.PI / 2;
    coreMesh.position.set(0, 0.08, 0.38);
    torsoGroup.add(coreMesh);

    // Cyber shoulders / arms (floating spherical joints)
    const shoulderGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const shoulderL = new THREE.Mesh(shoulderGeo, cyberArmorMat);
    shoulderL.position.set(-0.62, 0.15, 0);
    torsoGroup.add(shoulderL);

    const shoulderR = shoulderL.clone();
    shoulderR.position.set(0.62, 0.15, 0);
    torsoGroup.add(shoulderR);

    // Floating hands/grippers
    const handGeo = new THREE.BoxGeometry(0.12, 0.28, 0.12);
    const handL = new THREE.Mesh(handGeo, whiteShellMat);
    handL.position.set(-0.72, -0.22, 0.12);
    torsoGroup.add(handL);

    const handR = handL.clone();
    handR.position.set(0.72, -0.22, 0.12);
    torsoGroup.add(handR);

    robotGroup.add(torsoGroup);

    // 3. Floating Orbital Gyro Rings around mascot
    const gyroRingGeo = new THREE.TorusGeometry(1.4, 0.02, 16, 80);
    const gyroRingMat1 = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      emissive: 0x00d4ff,
      emissiveIntensity: 1.2,
      metalness: 0.8,
      roughness: 0.1,
    });
    const gyroRing1 = new THREE.Mesh(gyroRingGeo, gyroRingMat1);
    gyroRing1.rotation.x = Math.PI / 3;
    robotGroup.add(gyroRing1);

    const gyroRingGeo2 = new THREE.TorusGeometry(1.65, 0.015, 16, 80);
    const gyroRingMat2 = new THREE.MeshStandardMaterial({
      color: 0x7b61ff,
      emissive: 0x7b61ff,
      emissiveIntensity: 0.9,
      metalness: 0.8,
      roughness: 0.2,
    });
    const gyroRing2 = new THREE.Mesh(gyroRingGeo2, gyroRingMat2);
    gyroRing2.rotation.y = Math.PI / 3;
    robotGroup.add(gyroRing2);

    // Mouse tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.4;
      targetMouseY = y * 0.25;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Subtle Idle Floating Animation
      const floatY = Math.sin(elapsedTime * 1.8) * 0.12;
      robotGroup.position.y = 0.4 + floatY;

      // Gentle Head Look-At & Tilt
      headGroup.rotation.y += (targetMouseX - headGroup.rotation.y) * 0.05;
      headGroup.rotation.x += (-targetMouseY - headGroup.rotation.x) * 0.05;

      // Soft body tilt
      torsoGroup.rotation.y += (targetMouseX * 0.4 - torsoGroup.rotation.y) * 0.03;

      // Orbital Gyro Rings spin
      gyroRing1.rotation.z = elapsedTime * 0.4;
      gyroRing1.rotation.y = elapsedTime * 0.25;
      gyroRing2.rotation.x = -elapsedTime * 0.35;
      gyroRing2.rotation.z = elapsedTime * 0.15;

      // Slowly rotate starfield
      starPoints.rotation.y = elapsedTime * 0.02;

      // Pulse eye intensity slightly
      cyanGlowMat.emissiveIntensity = 1.8 + Math.sin(elapsedTime * 3) * 0.5;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Responsive Resize Observer
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
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[600px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing">
      {/* Three canvas container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating Interactive Badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full glass-panel text-xs text-cyan-300/80 flex items-center gap-2 border border-cyan-500/20 backdrop-blur-md pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        Interactive 3D Mascot • Drag to orbit
      </div>
    </div>
  );
};
