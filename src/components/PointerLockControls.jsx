import { useRef, useEffect } from "react";
import { extend, useThree } from "@react-three/fiber";
import { PointerLockControls as PointerLockControlsImpl } from "three/examples/jsm/controls/PointerLockControls";

extend({ PointerLockControlsImpl });

export const PointerLockControls = (props) => {
  const controls = useRef();
  const { camera, gl } = useThree();

  useEffect(() => {
    document.addEventListener("click", () => {
      controls.current.lock();
    });
  });

  return (
    <pointerLockControlsImpl
      ref={controls}
      args={[camera, gl.domElement]}
      {...props}
    />
  );
};
