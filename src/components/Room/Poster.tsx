import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'
import { useTexture, useVideoTexture } from '@react-three/drei'

const Poster = () => {

  const texture = useTexture('/poster.jpg')
  const ref = useRef<THREE.Mesh>(null)


    return (
        <mesh ref={ref} rotation={[0, Math.PI / 2, 0]} scale={1} position={[-5.85, 3.23, -2.11]}>
            <planeGeometry args={[1.27, 1.9]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    )
}

export default Poster