function threeD() {
  console.log("pass");
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  // add listener to monitor window size change
  window.addEventListener('resize', onResize, false)

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

  const zoom = 2;

  const positionWidth = 45;
  const columns = 17;
  const boardWidth = positionWidth * columns * 2;

  let lanes;

  let previousTimestamp;

  // draw textures
  const carFrontTexture = new Texture(300, 40, [{x: 0, y: 0, w: 200, h: 250}]);
  const carBackTexture = new Texture(300, 40, [{x: 100, y: 0, w: 250, h: 60}]);
  // const carRightSideTexture = new Texture(110, 40, [{x: 10, y: 0, w: 50, h: 30}, {x: 70, y: 0, w: 30, h: 30}]);
  // const carLeftSideTexture = new Texture(110, 40, [{x: 10, y: 10, w: 50, h: 30}, {x: 70, y: 10, w: 30, h: 30}]);
  const carRightSideTexture = new Texture(300, 40, [{x: 30, y: 0, w: 100, h: 30}, {x: 160, y: 0, w: 100, h: 30}]);
  const carLeftSideTexture = new Texture(300, 40, [{x: 30, y: 10, w: 100, h: 30}, {x: 160, y: 10, w: 100, h: 30}]);


  const truckFrontTexture = new Texture(300, 30, [{x: 50, y: 0, w: 500, h: 100}]);
  const truckRightSideTexture = new Texture(300, 20, [{x: 40, y: 10, w: 230, h: 10}]);
  const truckLeftSideTexture = new Texture(300, 20, [{x: 40, y: 0, w: 230, h: 10}]);

  // generate lanes total 5 lanes
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

  // adjust size while changing window size
  function onResize() {
    // 设置透视摄像机的长宽比
    camera.aspect = window.innerWidth / window.innerHeight
    // 摄像机的 position 和 target 是自动更新的，而 fov、aspect、near、far 的修改则需要重新计算投影矩阵（projection matrix）
    camera.updateProjectionMatrix()
    // 设置渲染器输出的 canvas 的大小
    renderer.setSize(window.innerWidth, window.innerHeight - 200)
  }
  // set the size of the renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  // add the scene to html
  document.getElementById('main').appendChild(renderer.domElement);

  // add lights to the scene
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

  // generate textures
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

  // wheels for car and trucks
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

    // main body of the car
    const main = new THREE.Mesh(
      new THREE.BoxBufferGeometry(60 * zoom, 30 * zoom, 15 * zoom),
      new THREE.MeshPhongMaterial({color, flatShading: true})
    );
    main.position.z = 12 * zoom;
    main.castShadow = true;
    main.receiveShadow = true;
    car.add(main);

    // carbin part of the car
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

    // wheels
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

  // create truck object
  function Truck() {

    const truck = new THREE.Group();
    const color = vechicleColors[Math.floor(Math.random() * vechicleColors.length)];

    // truck cargo textures
    const cargo_texture_1 = new THREE.TextureLoader().load("../../../resources/textures/white_cargo.jpg");
    const cargo_texture_2 = new THREE.TextureLoader().load("../../../resources/textures/red_cargo.jpg");
    const cargo_texture_3 = new THREE.TextureLoader().load("../../../resources/textures/orange_cargo.jpg");
    const cargo_texture_4 = new THREE.TextureLoader().load("../../../resources/textures/yellow_cargo.jpg");
    const cargo_texture_5 = new THREE.TextureLoader().load("../../../resources/textures/blue_cargo.jpg");
    const cargo_texture_6 = new THREE.TextureLoader().load("../../../resources/textures/kfc.png");

    // const cargoTypes = [cargo_texture_1, cargo_texture_2, cargo_texture_3, cargo_texture_4, cargo_texture_5];
    const cargoTypes = [cargo_texture_6];
    // const selector = Math.floor(Math.random() * cargoTypes.length);

    const base = new THREE.Mesh(
      new THREE.BoxBufferGeometry(100 * zoom, 25 * zoom, 5 * zoom),
      new THREE.MeshLambertMaterial({color: "#b4c6fc", flatShading: true})
    );
    base.position.z = 10 * zoom;
    truck.add(base);

    const cargo = new THREE.Mesh(
      new THREE.BoxBufferGeometry(75 * zoom, 35 * zoom, 40 * zoom),
      new THREE.MeshPhongMaterial({map: cargoTypes[Math.floor(Math.random() * cargoTypes.length)]})
    );
    cargo.position.x = 15 * zoom;
    cargo.position.z = 30 * zoom;
    cargo.castShadow = true;
    cargo.receiveShadow = true;
    truck.add(cargo);

    const cabin = new THREE.Mesh(
      new THREE.BoxBufferGeometry(25 * zoom, 30 * zoom, 30 * zoom),
      [
        new THREE.MeshPhongMaterial({color, flatShading: true}), // back
        new THREE.MeshPhongMaterial({color, flatShading: true, map: truckFrontTexture}),
        new THREE.MeshPhongMaterial({color, flatShading: true, map: truckRightSideTexture}),
        new THREE.MeshPhongMaterial({color, flatShading: true, map: truckLeftSideTexture}),
        new THREE.MeshPhongMaterial({color, flatShading: true}), // top
        new THREE.MeshPhongMaterial({color, flatShading: true}) // bottom
      ]
    );
    cabin.position.x = -40 * zoom;
    cabin.position.z = 20 * zoom;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    truck.add(cabin);

    const frontWheel = new Wheel();
    frontWheel.position.x = -38 * zoom;
    truck.add(frontWheel);

    const middleWheel = new Wheel();
    middleWheel.position.x = -10 * zoom;
    truck.add(middleWheel);

    const backWheel = new Wheel();
    backWheel.position.x = 30 * zoom;
    truck.add(backWheel);

    return truck;
  }

  // road object
  function Road() {
    const road = new THREE.Group();

    const createSection = color => new THREE.Mesh(
      new THREE.BoxGeometry(boardWidth * zoom, positionWidth * zoom, 10),
      new THREE.MeshPhongMaterial({color: color, opacity: 0.4})
    );

    // const middle = createSection("#454A59");
    const middle = createSection("#dd7222");
    middle.receiveShadow = true;
    road.add(middle);

    const left = createSection("#393D49");
    left.position.x = -boardWidth * zoom;
    road.add(left);

    const right = createSection("#393D49");
    right.position.x = boardWidth * zoom;
    road.add(right);

    return road;
  }

  // gengerate the lane with random car or truck
  function Lane(index) {
    this.index = index;
    this.type = laneTypes[Math.floor(Math.random() * 2)];

    switch (this.type) {
      case 'car' : {
        this.mesh = new Road();
        this.direction = index < 5;

        const occupiedPositions = new Set();
        this.vechicles = [1, 2, 3].map(() => {
          const vechicleType = ['car', 'truck'];
          const selector = Math.floor(Math.random() * vechicleType.length);
          let vechicle = new Car();

          let position;
          do {
            position = Math.floor(Math.random() * columns / 2);
          } while (occupiedPositions.has(position));
          occupiedPositions.add(position);
          vechicle.position.x = (position * positionWidth * 2 + positionWidth / 2) * zoom - boardWidth * zoom / 2;
          if (!this.direction) vechicle.rotation.z = Math.PI;
          this.mesh.add(vechicle);
          return vechicle;
        });
        this.speed = laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
        break;
      }
      case 'truck' : {
        this.mesh = new Road();
        this.direction = index < 5;

        const occupiedPositions = new Set();
        this.vechicles = [1, 2].map(() => {
          const vechicle = new Truck();
          let position;
          do {
            position = Math.floor(Math.random() * columns / 3);
          } while (occupiedPositions.has(position))
          occupiedPositions.add(position);
          vechicle.position.x = (position * positionWidth * 3 + positionWidth / 2) * zoom - boardWidth * zoom / 2;
          if (!this.direction) vechicle.rotation.z = Math.PI;
          this.mesh.add(vechicle);
          return vechicle;
        });

        this.speed = laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
        break;
      }
    }
  }

  // do the animation
  function animate(timestamp) {
    requestAnimationFrame(animate);

    if (!previousTimestamp) previousTimestamp = timestamp;
    const delta = timestamp - previousTimestamp;
    previousTimestamp = timestamp;

    // Animate cars and trucks moving on the lane
    lanes.forEach(lane => {
      if (lane.type === 'car' || lane.type === 'truck') {
        const aBitBeforeTheBeginingOfLane = -boardWidth * zoom / 2 - positionWidth * 2 * zoom;
        const aBitAfterTheEndOFLane = boardWidth * zoom / 2 + positionWidth * 2 * zoom;
        lane.vechicles.forEach(vechicle => {
          if (lane.direction) {
            vechicle.position.x = vechicle.position.x < aBitBeforeTheBeginingOfLane ? aBitAfterTheEndOFLane : vechicle.position.x -= lane.speed / 16 * delta;
          } else {
            vechicle.position.x = vechicle.position.x > aBitAfterTheEndOFLane ? aBitBeforeTheBeginingOfLane : vechicle.position.x += lane.speed / 16 * delta;
          }
        });
      }
    });
    // render the scene
    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
}

exports = {
  threeD
};
