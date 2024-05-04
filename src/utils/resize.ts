import * as THREE from "three";
export const perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
perspectiveCamera.position.z = 10;

window.addEventListener('resize', () => {
    perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
})
