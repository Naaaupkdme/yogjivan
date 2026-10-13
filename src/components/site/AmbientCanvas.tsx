import { Canvas, useFrame } from "@react-three/fiber";
import { Component, type ReactNode, useMemo, useRef } from "react";
import * as THREE from "three";

class CanvasErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("AmbientCanvas WebGL initialization suppressed:", error);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

type Particle = {
  position: [number, number, number];
  size: number;
  speed: number;
};

function Particles() {
  const points = useRef<THREE.Points>(null);
  const particles = useMemo<Particle[]>(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 38 : 90;
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
      ],
      size: 0.04 + Math.random() * 0.08,
      speed: 0.2 + Math.random() * 0.45,
    }));
  }, []);

  const geom = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particles.length * 3);
    particles.forEach((p, i) => {
      positions[i * 3 + 0] = p.position[0];
      positions[i * 3 + 1] = p.position[1];
      positions[i * 3 + 2] = p.position[2];
    });
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [particles]);

  useFrame(() => {
    if (!points.current) return;
    const t = typeof performance !== "undefined" ? performance.now() * 0.001 : 0;
    points.current.rotation.y = t * 0.03;
    points.current.rotation.x = Math.sin(t * 0.12) * 0.08;
    points.current.position.y = Math.sin(t * 0.2) * 0.15;
  });

  return (
    <points ref={points} geometry={geom}>
      <pointsMaterial
        color="#d3b06d"
        size={0.085}
        sizeAttenuation
        transparent
        opacity={0.42}
        depthWrite={false}
      />
    </points>
  );
}

function Ring({ radius, color, speed, z }: { radius: number; color: string; speed: number; z: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!mesh.current) return;
    const t = typeof performance !== "undefined" ? performance.now() * 0.001 : 0;
    mesh.current.rotation.z = t * speed;
  });
  return (
    <mesh ref={mesh} position={[0, 0, z]}>
      <torusGeometry args={[radius, 0.02, 12, 220]} />
      <meshBasicMaterial color={color} transparent opacity={0.1} />
    </mesh>
  );
}

export function AmbientCanvas({ inView = true }: { inView?: boolean }) {
  if (!isWebGLAvailable()) return null;

  return (
    <CanvasErrorBoundary>
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <Canvas frameloop={inView ? "always" : "never"} camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.55} />
          <Particles />
          <Ring radius={2.6} color="#caa86b" speed={0.08} z={-1} />
          <Ring radius={3.4} color="#f2e2bb" speed={-0.05} z={-2.2} />
          <Ring radius={1.5} color="#9a7a42" speed={0.14} z={-0.4} />
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}
