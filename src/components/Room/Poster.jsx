import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'
import { useVideoTexture } from '@react-three/drei'

const Poster = () => {

    // const texture = useVideoTexture('/spider.mp4')
    const refPLane = useRef<THREE.Mesh>(null)

    useControls({
        positionX: {
            value: 0,
            min: -10,
            max: 10,
            onChange: (value) => {
                if (refPLane.current) refPLane.current.position.x = value
            }
        },
        positionY: {
            value: 0,
            min: -10,
            max: 10,
            onChange: (value) => {
                if (refPLane.current) refPLane.current.position.y = value
            }
        },
        positionZ: {
            value:0,
            min: -10,
            max: 10,
            onChange: (value) => {
                if (refPLane.current) refPLane.current.position.z = value
            }
        }
    })

    return (
        <mesh ref={refPLane} rotation={[0, Math.PI / 2, 0]} scale={1.78}>
            <planeGeometry args={[1.1, 2]} />
            <meshNormalMaterial />
        </mesh>
    )
}

export default Poster