'use client'
import React, { useState, useEffect } from "react";
import { getProject } from "@theatre/core";
//@ts-ignore
import extension from "@theatre/r3f/dist/extension";
import { types } from "@theatre/core";
import studio from "@theatre/studio";
import { editable as e, SheetProvider } from "@theatre/r3f";
import { OrbitControls } from "@react-three/drei";
import { Model } from "./Room/Room";
import { Canvas } from "@react-three/fiber";

// const demoSheet = getProject("Demo Project").sheet("Demo Sheet");

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

  // studio.initialize();
  // studio.extend(extension);

  return (
    <Canvas
      camera={{
        position: [50, 23, 20],
        fov: 19,
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
        minDistance={20}
      />
      {/* <pointLight position={[10, 10, 10]} intensity={10} color={"red"} /> */}
      {/* <axesHelper args={[100]} /> */}
      <ambientLight intensity={Math.PI * 1.5} />
      {/* <Plane position={[0, 0, 0]}  /> */}
      {/* <SheetProvider sheet={demoSheet}>
      </SheetProvider> */}
      <Model />
    </Canvas>
  );
};

export default Three;