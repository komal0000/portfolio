"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const isMobile = window.innerWidth < 768;

    // ── Floating embers (dark red sparks drifting upward) ──
    const EMBER_COUNT = isMobile ? 40 : 80;
    const emberGeom = new THREE.CircleGeometry(0.08, 6);
    const emberColors = [0x8b0000, 0xcc0000, 0x660000, 0x4a0000, 0x330000];

    interface Ember {
      mesh: THREE.Mesh;
      speed: number;
      drift: number;
      flicker: number;
      phase: number;
      baseOpacity: number;
    }

    const embers: Ember[] = [];

    for (let i = 0; i < EMBER_COUNT; i++) {
      const color = emberColors[Math.floor(Math.random() * emberColors.length)];
      const baseOpacity = 0.05 + Math.random() * 0.2;
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: baseOpacity,
      });
      const mesh = new THREE.Mesh(emberGeom, mat);
      const scale = 0.3 + Math.random() * 1.2;
      mesh.scale.set(scale, scale, 1);
      mesh.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 30
      );
      scene.add(mesh);

      embers.push({
        mesh,
        speed: 0.008 + Math.random() * 0.02,
        drift: (Math.random() - 0.5) * 0.008,
        flicker: 2 + Math.random() * 4,
        phase: Math.random() * Math.PI * 2,
        baseOpacity,
      });
    }

    // ── Dust motes (very faint, tiny) ──
    const DUST_COUNT = isMobile ? 20 : 50;
    const dustGeom = new THREE.CircleGeometry(0.03, 4);

    interface Dust {
      mesh: THREE.Mesh;
      speed: number;
      phase: number;
    }

    const dusts: Dust[] = [];

    for (let i = 0; i < DUST_COUNT; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0x1a1a1a,
        transparent: true,
        opacity: 0.08 + Math.random() * 0.12,
      });
      const mesh = new THREE.Mesh(dustGeom, mat);
      mesh.scale.setScalar(0.5 + Math.random() * 1.5);
      mesh.position.set(
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 20
      );
      scene.add(mesh);
      dusts.push({
        mesh,
        speed: 0.003 + Math.random() * 0.006,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const mouse = { x: 0, y: 0 };

    function onMouseMove(e: MouseEvent) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener("mousemove", onMouseMove);

    let animId: number;
    let time = 0;

    function animate() {
      animId = requestAnimationFrame(animate);
      time += 0.008;

      // Embers drift upward slowly
      embers.forEach((ember) => {
        ember.mesh.position.y += ember.speed;
        ember.mesh.position.x += ember.drift + Math.sin(time * 0.5 + ember.phase) * 0.005;

        // Flicker opacity
        const mat = ember.mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = ember.baseOpacity * (0.4 + 0.6 * Math.abs(Math.sin(time * ember.flicker + ember.phase)));

        // Reset when drifted too high
        if (ember.mesh.position.y > 50) {
          ember.mesh.position.y = -50 - Math.random() * 20;
          ember.mesh.position.x = (Math.random() - 0.5) * 100;
        }
      });

      // Dust floats lazily
      dusts.forEach((dust) => {
        dust.mesh.position.y += dust.speed;
        dust.mesh.position.x += Math.sin(time * 0.3 + dust.phase) * 0.003;
        if (dust.mesh.position.y > 50) {
          dust.mesh.position.y = -50;
          dust.mesh.position.x = (Math.random() - 0.5) * 120;
        }
      });

      // Very subtle camera drift following mouse
      scene.rotation.x += (mouse.y * 0.015 - scene.rotation.x) * 0.01;
      scene.rotation.y += (mouse.x * 0.015 - scene.rotation.y) * 0.01;

      renderer.render(scene, camera);
    }

    animate();

    function onResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
