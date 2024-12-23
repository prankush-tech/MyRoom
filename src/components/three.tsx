'use client'

import React, { useState, useEffect } from "react";
import { editable as e, SheetProvider } from "@theatre/r3f";
import { OrbitControls } from "@react-three/drei";
import { Model } from "./Room/Room";
import { Canvas } from "@react-three/fiber";
import VideoTV from "./Room/VideoTV";
import Poster from "./Room/Poster";
import VideoLaptop from "./Room/VideoLaptop";


const Three = () => {

const [maxDistance, setMaxDistance] = useState(
    typeof window !== "undefined" && window.innerWidth < 768 ? 120 : 70 
  );

  useEffect(() => {
    const handleResize = () => {
      setMaxDistance(window.innerWidth < 768 ? 125 : 70);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Canvas
      camera={{
        position: [40, 20, 28],
        fov: 22,
      }}
    >
      <color attach="background" args={["#000000"]} />
      <OrbitControls
        minAzimuthAngle={0}
        maxAzimuthAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 12}
        maxPolarAngle={Math.PI - Math.PI / 2}
        enableDamping={true}
        dampingFactor={0.04}
        makeDefault={true}
        maxDistance={maxDistance}
        minDistance={25}
      />
      {/* <pointLight position={[10, 10, 10]} intensity={10} color={"red"} /> */}
      {/* <axesHelper args={[100]} /> */}
      {/* <ambientLight intensity={Math.PI} /> */}

      <Model />
      <VideoLaptop/>
      <VideoTV/>
      <Poster/>
      
    </Canvas>
  );
};

export default Three;