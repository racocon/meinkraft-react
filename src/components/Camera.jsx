import { useEffect, useRef, useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";

export const Camera = props => {
  const cameraRef = useRef();
  const { set, size } = useThree();

  useLayoutEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.aspect = size.width / size.height;
      cameraRef.current.updateProjectionMatrix()
    }
  }, [size, props]);

  useEffect(() => {
    set({ camera: cameraRef.current });
  }, []);

  return <perspectiveCamera ref={cameraRef} {...props} />;
};