import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

scene.background = new THREE.Color(0x5e6a75);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );


// Textures Used
const LAWN1 = new THREE.TextureLoader().load('assets/textures/lawn.jpg');
const LAWN2 = new THREE.TextureLoader().load('assets/textures/lawn2.jpg');
const LAWN3 = new THREE.TextureLoader().load('assets/textures/lawn3.jpg');
const LAWN4 = new THREE.TextureLoader().load('assets/textures/lawn4.jpg');
const SIDEWALK = new THREE.TextureLoader().load('assets/textures/sidewalk.jpg');
const FENCE = new THREE.TextureLoader().load('assets/textures/fence.jpg');
const SKY = new THREE.TextureLoader().load('assets/textures/sky.jpg');
const WALL = new THREE.TextureLoader().load('assets/textures/wall.jpg');
const DOOR = new THREE.TextureLoader().load('assets/textures/door.jpg');
const MAINDOOR = new THREE.TextureLoader().load('assets/textures/maindoor.png');
const WALL2 = new THREE.TextureLoader().load('assets/textures/wall2.jpg');
const ROOF = new THREE.TextureLoader().load('assets/textures/rooftiles.jpg');
const HORIZ = new THREE.TextureLoader().load('assets/textures/WindowHoriz.png');
const VERT = new THREE.TextureLoader().load('assets/textures/WindowVert.png');
const PIPE = new THREE.TextureLoader().load('assets/textures/pipe.png');
const IRON = new THREE.TextureLoader().load('assets/textures/iron.jpg');
const DRAIN = new THREE.TextureLoader().load('assets/textures/drain.jpg');
const TOXIC = new THREE.TextureLoader().load('assets/textures/toxic_drain.jpg');
const NOPET = new THREE.TextureLoader().load('assets/textures/noPets.jpg');
const CARPET = new THREE.TextureLoader().load('assets/textures/Carpet.png');
const MANHOLE = new THREE.TextureLoader().load('assets/textures/manhole.png');


function addLight() {
const directionalLight = new THREE.DirectionalLight( 0xfffed4, 3 );
directionalLight.position.set(30, 50, -40);
directionalLight.lookAt(-54.5, 10, 24);
directionalLight.castShadow = true;
scene.add( directionalLight );

directionalLight.shadow.mapSize.width = 50; // default
directionalLight.shadow.mapSize.height = 50; // default
directionalLight.shadow.camera.near = 0.5; // default
directionalLight.shadow.camera.far = 500;

const light = new THREE.AmbientLight( 0x94a6a8); // soft white light
scene.add( light );

//sewer light
const pointLight = new THREE.PointLight( 0x3ed641, 400, 40 );
pointLight.position.set(85,1, -9);
scene.add( pointLight );

//porch light
const porchLight = new THREE.PointLight( 0xccaa66, 1000, 100 );
porchLight.position.set(-48, 26,18);
porchLight.castShadow = true;
scene.add( porchLight );

}

function Miscs() {
    const layerG = new THREE.BoxGeometry(185, 2, 75, 2);
    const layerM = new THREE.MeshLambertMaterial({
        color: 0x2a2f33,
    });
    const layerbelow = new THREE.Mesh(layerG, layerM);
    layerbelow.position.set(6, -2, -3);
    scene.add(layerbelow);

    const GreenerG = new THREE.BoxGeometry(30, 2, 75, 2);
    const GreenerM = new THREE.MeshLambertMaterial({
        map: LAWN2,
    });
    const Greener = new THREE.Mesh(GreenerG, GreenerM);
    Greener.position.set(114, -1, -3);
    scene.add(Greener);

    const bgGeo = new THREE.PlaneGeometry(210, 110);
    const bgMat = new THREE.MeshBasicMaterial({ map: SKY});
    const Background = new THREE.Mesh(bgGeo, bgMat);
    Background.position.set(10, 53, -38)
    scene.add(Background);

    //window
    const WindowLongG = new THREE.PlaneGeometry(11, 10);
    const WindowShortG = new THREE.PlaneGeometry(10, 11);
    const WindowLongM = new THREE.MeshLambertMaterial({
        map: HORIZ,
        transparent: true,
    });
    const WindowShortM = new THREE.MeshLambertMaterial({
        map: VERT,
        transparent: true,
    })

    const WindowHoriz = new THREE.Mesh(WindowLongG, WindowLongM);
    const WindowVert = new THREE.Mesh(WindowShortG, WindowShortM);

    WindowHoriz.position.set(-54.5,24,1);
    WindowHoriz.rotation.y = 1.55;
    WindowVert.position.set(-54.5,13,18);
    WindowVert.rotation.y = 1.55;
    scene.add(WindowHoriz);
    scene.add(WindowVert);

    //pipes
    const PipeStart = 10;
    const PipeSpace = 5;

    const pipeRoofG = new THREE.PlaneGeometry(6, 5);
    const pipeRoofM = new THREE.MeshLambertMaterial({
        map: PIPE,
        transparent: true,
    })

    for (let i = 0; i <= 4; i++) {
    const Pipe = new THREE.Mesh(pipeRoofG, pipeRoofM);
    Pipe.position.set(-54.5, PipeStart + i * PipeSpace, 24);
    Pipe.rotation.set(0, 1.55, 1.55);
    scene.add(Pipe);
    }

    //sign
    const SignHeadG = new THREE.BoxGeometry(1, 4, 5.5, 2);
    const SignHeadM = new THREE.MeshLambertMaterial({ 
        color: 0xffffff,
        map: NOPET,
     });
    const SignHead = new THREE.Mesh(SignHeadG, SignHeadM);
    SignHead.position.set(102, 5.5, -12);
    scene.add(SignHead);

    const SignPoleG = new THREE.BoxGeometry(1, 4, 1, 2);
    const SignPoleM = new THREE.MeshLambertMaterial({ 
        color: 0x30230e,
     });
    const SignPole = new THREE.Mesh(SignPoleG, SignPoleM);
    SignPole.position.set(102, 2, -12);
    scene.add(SignPole);
    
    //carpet
    const CarpetG = new THREE.BoxGeometry(2, 7, 8, 2);
    const CarpetM = new THREE.MeshLambertMaterial({
        map: CARPET,
        transparent: true,
    })
    const Carpet = new THREE.Mesh(CarpetG, CarpetM);
    Carpet.position.set(-52, 1, 9);
    Carpet.rotation.set(0, 0, 1.55);
    scene.add(Carpet);

    //manhole
    const ManHoleG = new THREE.CircleGeometry(4.5, 32);
    const ManHoleM = new THREE.MeshStandardMaterial({map: MANHOLE});
    const ManHole = new THREE.Mesh(ManHoleG, ManHoleM);
    ManHole.position.set(62,0,-22);
    ManHole.rotation.x = -1.55;
    scene.add(ManHole);


}

let raindrops, rainGeo;
function addRainParticles() {
    const points = [];
  
    for (let i = 0; i < 6000; i++) {
      let rain = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
      );
      points.push(rain);
    }
  
    rainGeo = new THREE.BufferGeometry().setFromPoints(points);
  
    let rainMat = new THREE.PointsMaterial({
      color: 0xa0b8de,
      size: 0.7,
      opacity: .5,
    });
  
    raindrops = new THREE.Points(rainGeo, rainMat);
    scene.add(raindrops);
}
  
function animateParticles() {
    raindrops.geometry.attributes.position.array.forEach((_, i) => {
      if (i % 3 === 1) {
        raindrops.geometry.attributes.position.array[i] -= 0.9;
        if (raindrops.geometry.attributes.position.array[i] < -300) {
          raindrops.geometry.attributes.position.array[i] = 300;
        }
      }
    });
    raindrops.geometry.attributes.position.needsUpdate = true;
}

function add3DModels() {
    const loader = new GLTFLoader();
    loader.load('assets/3dmodels/bush/scene.gltf', (lime_bush) => {
        const bushSpace = 20;
        const bushStart = -51;

        lime_bush.scene.position.set(104, -4, -32);
        lime_bush.scene.rotation.set(0, .4, 0);
        lime_bush.scene.scale.set(17,17,17);
        scene.add(lime_bush.scene);

        for (let i = 0; i <= 5; i++) {
            const bush = lime_bush.scene.clone();
            bush.scale.set(11,11,11);
            bush.position.set(bushStart + i * bushSpace, -3, -32);
            scene.add(bush);
    }
});

    loader.load('assets/3dmodels/tree/scene.gltf', (bonsaiScene) => {
        bonsaiScene.scene.position.set(-50, 0, 0);
        bonsaiScene.scene.scale.set(1.6, 1.6, 1.6);
        scene.add(bonsaiScene.scene);
    })

    loader.load('assets/3dmodels/bike/scene.gltf', (bikemodel) => {
        bikemodel.scene.rotation.set(0, .4, 0);
        bikemodel.scene.position.set(-45, 1, 20);
        bikemodel.scene.scale.set(1.4, 1.4, 1.4);
        scene.add(bikemodel.scene);
    })

    loader.load('assets/3dmodels/hose/scene.gltf', (hose) => {
        hose.scene.rotation.set(0, -1.55, 0);
        hose.scene.position.set(-63, 1, 30.5);
        hose.scene.scale.set(0.2,.2,.2);
        scene.add(hose.scene);
    })
}

function addLawn() {
    const rows = 5;
    const columns = 9;
    const lawnSize = 10;

        for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {

            const lawngeometry = new THREE.BoxGeometry(10,2,10,2);

            let lawnmat;
            if (row % 2 === 0) {
                lawnmat = new THREE.MeshLambertMaterial({ map: col % 2 === 0 ? LAWN2 : LAWN1 });
            } else {
                lawnmat = new THREE.MeshLambertMaterial({ map: col % 2 === 0 ? LAWN4 : LAWN3 });
            }

            const lawn = new THREE.Mesh(lawngeometry, lawnmat);

            lawn.receiveShadow = true;

            lawn.position.x = col * lawnSize - ((columns - 1) * lawnSize) / 2;
            lawn.position.z = row * lawnSize - ((rows - 1) * lawnSize) / 2;

            scene.add(lawn);
        }
    }
}

function addSideWalk() {
    const SidewG = new THREE.BoxGeometry(10, 2, 10, 2);
    const SidewM = new THREE.MeshLambertMaterial({map: SIDEWALK})

    for (let i = -50; i <= 50; i += 10) {
        let bottomSidewalk = new THREE.Mesh(SidewG, SidewM);
        bottomSidewalk.position.set(i, 0, -30);
        scene.add(bottomSidewalk);

       for (let i = -80; i <= 50; i += 10) {
        let topSidewalk = new THREE.Mesh(SidewG, SidewM);
        topSidewalk.position.set(i, 0, 30);
        scene.add(topSidewalk);
       }
        

        for (let i = -30; i <= 30; i += 10) {
        let leftSidewalk = new THREE.Mesh(SidewG, SidewM);
        leftSidewalk.position.set(-50, 0, i);
        leftSidewalk.rotation.y = Math.PI / 2;
        scene.add(leftSidewalk);
    }

    for (let i = -50; i <= 30; i += 10) {
    let rightmostSidewalk = new THREE.Mesh(SidewG, SidewM);
        rightmostSidewalk.position.set(94, 0, i);
        rightmostSidewalk.rotation.y = Math.PI / 2;
        scene.add(rightmostSidewalk);

    let rightSidewalk = new THREE.Mesh(SidewG, SidewM);
        rightSidewalk.position.set(50, 0, i);
        rightSidewalk.rotation.y = Math.PI / 2;
        scene.add(rightSidewalk);
    }
}
}

function addRoadline() {
    const lineHeight = 1;
    const lineWidth = 2;
    const lineDepth = 9;
    const lineSpace = 17;
    const lineStart = -40;

    const LinesG = new THREE.BoxGeometry(lineWidth, lineHeight, lineDepth);
    const LinesM = new THREE.MeshStandardMaterial(0xd6d5cb);
    for (let i = 0; i <= 4; i++) {
        const RoadLines = new THREE.Mesh(LinesG, LinesM);
        RoadLines.position.set(72, -1.1, lineStart + i * lineSpace); 
        scene.add(RoadLines);
    }
}

function addFences() {
    const postHeight = 11;
    const postWidth = 5.5;
    const postDepth = 1;
    const barWidth = 100;
    const barHeight = 2;
    const barDepth = 1;
    const postSpacing = 7;

    const postGeometry = new THREE.BoxGeometry(postWidth, postHeight, postDepth);
const postMaterial = new THREE.MeshLambertMaterial({ map: FENCE }); 
for (let i = 0; i <= 14; i++) {  
    const post = new THREE.Mesh(postGeometry, postMaterial);
    post.position.set(i * postSpacing - (barWidth / 2) - 5, postHeight / 2, -25);
    post.castShadow = true;
    post.receiveShadow = false;
    scene.add(post);
}

const barGeometry = new THREE.BoxGeometry(barWidth, barHeight, barDepth);
const barMaterial = new THREE.MeshLambertMaterial({ map: FENCE });
for (let i = 0; i < 1; i++) { 
    const bar = new THREE.Mesh(barGeometry, barMaterial);
    bar.position.set(-5, postHeight / 2 - i * postHeight / 2, -25.8); 
    bar.castShadow = true;
    bar.receiveShadow = false;
    scene.add(bar);

}
}

function addFences2() {
    const postHeight = 5;
    const postWidth = 4;
    const postDepth = 1;
    const barWidth = 80;
    const barHeight = 2;
    const barDepth = 1;
    const postSpacing = 6;

    const postGeometry = new THREE.BoxGeometry(postWidth, postHeight, postDepth);
    const postMaterial = new THREE.MeshLambertMaterial({ map: IRON });
    
    for (let i = 0; i <= 11; i++) {  
        const post = new THREE.Mesh(postGeometry, postMaterial);

        post.position.set(99, postHeight / 2, -35 + i * postSpacing); 
        post.rotation.set(0, 1.55, 0);
        
        post.castShadow = true;
        post.receiveShadow = false;
        scene.add(post);
    }

    const barGeometry = new THREE.BoxGeometry(barWidth, barHeight, barDepth);
    const barMaterial = new THREE.MeshLambertMaterial({ map: IRON });

for (let i = 0; i < 1; i++) { 
    const bar = new THREE.Mesh(barGeometry, barMaterial);
    bar.rotation.set(0,1.59,0);
    bar.position.set(99.5, postHeight / 2 - i * postHeight / 2, -9); 
    bar.castShadow = true;
    bar.receiveShadow = false;
    scene.add(bar);
}

}

function addSewers() {
    const SewerG = new THREE.PlaneGeometry(9, 7);
    const SewerM = new THREE.MeshMatcapMaterial({
        map: DRAIN,
    })
    const Sewer2M = new THREE.MeshMatcapMaterial({
        map: TOXIC,
    })
    const Sewer = new THREE.Mesh(SewerG, SewerM);
    const Sewer2 = new THREE.Mesh(SewerG, Sewer2M);

    Sewer.rotation.set(-1.55, 0, 1.58);
    Sewer.position.set(55,-.5, 17);
    Sewer2.rotation.set(-1.55, 0, 1.58);
    Sewer2.position.set(89,-.5, -9);
    scene.add(Sewer)
    scene.add(Sewer2)
}

function addLightBox() {
    const LightBoxG = new THREE.CylinderGeometry(3, 2, 5.4, 32);
    const LightBoxM = new THREE.MeshMatcapMaterial({
        color: 0xe8cd99,
        transparent: true,
        opacity: .8,
    })
    const LightBox = new THREE.Mesh(LightBoxG, LightBoxM);
    LightBox.position.set(-51, 26,18);
    scene.add(LightBox);

    const BulbG = new THREE.CapsuleGeometry(1, 1, 4, 8);
    const BulbM = new THREE.MeshMatcapMaterial({color: 0xe8c580});
    const Bulb = new THREE.Mesh(BulbG, BulbM);
    Bulb.position.set(-51, 26, 18);
    scene.add(Bulb);

    const StandG = new THREE.BoxGeometry(1, 3, 3, 2);
    const StandM = new THREE.MeshLambertMaterial({color: 0x6b675f});
    const stand = new THREE.Mesh(StandG, StandM);
    stand.position.set(-54, 26, 18);
    scene.add(stand);
}

function addHouseAndLot() {
    const HouseWallsG = new THREE.BoxGeometry(40, 35, 2, 2);
    const HouseWallsFG = new THREE.BoxGeometry(2, 35, 31, 2);
    const HouseWallsM = new THREE.MeshLambertMaterial({map: WALL});

    const HouseWalls = new THREE.Mesh(HouseWallsG, HouseWallsM);
    const HouseWalls2 = new THREE.Mesh(HouseWallsG, HouseWallsM);
    const Housewalls3 = new THREE.Mesh(HouseWallsFG, HouseWallsM);
    const Housewalls4 = new THREE.Mesh(HouseWallsFG, HouseWallsM);

    HouseWalls.position.set(-75, 16, 24);
    HouseWalls2.position.set(-75, 16, -6);
    Housewalls3.position.set(-56, 16, 9);
    Housewalls4.position.set(-94, 16, 9);
    scene.add(HouseWalls);
    scene.add(HouseWalls2);
    scene.add(Housewalls3);
    scene.add(Housewalls4);

    // door
    const DoorG = new THREE.BoxGeometry(2, 16, 8, 2);
    const DoorM = new THREE.MeshLambertMaterial({
        map: MAINDOOR,
        transparent: true,
    });
    const Door = new THREE.Mesh(DoorG, DoorM);
    Door.position.set(-55.7, 7, 9);
    scene.add(Door);

    // roof
    const RoofG = new THREE.BoxGeometry(29, 29, 2, 2);
    const RoofM = new THREE.MeshLambertMaterial({ map: WALL2});

    const Roofside1 = new THREE.Mesh(RoofG, RoofM);
    const Roofside2 = new THREE.Mesh(RoofG, RoofM);

    Roofside1.rotation.z = -.78;
    Roofside1.position.set(-75, 34, 24);
    Roofside2.rotation.z = -.78;
    Roofside2.position.set(-75, 34, -6);
    scene.add(Roofside1);
    scene.add(Roofside2);

    const RoofTilesG = new THREE.BoxGeometry(2, 33, 33, 2);
    const RoofTilesM = new THREE.MeshLambertMaterial({ map: ROOF});

    const RoofTiles1 = new THREE.Mesh(RoofTilesG, RoofTilesM);
    const RoofTiles2 = new THREE.Mesh(RoofTilesG, RoofTilesM);
    
    RoofTiles1.position.set(-64, 44, 9);
    RoofTiles1.rotation.z = .8;
    RoofTiles2.position.set(-86, 44, 9);
    RoofTiles2.rotation.z = -.8;
    scene.add(RoofTiles1);
    scene.add(RoofTiles2);

}

function addSideHouse() {
    const HouseWallsG = new THREE.BoxGeometry(40, 20, 2, 2);
    const HouseWallsFG = new THREE.BoxGeometry(2, 20, 15, 2);
    const HouseWallsM = new THREE.MeshLambertMaterial({map: WALL});

    const HouseWalls = new THREE.Mesh(HouseWallsG, HouseWallsM);
    const Housewalls3 = new THREE.Mesh(HouseWallsFG, HouseWallsM);
    const Housewalls4 = new THREE.Mesh(HouseWallsFG, HouseWallsM);

    HouseWalls.position.set(-75, 5, -21);
    Housewalls3.position.set(-56, 5, -14);
    Housewalls4.position.set(-94, 5, -14);
    scene.add(HouseWalls);
    scene.add(Housewalls3);
    scene.add(Housewalls4);

    //door
    const DoorG = new THREE.BoxGeometry(2, 12, 7, 2);
    const DoorM = new THREE.MeshLambertMaterial({map: DOOR});
    const Door = new THREE.Mesh(DoorG, DoorM);
    Door.position.set(-55, 7, -11);
    scene.add(Door);

    // roof
    const RoofG = new THREE.BoxGeometry(27, 27, 2, 2);
    const RoofM = new THREE.MeshLambertMaterial({ map: WALL2});

    const Roofside1 = new THREE.Mesh(RoofG, RoofM);

    Roofside1.rotation.z = -.78;
    Roofside1.position.set(-75, 16.5, -20.5);
    scene.add(Roofside1);

    const RoofTilesG = new THREE.BoxGeometry(2, 28, 15, 2);
    const RoofTilesM = new THREE.MeshLambertMaterial({ map: ROOF});

    const RoofTiles1 = new THREE.Mesh(RoofTilesG, RoofTilesM);
    const RoofTiles2 = new THREE.Mesh(RoofTilesG, RoofTilesM);
    
    RoofTiles1.position.set(-65, 25, -14);
    RoofTiles1.rotation.z = .8;
    RoofTiles2.position.set(-86, 25, -14);
    RoofTiles2.rotation.z = -.8;
    scene.add(RoofTiles1);
    scene.add(RoofTiles2);
}


const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

camera.position.set(0,120,50);
camera.rotation.x = Math.PI / 4;;

function animate() {
    requestAnimationFrame(animate);
    animateParticles();

    controls.update();
	renderer.render( scene, camera );
}

Miscs();
addRainParticles();
animateParticles()
add3DModels();
addRoadline();
addLight();
addLawn();
addSideWalk();
addFences();
addFences2();
addSewers();
addLightBox();
addHouseAndLot();
addSideHouse();
animate();

