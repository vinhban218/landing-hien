import "./assets/index.css";
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
import initButterfly from "./js/greensock";
const body = document.querySelector("body");
const kyrosElem = document.querySelector("#kyros");
const incubateElem = document.querySelector("#incubate");
const loadingScreen = document.querySelector("#loading");
loadingScreen.style.display = "flex";
let isLoadedModel = false;

kyrosElem.style.opacity = 0;
const barInner = document.querySelector(".bar-inner");
setTimeout(() => {
  barInner.style.width = "60%";
}, 2000);

window.scrollTo({ top: 0, behavior: "smooth" });
const models = {
  globle: {
    dot: null,
    VN: null,
    world: null,
  },
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
const PI = Math.PI;
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
      //child.material.envMap = environmentMap;
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
    let isRunIntro = false;
    sceneReady = true;
    const keyHole = loadingScreen.querySelector(".key-hole");
    initButterfly();
    //create text enter
    const textLoading = document.querySelector(".text-loading");
    //ddoi model 3s
    barInner.style.cssText = `
      transition: width 1.2s linear;
    `;
    barInner.style.width = "100%";
    setTimeout(() => {
      setTimeout(() => {
        const bar = document.querySelector(".bar");
        bar.style.opacity = 0;
        keyHole.addEventListener("click", () => {
          if (isRunIntro) return;
          isRunIntro = true;
          keyHole.style.cssText = `
          transition: opacity 1s linear, filter 2.5s ease-in-out, transform 2.5s ease-in-out;
          filter: blur(16px);
          transform: scale(20);
          `;
          document.querySelector(".text-enter").style.display = "none";
          setTimeout(() => {
            setTimeout(() => {
              keyHole.style.opacity = 0;
              kyrosElem.style.opacity = 1;
              setTimeout(() => {
                loadingScreen.style.display = "none";
              }, 500);
              intro();
            }, 1000);
          }, 1500);
        });
      });
      keyHole.classList.add("done");
    }, 1200);
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
/* const environmentMap = cubeTextureLoader.load([
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
 */
const canvasParent = document.querySelector(".canvas-parent");
const scrollElement = document.querySelector(".scroller");

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setClearColor(0x000000, 0);
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
gltfLoader.load("/models/globle/dot.gltf", (gltf) => {
  gltf.scene.children[0].scale.set(1, 1, 1);
  gltf.scene.children[0].position.set(0, 0.1, 5.9);
  gltf.scene.children[0].rotation.set(0.33, 0, 0.02);
  gltf.scene.children[0].material.transparent = true;

  models.globle.dot = gltf.scene.children[0];
  scene.add(gltf.scene);
  /*  globePos.add(models.globle.position, "x").min(-100).max(100).step(0.1);
  globePos.add(models.globle.position, "y").min(-100).max(100).step(0.1);
  globePos.add(models.globle.position, "z").min(-100).max(100).step(0.1);
  globeRotate.add(models.globle.rotation, "y").min(-10).max(10).step(0.01);
  globeRotate.add(models.globle.rotation, "x").min(-10).max(10).step(0.01);
  globeRotate.add(models.globle.rotation, "z").min(-10).max(10).step(0.01);
  globleScale.add(models.globle.scale, "x").min(0.1).max(3).step(0.01);
  globleScale.add(models.globle.scale, "y").min(0.1).max(3).step(0.01);
  globleScale.add(models.globle.scale, "z").min(0.1).max(3).step(0.01); */
  updateAllMaterials();
});

gltfLoader.load("/models/globle/world.gltf", (gltf) => {
  gltf.scene.children[0].scale.set(1, 1, 1);
  gltf.scene.children[0].position.set(0, 0.1, 5.9);
  gltf.scene.children[0].rotation.set(0.33, 0, 0.02);
  gltf.scene.children[0].material.transparent = true;

  models.globle.world = gltf.scene.children[0];
  scene.add(gltf.scene);
  /*  globePos.add(models.globle.position, "x").min(-100).max(100).step(0.1);
  globePos.add(models.globle.position, "y").min(-100).max(100).step(0.1);
  globePos.add(models.globle.position, "z").min(-100).max(100).step(0.1);
  globeRotate.add(models.globle.rotation, "y").min(-10).max(10).step(0.01);
  globeRotate.add(models.globle.rotation, "x").min(-10).max(10).step(0.01);
  globeRotate.add(models.globle.rotation, "z").min(-10).max(10).step(0.01);
  globleScale.add(models.globle.scale, "x").min(0.1).max(3).step(0.01);
  globleScale.add(models.globle.scale, "y").min(0.1).max(3).step(0.01);
  globleScale.add(models.globle.scale, "z").min(0.1).max(3).step(0.01); */
  updateAllMaterials();
});

gltfLoader.load("/models/globle/VN.gltf", (gltf) => {
  gltf.scene.children[0].scale.set(1, 1, 1);
  gltf.scene.children[0].position.set(0, 0.1, 5.9);
  gltf.scene.children[0].rotation.set(0.33, 0, 0.02);
  gltf.scene.children[0].material.transparent = true;
  models.globle.VN = gltf.scene.children[0];
  models.globle.VN.material.opacity = -3;
  const color = new THREE.Color("rgb(255, 0, 0)");
  models.globle.VN.material.color = color;
  scene.add(gltf.scene);
  globePos.add(models.globle.VN.position, "x").min(-100).max(100).step(0.1);
  globePos.add(models.globle.VN.position, "y").min(-100).max(100).step(0.1);
  globePos.add(models.globle.VN.position, "z").min(-100).max(100).step(0.1);
  globeRotate.add(models.globle.VN.rotation, "y").min(-10).max(10).step(0.01);
  globeRotate.add(models.globle.VN.rotation, "x").min(-10).max(10).step(0.01);
  globeRotate.add(models.globle.VN.rotation, "z").min(-10).max(10).step(0.01);
  globleScale.add(models.globle.VN.scale, "x").min(0.1).max(3).step(0.01);
  globleScale.add(models.globle.VN.scale, "y").min(0.1).max(3).step(0.01);
  globleScale.add(models.globle.VN.scale, "z").min(0.1).max(3).step(0.01);
  updateAllMaterials();
});
// vong tron cham do
gltfLoader.load("/models/circle.gltf", (gltf) => {
  models.redCircle = gltf.scene.children[0];
  models.redCircle.scale.set(2, 2, 2);
  models.redCircle.position.set(0.02, 0.22, 4.4);
  models.redCircle.rotation.set(0, 0.01, 0);
  models.redCircle.material.transparent = true;
  models.redCircle.material.opacity = 0.4;
  scene.add(gltf.scene);
  /*  redCirclePos.add(models.redCircle.position, "x").min(-10).max(10).step(0.01);
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
for (let i = 0; i < 8; i++) {
  gltfLoader.load("/models/circle.gltf", (gltf) => {
    scene.add(gltf.scene);
    gltf.scene.children[0].position.set(0, 0, -20);
    gltf.scene.children[0].material.transparent = true;
    gltf.scene.children[0].scale.set(0, 0, 0);
    models.circle.push(gltf.scene.children[0]);
    updateAllMaterials();
  });
}

//logo
gltfLoader.load("/models/logo.gltf", (gltf) => {
  scene.add(gltf.scene);
  models.logo = gltf.scene.children[0];
  models.logo.position.set(0.3, 0.6, 4);
  models.logo.scale.set(0, 0, 0);
  models.logo.rotation.set(0.21, 0.6, -0.05);

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
  { x: -5.3, y: 3.7, z: -0.6 },
  { x: -1.2, y: 5.6, z: -6.2 },
  { x: 6.4, y: 9.1, z: -15.7 },
  { x: 5.9, y: 3.4, z: -0.1 },
  { x: -6.5, y: -3.6, z: -2.5 },
  { x: -4.8, y: -8.6, z: -24.9 },
  { x: 4.9, y: -3, z: 0.1 },
];

const initCubesRotate = [
  { x: -0.9, y: 0.58, z: -0.3 },
  { x: -0.02, y: 0.1, z: 1.18 },
  { x: -1.89, y: 0.67, z: -2.14 },
  { x: -1.08, y: -0.98, z: -0.85 },
  { x: 0.49, y: -0.38, z: -1.75 },
  { x: -1.18, y: 1.03, z: 0.07 },
  { x: -1.34, y: 0.21, z: 0.27 },
];

initCubesPos.forEach((item) => {
  item.z -= 6.4;
});

const initCubesTime = [0.2, 0.5, 0.8, 0.4, 0.3, 0.9, 0];
for (let i = 0; i < 7; i++) {
  gltfLoader.load("/models/cube.gltf", (gltf) => {
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

    /* const cubeFolder = gui.addFolder(`Cube${i}`);
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
 */
    models.cubes.push(gltf.scene.children[0]);
    updateAllMaterials();
  });
}
// key
gltfLoader.load("/models/key.gltf", (gltf) => {
  scene.add(gltf.scene);
  models.key = gltf.scene.children[0];
  models.key.position.set(-10, 5, 0);
  models.key.rotation.set(0.48, -0.78, 2.7);
  models.key.scale.set(0, 0, 0);
  models.key.material.transparent = true;

  /* keyPos.add(models.key.position, "x").min(-100).max(100).step(0.1);
  keyPos.add(models.key.position, "y").min(-100).max(100).step(0.1);
  keyPos.add(models.key.position, "z").min(-100).max(100).step(0.1);
  keyRotate.add(models.key.rotation, "x").min(-10).max(10).step(0.01);
  keyRotate.add(models.key.rotation, "y").min(-10).max(10).step(0.01);
  keyRotate.add(models.key.rotation, "z").min(-10).max(10).step(0.01);
  keyScale.add(models.key.scale, "x").min(0.1).max(2).step(0.1);
  keyScale.add(models.key.scale, "y").min(0.1).max(2).step(0.1);
  keyScale.add(models.key.scale, "z").min(0.1).max(2).step(0.1); */

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

/* const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
dirLight.position.set(0, 0, -100);
scene.add(dirLight); */

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

let circleIntervals = [];
function circleAnimation(progress, models, index) {
  if (!circleIntervals[index]) {
    const interval = setInterval(() => {
      models.rotation.z -= 0.001;
    }, 10);
    circleIntervals.push(interval);
  }

  models.scale.set(
    5 + 21 * Math.pow(progress, 2),
    5 + 21 * Math.pow(progress, 2),
    1
  );

  if (progress < 0.5) {
    models.material.opacity = 4 * progress * progress;
  } else {
    models.material.opacity = Math.pow(2 * progress - 2, 2);
  }
}

function circleAnimation1(progress) {
  circleAnimation(progress, models.circle[0], 1);
}
function circleAnimation2(progress) {
  circleAnimation(progress, models.circle[1], 2);
}
function circleAnimation3(progress) {
  circleAnimation(progress, models.circle[2], 3);
}
function circleAnimation4(progress) {
  circleAnimation(progress, models.circle[3], 4);
}
function circleAnimation5(progress) {
  circleAnimation(progress, models.circle[4], 5);
}
function circleAnimation6(progress) {
  circleAnimation(progress, models.circle[5], 6);
}
function circleAnimation7(progress) {
  circleAnimation(progress, models.circle[6], 7);
}
function circleAnimation8(progress) {
  circleAnimation(progress, models.circle[7], 8);
}

const circleFuncs = [
  {
    start: "10%",
    end: "25%",
    callback: circleAnimation1,
  },
  {
    start: "22%",
    end: "37%",
    callback: circleAnimation2,
  },
  {
    start: "32%",
    end: "47%",
    callback: circleAnimation3,
  },
  {
    start: "42%",
    end: "57%",
    callback: circleAnimation4,
  },
  {
    start: "52%",
    end: "67%",
    callback: circleAnimation5,
  },
  {
    start: "62%",
    end: "77%",
    callback: circleAnimation6,
  },
  {
    start: "72%",
    end: "87%",
    callback: circleAnimation7,
  },
  {
    start: "82%",
    end: "97%",
    callback: circleAnimation8,
  },
];

const controls = new ScrollControls(rig, {
  buffer: 0,
  scrollElement,
  dampingFactor: 0,
  startOffset: "0",
  endOffset: "-100vh",
  scrollActions: [
    ...circleFuncs,
    {
      start: "0%",
      end: "10%",
      callback: rotateGlobeAni,
    },
    {
      start: "12%",
      end: "20%",
      callback: logoAnimation,
    },
    /*     {
      start: "15%",
      end: "20%",
      callback: kyrosAnimation,
    }, */
    {
      start: "23%",
      end: "28%",
      callback: nextScene1,
    },
    {
      start: "28%",
      end: "45%",
      callback: cubesAnimation,
    },
    {
      start: "55%",
      end: "60%",
      callback: nextScene2,
    },
    {
      start: "60%",
      end: "75%",
      callback: keyAnimation,
    },
    {
      start: "80%",
      end: "85%",
      callback: nextScene3,
    },
  ],
});

/* intro function  */
function intro() {
  let introInterval;
  const a = (2 * PI) / 400;
  let b = 0;
  let c = 0;
  setInterval(() => {
    models.redCircle.rotation.z -= 0.001;
  }, 10);
  introInterval = setInterval(() => {
    models.globle.dot.rotation.y += a;
    models.globle.world.rotation.y += a;
    models.globle.VN.rotation.y += a;
    models.globle.VN.material.opacity += 1 / 100;
    b += 1 / 400;
    c += 0.6 / 400;
    models.redCircle.scale.set(2 - b, 2 - b, 2 - b);
    models.redCircle.material.opacity = 0.4 + c;
    if (b >= 1) {
      clearInterval(introInterval);
      isLoadedModel = true;
    }
  }, 10);
}

/*  */
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
    if (!isLoadedModel) {
      e.preventDefault();
      return;
    }
    autoPlayBtn.classList.remove("inactive");
    clearInterval(myInterval);

    let delta = 0;
    if (e.wheelDelta)
      delta = e.wheelDelta / 60; //controls the scroll wheel range/speed
    else if (e.detail) delta = -e.detail / 100;

    handle(delta);
    if (e.preventDefault) e.preventDefault();
  },
  { passive: false }
);
let goUp = true;
let end = null;
let interval = null;

function handle(delta) {
  let animationInterval = 20; //controls the scroll animation after scroll is done
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
// animation section 1
function rotateGlobeAni(progress) {
  if (!models.globle || !models.redCircle) return;
  models.globle.dot.scale.set(
    1 + 1.04 * progress * progress,
    1 + 1.04 * progress * progress,
    1 + 1.04 * progress * progress
  );
  models.globle.VN.scale.set(
    1 + 1.04 * progress * progress,
    1 + 1.04 * progress * progress,
    1 + 1.04 * progress * progress
  );
  models.globle.world.scale.set(
    1 + 1.04 * progress * progress,
    1 + 1.04 * progress * progress,
    1 + 1.04 * progress * progress
  );
  models.redCircle.scale.set(1 + 2.5 * progress, 1 + 2.5 * progress, 1);
  models.redCircle.material.opacity = 1 - progress;
  if (progress >= 1) {
    models.globle.dot.scale.set(0, 0, 0);
    models.globle.VN.scale.set(0, 0, 0);
    models.globle.world.scale.set(0, 0, 0);

    models.redCircle.scale.set(0, 0, 0);
  }
}

function logoAnimation(progress) {
  if (!models.logo) return;
  models.logo.scale.set(0.018 * progress, 0.018 * progress, 0.018 * progress);
  models.logo.rotation.y = -4 + 4.6 * progress;
  models.logo.rotation.z = -1.55 + 1.5 * progress;
}
/* 
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
 */

function nextScene1(progress) {
  if (!models.logo) return;
  models.logo.position.z = 4 + 4.4 * progress * progress;
}
// animation section 2
let isSetCubeInterval = false;

function cubesAnimation(progress) {
  if (!models.cubes.length) return;
  if (!isSetCubeInterval) {
    for (let i = 0; i < 7; i++) {
      const a = (Math.random() * (0.0008 - 0.0005) + 0.0005).toFixed(5);
      setInterval(() => {
        models.cubes[i].rotation.x += parseFloat(a);
        models.cubes[i].rotation.y += parseFloat(a);
        models.cubes[i].rotation.z += parseFloat(a);
      }, 10);
    }
    isSetCubeInterval = true;
  }

  models.cubes.forEach((cube, index) => {
    if (progress >= initCubesTime[index]) {
      cube.scale.set(
        (1 / (1 - initCubesTime[index])) * (progress - initCubesTime[index]),
        (1 / (1 - initCubesTime[index])) * (progress - initCubesTime[index]),
        (1 / (1 - initCubesTime[index])) * (progress - initCubesTime[index])
      );
      cube.position.z = initCubesPos[index].z + 6.4 * progress;
    }
  });
}

// animation next scene 2

function nextScene2(progress) {
  if (!models.cubes.length) return;

  models.cubes.forEach((cube, index) => {
    cube.position.z = initCubesPos[index].z + 6.4 + 24 * progress;
  });
}

//animation scene 3
let keyInterval;

function keyAnimation(progress) {
  if (!models.key) return;

  models.key.scale.set(
    Math.pow(progress, 2),
    Math.pow(progress, 2),
    Math.pow(progress, 2)
  );
  /*  if (progress < 0.7) {
    models.key.position.x = -2.3 - 2 * progress;
  } else if (progress >= 0.75) {
    models.key.position.x = -3.7 + 12 * (progress - 0.75);
  }
  models.key.position.y = 2.2 - 2.1 * progress;
  models.key.position.z = 5.6 * Math.pow(progress, 3); */

  models.key.position.set(
    (4 * progress - 2) ** 2 - 4.7,
    2.2 - 2.1 * progress,
    5.6 * progress ** 3
  );
  if (progress < 1) {
    if (keyInterval) {
      clearInterval(keyInterval);
      keyInterval = null;
    }

    models.key.rotation.x = 3.25 - 2 * progress;
    models.key.rotation.y = -1.2 + 2 * progress;
  }

  if (progress >= 1 && !keyInterval) {
    keyInterval = setInterval(() => {
      models.key.rotation.z += 0.001;
    }, 10);
  }
}
function nextScene3(progress) {
  if (models.key.material) models.key.material.opacity = 1 - progress;
}

// const cameraHelper = new CameraHelper(rig, controls, renderer.domElement)

/* const grid = new THREE.GridHelper(100, 50);
grid.position.set(0, -5, 0);
scene.add(grid); */

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
