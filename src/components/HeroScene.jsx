import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function SteamParticles({ count = 700 }) {
  const meshRef = useRef()

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: (Math.random() - 0.5) * 10,
      y: Math.random() * 12 - 6,
      z: (Math.random() - 0.5) * 5,
      speed: 0.004 + Math.random() * 0.009,
      offset: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.4,
      size: 0.012 + Math.random() * 0.024,
    }))
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.elapsedTime

    particles.forEach((p, i) => {
      const y = ((p.y + t * p.speed * 5 + 6) % 12) - 6
      const xDrift = Math.sin(t * 0.25 + p.offset) * 0.5 + p.drift

      const opacity = Math.max(0, 1 - Math.abs(y) / 5)
      const s = p.size * (0.4 + opacity * 0.6)

      dummy.position.set(p.x + xDrift, y, p.z)
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial
        color="#F2EDE4"
        transparent
        opacity={0.09}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  )
}

function EmberCore() {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.elapsedTime
    meshRef.current.material.opacity = 0.055 + Math.sin(t * 0.4) * 0.018
    meshRef.current.rotation.y = t * 0.04
  })

  return (
    <group position={[0.5, 0.2, -4]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshBasicMaterial
          color="#D4462E"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* inner hot core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial
          color="#FF7A5A"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function GoldAccent() {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.elapsedTime
    meshRef.current.material.opacity = 0.03 + Math.sin(t * 0.3 + 1) * 0.01
  })

  return (
    <mesh ref={meshRef} position={[-3, -1, -5]}>
      <sphereGeometry args={[2.5, 16, 16]} />
      <meshBasicMaterial
        color="#C9A26A"
        transparent
        opacity={0.03}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

function CameraRig() {
  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime
    camera.position.x = Math.sin(t * 0.08) * 0.4
    camera.position.y = Math.cos(t * 0.06) * 0.2
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.5]}
      style={{ background: '#0A0A0A' }}
    >
      <fog attach="fog" args={['#0A0A0A', 10, 22]} />
      <CameraRig />
      <SteamParticles count={700} />
      <EmberCore />
      <GoldAccent />
    </Canvas>
  )
}
