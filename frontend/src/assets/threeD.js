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

  const zoom = 2;

  const positionWidth = 45;
  const columns = 17;

  // size of the board
  const boardWidth = positionWidth * columns * 2;

  // road lanes array
  let lanes;

  // for animation
  let previousTimestamp;

}

exports = {
  threeD
};
