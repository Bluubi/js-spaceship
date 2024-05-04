import './style.css';
import '../index.css';
import * as THREE from 'three';
import {MeshPhongMaterial, TextureLoader} from 'three';
import './utils/resize.ts';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

// Paso 1 - Creamos la cámara. Será una PerspectiveCamera, pues encaja mejor con el tipo de juego que queremos hacer.
export const perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
// Posicionamos la cámara 10 unidades más lejos del punto de origen. Nuestras unidades serán "metros".
perspectiveCamera.position.z = 10;


// Paso 2 - Creamos el render. Recogemos el canvas con un querySelector para pasárselo al render.

const canvas = document.querySelector('#webgl')!;

// Además, especificaremos antialias: true, para evitar el efecto diente de sierra, y haremos el fondo invisible.

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
})

// Paso 3  - Creamos la escena.

const scene = new THREE.Scene();

// Paso 4 - Crearemos una esfera que será nuestro planeta.

const planetGeometry = new THREE.SphereGeometry(5,);
let planet: THREE.Mesh;

// Para dar el efecto de planeta a la esfera, necesitamos TextureLoader, que nos permitirá cargar
// una textura para la esfera y darle ese aspecto deseado.

const textureLoader = new TextureLoader();

// Cargamos la textura del planeta marte
textureLoader.load('/assets/textures/2k_mars.jpg', (texture) => {

    // Y lo haremos con MeshLambertMaterial, para que podamos darle efecto de luces y sombras.
    // Gracias a la propiedad "map" podemos asignar la textura a la esfera
    const planetMaterial = new MeshPhongMaterial({
        map: texture
    });

    planet = new THREE.Mesh(planetGeometry, planetMaterial);

    scene.add(planet);

    // Paso 5 - Creamos las luces.
    // Si no creamos las luces, el material se verá oscuro, pues es reactivo a las luces. Crearemos al menos dos.
    // pointLightNorthEast alumbrará desde "arriba a la derecha", y "pointLightDeepNorth" desde "más cerca de la lente de la cámara"
    const pointLightNorthEast = new THREE.PointLight(0xffffff,1,100);
    const pointLightDeepNorth = new THREE.PointLight(0xffffff,1,100);
    pointLightNorthEast.position.set(5.5,5.5,10);
    pointLightDeepNorth.position.set(0,10,10);

    // Utilizar power es lo mismo que utilizar intensity; sin embargo, personalmente prefiero utilizar power
    // porque su medida, que son lúmenes, se acerca más a los estándares de las medidas realistas de la luz.
    pointLightNorthEast.power = 1800;
    pointLightDeepNorth.power = 1800;

    scene.add(pointLightNorthEast);
    scene.add(pointLightDeepNorth);

    // Extra - Vamos a añadir OrbitControls para que el usuario pueda "jugar" con la perspectiva del planeta.

    const orbitControls = new OrbitControls(perspectiveCamera, canvas);
    orbitControls.enableDamping = true;

    const tick = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        orbitControls.update();

        // Vamos a añadir un efecto de rotación para que el planeta rote continuamente y no tengamos una imagen estática.
        planet.rotation.y += 0.001;
        planet.rotation.x += 0.001;

        perspectiveCamera.updateProjectionMatrix();


        renderer.render(scene, perspectiveCamera);
        requestAnimationFrame(tick);

    }

    tick();

});


