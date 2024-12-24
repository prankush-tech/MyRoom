import React, { useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { useVideoTexture } from "@react-three/drei";

const VideoLaptop = () => {
  const luffyTexture = useVideoTexture("/luffy.mp4");
  const spiderverseTexture = useVideoTexture("/spider.mp4");
  const narutoTexture = useVideoTexture("/naruto.mp4");
  const demonTexture = useVideoTexture("/zenitsu.mp4");

  const ref = useRef<THREE.Mesh>(null);

  const { selectedTexture } = useControls("Laptop", {
    selectedTexture: {
      value: 'Demon Slayer',
      options: ['Luffy', 'Spiderverse', 'Naruto', 'Demon Slayer'],
    }
  });

  const selectedVideoTexture = (() => {
    switch (selectedTexture) {
      case 'Luffy':
        return luffyTexture;
      case 'Spiderverse':
        return spiderverseTexture;
      case 'Naruto':
        return narutoTexture;
      case 'Demon Slayer':
        return demonTexture;
      default:
        return demonTexture;
    }
  })();

  return (
    <mesh
      ref={ref}
      rotation={[0.00, 2.32, 0.00]}
      position={[-5.05, -0.05, 7.85]}
      scale={0.66}
    >
      <planeGeometry args={[2, 1.1]} />
      <meshBasicMaterial map={selectedVideoTexture} />
    </mesh>
  );
};

export default VideoLaptop;