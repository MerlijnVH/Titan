var container, stats;
var camera, scene;
var cameraOrtho, sceneOrtho;
var controls, renderer, geometry, projector;
var dirLight, ambientLight;
var clock;
var delta;

var renderTexture;
var renderTextureHUD;

var spriteMap;
var spriteWeapon;

var player;

var MARGIN = 0;
var SCREEN_WIDTH  = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight - (MARGIN * 2);
var ASPECTRATIO = SCREEN_WIDTH / SCREEN_HEIGHT;

var USESTATS = true;
var USEANTIALIAS = false;

var UNITSIZE = 1;

var FoV = 60;
var CamNearPlane = 0.05;
var CamFarPlane = 1000;

var PlayerMoveSpeed = 2;
var PlayerLookSpeed = 1;

var WALLHEIGHT = UNITSIZE / 3,

LOOKSPEED = 0.075,
NUMAI = 5,
PROJECTILEDAMAGE = 20;

var map = 
[ // 1  2  3  4  5  6  7  8  9
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], // 0
[0, 1, 0, 0, 0, 0, 0, 1, 1, 1,], // 1
[0, 1, 0, 0, 2, 0, 0, 0, 0, 1,], // 2
[0, 0, 0, 0, 0, 2, 0, 0, 0, 1,], // 3
[0, 0, 0, 2, 0, 0, 2, 0, 0, 1,], // 4
[0, 0, 0, 0, 2, 0, 0, 0, 1, 1,], // 5
[0, 1, 1, 0, 0, 0, 0, 1, 1, 1,], // 6
[0, 1, 1, 0, 0, 1, 0, 0, 1, 1,], // 7
[0, 1, 1, 1, 1, 1, 0, 0, 1, 1,], // 8
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], // 9
];

var mapW = map.length;
var mapH = map[0].length;

var pickups = [];

var bullets = [];
var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x333333});
var sphereGeo = new THREE.SphereGeometry(0.05, 0.05, 0.05);

var walls = [];

var textureWeaponShotgun;
var textureWeaponShotgunReload;

var spriteWeaponShotgun;
var spriteWeaponShotgunReload;

var materialWeaponShotgun;
var materialWeaponShotgunReload;

// Initialize

initialize();

// Game loop

update();
render();

function initialize() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// Set up clock to get render delta time.

	clock = new THREE.Clock();

	// Set up projector for raycasting.

	projector = new THREE.Projector();

	// Set up scene objects, stores objects to scene-graph container to be rendered.

	scene = new THREE.Scene();
	sceneRTT = new THREE.Scene();
	sceneScreen = new THREE.Scene();

	// Set up scene objects for storing ortographic rendering objects.

	sceneOrtho = new THREE.Scene();

	// Set up camera based on desired FoV and screen size.

	camera = new THREE.PerspectiveCamera( FoV, ASPECTRATIO, CamNearPlane, CamFarPlane );
	cameraRTT = new THREE.OrthographicCamera( SCREEN_WIDTH / - 2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / - 2, -10000, 10000 );
	cameraRTT.position.z = 100;

	// Set up ortographic camera for rendering HUD.

	cameraOrtho = new THREE.OrthographicCamera( -(SCREEN_WIDTH / 2), SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, -(SCREEN_HEIGHT / 2), 0, 1000 );
	cameraOrtho.position.z = 10;

	// Set up render-to-texture.

	renderTexture = new THREE.WebGLRenderTarget( 320, 200, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );

	var renderTextureMaterial = new THREE.MeshBasicMaterial( {map: renderTexture} );

	var plane = new THREE.PlaneGeometry( window.innerWidth, window.innerHeight );
	var quad = new THREE.Mesh( plane, renderTextureMaterial );

	quad.position.z = -100;

	sceneScreen.add( quad );

	// Set up player and controls.
	// TODO Needs input vector normalization to prevent old-school diagonal run cheat.

	player = new Player( camera );
	player.movementSpeed = 2.5;
	player.lookSpeed = 5;

	// Initialize the scene and load the world.

	SetupScene();

	// Setup sprites.

	spriteMap = THREE.ImageUtils.loadTexture( 'data/sprites/shotgun.png', undefined, createHUDSprites );

	textureWeaponShotgun = THREE.ImageUtils.loadTexture('data/sprites/shotgun.png');
	textureWeaponShotgunReload = THREE.ImageUtils.loadTexture('data/sprites/shotgunreload.png');

	textureWeaponShotgun.magFilter = THREE.NearestFilter;
	textureWeaponShotgun.minFilter = THREE.NearestFilter;

	textureWeaponShotgunReload.magFilter = THREE.NearestFilter;
	textureWeaponShotgunReload.minFilter = THREE.NearestFilter;

	materialWeaponShotgun = new THREE.SpriteMaterial( { map: textureWeaponShotgun } );
	materialWeaponShotgunReload = new THREE.SpriteMaterial( { map: textureWeaponShotgunReload } );

	spriteWeaponShotgun = new THREE.Sprite( materialWeaponShotgun );
	spriteWeaponShotgunReload = new THREE.Sprite( materialWeaponShotgunReload );

	// Set up the WebGL renderer.

	renderer = new THREE.WebGLRenderer( USEANTIALIAS );
	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	renderer.autoClear = false;

	// Add the canvas to the document.

	container.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

	window.addEventListener( 'mousedown', onDocumentMouseDown, false );

	window.addEventListener( 'keydown', onKeyDown, false );

	if (USESTATS) {

		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.bottom = '0px';
		stats.domElement.style.zIndex = 100;
		container.appendChild( stats.domElement );

	}

}

function onKeyDown( event ) {

	event.preventDefault();

	switch ( event.keyCode ) {

		case 17: createBullet(); break;

	}

}

function onDocumentMouseDown( event ) {

	event.preventDefault();

	createBullet();

}

function createHUDSprites( texture ) {

	texture.magFilter = THREE.NearestFilter;
	texture.minFilter = THREE.NearestFilter;

	var material = new THREE.SpriteMaterial( { map: texture } );

	var width = material.map.width * 8;
	var height = material.map.height * 8;

	spriteWeapon = new THREE.Sprite( material );
	spriteWeapon.scale.set( 768, 768, 1 );
	sceneOrtho.add( spriteWeapon );

	updateHUDSprites();

}

var baseY;
var baseX;

function updateHUDSprites() {

	var width = window.innerWidth / 2;
	var height = window.innerHeight / 2;

	var material = spriteWeapon.material;

	var imageWidth = material.map.image.width / 2;
	var imageHeight = material.map.image.height / 2;

	spriteWeapon.position.set( 0, -(height - (imageHeight * 4)), 1 );

	baseX = spriteWeapon.position.x;
	baseY = spriteWeapon.position.y;

}

function getTexture(path) {

	var image = THREE.ImageUtils;

	var texture = image.loadTexture(path);
	texture.magFilter = THREE.NearestFilter;
	texture.minFilter = THREE.NearestFilter;

	return texture;

}

function SetupScene() {

	// Setup fog, gives the scene almost an ambient occlusion feeling.

	sceneRTT.fog = new THREE.FogExp2(0x000000, 0.15); // color, density

	var image = THREE.ImageUtils;

	var cube = new THREE.BoxGeometry(UNITSIZE, UNITSIZE, UNITSIZE);

	var textures = [
	getTexture('data/textures/DI_Dev_Floor.png'),
	getTexture('data/textures/DI_Dev_Wall.png'),
	];

	var materials = [
	new THREE.MeshLambertMaterial({map: textures[0]}),
	new THREE.MeshLambertMaterial({map: textures[1]})
	];

	for (var x = 0; x < mapW; x++)
	{
		for (var y = 0; y < mapH; y++)
		{
			if (map[x][y] != 1)
			{
				var plane = new THREE.Mesh( cube, materials[0] );

				plane.position.x = x * UNITSIZE;
				plane.position.y = -UNITSIZE;
				plane.position.z = y * UNITSIZE;

				sceneRTT.add( plane );

				var plane = new THREE.Mesh( cube, materials[0] );

				plane.position.x = x * UNITSIZE;
				plane.position.y = UNITSIZE;
				plane.position.z = y * UNITSIZE;

				sceneRTT.add( plane );
			}

			if (map[x][y] == 1)
			{
				var wall = new THREE.Mesh( cube, materials[1] );
				wall.position.x = x * UNITSIZE;
				wall.position.y = 0;
				wall.position.z = y * UNITSIZE;

				sceneRTT.add(wall);

				walls.push(wall);
			}

			if (map[x][y] == 2)
			{
				var healthCube = new THREE.Mesh( new THREE.BoxGeometry(0.15, 0.15, 0.15) );
				healthCube.position.set(x * UNITSIZE, -UNITSIZE / 3, y * UNITSIZE);

				pickups.push(healthCube);

				sceneRTT.add(healthCube);
			}
		}
	}

	createBullet();

	dirLight = new THREE.DirectionalLight( 0xffffff );
	dirLight.position.set( -1, 0, 1 ).normalize();
	//scene.add( dirLight );

	ambientLight = new THREE.AmbientLight( 0xffffff );
	sceneRTT.add( ambientLight );

}

function onWindowResize() {

	var width = window.innerWidth;
	var height = window.innerHeight;

	camera.aspect = width / height;				
	camera.updateProjectionMatrix();

	cameraOrtho.left = - width / 2;
	cameraOrtho.right = width / 2;
	cameraOrtho.top = height / 2;
	cameraOrtho.bottom = - height / 2;
	cameraOrtho.updateProjectionMatrix();

	updateHUDSprites();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function update() {

	requestAnimationFrame( update );

	delta = clock.getDelta();
	//cube.rotation.x += 1 * delta;

	//controls.update( delta );
	player.update(delta);

	stats.update();

	if (spriteWeapon != undefined)
	{
		if (reload)
		{
			reloadTimeElapsed += 1.0 * delta;

			spriteWeapon.material = materialWeaponShotgunReload;

			if (reloadTimeElapsed >= reloadTime)
			{
				spriteWeapon.material = materialWeaponShotgun;

				reloadTimeElapsed = 0;

				reload = false;
			}
		}
	}


	for (var i = 0; i < pickups.length; i++)
	{
		var pickup = pickups[i];

		pickup.rotation.y += 1 * delta;
	}

	for (var d = bullets.length - 1; d >= 0; d--)
	{
		var bullet = bullets[d];

		var bulletSpeed = 8;

		bullet.translateX(bulletSpeed * bullet.ray.direction.x * delta);
		bullet.translateY(bulletSpeed * bullet.ray.direction.y * delta);
		bullet.translateZ(bulletSpeed * bullet.ray.direction.z * delta);
	}

	//var ix = 0;

	//console.log(spriteWeapon);
	//spriteWeapon.position.y = Math.sin((theta)*0.3)*100 + Math.sin((0 + theta)*0.3)*100;

	var magnitude = 8;
	var speed = 8;

	if (spriteWeapon != undefined) {

		if (player.velocity >= 0.0005 || player.velocity <= -0.0005) {

			spriteWeapon.position.x = baseX + Math.sin(clock.getElapsedTime() * speed / 2) * 16;

		}

		spriteWeapon.position.y = baseY + Math.sin(clock.getElapsedTime() * speed) * 8;

	}
}

var sceneRTT, cameraRTT, sceneScreen;

var reload = false;
var reloadTime = 0.5;
var reloadTimeElapsed = 0;

function render() {

	requestAnimationFrame( render );

	renderer.clear();

	// Render first scene into texture



	renderer.render( sceneRTT, camera, renderTexture, true );

	renderer.clearDepth();

	renderer.render( sceneOrtho, cameraOrtho, renderTexture, false );

	// Render full screen quad with generated texture

	renderer.render( sceneScreen, cameraRTT );



	// Render second scene to screen
	// (using first scene as regular texture)

//	renderer.render( scene, camera );

}

function createBullet( obj ) {

	obj = camera;

	if (obj == undefined)
	{
	}

	if (spriteWeaponShotgunReload != undefined)
	{
	//	spriteWeapon.material = spriteWeaponShotgunReload.material;
}

if (reload == true)
{
	return;
}

reload = true;

var mouse = { x: 0, y: 0 };

var sphere = new THREE.Mesh( sphereGeo, sphereMaterial );
sphere.position.set( obj.position.x, obj.position.y * 0.8, obj.position.z );

var obstacles, collisions;


var vector = new THREE.Vector3( 0, 0, -1 );
vector.applyEuler(camera.rotation, camera.order);

	//projector.unprojectVector(vector, camera);

	var rayCam = new THREE.Ray(camera.position, vector);

	var rayCaster = new THREE.Raycaster(rayCam.origin, rayCam.direction);
	sphere.ray = rayCaster.ray;

	obstacles = walls;

	collisions = rayCaster.intersectObjects(obstacles);

	var distance = 0.15;

	var intersects = rayCaster.intersectObjects(obstacles);

	if (intersects.length > 0)
	{
		for (var i = 0; i < intersects.length; i++)
		{
			var collision = intersects[0];

			var hitSphere = new THREE.Mesh( sphereGeo );
			hitSphere.position.set(collision.point.x, collision.point.y, collision.point.z);

			console.log(collision);

			sceneRTT.add(hitSphere);

			break;
		}
	}

	// if (collisions.length > 0)
	// {
	// 	for (var i = 0; collisions.length; i++)
	// 	{

	// 	}
	// }

	sphere.owner = obj;

	bullets.push(sphere);
	//sceneRTT.add(sphere);	

	return sphere;

}