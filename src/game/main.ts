import * as THREE from 'three';
import {TextureLoader} from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import '../../public/game/index.css';
import {moveToLeft, moveToRight, startMovement} from "./controls.ts";
import {perspectiveCamera} from "../utils/resize.ts";

export const canvas = document.querySelector('#webgl')!;
export const scene = new THREE.Scene();

const orbitControls = new OrbitControls(perspectiveCamera, canvas);

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
});


const playerGeometry = new THREE.PlaneGeometry(2.5,2.5)
export let playerMesh : THREE.Mesh;
const textureLoader = new TextureLoader();
const LIGHT_EFFECT = 0xffffff;

const ambientLight = new THREE.AmbientLight(LIGHT_EFFECT, 2);

scene.add(ambientLight);
textureLoader.load('../../public/assets/player/ship.png', (texture) => {
    const summonPlayer = () => {
        const playerMaterial = new THREE.MeshPhongMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
        playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
        playerMesh.position.y = -4;
        scene.add(playerMesh);
    }

    summonPlayer();
    const tick = () => {

        orbitControls.update();
        renderer.setSize(window.innerWidth, window.innerHeight);

        const moveShip = () => {

            const shipPositionThreeJSWorld = new THREE.Vector3();
            shipPositionThreeJSWorld.setFromMatrixPosition(playerMesh.matrixWorld);

            const shipPositionDevice = shipPositionThreeJSWorld.clone().project(perspectiveCamera);

            console.log(shipPositionDevice)
            if(moveToLeft && !moveToRight && shipPositionDevice.x >= -1){
                playerMesh.position.x += - 0.2;
            }
            if(moveToRight && !moveToLeft && shipPositionDevice.x <= 1){
                playerMesh.position.x += 0.2;

            }
        }

        if(startMovement){
                moveShip();
        }

        renderer.render(scene, perspectiveCamera);
        requestAnimationFrame(tick);

    }

    tick();

})

