import { useState } from "react";
import { useBox } from "@react-three/cannon";
import { create } from "zustand";
import { nanoid } from "nanoid";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

import dirt from "../assets/dirt.jpg";
import { useSetCube } from "./useCubeStore";

export const useCubeStore = create((set) => ({
  cubes: [],
  addCube: (x, y, z) =>
    set((state) => ({
      cubes: [...state.cubes, <Cube key={nanoid()} position={[x, y, z]} />],
    })),
}));

export const Cube = (props) => {
    
  const [hover, set] = useState(null);
  const addCube = useSetCube()

  const texture = useLoader(TextureLoader, dirt);

  const [cubeRef] = useBox(() => ({
    type: "Static",
    ...props,
  }));

  return (
    <mesh
      ref={cubeRef}
      onPointerMove={(e) => {
        e.stopPropagation();
        set(Math.floor(e.faceIndex / 2));
      }}
      onPointerOut={(e) => {
        set(null);
      }}
      onClick={(e) => {
        e.stopPropagation();

        const faceIndex = Math.floor(e.faceIndex / 2);
        const { x, y, z } = cubeRef.current.position;

        switch (faceIndex) {
          case 4: {
            addCube(x, y, z + 1);
            return;
          }
          case 2: {
            addCube(x, y + 1, z);
            return;
          }
          case 1: {
            addCube(x - 1, y, z);
            return;
          }
          case 5: {
            addCube(x, y, z - 1);
            return;
          }
          case 3: {
            addCube(x, y - 1, z);
            return;
          }
          default: {
            addCube(x + 1, y, z);
            return;
          }
        }
      }}
    >
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial
          attachArray="material"
          map={texture}
          key={index}
          color={hover === index ? 'grey' : 'white'}
        />
      ))}
      <boxGeometry />
    </mesh>
  );
};
