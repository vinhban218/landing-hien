/* import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    AnimationClip,
    GridHelper,
    ConeGeometry,
    MeshPhongMaterial,
    Mesh,
    Vector3,
    HemisphereLight,
  } from 'three'
  import { CameraRig, ScrollControls, ThreeDOFControls } from 'three-story-controls'
  import cameraData from './camera-data.js'
  
  const canvasParent = document.querySelector('.canvas-parent')
  const scrollElement = document.querySelector('.scroller')
  
  const scene = new Scene()
  const camera = new PerspectiveCamera(45, canvasParent.clientWidth / canvasParent.clientHeight, 0.1, 10000)
  const renderer = new WebGLRenderer()
  renderer.setSize(canvasParent.clientWidth, canvasParent.clientHeight)
  canvasParent.appendChild(renderer.domElement)
  
  const light = new HemisphereLight(0xffffbb, 0x080820, 1)
  scene.add(light)
  
  const grid = new GridHelper(100, 50)
  grid.position.set(0, -5, 0)
  scene.add(grid)
  
  const rig = new CameraRig(camera, scene)
  rig.setAnimationClip(AnimationClip.parse(cameraData.animationClip))
  rig.setAnimationTime(0)
  
  const controls = new ScrollControls(rig, {
    scrollElement,
    dampingFactor: 0.1,
    startOffset: '0',
    endOffset: '0',
    scrollActions: [
      {
        start: '0%',
        end: '15%',
        callback: transitionTop,
      },
      {
        start: '85%',
        end: '100%',
        callback: transitionBottom,
      },
    ],
  })
  
  const controls3dof = new ThreeDOFControls(rig, {
    panFactor: Math.PI / 10,
    tiltFactor: Math.PI / 10,
    truckFactor: 0,
    pedestalFactor: 0,
  })
  
  function transitionTop(progress) {
    renderer.domElement.style.opacity = progress
  }
  
  function transitionBottom(progress) {
    renderer.domElement.style.opacity = 1 - progress
  }
  controls.enable()
  controls3dof.enable()
  
  const cones = [
    {
      meshPosition: new Vector3(0, 0, -30),
      color: 0xff0000,
    },
    {
      meshPosition: new Vector3(20, 0, -45),
      color: 0xffff00,
    },
    {
      meshPosition: new Vector3(45, 0, 0),
      color: 0xff00ff,
    },
    {
      meshPosition: new Vector3(30, 0, 20),
      color: 0x00ffff,
    },
    {
      meshPosition: new Vector3(-10, 0, 45),
      color: 0x00ff00,
    },
    {
      meshPosition: new Vector3(-40, 0, 20),
      color: 0x0000ff,
    },
  ]
  
  const coneGeo = new ConeGeometry(3, 10, 4)
  cones.forEach((item) => {
    const mesh = new Mesh(coneGeo, new MeshPhongMaterial({ color: item.color }))
    mesh.position.copy(item.meshPosition)
    scene.add(mesh)
  })
  
  function render(t) {
    window.requestAnimationFrame(render)
    if (rig.hasAnimation) {
      controls.update(t)
      controls3dof.update(t)
    }
    renderer.render(scene, camera)
  }
  
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
  
  render() */
import "./index.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* gsap.registerPlugin(ScrollTrigger);
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#box",
    pin: true,
    start: "top top", // when the top of the trigger hits the top of the viewport
    end: "+=500",
    snap: {
      snapTo: "labels", // snap to the closest label in the timeline
      duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
      // wait 0.2 seconds from the last scroll event before doing the snapping
      // the ease of the snap animation ("power3" by default)
    },
  },
});
 */
const box = document.querySelector("#box");

ScrollTrigger.create({
  trigger: "#box",
  start: "top top",
  end: "bottom 0",
  onToggle: (self) => console.log(self),
  onUpdate: (self) => {
    box.style.filter = `blur(${(1 - self.progress) * 80}px)`;
    box.style.opacity = 0.5 + 0.5 * self.progress;
  },
});
