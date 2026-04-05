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
    const LEAF_COUNT = isMobile ? 30 : 60;

    // Create leaf-shaped geometry (diamond/rhombus)
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0.5);
    leafShape.quadraticCurveTo(0.3, 0.25, 0.15, 0);
    leafShape.quadraticCurveTo(0, -0.1, -0.15, 0);
    leafShape.quadraticCurveTo(-0.3, 0.25, 0, 0.5);

    const leafGeom = new THREE.ShapeGeometry(leafShape);

    const leafColors = [0xff6b00, 0xff8c00, 0xffd166, 0xe63946, 0xff6b00];

    interface Leaf {
      mesh: THREE.Mesh;
      speed: number;
      drift: number;
      rotSpeed: number;
      phase: number;
    }

    const leaves: Leaf[] = [];

    for (let i = 0; i < LEAF_COUNT; i++) {
      const color = leafColors[Math.floor(Math.random() * leafColors.length)];
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.15 + Math.random() * 0.25,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(leafGeom, mat);
      const scale = 0.4 + Math.random() * 0.8;
      mesh.scale.set(scale, scale, 1);
      mesh.position.set(
        (Math.random() - 0.5) * 100,
        40 + Math.random() * 40,
        (Math.random() - 0.5) * 30
      );
      mesh.rotation.z = Math.random() * Math.PI * 2;
      scene.add(mesh);

      leaves.push({
        mesh,
        speed: 0.02 + Math.random() * 0.04,
        drift: (Math.random() - 0.5) * 0.02,
        rotSpeed: (Math.random() - 0.5) * 0.02,
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
      time += 0.01;

      leaves.forEach((leaf) => {
        leaf.mesh.position.y -= leaf.speed;
        leaf.mesh.position.x += leaf.drift + Math.sin(time + leaf.phase) * 0.01;
        leaf.mesh.rotation.z += leaf.rotSpeed;
        leaf.mesh.rotation.x += leaf.rotSpeed * 0.5;

        // Reset leaf to top when it falls below
        if (leaf.mesh.position.y < -50) {
          leaf.mesh.position.y = 50 + Math.random() * 20;
          leaf.mesh.position.x = (Math.random() - 0.5) * 100;
        }
      });

      // Gentle camera tilt following mouse
      scene.rotation.x += (mouse.y * 0.03 - scene.rotation.x) * 0.02;
      scene.rotation.y += (mouse.x * 0.03 - scene.rotation.y) * 0.02;

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
