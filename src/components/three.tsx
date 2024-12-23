"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Room/Room";
import VideoTV from "./Room/VideoTV";
import Poster from "./Room/Poster";
import VideoLaptop from "./Room/VideoLaptop";

const Three = () => {
  const [maxDistance, setMaxDistance] = useState(
    typeof window !== "undefined" && window.innerWidth < 768 ? 120 : 70
  );
  const [isModelLoaded, setIsModelLoaded] = useState(false); // Track if the model is loaded

  useEffect(() => {
    const handleResize = () => {
      setMaxDistance(window.innerWidth < 768 ? 125 : 70);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
    <Canvas
    dpr={[1, 4]}
      camera={{
        position: [50, 28, 45],
        fov: 16,
      }
    }
    >
      <Suspense >

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
      <ambientLight intensity={Math.PI} />

      <Model
        onLoad={() => {
          setIsModelLoaded(true);
        }}
        />
      {isModelLoaded && (
        <>
          <VideoTV />
          <VideoLaptop />
          <Poster />
        </>
      )}
      </Suspense>
    </Canvas>
    <Loader />
    </>
  );
};

export default Three;
