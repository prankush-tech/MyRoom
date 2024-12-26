"use client";

import React, { Suspense, useEffect } from "react";
import {
  Backdrop,
  Center,
  Loader,
  OrbitControls,
  Stage,
} from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { useControls } from "leva"; // Import useControls
import { Model } from "./Room/Room";
import VideoTV from "./Room/VideoTV";
import Poster from "./Room/Poster";
import VideoLaptop from "./Room/VideoLaptop";
import ModelLoad from "@/middleware/ModelsLoad";
import { useResizeHandler } from "@/middleware/ResizeCheck";
import * as THREE from "three";
import { Perf } from "r3f-perf";

const Three = () => {
  const maxDistance = useResizeHandler({
    mobile: 768,
    mobileValue: 90,
    defaultValue: 70,
  });

  const [cameraFOV, setCameraFOV] = React.useState(16);

  useEffect(() => {
    if (maxDistance === 90) {
      setCameraFOV(25);
    }
  }, [maxDistance]);

  return (
    <>
      <Canvas
        gl={{
          antialias: true,
        }}
        dpr={[1, 2]}
        camera={{
          position: [50, 28, 45],
          fov: cameraFOV,
        }}
      >
        <Suspense>
          {/* <Perf position="top-left" />  */}

          {/* <ModelLoad> */}
          {/* </ModelLoad> */}

          <Model />
          <VideoTV />
          <VideoLaptop />
          <Poster />

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

          <color attach="background" args={["#000000"]} />
          {/* <ambientLight intensity={Math.PI} /> */}
          {/* <axesHelper args={[100]}/> */}

          {/* {Enable && 
          
          // <EffectComposer>
          //   <Bloom
          //     intensity={intensity}
          //     luminanceThreshold={luminanceThreshold}
          //     luminanceSmoothing={luminanceSmoothing}
          //     />
          // </EffectComposer>
          } */}
        </Suspense>
      </Canvas>

      <Loader />
    </>
  );
};

export default Three;
