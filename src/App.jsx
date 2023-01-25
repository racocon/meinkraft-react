import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { RecoilRoot } from "recoil";

import { Camera } from "./components/Camera";
import { Cube, useCubeStore } from "./components/Cube";
import { Ground } from "./components/Ground";
import { Player } from "./components/Player";
import { useCube } from "./components/useCubeStore";

const Cubes = () => {
  const cubes = useCube();
  return [<Cube position={[0, 0.5, -10]} />, ...cubes];
};

const App = () => {
  // const cubes = useCubeStore((state) => state.cubes);

  return (
    <Canvas>
      <RecoilRoot>
        <Camera fov={50} />
        <Sky sunPosition={[100, 10, 100]} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <Physics gravity={[0, -30, 0]}>
          <Ground />
          <Player />
          {/* <Cube position={(0, 0.5, -10)} />
          {cubes.map((cube) => cube)} */}
          <Cubes />
        </Physics>
      </RecoilRoot>
    </Canvas>
  );
};

export default App;
