import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { useVideoTexture } from "@react-three/drei";

const VideoTV = () => {

 const luffyTexture = useVideoTexture("/luffy.mp4");
  const spiderverseTexture = useVideoTexture("/spider.mp4");
  const narutoTexture = useVideoTexture("/naruto.mp4");
  const demonTexture = useVideoTexture("/zenitsu.mp4");

  const ref = useRef<THREE.Mesh>(null);

  const { selectedTexture } = useControls("TV Channels", {
    selectedTexture: {
      value: 'Spiderverse',
      options: ['Luffy', 'Spiderverse', 'Naruto', 'Demon Slayer'],
      // type: 'radio'
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
        return luffyTexture;
    }
  })();


  return (
    <mesh
      ref={ref}
      rotation={[0, Math.PI / 2, 0]}
      scale={1.78}
      position={[-5.32, 1.1, 5.11]}
    >
      <planeGeometry args={[2, 1.1]} />
      <meshBasicMaterial map={selectedVideoTexture} />
    </mesh>
  );
};

export default VideoTV;
