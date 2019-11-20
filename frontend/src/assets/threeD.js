function threeD() {
  // create the 3d scene
  const scene = new THREE.Scene();

  // set up renderer
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  // resize render while window size changed
  window.addEventListener('resize', onResize, false);
  function onResize() {
    // set camera aspect
    camera.aspect = window.innerWidth / window.innerHeight;
    // recalculate projection matrix
    camera.updateProjectionMatrix();
    // set resized render size
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  const distance = 500;

  // set up camera
  const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2,
    window.innerHeight / 2, window.innerHeight / -2, 0.1, 10000);
  camera.rotation.x = 50 * Math.PI / 180;
  camera.rotation.y = 20 * Math.PI / 180;
  camera.rotation.z = 10 * Math.PI / 180;
  const initialCameraPositionY = -Math.tan(camera.rotation.x) * distance;
  const initialCameraPositionX = Math.tan(camera.rotation.y) * Math.sqrt(distance ** 2 + initialCameraPositionY ** 2);
  camera.position.y = initialCameraPositionY;
  camera.position.x = initialCameraPositionX;
  camera.position.z = distance * 1.8;

  // set up lights
  hemiLight = new THREE.HemisphereLight("#ffffff", "#ffffff", 0.6);
  scene.add(hemiLight);

  dirLight = new THREE.DirectionalLight("#ffffff", 0.6);
  dirLight.position.set(-100, -100, 200);
  dirLight.castShadow = true;
  scene.add(dirLight);

  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  var d = 500;
  dirLight.shadow.camera.left = -d;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = -d;

  backLight = new THREE.DirectionalLight("#000000", .4);
  backLight.position.set(200, 200, 50);
  backLight.castShadow = true;
  scene.add(backLight);

  const zoom = 2;

  // for the scene objects
  const positionWidth = 45;
  const columns = 17;

  // size of the board
  const boardWidth = positionWidth * columns * 2;

  // road lanes array
  let lanes;

  // for animation
  let previousTimestamp;

  const laneTypes = ['car', 'truck'];
  const laneSpeeds = [2, 2.5, 3];
  const vechicleColors = ["#a52523", "#bdb638", "#78b14b"];

  const initaliseValues = () => {
    lanes = generateLanes();

    previousTimestamp = null;

    camera.position.y = initialCameraPositionY;
    camera.position.x = initialCameraPositionX;
  };
  initaliseValues();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // generate and add lane to the scene
  const generateLanes = () => [1, 2, 3, 4, 5].map((index) => {
    const lane = new Lane(index);
    if (index === 1) {
      lane.mesh.rotation.z = -Math.PI / 10;
      lane.mesh.rotation.x = -Math.PI / 8;
      lane.mesh.position.x = -8 * positionWidth * zoom;
      lane.mesh.position.y = 10 * positionWidth * zoom;
      lane.mesh.position.z = -3 * positionWidth * zoom
    }
    if (index === 2) {
      lane.mesh.rotation.z = Math.PI / 4;
      lane.mesh.rotation.x = -Math.PI / 10;
      lane.mesh.position.y = 5 * positionWidth * zoom;
      lane.mesh.position.z = 1 * positionWidth * zoom;
    }
    if (index === 3) {
      lane.mesh.rotation.z = Math.PI / 5;
      lane.mesh.rotation.x = -Math.PI / 10;
      lane.mesh.position.y = 13 * positionWidth * zoom;
      lane.mesh.position.z = -1.8 * index * positionWidth * zoom;
      lane.mesh.position.x = -positionWidth * zoom * 8;
    }
    if (index === 4) {
      lane.mesh.rotation.z = Math.PI / 6;
      lane.mesh.rotation.x = -Math.PI / 6;
      lane.mesh.position.x = -4 * positionWidth * zoom;
      lane.mesh.position.z = -1.5 * positionWidth * zoom;
      lane.mesh.position.y = 11.5 * positionWidth * zoom;
    }
    if (index === 5) {
      lane.mesh.rotation.z = Math.PI / 2.3;
      lane.mesh.rotation.x = -Math.PI / 7;
      lane.mesh.position.z = -1.1 * index * positionWidth * zoom;
      lane.mesh.position.y = 12 * positionWidth * zoom;
    }
    // lane.mesh.position.y = 2 * positionWidth * zoom;
    scene.add(lane.mesh);
    return lane;
  }).filter((lane) => lane.index >= 0);


  // Textures
  const carFrontTexture = new Texture(300, 40, [{x: 0, y: 0, w: 200, h: 250}]);
  const carBackTexture = new Texture(300, 40, [{x: 100, y: 0, w: 250, h: 60}]);
  // const carRightSideTexture = new Texture(110, 40, [{x: 10, y: 0, w: 50, h: 30}, {x: 70, y: 0, w: 30, h: 30}]);
  // const carLeftSideTexture = new Texture(110, 40, [{x: 10, y: 10, w: 50, h: 30}, {x: 70, y: 10, w: 30, h: 30}]);
  const carRightSideTexture = new Texture(300, 40, [{x: 30, y: 0, w: 100, h: 30}, {x: 160, y: 0, w: 100, h: 30}]);
  const carLeftSideTexture = new Texture(300, 40, [{x: 30, y: 10, w: 100, h: 30}, {x: 160, y: 10, w: 100, h: 30}]);


  const truckFrontTexture = new Texture(300, 30, [{x: 50, y: 0, w: 500, h: 100}]);
  const truckRightSideTexture = new Texture(300, 20, [{x: 40, y: 10, w: 230, h: 10}]);
  const truckLeftSideTexture = new Texture(300, 20, [{x: 40, y: 0, w: 230, h: 10}]);

  // create texture
  function Texture(width, height, rects) {
    const canvas = document.createElement("canvas");
    canvas.classList.add("canvas");
    canvas.height = height;
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    // context.fillStyle = "rgba(0,0,0,0.6)";
    context.fillStyle = "#4c4c4c";
    rects.forEach(rect => {
      context.fillRect(rect.x, rect.y, rect.w, rect.h);
    });
    return new THREE.CanvasTexture(canvas);
  }

  // create wheel object for car and truck
  function Wheel() {
    const wheel = new THREE.Mesh(
      new THREE.CylinderGeometry(6 * zoom, 6 * zoom, 33 * zoom, 10, 10),
      // new THREE.BoxBufferGeometry(12 * zoom, 33 * zoom, 12 * zoom),
      new THREE.MeshLambertMaterial({color: "#333333", flatShading: true})
    );
    wheel.position.z = 6 * zoom;
    return wheel;
  }

  // create car object
  function Car() {
    const car = new THREE.Group();
    const color = vechicleColors[Math.floor(Math.random() * vechicleColors.length)];

    // main body
    const main = new THREE.Mesh(
      new THREE.BoxBufferGeometry(60 * zoom, 30 * zoom, 15 * zoom),
      new THREE.MeshPhongMaterial({color, flatShading: true})
    );
    main.position.z = 12 * zoom;
    main.castShadow = true;
    main.receiveShadow = true;
    car.add(main);

    // cabin part
    const cabin = new THREE.Mesh(
      new THREE.BoxBufferGeometry(33 * zoom, 24 * zoom, 12 * zoom),
      [
        new THREE.MeshPhongMaterial({color: "#cccccc", flatShading: true}),
        new THREE.MeshPhongMaterial({color: "#cccccc", flatShading: true, map: carFrontTexture}),
        new THREE.MeshPhongMaterial({color: "#cccccc", flatShading: true, map: carRightSideTexture}),
        new THREE.MeshPhongMaterial({color: "#cccccc", flatShading: true, map: carLeftSideTexture}),
        new THREE.MeshPhongMaterial({color: "#cccccc", flatShading: true}), // top
        new THREE.MeshPhongMaterial({color: "#cccccc", flatShading: true}) // bottom
      ]
    );
    cabin.position.x = 6 * zoom;
    cabin.position.z = 25.5 * zoom;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    car.add(cabin);

    const frontWheel = new Wheel();
    frontWheel.position.x = -18 * zoom;
    car.add(frontWheel);

    const backWheel = new Wheel();
    backWheel.position.x = 18 * zoom;
    car.add(backWheel);

    car.castShadow = true;
    car.receiveShadow = false;

    return car;
  }


}

exports = {
  threeD
};
