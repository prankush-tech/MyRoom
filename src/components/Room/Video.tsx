import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { useVideoTexture } from "@react-three/drei";

const Video = () => {
  const texture = useVideoTexture("/spider.mp4");
  const ref = useRef<THREE.Mesh>(null);

  useControls("TV Spiderverse", {
    X: {
      value: -5.32,
      min: -10,
      max: 0,
      onChange: (value) => {
        if (ref.current) ref.current.position.x = value;
      },
    },
    Y: {
      value: 1.1,
      min: -10,
      max: 10,
      onChange: (value) => {
        if (ref.current) ref.current.position.y = value;
      },
    },
    Z: {
      value: 5.11,
      min: 0,
      max: 10,
      onChange: (value) => {
        if (ref.current) ref.current.position.z = value;
      },
    },
  });

  return (
    <mesh
      ref={ref}
      rotation={[0, Math.PI / 2, 0]}
      scale={1.78}
      position={[-5.32, 1.1, 5.11]}
    >
      <planeGeometry args={[2, 1.1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default Video;
