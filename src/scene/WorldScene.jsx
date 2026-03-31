import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, Text } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const SHOTS = [
  {
    position: new THREE.Vector3(0, 1.4, 7.8),
    lookAt: new THREE.Vector3(0, 0.9, 0),
    fov: 36,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  },
  {
    position: new THREE.Vector3(-2.3, 1.8, 5.2),
    lookAt: new THREE.Vector3(0, 0.7, -0.7),
    fov: 42,
    easing: (t) => t * t * (3 - 2 * t),
  },
  {
    position: new THREE.Vector3(2.6, 1.1, 3.2),
    lookAt: new THREE.Vector3(-0.1, 0.55, -1.6),
    fov: 46,
    easing: (t) => t * t * t,
  },
  {
    position: new THREE.Vector3(-2.15, 0.65, 1.3),
    lookAt: new THREE.Vector3(0.25, 0.5, -2.9),
    fov: 45,
    easing: (t) => 1 - Math.pow(1 - t, 2),
  },
  {
    position: new THREE.Vector3(1.95, 0.95, 0.2),
    lookAt: new THREE.Vector3(0, 0.52, -3.8),
    fov: 40,
    easing: (t) => t * t * (3 - 2 * t),
  },
  {
    position: new THREE.Vector3(0, 1.3, -1.65),
    lookAt: new THREE.Vector3(0, 0.62, -5.2),
    fov: 34,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  },
];

const EXPERIENCE_MARKERS = [
  { label: 'ASF Visuals LLC', role: 'Founder', position: [-2.8, 0.58, -1.2], rot: [0, 0.42, 0] },
  { label: 'Global Shapers', role: 'Vice Curator', position: [2.8, 0.65, -1.8], rot: [0, -0.45, 0] },
  {
    label: 'Fitness Club at Pitt',
    role: 'Founder · President · Advisor',
    position: [-2.95, 0.32, -2.8],
    rot: [0, 0.54, 0],
  },
  {
    label: 'National Collegiate Bodybuilding Org',
    role: 'Co-Founder · President',
    position: [2.75, 0.28, -3.25],
    rot: [0, -0.56, 0],
  },
  {
    label: 'University of Pittsburgh',
    role: 'Operations · Comms · Advising',
    position: [0, 0.2, -4.05],
    rot: [0, 0, 0],
  },
];

function shotBlend(progress) {
  const max = SHOTS.length - 1;
  const scaled = THREE.MathUtils.clamp(progress, 0, 1) * max;
  const idx = Math.floor(scaled);
  const next = Math.min(idx + 1, max);
  const t = scaled - idx;
  return { from: SHOTS[idx], to: SHOTS[next], t, idx };
}

function CameraDirector({ progress, mouse }) {
  const { camera } = useThree();
  const velocity = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    const { from, to, t, idx } = shotBlend(progress);
    const eased = from.easing(t);

    const overshoot = Math.sin(eased * Math.PI) * 0.08;
    const pos = new THREE.Vector3().copy(from.position).lerp(to.position, eased + overshoot * 0.25);
    const look = new THREE.Vector3().copy(from.lookAt).lerp(to.lookAt, eased);
    const fov = THREE.MathUtils.lerp(from.fov, to.fov, eased);

    velocity.current.x = THREE.MathUtils.damp(velocity.current.x, mouse.x, 7, delta);
    velocity.current.y = THREE.MathUtils.damp(velocity.current.y, mouse.y, 7, delta);

    const lagX = velocity.current.x * (idx === 0 ? 0.32 : 0.2);
    const lagY = velocity.current.y * 0.12;

    const drift = Math.sin(state.clock.elapsedTime * 0.22 + idx) * 0.05;

    camera.position.lerp(new THREE.Vector3(pos.x + lagX, pos.y + lagY, pos.z + drift), 0.065);
    camera.fov = THREE.MathUtils.damp(camera.fov, fov, 8, delta);
    camera.updateProjectionMatrix();
    camera.lookAt(look.x + lagX * 0.2, look.y + lagY * 0.25, look.z);
  });

  return null;
}

function HeroCore({ progress, mouse }) {
  const shell = useRef();
  const core = useRef();

  useFrame((state, delta) => {
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.25) * 0.04;
    const pointerProximity = 1 + (Math.abs(mouse.x) + Math.abs(mouse.y)) * 0.06;
    const chapterBoost = 1 + progress * 0.2;

    if (shell.current && core.current) {
      shell.current.rotation.y += 0.12 * delta;
      shell.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      shell.current.scale.setScalar(pulse * pointerProximity);

      core.current.rotation.y -= 0.2 * delta;
      core.current.scale.setScalar(pulse * chapterBoost * 0.78);
      core.current.position.y = 0.82 + Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
    }
  });

  return (
    <group position={[0, 0.78, 0]}>
      <Float speed={1.2} floatIntensity={0.34} rotationIntensity={0.12}>
        <mesh ref={shell} castShadow>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshPhysicalMaterial
            color="#7d95ff"
            emissive="#5677ff"
            emissiveIntensity={0.95 + progress * 0.5}
            roughness={0.12}
            metalness={0.92}
            clearcoat={1}
          />
        </mesh>
      </Float>

      <mesh ref={core} castShadow>
        <octahedronGeometry args={[0.48, 0]} />
        <MeshTransmissionMaterial
          thickness={1.2}
          chromaticAberration={0.03}
          distortion={0.17 + progress * 0.1}
          roughness={0.05}
          color="#d7e4ff"
          emissive="#95b2ff"
          emissiveIntensity={0.8 + progress * 0.5}
        />
      </mesh>
    </group>
  );
}

function ExperienceMonoliths({ activeChapter }) {
  return (
    <group>
      {EXPERIENCE_MARKERS.map((item, i) => {
        const highlighted = activeChapter >= 2 && activeChapter <= 3 && i <= 4;
        return (
          <group key={item.label} position={item.position} rotation={item.rot}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.55, 1.8, 0.22]} />
              <meshStandardMaterial
                color={highlighted ? '#8ca6ff' : '#171e33'}
                emissive={highlighted ? '#5f7fff' : '#1f2c4f'}
                emissiveIntensity={highlighted ? 0.72 : 0.24}
                metalness={0.72}
                roughness={0.28}
              />
            </mesh>
            <Text position={[0, -1.28, 0.2]} fontSize={0.08} maxWidth={2.8} anchorX="center" color="#dce8ff">
              {item.label}
            </Text>
            <Text position={[0, -1.45, 0.2]} fontSize={0.055} maxWidth={2.8} anchorX="center" color="#8da1cd">
              {item.role}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

function TypographyInSpace({ activeChapter }) {
  return (
    <group>
      <Text position={[-3, 2.35, -2.5]} fontSize={0.45} color="#9bb2ff" anchorX="left" letterSpacing={0.04}>
        PRODUCT
      </Text>
      <Text position={[1.55, 2.05, -3.15]} fontSize={0.38} color="#77dccb" anchorX="left" letterSpacing={0.04}>
        OPERATIONS
      </Text>
      <Text position={[-1.2, -0.2, -4.8]} fontSize={0.32} color={activeChapter >= 4 ? '#c9d9ff' : '#62739e'} anchorX="left" letterSpacing={0.04}>
        LEADERSHIP · STRATEGY · CREATIVE
      </Text>
    </group>
  );
}

function Stage() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.22, -2]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#090f19" roughness={0.92} metalness={0.08} />
      </mesh>

      <mesh position={[0, -0.12, -2]} receiveShadow>
        <cylinderGeometry args={[4.4, 5.2, 0.2, 80]} />
        <meshStandardMaterial color="#0e1524" roughness={0.82} metalness={0.15} />
      </mesh>
    </group>
  );
}

function LightingRig({ mouse }) {
  const key = useRef();

  useFrame((_, delta) => {
    if (!key.current) return;
    key.current.position.x = THREE.MathUtils.damp(key.current.position.x, 3.8 + mouse.x * 1.3, 5, delta);
    key.current.position.y = THREE.MathUtils.damp(key.current.position.y, 5 + mouse.y * 0.8, 5, delta);
  });

  return (
    <>
      <ambientLight intensity={0.16} />
      <directionalLight
        ref={key}
        position={[3.8, 5, 3]}
        intensity={1.45}
        color="#c9d7ff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.00012}
      />
      <directionalLight position={[-4.2, 2.5, -3.2]} intensity={0.8} color="#6be0cf" />
      <pointLight position={[0, 1.8, -5]} intensity={0.38} color="#9ab1ff" />
    </>
  );
}

function SceneContent({ progress, activeChapter, mouse }) {
  return (
    <>
      <color attach="background" args={['#04070d']} />
      <fog attach="fog" args={['#04070d', 5.4, 14]} />

      <LightingRig mouse={mouse} />
      <Stage />
      <HeroCore progress={progress} mouse={mouse} />
      <ExperienceMonoliths activeChapter={activeChapter} />
      <TypographyInSpace activeChapter={activeChapter} />
      <Environment preset="studio" />

      <CameraDirector progress={progress} mouse={mouse} />

      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.45} intensity={0.62} radius={0.64} />
        <Vignette eskil={false} offset={0.2} darkness={0.74} />
      </EffectComposer>
    </>
  );
}

export default function WorldScene({ progress, activeChapter, mouse }) {
  return (
    <Canvas shadows camera={{ fov: 36, position: [0, 1.4, 7.8] }} dpr={[1, 1.8]}>
      <SceneContent progress={progress} activeChapter={activeChapter} mouse={mouse} />
    </Canvas>
  );
}
