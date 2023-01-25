import { usePlane } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { RepeatWrapping, TextureLoader } from "three";
import grass from "../assets/grass.jpg";

export const Ground = (props) => {
  const [groundRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  const texture = useLoader(TextureLoader, grass);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(240, 240);

  return (
    <mesh ref={groundRef} receiveShadow>
      <planeGeometry attach={"geometry"} args={[1000, 1000]} />
      <meshStandardMaterial attach={"material"} map={texture} />
    </mesh>
  );
};
