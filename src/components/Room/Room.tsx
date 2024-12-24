import * as THREE from "three";
import React, { useEffect, useMemo, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import vertexShader from "../../shaders/vertex.glsl";
import fragmentShader from "../../shaders/fragment.glsl";
import { useControls } from "leva";

type ActionName = "ChairAction";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    Chair: THREE.Mesh;
    CHairBottom: THREE.Mesh;
    keyBoard_Buttons: THREE.Mesh;
  };
  materials: {};
  animations: GLTFAction[];
};

type UniformProps = {
  uBakedDayTexture: { value: THREE.Texture };
  uLightMapTexture: { value: THREE.Texture };

  uLightDeskStrength: { value: number };
  uLightDeskColor: { value: THREE.Color };

  uTvScreenColor: { value: THREE.Color };
  uTvScreenStrength: { value: number };

  uNightTexture: { value: THREE.Texture };
  uNightStrength: { value: number };
};

type ModelProps = JSX.IntrinsicElements["group"] & {
  onLoad?: () => void; // Add an optional onLoad callback
};

export function Model({ onLoad, ...props }: ModelProps) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/room-transformed.glb"
  ) as GLTFResult;

  const { actions } = useAnimations(animations, group);

  const pcBgColor = useMemo(() => new THREE.Color("#ff115e"), []);
  const tvScreenColor = useMemo(() => new THREE.Color("#37ccf4"), []);

  const DayTexture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(
      "/Neutral_Bake1_CyclesBake_COMBINED2.jpg"
    );
    tex.flipY = false;
    return tex;
  }, []);

  const lightMap = useMemo(() => {
    const tex = new THREE.TextureLoader().load(
      "LightMap_Bake1_CyclesBake_COMBINED.jpg"
    );
    tex.flipY = false;
    return tex;
  }, []);

  const NightTexture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(
      "Night Texture_Bake1_CyclesBake_COMBINED.jpg"
    );
    tex.flipY = false;
    return tex;
  }, []);

  const uniforms: UniformProps = useMemo(
    () => ({
      uBakedDayTexture: { value: DayTexture },
      uLightMapTexture: { value: lightMap },

      uNightTexture: { value: NightTexture },
      uNightStrength: { value: 0 },

      uLightDeskStrength: { value: 0 },
      uLightDeskColor: { value: pcBgColor },

      uTvScreenColor: { value: tvScreenColor },
      uTvScreenStrength: { value: 0 },
    }),
    [lightMap, pcBgColor, tvScreenColor, DayTexture, NightTexture]
  );

  const { NightStrength } = useControls("DAY or NIGHT", {
    NightStrength: {
      value: 1,
      min: 0,
      max: 1,
    },
  });

  const { SetupColorPower, TvScreenPower } = useControls("SetupColorPower", {
    pcBgColor: {
      value: "#ff115e",
      label: "PC Background Color",
      onChange: (value: string) => {
        pcBgColor.set(value);
        uniforms.uLightDeskColor.value = pcBgColor;
      },
    },
    SetupColorPower: {
      value: 1,
      min: 0,
      max: 1.5,
    },

    uTvScreenColor: {
      value: "#37ccf4",
      label: "Ambience",
      onChange: (value: string) => {
        tvScreenColor.set(value);
        uniforms.uTvScreenColor.value = tvScreenColor;
      },
    },
    TvScreenPower: {
      value: 1.5,
      min: 0,
      max: 3,
    },
  });

  uniforms.uLightDeskStrength.value = SetupColorPower;
  uniforms.uTvScreenStrength.value = TvScreenPower;
  uniforms.uNightStrength.value = NightStrength;

  useEffect(() => {
    if (actions.ChairAction) {
      actions.ChairAction.play();
      actions.ChairAction.setLoop(THREE.LoopRepeat, Infinity);
    }
    if (onLoad) {
      onLoad(); // Notify parent that the model has loaded
    }
  }, [actions, onLoad]);

  return (
    <group {...props} dispose={null} position={[0, -3.3, 0]}>
      <group name="Scene" ref={group}>
        <mesh
          name="Chair"
          geometry={nodes.Chair.geometry}
          material={nodes.Chair.material}
          position={[-0.896, 2.356, 6.248]}
        >
          <shaderMaterial
            side={THREE.DoubleSide}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
          />
        </mesh>
        <mesh
          name="CHairBottom"
          geometry={nodes.CHairBottom.geometry}
          material={nodes.CHairBottom.material}
          position={[0, 0.019, 0]}
        >
          <shaderMaterial
            side={THREE.DoubleSide}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
          />
        </mesh>
        <mesh
          name="keyBoard_Buttons"
          geometry={nodes.keyBoard_Buttons.geometry}
          material={nodes.keyBoard_Buttons.material}
        >
          <shaderMaterial
            side={THREE.DoubleSide}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/room-transformed.glb");
