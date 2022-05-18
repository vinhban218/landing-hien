import "./index.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  CameraRig,
  FreeMovementControls,
  CameraHelper,
  ScrollControls,
  ThreeDOFControls,
} from "three-story-controls";
import * as dat from "dat.gui";
import initButterfly from "./butterfly";
const body = document.querySelector("body");
const kyrosElem = document.querySelector("#kyros");
const nurtureElem = document.querySelector("#nurture");
const incubateElem = document.querySelector("#incubate");
const loadingScreen = document.querySelector("#loading");

loadingScreen.style.display = "flex";
let isLoadedModel = false;
let firstGlobleInterval;
nurtureElem.style.opacity = 0;
incubateElem.style.opacity = 0;

window.scrollTo({ top: 0, behavior: "smooth" });
const models = {
  globle: null,
  redCircle: null,
  hand: null,
  key: null,
  cubes: [],
  logo: null,
  circle: [],
};
const vietNameRad = 3.1;
let globleRotateStart = 0;
let globleRoateEnd = 6.82;
let sceneReady = false;
/* --------------------------------------------- */
// Debug
//hinh cau
const gui = new dat.GUI();
const globeFolder = gui.addFolder("Globe");
const globePos = globeFolder.addFolder("Globe POS");
const globeRotate = globeFolder.addFolder("Globe Rotate");
const globleScale = globeFolder.addFolder("Globe Scale");

//vong tron cham do
const redCircleForder = gui.addFolder("redCircle");
const redCirclePos = redCircleForder.addFolder("redCircle POS");
const redCircleRotate = redCircleForder.addFolder("redCircle Rotate");
const redCircleScale = redCircleForder.addFolder("redCircle Scale");

//logo
const logoFolder = gui.addFolder("Logo");
const logoPos = logoFolder.addFolder("Logo POS");
const logoScale = logoFolder.addFolder("Logo Scale");
const logoRotate = logoFolder.addFolder("Logo Rotate");

// key

const keyFolder = gui.addFolder("Key");
const keyPos = keyFolder.addFolder("Key POS");
const keyRotate = keyFolder.addFolder("Key Rotate");
const keyScale = keyFolder.addFolder("Key Scale");
/* ----------------------------------------------- */
// Scene
const scene = new THREE.Scene();

const debugObject = {};
/**
 * Update all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      child.material.envMap = environmentMap;
      child.material.envMapIntensity = debugObject.envMapIntensity;
      child.material.needsUpdate = true;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};

const loadingManager = new THREE.LoadingManager(
  // Loaded
  () => {
    // Wait a little
    // window.setTimeout(() => {
    //     // Animate overlay
    //     // gsap.to(overlayMaterial.uniforms.uAlpha, {
    //     //     duration: 3,
    //     //     value: 0,
    //     //     delay: 1
    //     // })

    //     // Update loadingBarElement
    //     loadingBarElement.classList.add('ended')
    //     loadingBarElement.style.transform = ''
    // }, 500)
    /*    window.setTimeout(() => {
     
    }, 3000); */

    sceneReady = true;
    setInterval(() => {
      models.circle[0].rotation.z += 0.001;
    }, 10);
    initButterfly();
    const keyHole = loadingScreen.querySelector(".key-hole");
    const textEnter = keyHole.querySelector(".text-enter");
    textEnter.style.opacity = 1;
    loadingScreen.style.cursor = "pointer";
    loadingScreen.addEventListener("click", () => {
      loadingScreen.style.transform = "scale(40)";
      loadingScreen.style.filter = "blur(20px)";
      keyHole.style.filter = "blur(20px)";
      setTimeout(() => {
        loadingScreen.style.opacity = 0;
        keyHole.style.opacity = 0;
        setTimeout(() => {
          let scaleVal = 0;
          let redCircleZPos = 0;
          loadingScreen.style.display = "none";
          let initInterval = setInterval(() => {
            scaleVal += 0.001;
            redCircleZPos += 3.38 / 500;
            models.globle.scale.set(
              0.7 + scaleVal,
              0.7 + scaleVal,
              0.7 + scaleVal
            );
            models.redCircle.position.z = 0.82 + redCircleZPos;
            /* models.redCircle.scale.set(
              0.5 + scaleVal,
              0.5 + scaleVal,
              0.5 + scaleVal
            ); */
            if (scaleVal >= 0.5) {
              clearInterval(initInterval);
              isLoadedModel = true;
              firstGlobleInterval = setInterval(() => {
                models.globle.rotation.y += 0.001;
              }, 5);
            }
          }, 5);
        }, 600);
      }, 2000);
    });
  }
  // Progress
  // (itemUrl, itemsLoaded, itemsTotal) => {
  //     // Calculate the progress and update the loadingBarElement
  //     const progressRatio = itemsLoaded / itemsTotal
  //     loadingBarElement.style.transform = `scaleX(${progressRatio})`
  // }
);

const gltfLoader = new GLTFLoader(loadingManager);
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);

/**
 * Environment map
 */
const environmentMap = cubeTextureLoader.load([
  "/img/loading-bg.png",
  "/img/loading-bg.png",
  "/img/loading-bg.png",
  "/img/loading-bg.png",
  "/img/loading-bg.png",
  "/img/loading-bg.png",
]);

environmentMap.encoding = THREE.sRGBEncoding;

scene.background = environmentMap;
scene.environment = environmentMap;
debugObject.envMapIntensity = 2.5;

const canvasParent = document.querySelector(".canvas-parent");
const scrollElement = document.querySelector(".scroller");

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 3;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(canvasParent.clientWidth, canvasParent.clientHeight);

canvasParent.appendChild(renderer.domElement);

updateAllMaterials();
// var
/**
 * Models
 */
//trai dat trang
gltfLoader.load("/models/trai-dat-fix.gltf", (gltf) => {
  gltf.scene.children[0].scale.set(0.7, 0.7, 0.7);
  gltf.scene.children[0].position.set(0, 0.1, 5.1);
  gltf.scene.children[0].rotation.set(0.29, 0, 0.01);
  //gltf.scene.children[0].material.transparent = true;
  models.globle = gltf.scene.children[0];

  scene.add(gltf.scene);
  globePos.add(models.globle.position, "x").min(-100).max(100).step(0.1);
  globePos.add(models.globle.position, "y").min(-100).max(100).step(0.1);
  globePos.add(models.globle.position, "z").min(-100).max(100).step(0.1);
  globeRotate.add(models.globle.rotation, "y").min(-10).max(10).step(0.01);
  globeRotate.add(models.globle.rotation, "x").min(-10).max(10).step(0.01);
  globeRotate.add(models.globle.rotation, "z").min(-10).max(10).step(0.01);
  globleScale.add(models.globle.scale, "x").min(0.1).max(2).step(0.1);
  globleScale.add(models.globle.scale, "y").min(0.1).max(2).step(0.1);
  globleScale.add(models.globle.scale, "z").min(0.1).max(2).step(0.1);
  updateAllMaterials();
});
// vong tron cham do
gltfLoader.load("/models/vong-tron-cham-do.gltf", (gltf) => {
  models.redCircle = gltf.scene.children[0];
  models.redCircle.scale.set(1, 1, 1);
  models.redCircle.position.set(5.2, -5.42, 0.82);
  models.redCircle.rotation.set(0, 0.01, 0);
  models.redCircle.material.transparent = true;
  scene.add(gltf.scene);
  /* redCirclePos.add(models.redCircle.position, "x").min(-10).max(10).step(0.01);
  redCirclePos.add(models.redCircle.position, "y").min(-10).max(10).step(0.01);
  redCirclePos.add(models.redCircle.position, "z").min(-10).max(10).step(0.01);
  redCircleScale.add(models.redCircle.scale, "x").min(0.1).max(10).step(0.01);
  redCircleScale.add(models.redCircle.scale, "y").min(0.1).max(10).step(0.01);
  redCircleScale.add(models.redCircle.scale, "z").min(0.1).max(10).step(0.01);
  redCircleRotate.add(models.redCircle.rotation, "x").min(-5).max(5).step(0.01);
  redCircleRotate.add(models.redCircle.rotation, "y").min(-5).max(5).step(0.01);
  redCircleRotate.add(models.redCircle.rotation, "z").min(-5).max(5).step(0.01); */
  updateAllMaterials();
});
// vong tron
gltfLoader.load("/models/vong-tron.gltf", (gltf) => {
  for (let i = 0; i < 2; i++) {
    gltf.scene.children[0].position.set(0, 0, 0);
    gltf.scene.children[0].material.transparent = true;
    gltf.scene.children[0].scale.set(0, 0, 0);
    models.circle.push(gltf.scene.children[0]);
  }
  redCirclePos.add(models.circle[0].position, "x").min(-10).max(10).step(0.01);
  redCirclePos.add(models.circle[0].position, "y").min(-10).max(10).step(0.01);
  redCirclePos.add(models.circle[0].position, "z").min(-10).max(10).step(0.01);
  redCircleScale.add(models.circle[0].scale, "x").min(0.1).max(10).step(0.01);
  redCircleScale.add(models.circle[0].scale, "y").min(0.1).max(10).step(0.01);
  redCircleScale.add(models.circle[0].scale, "z").min(0.1).max(10).step(0.01);
  redCircleRotate.add(models.circle[0].rotation, "x").min(-5).max(5).step(0.01);
  redCircleRotate.add(models.circle[0].rotation, "y").min(-5).max(5).step(0.01);
  redCircleRotate.add(models.circle[0].rotation, "z").min(-5).max(5).step(0.01);

  scene.add(gltf.scene);
  updateAllMaterials();
});

//logo
gltfLoader.load("/models/logo-fix.gltf", (gltf) => {
  scene.add(gltf.scene);
  models.logo = gltf.scene.children[0];
  models.logo.position.set(0, 0.04, 7);
  models.logo.scale.set(0, 0, 0);
  models.logo.rotation.set(0.29, 0.53, 0);

  logoPos.add(models.logo.position, "x").min(-100).max(100).step(0.1);
  logoPos.add(models.logo.position, "y").min(-100).max(100).step(0.1);
  logoPos.add(models.logo.position, "z").min(-100).max(100).step(0.1);
  logoScale.add(models.logo.scale, "x").min(0).max(2).step(0.001);
  logoScale.add(models.logo.scale, "y").min(0).max(2).step(0.001);
  logoScale.add(models.logo.scale, "z").min(0).max(2).step(0.001);
  logoRotate.add(models.logo.rotation, "x").min(-10).max(10).step(0.01);
  logoRotate.add(models.logo.rotation, "y").min(-10).max(10).step(0.01);
  logoRotate.add(models.logo.rotation, "z").min(-10).max(10).step(0.01);
  updateAllMaterials();
});

// cubes
const initCubesPos = [
  { x: -6, y: 4.9, z: -8.3 },
  { x: -0.5, y: 6.2, z: -15.5 },
  { x: 11.3, y: 12.9, z: -26.8 },
  { x: 6.4, y: 3.4, z: -7.2 },
  { x: -7, y: -3.3, z: -9.2 },
  { x: -4.8, y: -8.6, z: -24.9 },
  { x: 5.4, y: -4.1, z: -7.8 },
];

initCubesPos.map((item) => {
  item.z += 2.4;
});

const initCubesRotate = [
  { x: -0.9, y: 0.58, z: -0.3 },
  { x: -0.02, y: 0.1, z: 1.18 },
  { x: -0.18, y: 0.67, z: -2.14 },
  { x: -0.5, y: 0.23, z: 0.39 },
  { x: 0.49, y: -0.38, z: -1.75 },
  { x: -0.25, y: 0.09, z: 0.07 },
  { x: -0.03, y: 0.74, z: -0.11 },
];

const initCubesTime = [0.05, 0.2, 0.4, 0, 0.1, 0.45, 0.05];
for (let i = 0; i < 7; i++) {
  gltfLoader.load("/models/cube-fix.gltf", (gltf) => {
    scene.add(gltf.scene);
    gltf.scene.children[0].position.set(
      initCubesPos[i].x,
      initCubesPos[i].y,
      initCubesPos[i].z
    );
    gltf.scene.children[0].rotation.set(
      initCubesRotate[i].x,
      initCubesRotate[i].y,
      initCubesRotate[i].z
    );
    gltf.scene.children[0].scale.set(0, 0, 0);
    //gltf.scene.children[0].material.transparent = true;
    if ([1, 2, 5].includes(i)) {
      //gltf.scene.children[0].material.opacity = 0.6;
    }
    const cubeFolder = gui.addFolder(`Cube${i}`);
    const cubePos = cubeFolder.addFolder("Cube Pos");
    const cubeRotate = cubeFolder.addFolder("Cube Rotate");
    const cubeScale = cubeFolder.addFolder("Cube Scale");
    cubePos
      .add(gltf.scene.children[0].position, "x")
      .min(-100)
      .max(100)
      .step(0.1);
    cubePos
      .add(gltf.scene.children[0].position, "y")
      .min(-100)
      .max(100)
      .step(0.1);
    cubePos
      .add(gltf.scene.children[0].position, "z")
      .min(-100)
      .max(100)
      .step(0.1);
    cubeScale.add(gltf.scene.children[0].scale, "x").min(0.1).max(2).step(0.1);
    cubeScale.add(gltf.scene.children[0].scale, "y").min(0.1).max(2).step(0.1);
    cubeScale.add(gltf.scene.children[0].scale, "z").min(0.1).max(2).step(0.1);
    cubeRotate
      .add(gltf.scene.children[0].rotation, "x")
      .min(-10)
      .max(10)
      .step(0.01);
    cubeRotate
      .add(gltf.scene.children[0].rotation, "y")
      .min(-10)
      .max(10)
      .step(0.01);
    cubeRotate
      .add(gltf.scene.children[0].rotation, "z")
      .min(-10)
      .max(10)
      .step(0.01);

    models.cubes.push(gltf.scene.children[0]);
    updateAllMaterials();
  });
}
// key
gltfLoader.load("/models/chia-khoa-fix.gltf", (gltf) => {
  /* const box = new THREE.Box3().setFromObject(gltf.scene);
  const c = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3()); */
  scene.add(gltf.scene);
  models.key = gltf.scene.children[0];
  //gltf.scene.position.set( -c.x, size.y / 2 - c.y, -c.z )
  //models.key.position.set(-c.x, size.y / 2 - c.y, -c.z);
  models.key.position.set(-10, 5, 0);
  models.key.rotation.set(0.48, -0.78, 2.7);
  models.key.scale.set(0, 0, 0);
  models.key.material.transparent = true;

  keyPos.add(models.key.position, "x").min(-100).max(100).step(0.1);
  keyPos.add(models.key.position, "y").min(-100).max(100).step(0.1);
  keyPos.add(models.key.position, "z").min(-100).max(100).step(0.1);
  keyRotate.add(models.key.rotation, "x").min(-10).max(10).step(0.01);
  keyRotate.add(models.key.rotation, "y").min(-10).max(10).step(0.01);
  keyRotate.add(models.key.rotation, "z").min(-10).max(10).step(0.01);
  keyScale.add(models.key.scale, "x").min(0.1).max(2).step(0.1);
  keyScale.add(models.key.scale, "y").min(0.1).max(2).step(0.1);
  keyScale.add(models.key.scale, "z").min(0.1).max(2).step(0.1);

  updateAllMaterials();
});
/**
 * Lights
 */
// const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
// directionalLight.castShadow = true
// // directionalLight.shadow.camera.far = 15
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.normalBias = 0.05
// directionalLight.position.set(0.25, 3, -2.25)
// scene.add(directionalLight)

const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
scene.add(light);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
dirLight.position.set(0, 0, -100);
scene.add(dirLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(0, 0, 8);
scene.add(camera);

// Controls
const rig = new CameraRig(camera, scene);

const controls = new ScrollControls(rig, {
  buffer: 0,
  scrollElement,
  dampingFactor: 0,
  startOffset: "0",
  endOffset: "-100vh",
  scrollActions: [
    {
      start: "0%",
      end: "100%",
      callback: lineAnimation,
    },
    {
      start: "0%",
      end: "14%",
      callback: rotateGlobeAni,
    },
    {
      start: "14%",
      end: "25%",
      callback: logoAnimation,
    },
    {
      start: "25%",
      end: "35%",
      callback: kyrosAnimation,
    },
    {
      start: "40%",
      end: "45%",
      callback: nextScene2,
    },
    {
      start: "45%",
      end: "55%",
      callback: cubesAnimation,
    },
    {
      start: "55%",
      end: "60%",
      callback: nurtureAnimation,
    },
    {
      start: "65%",
      end: "70%",
      callback: nextScene3,
    },
    {
      start: "70%",
      end: "85%",
      callback: keyAnimation,
    },
    {
      start: "80%",
      end: "85%",
      callback: incubateAnimation,
    },
    {
      start: "90%",
      end: "95%",
      callback: nextSCene4,
    },
  ],
});
const controls3dof = new ThreeDOFControls(rig, {
  panFactor: Math.PI / 100,
  tiltFactor: Math.PI / 100,
  truckFactor: 0,
  pedestalFactor: 0,
});

controls.enable();
controls3dof.enable();

const autoPlayBtn = document.querySelector("#auto-play-btn");
let myInterval;
const scrollerContainer = document.querySelector(".scroller");
autoPlayBtn.onclick = function (e) {
  autoPlayBtn.classList.add("inactive");
  const onePercentHeight = scrollerContainer.scrollHeight / 3000;
  myInterval = setInterval(() => {
    body.scrollTop += onePercentHeight;
    if (body.scrollTop.scrollHeight >= scrollerContainer.scrollHeight) {
      clearInterval(myInterval);
    }
  }, 10);
};

body.addEventListener(
  "wheel",
  (e) => {
    if (firstGlobleInterval) {
      clearInterval(firstGlobleInterval);
      firstGlobleInterval = null;
      globleRotateStart = models.globle.rotation.y;
      globleRoateEnd =
        (1 + Math.round((globleRotateStart - vietNameRad) / (2 * Math.PI))) *
          2 *
          Math.PI +
        vietNameRad;
    }

    if (!isLoadedModel) {
      e.preventDefault();
      return;
    }
    autoPlayBtn.classList.remove("inactive");
    clearInterval(myInterval);

    let delta = 0;
    if (e.wheelDelta)
      delta = e.wheelDelta / 60; //controls the scroll wheel range/speed
    else if (e.detail) delta = -e.detail / 60;

    handle(delta);
    if (e.preventDefault) e.preventDefault();
  },
  { passive: false }
);
let goUp = true;
let end = null;
let interval = null;

function handle(delta) {
  let animationInterval = 15; //controls the scroll animation after scroll is done
  let scrollSpeed = 20; //controls the scroll animation after scroll is done

  if (end == null) {
    end = body.scrollTop;
  }
  end -= 20 * delta;
  goUp = delta > 0;

  if (interval == null) {
    interval = setInterval(function () {
      let scrollTop = body.scrollTop;
      let step = Math.round((end - scrollTop) / scrollSpeed);
      if (
        scrollTop <= 0 ||
        scrollTop >= body.scrollHeight - body.height ||
        (goUp && step > -1) ||
        (!goUp && step < 1)
      ) {
        clearInterval(interval);
        interval = null;
        end = null;
      }
      body.scrollTop = scrollTop + step;
    }, animationInterval);
  }
}

window.addEventListener(
  "scroll",
  (e) => {
    if (!isLoadedModel) e.preventDefault();
  },
  { passive: false }
);

//line animation
let startLoop = 0.45;
let endloop = 0;

const line = document.querySelector(".line-progress");
function lineAnimation(progress) {
  line.style.width = `${progress * 60}px`;
  let i = 0;
  if (progress >= 0.45) {
    if (progress >= startLoop + 0.12) {
      startLoop = progress;
    }

    if (progress >= startLoop + 0.1) {
      endloop = 0.02;
    }

    if (endloop >= 0) {
      endloop -= progress - startLoop;
      return;
    }
    const pc = (progress - startLoop) * 10;
    models.circle[i].scale.set(1 + pc * 0.7, 1 + pc * 0.7, 1 + pc * 0.7);
    models.circle[i].material.opacity = 1 * pc;
  }
}
// animation section 1
function rotateGlobeAni(progress) {
  if (!models.globle || !models.redCircle) {
    return;
  }
  models.globle.rotation.y =
    globleRotateStart + progress * (globleRoateEnd - globleRotateStart);
  // models.globle.material.opacity = 1 - 0.6 * progress;
  models.globle.position.z = 5.1 + 0.35 * progress;

  models.redCircle.position.z = 4.2 + (5.2 - 4.2) * progress;
  models.redCircle.material.opacity = 1 - 0.3 * progress;
}

function logoAnimation(progress) {
  if (!models.logo && !models.redCircle && !models.globle) return;
  models.logo.position.z = 7 + 0.75 * progress;
  models.logo.scale.set(0.001 * progress, 0.001 * progress, 0.001 * progress);

  if (models.redCircle.position.z >= 5.2 && models.globle.position.z >= 5.449) {
    models.globle.position.z = 5.45 + 0.25 * progress;
    models.redCircle.position.z = 5.2 + 0.55 * progress;
  }
  models.redCircle.material.opacity = 0.7 - 0.5 * progress;
}

const kyrosText = "KYROS".split("").reverse();
const ventureText = "VENTURES".split("");

const kyrosTextLeft = document.querySelector("#kyros .text__left");
const kyrosTextRight = document.querySelector("#kyros .text__right");
kyrosText.forEach((t) => {
  const span = document.createElement("span");
  span.innerHTML = t;
  span.style.opacity = 0;
  kyrosTextLeft.prepend(span);
});

ventureText.forEach((t) => {
  const span = document.createElement("span");
  span.innerHTML = t;
  span.style.opacity = 0;
  kyrosTextRight.appendChild(span);
});

const kyrosTextLeftChilds = kyrosTextLeft.querySelectorAll("span");
const kyrosTextRightChilds = kyrosTextRight.querySelectorAll("span");

function kyrosAnimation(progress) {
  if (!kyrosElem) return;
  /*   if (progress <= 0.01) {
    kyrosElem.style.opacity = 0;
    return;
  }
  kyrosElem.style.opacity = 0.5 + progress * 0.5;
  kyrosElem.style.filter = `blur(${80 * progress}px)`; */
  renderLeft(kyrosTextLeftChilds, progress);
  renderLeft(kyrosTextRightChilds, progress);
}

function renderLeft(nodeLists, progress) {
  const i = Math.floor(progress * nodeLists.length);
  const per = 1 / nodeLists.length;
  const pc = ((progress - per * i) / per).toFixed(3);
  if (i === nodeLists.length) return;
  if (pc <= 0.1) {
    nodeLists[i].style.cssText = `
    opacity : 0;
    filter: blur(60px);
  `;
    return;
  } else if (pc >= 0.9) {
    nodeLists[i].style.cssText = `
    opacity : 1;
    filter: blur(0px);
  `;
    return;
  }

  nodeLists[i].style.cssText = `
    opacity : ${pc};
    filter: blur(${60 * (1 - pc)}px);
  `;
}

function fadeLeft(nodeLists, progress) {
  const i = Math.floor(progress * nodeLists.length);
  const per = 1 / nodeLists.length;
  const pc = ((progress - per * i) / per).toFixed(3);
  if (i === nodeLists.length) return;

  if (pc <= 0.1) {
    nodeLists[nodeLists.length - 1 - i].style.cssText = `
    opacity : 1;
    filter: blur(0px);
  `;
    return;
  } else if (pc >= 0.9) {
    nodeLists[nodeLists.length - 1 - i].style.cssText = `
    opacity : 0;
    filter: blur(60px);
  `;
    return;
  }

  nodeLists[nodeLists.length - 1 - i].style.cssText = `
    opacity : ${1 - pc};
    filter: blur(${60 * pc}px);
  `;
}

function nextScene1(progress) {
  /*  models.redCircle.position.z = 2.3 + 0.7 * progress;
  models.globle.position.z = 0.7 + 0.4 * progress; */
}

function nextScene2(progress) {
  if (!models.logo || !models.globle) return;

  //models.globle.opacity = 0;
  if (progress >= 0.4) {
    models.globle.scale.set(0, 0, 0);
  } else {
    models.globle.scale.set(
      1.2 - 3 * progress,
      1.2 - 3 * progress,
      1.2 - 3 * progress
    );
  }
  models.redCircle.material.opacity = 0.2 * (1 - 3 * progress);
  models.logo.position.y = 0.04 - 0.04 * progress;
  models.logo.position.z = 7.75 + 0.3 * progress;
  /*  models.logo.scale.set(
    0.001 - 0.001 * progress,
    0.001 - 0.001 * progress,
    0.001 - 0.001 * progress
  ); */

  fadeLeft(kyrosTextLeftChilds, progress);
  fadeLeft(kyrosTextRightChilds, progress);
}
// animation section 2
function cubesAnimation(progress) {
  if (!models.cubes.length) return;

  models.cubes.forEach((cube, index) => {
    if (progress >= initCubesTime[index]) {
      cube.scale.set(
        (1 / (1 - initCubesTime[index])) * (progress - initCubesTime[index]),
        (1 / (1 - initCubesTime[index])) * (progress - initCubesTime[index]),
        (1 / (1 - initCubesTime[index])) * (progress - initCubesTime[index])
      );
      cube.position.z = initCubesPos[index].z + 4 * progress;
    }
  });
}

function nurtureAnimation(progress) {
  if (!nurtureElem || progress === 0) return;
  nurtureElem.style.cssText = `
    opacity: ${progress};
    filter: blur(${24 * (1 - progress)}px);
  `;
}

// animation next scene 2

function nextScene3(progress) {
  if (!nurtureElem && !models.cubes.length) return;

  nurtureElem.style.cssText = `
    opacity: ${1 - progress};
    filter: blur(${24 * progress}px);
  `;

  models.cubes.forEach((cube, index) => {
    cube.position.z = initCubesPos[index].z + 4 + 24 * progress;
  });

  if (progress === 1) {
    models.cubes.forEach((cube) => {
      cube.scale.set(0, 0, 0);
    });
  }
}

//animation scene 3
let keyInterval;
let ampX = 0;
let ampY = 0;
let rotateBounceX = 0.01;
let rotateBounceY = 0.01;

function keyAnimation(progress) {
  if (!models.key) return;

  models.key.scale.set(
    Math.pow(progress, 4),
    Math.pow(progress, 4),
    Math.pow(progress, 4)
  );
  if (progress < 0.7) {
    models.key.position.x = -2.3 - 2 * progress;
  } else if (progress >= 0.75) {
    models.key.position.x = -3.7 + 8 * (progress - 0.75);
  }
  models.key.position.y = 2.2 - 1.9 * progress;
  models.key.position.z = 5.6 * Math.pow(progress, 3);
  if (progress < 1) {
    models.key.rotation.set(
      3.48 - 3 * progress,
      -3.28 + 2.5 * progress,
      1 + progress * 1.7
    );
  }

  if (progress < 1 && keyInterval) {
    clearInterval(keyInterval);
    keyInterval = undefined;
  }

  if (progress === 1) {
    if (keyInterval) {
      return;
    }
    keyInterval = setInterval(() => {
      models.key.rotation.x = 0.48 + ampX;

      models.key.rotation.y = -0.78 + ampY;

      ampX += rotateBounceX;
      ampY += rotateBounceY;

      if (ampX >= 0.02) {
        rotateBounceX = -0.001;
      } else if (ampX <= -0.02) {
        rotateBounceX = 0.001;
      }

      if (ampY >= 0.02) {
        rotateBounceY = -0.001;
      } else if (ampY <= -0.02) {
        rotateBounceY = 0.001;
      }
    }, 50);
  }
}

function incubateAnimation(progress) {
  if (!incubateElem) return;
  incubateElem.style.opacity = progress;
  incubateElem.style.cssText = `
    opacity: ${progress};
    filter: blur(${24 * (1 - progress)}px)
  `;
}

function nextSCene4(progress) {
  incubateElem.style.cssText = `
  opacity: ${1 - progress};
  filter: blur(${24 * progress}px)
`;
  models.key.material.opacity = 1 - progress;
}

// const cameraHelper = new CameraHelper(rig, controls, renderer.domElement)

const grid = new THREE.GridHelper(100, 50);
grid.position.set(0, -5, 0);
// scene.add(grid)

/**
 * Animate
 */
const tick = (t) => {
  // Update controls
  // cameraHelper.update(t)
  renderer.render(scene, camera);
  if (rig.hasAnimation) {
  }

  controls.update(t);
  controls3dof.update(t);

  window.requestAnimationFrame(tick);
};

tick();

// util funtion
function createElem(text) {
  const elem = document.createElement("span");
  elem.innerHTML = text;
  return elem;
}
