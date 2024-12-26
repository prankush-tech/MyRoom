import * as THREE from "three";
import React, { useEffect, useMemo, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import vertexShader from "../../shaders/vertex.glsl";
import fragmentShader from "../../shaders/fragment.glsl";
import { useControls } from "leva";
import usePosterIntensity from "@/store/PosterIntensity";
import { gsap } from "gsap";

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

  uTexture: { value: THREE.Texture };
  uStrength: { value: number };
};

type ModelProps = JSX.IntrinsicElements["group"] & {
  onLoad?: () => void;
};

export function Model({ onLoad, ...props }: ModelProps) {
  const group = useRef<THREE.Group>(null);
  const { nodes, animations } = useGLTF("/room-transformed.glb") as GLTFResult;

  const { actions } = useAnimations(animations, group);

  const pcBgColor = useMemo(() => new THREE.Color("#ff115e"), []);
  const tvScreenColor = useMemo(() => new THREE.Color("#37ccf4"), []);

  const DayTexture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(
      "/Day texture_Bake1_CyclesBake_COMBINED.jpg"
    );
    tex.flipY = false;
    return tex;
  }, []);

  const testTexture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(
      "/test.jpg"
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
    // tex.colorSpace = THREE.SRGBColorSpace;
    tex.flipY = false;
    return tex;
  }, []);

  const uniforms: UniformProps = useMemo(
    () => ({
      uBakedDayTexture: { value: DayTexture },
      uLightMapTexture: { value: lightMap },

      uNightTexture: { value: NightTexture },
      uNightStrength: { value: 0 },

      uTexture: { value: testTexture },
      uStrength: { value: 0 },

      uLightDeskStrength: { value: 0 },
      uLightDeskColor: { value: pcBgColor },

      uTvScreenColor: { value: tvScreenColor },
      uTvScreenStrength: { value: 0 },
    }),
    [lightMap, pcBgColor, tvScreenColor, DayTexture, NightTexture, testTexture]
  );

  const {  DayStrength } = useControls("DAY or NIGHT", {

    DayStrength: {
      value: 0,
      min: 0,
      max: 1,
    },
  });

  const { RemoveTexture } = useControls("Remove", {
    RemoveTexture: {
      value: false,
    },
  });
  const animatedValue = useRef(0);
  useEffect(() => {
    gsap.to(animatedValue, {
      current: RemoveTexture ? 1 : 0,
      duration: 1,
      onUpdate: () => {
        // console.log("Current value:", animatedValue.current);
        uniforms.uStrength.value = animatedValue.current;
      },
    });
  }, [RemoveTexture,uniforms.uStrength]);


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
      value: 0.33,
      min: 0,
      max: 3,
    },
  });

  uniforms.uLightDeskStrength.value = SetupColorPower;
  uniforms.uTvScreenStrength.value = TvScreenPower;
  uniforms.uNightStrength.value = DayStrength;
  uniforms.uStrength.value = animatedValue.current;

  const setStrength = usePosterIntensity((state) => state.setStrength);

  setStrength(DayStrength);

  useEffect(() => {
    if (actions.ChairAction) {
      actions.ChairAction.play();
      actions.ChairAction.setLoop(THREE.LoopRepeat, Infinity);
    }
    if (onLoad) {
      onLoad();
    }
  }, [actions, onLoad]);

  return (
    <group dispose={null} position={[0, -3.8, 0]}>
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
          {/* <meshStandardMaterial map={testTexture} />  */}
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
          {/* <meshStandardMaterial map={testTexture} />  */}
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
          {/* <meshStandardMaterial map={testTexture} />  */}
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/room-transformed.glb");
