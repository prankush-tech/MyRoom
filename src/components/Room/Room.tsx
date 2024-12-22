import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import vertexShader from "../../shaders/vertex.glsl";
import fragmentShader from "../../shaders/fragment.glsl";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

type GLTFResult = GLTF & {
  nodes: {
    Chair: THREE.Mesh;
    keyBoard_Buttons: THREE.Mesh;
  };
  materials: {};
};

type UniformProps = {
  uBakedDayTexture: { value: THREE.Texture };
  uLightMapTexture: { value: THREE.Texture };
  uLightDeskStrength: { value: number };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("/room-transformed.glb") as GLTFResult;

  const texture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(
      "/Neutral_Bake1_CyclesBake_COMBINED2.jpg"
    );
    tex.flipY = false;
    return tex;
  }, []);

  const textureNight = useMemo(() => {
    const tex = new THREE.TextureLoader().load(
      "LightMap_Bake1_CyclesBake_COMBINED.jpg"
    );
    tex.flipY = false;
    return tex;
  }, []);

  const uniforms: UniformProps = useMemo(
    () => ({
      uBakedDayTexture: { value: texture },
      uLightMapTexture: { value: textureNight },
      uLightDeskStrength: { value: 0.2 },
    }),
    [texture, textureNight]
  );

  const { SetupColorPower } = useControls("SetupColorPower", {
    SetupColorPower: {
      value: 0.2,
      min: 0,
      max: 3,
    },
  });

  uniforms.uLightDeskStrength.value = SetupColorPower;


  return (
    <group {...props} dispose={null} position={[0, -3.3, 0]}>
      <mesh geometry={nodes.Chair.geometry} position={[0, 0.019, 0]}>
        <shaderMaterial
          side={THREE.DoubleSide}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      <mesh geometry={nodes.keyBoard_Buttons.geometry}>
        <shaderMaterial
          side={THREE.DoubleSide}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/room-transformed.glb");
