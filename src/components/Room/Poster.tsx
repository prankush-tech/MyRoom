import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'
import { useTexture } from '@react-three/drei'

const Poster = () => {

  const texture = useTexture('/poster.jpg')
  const ref = useRef<THREE.Mesh>(null)



    useControls({
        PosterX: {
            value: -5.85,
            min: -10,
            max: 10,
            onChange: (value) => {
                if (ref.current) ref.current.position.x = value
            }
        },
        PosterY: {
            value: 3.21,
            min: -10,
            max: 10,
            onChange: (value) => {
                if (ref.current) ref.current.position.y = value
            }
        },
        PosterZ: {
            value:-2.1,
            min: -10,
            max: 10,
            onChange: (value) => {
                if (ref.current) ref.current.position.z = value
            }
        }
    })

    return (
        <mesh ref={ref} rotation={[0, Math.PI / 2, 0]} scale={1}>
            <planeGeometry args={[1.2, 1.9]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    )
}

export default Poster