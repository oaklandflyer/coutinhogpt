import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Line, MeshDistortMaterial, Stars, Text } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const cameraPoints = [
  new THREE.Vector3(0, 1.1, 7.2),
  new THREE.Vector3(-1.7, 1.4, 5.6),
  new THREE.Vector3(2.1, 1.1, 3.7),
  new THREE.Vector3(-1.4, 0.5, 2),
  new THREE.Vector3(1.8, 0.8, 0.7),
  new THREE.Vector3(0.1, 1.15, -1.4),
];

const lookPoints = [
  new THREE.Vector3(0, 0.7, 0),
  new THREE.Vector3(0.2, 0.9, -0.6),
  new THREE.Vector3(0.1, 0.7, -1.7),
  new THREE.Vector3(0.2, 0.5, -2.8),
  new THREE.Vector3(-0.2, 0.5, -3.9),
  new THREE.Vector3(0, 0.7, -5),
];

const chapterPanels = [
  { title: 'ASF Visuals LLC', subtitle: 'Founder', pos: [-2.2, 0.8, -1.2] },
  { title: 'Global Shapers', subtitle: 'Vice Curator', pos: [2.3, 0.9, -1.8] },
  { title: 'Fitness Club at Pitt', subtitle: 'Founder / President / Advisor', pos: [-2.5, 0.4, -2.7] },
  { title: 'National Collegiate Bodybuilding Org', subtitle: 'Co-Founder / President', pos: [2.1, 0.4, -3.2] },
  { title: 'University of Pittsburgh', subtitle: 'Ops / Comms / Advising', pos: [0, 0.25, -4.1] },
];

function lerpPath(points, t) {
  const max = points.length - 1;
  const scaled = THREE.MathUtils.clamp(t, 0, 1) * max;
  const index = Math.floor(scaled);
  const alpha = scaled - index;
  const from = points[index];
  const to = points[Math.min(index + 1, max)];
  return new THREE.Vector3().copy(from).lerp(to, alpha);
}

function CameraRig({ progress, mouse }) {
  const { camera } = useThree();

  useFrame(() => {
    const target = lerpPath(cameraPoints, progress);
    const look = lerpPath(lookPoints, progress);

    camera.position.lerp(
      new THREE.Vector3(target.x + mouse.x * 0.22, target.y + mouse.y * 0.1, target.z),
      0.065
    );
    camera.lookAt(look.x + mouse.x * 0.16, look.y + mouse.y * 0.08, look.z);
  });

  return null;
}

function HeroBeacon({ progress }) {
  return (
    <group position={[0, 0.8, 0]}>
      <Float speed={1.5} rotationIntensity={0.7} floatIntensity={0.7}>
        <mesh rotation={[0.4, 0.6, 0]}>
          <torusKnotGeometry args={[0.75, 0.18, 140, 24]} />
          <meshStandardMaterial color="#7ea1ff" emissive="#4f79ff" emissiveIntensity={0.8} metalness={0.75} roughness={0.2} />
        </mesh>
      </Float>

      <Text
        position={[0, -1.4, 0.2]}
        fontSize={0.45}
        letterSpacing={0.09}
        color={progress < 0.15 ? '#eaf0ff' : '#aac2ff'}
        anchorX="center"
        anchorY="middle"
      >
        ANDREW COUTINHO
      </Text>
    </group>
  );
}

function OrbitArchitecture({ progress }) {
  const lines = useMemo(
    () =>
      new Array(3).fill(0).map((_, i) => {
        const r = 2.5 + i * 0.8;
        const pts = [];
        for (let a = 0; a <= Math.PI * 2; a += Math.PI / 40) {
          pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * 0.15 + 1.1, -1 - i * 0.6));
        }
        return pts;
      }),
    []
  );

  return (
    <group rotation={[0, progress * 0.8, 0]}>
      {lines.map((points, i) => (
        <Line key={i} points={points} color={i === 1 ? '#66dbc9' : '#627cf0'} lineWidth={1.1} transparent opacity={0.45} />
      ))}
    </group>
  );
}

function ExperienceConstellation({ activeChapter }) {
  return (
    <group>
      {chapterPanels.map((panel, i) => {
        const active = activeChapter >= 2 && activeChapter <= 3 && i <= 4;
        return (
          <group key={panel.title} position={panel.pos}>
            <Float speed={1.2 + i * 0.08} rotationIntensity={0.25} floatIntensity={0.4}>
              <mesh>
                <boxGeometry args={[1.55, 0.92, 0.1]} />
                <meshStandardMaterial
                  color={active ? '#8da9ff' : '#141b2e'}
                  emissive={active ? '#617dff' : '#1f2b4e'}
                  emissiveIntensity={active ? 0.58 : 0.2}
                  metalness={0.4}
                  roughness={0.34}
                />
              </mesh>
            </Float>
            <Text position={[0, 0.05, 0.08]} fontSize={0.085} maxWidth={1.25} anchorX="center" anchorY="middle" color="#eaf1ff">
              {panel.title}
            </Text>
            <Text position={[0, -0.26, 0.08]} fontSize={0.058} maxWidth={1.2} anchorX="center" anchorY="middle" color="#8da2cf">
              {panel.subtitle}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

function CapabilityShards({ activeChapter }) {
  const shardRef = useRef();

  useFrame((state) => {
    if (!shardRef.current) return;
    shardRef.current.rotation.y += 0.003;
    shardRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    shardRef.current.position.y = 0.45 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
  });

  return (
    <group ref={shardRef} position={[0, 0.5, -4.2]}>
      {['Product', 'Operations', 'Leadership', 'Creative'].map((label, i) => (
        <group key={label} rotation={[0, (i * Math.PI) / 2, 0]}>
          <mesh position={[1.35, 0, 0]}>
            <octahedronGeometry args={[0.38, 0]} />
            <MeshDistortMaterial
              color={activeChapter >= 4 ? '#90afff' : '#223154'}
              emissive={activeChapter >= 4 ? '#5f82ff' : '#1b2540'}
              emissiveIntensity={activeChapter >= 4 ? 0.7 : 0.28}
              roughness={0.15}
              metalness={0.72}
              distort={0.23}
              speed={1.1}
            />
          </mesh>
          <Text position={[1.35, -0.62, 0]} fontSize={0.1} color="#d8e5ff" anchorX="center" anchorY="middle">
            {label}
          </Text>
        </group>
      ))}
    </group>
  );
}

function FinalSignal({ activeChapter }) {
  return (
    <group position={[0, 1.1, -5.2]}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
        <mesh>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshPhysicalMaterial
            color={activeChapter >= 5 ? '#dce8ff' : '#2f3c66'}
            emissive={activeChapter >= 5 ? '#8aa8ff' : '#242f50'}
            emissiveIntensity={activeChapter >= 5 ? 1.15 : 0.35}
            roughness={0.08}
            transmission={0.28}
            thickness={1.2}
          />
        </mesh>
      </Float>
      <Text position={[0, -0.95, 0]} fontSize={0.13} letterSpacing={0.08} color="#c1d5ff" anchorX="center" anchorY="middle">
        READY TO BUILD WHAT'S NEXT
      </Text>
    </group>
  );
}

function SceneContent({ progress, activeChapter, mouse }) {
  return (
    <>
      <color attach="background" args={['#04070d']} />
      <fog attach="fog" args={['#04070d', 6, 13]} />
      <ambientLight intensity={0.35} />
      <hemisphereLight intensity={0.55} color="#8ea9ff" groundColor="#101621" />
      <pointLight position={[3, 4, 4]} intensity={1.4} color="#7da1ff" />
      <pointLight position={[-5, 2, -4]} intensity={0.9} color="#62dac8" />

      <Stars radius={35} depth={35} count={2200} factor={3.8} saturation={0} fade speed={0.5} />

      <HeroBeacon progress={progress} />
      <OrbitArchitecture progress={progress} />
      <ExperienceConstellation activeChapter={activeChapter} />
      <CapabilityShards activeChapter={activeChapter} />
      <FinalSignal activeChapter={activeChapter} />
      <Environment preset="city" />

      <CameraRig progress={progress} mouse={mouse} />
    </>
  );
}

export default function WorldScene({ progress, activeChapter, mouse }) {
  return (
    <Canvas camera={{ fov: 48, position: [0, 1.1, 7.2] }} dpr={[1, 1.8]}>
      <SceneContent progress={progress} activeChapter={activeChapter} mouse={mouse} />
    </Canvas>
  );
}
