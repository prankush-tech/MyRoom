"use client";
import * as THREE from "three";
import Plane from "./Plane";
import { Canvas } from "@react-three/fiber";
import { getProject } from "@theatre/core";
//@ts-ignore
import extension from "@theatre/r3f/dist/extension";
import { types } from "@theatre/core";
import studio from "@theatre/studio";
import { editable as e, SheetProvider } from "@theatre/r3f";
import { OrbitControls } from "@react-three/drei";
import { Model } from "./Room";

// const demoSheet = getProject("Demo Project").sheet("Demo Sheet");

const Three = () => {
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
        maxZoom={0.01}
      />
      {/* <pointLight position={[10, 10, 10]} intensity={10} color={"red"} /> */}
      {/* <axesHelper args={[100]} /> */}
      <ambientLight intensity={Math.PI*1.2} />

      {/* <Plane position={[0, 0, 0]}  /> */}
      {/* <SheetProvider sheet={demoSheet}>
      </SheetProvider> */}
      <Model />
    </Canvas>
  );
};

export default Three;
