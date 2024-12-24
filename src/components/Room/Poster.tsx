import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'
import { useTexture, useVideoTexture } from '@react-three/drei'
import usePosterIntensity from '@/store/PosterIntensity'

const Poster = () => {

  const texture = useTexture('/poster2.jpg')
  const ref = useRef<THREE.Mesh>(null)

  const strength  = usePosterIntensity((state) => state.strength)   
  const intensity =  strength * 0.8
    return (
        <mesh ref={ref} rotation={[0, Math.PI / 2, 0]} scale={1} position={[-5.85, 2.75, -2.11]}>
            <planeGeometry args={[1.27, 1.9]} />
            <meshBasicMaterial map={texture} color={new THREE.Color(0.1+intensity, 0.1+intensity, 0.1+intensity)}  />
        </mesh>
    )
}

export default Poster