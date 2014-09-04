var container, stats;
var camera;
var cameraOrtho, sceneOrtho;
var controls, renderer, geometry, projector;
var ambientLight;
var clock;
var delta;

var renderTexture;
var renderTextureHUD;

var spriteMap;
var spriteWeapon;

var player;
var hud;

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

var enemies = [];

var pickups = [];

var bullets = [];
var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x333333});
var sphereGeo = new THREE.SphereGeometry(0.05, 0.05, 0.05);

var walls = [];

var weaponSprites = [];

var textureWeaponShotgun;

var textureWeaponShotgun;
var textureWeaponShotgunReload;

var spriteWeaponShotgun;
var spriteWeaponShotgunReload;

var materialWeaponShotgun;
var materialWeaponShotgunReload;

var weapon;

var lightWeapon;

var raycaster = [];

var sceneGame, cameraScreen, sceneScreen;


var reloadTime = 0.5;
var reloadTimeElapsed = 0;

var dt = 1/60;
var time;

var Sound = function ( sources, radius, volume ) {

	var audio = document.createElement( 'audio' );

	for ( var i = 0; i < sources.length; i ++ ) {

		var source = document.createElement( 'source' );
		source.src = sources[ i ];

		audio.appendChild( source );

	}

	this.position = new THREE.Vector3();

	this.play = function () {

		audio.play();

	}

	this.update = function ( camera ) {

		var distance = this.position.distanceTo( camera.position );

		if ( distance <= radius ) {

			audio.volume = volume * ( 1 - distance / radius );

		} else {

			audio.volume = 0;

		}

	}

}

var sound1;

// lock

var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );

var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if ( havePointerLock ) {

	var element = document.body;

	var pointerlockchange = function ( event ) {

		if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

			player.enabled = true;

			blocker.style.display = 'none';

		} else {

//	controls.enabled = false;

blocker.style.display = '-webkit-box';
blocker.style.display = '-moz-box';
blocker.style.display = 'box';

instructions.style.display = '';

}

}

var pointerlockerror = function ( event ) {

	instructions.style.display = '';

}

// Hook pointer lock state change events
document.addEventListener( 'pointerlockchange', pointerlockchange, false );
document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

document.addEventListener( 'pointerlockerror', pointerlockerror, false );
document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

instructions.addEventListener( 'click', function ( event ) {

	player.enabled = true;

	blocker.style.display = 'none';

	instructions.style.display = 'none';

// Ask the browser to lock the pointer
element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
element.requestPointerLock();

if ( /Firefox/i.test( navigator.userAgent ) ) {

	var fullscreenchange = function ( event ) {

		if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {

//	document.removeEventListener( 'fullscreenchange', fullscreenchange );
//	document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

player.enabled = true;

blocker.style.display = 'none';

element.requestPointerLock();
}

}

//	document.addEventListener( 'fullscreenchange', fullscreenchange, false );
//	document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );
//
//	element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

//	element.requestFullscreen();

} else {
	player.enabled = true;

	blocker.style.display = 'none';
	element.requestPointerLock();

}

}, false );

} else {
	player.enabled = true;

	blocker.style.display = 'none';
	instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

}

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

	sceneGame = new THREE.Scene();
	sceneOrtho = new THREE.Scene();

	sceneScreen = new THREE.Scene();

	// Set up camera based on desired FoV and screen size.

	camera = new THREE.PerspectiveCamera( FoV, ASPECTRATIO, CamNearPlane, CamFarPlane );

	// Set up ortographic camera for rendering HUD.

	cameraOrtho = new THREE.OrthographicCamera( -(SCREEN_WIDTH / 2), SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, -(SCREEN_HEIGHT / 2), 0, 1000 );
	cameraOrtho.position.z = 10;

	// Set up camera for rendering screen.

	cameraScreen = new THREE.OrthographicCamera( -(SCREEN_WIDTH / 2), SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, -(SCREEN_HEIGHT / 2), 0, 1000 );
	cameraScreen.position.z = 10;

	// Set up render-to-texture.

	renderTexture = new THREE.WebGLRenderTarget( 640, 400, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );

	var renderTextureMaterial = new THREE.MeshBasicMaterial( {map: renderTexture} );

	var plane = new THREE.PlaneGeometry( window.innerWidth, window.innerHeight );
	var quad = new THREE.Mesh( plane, renderTextureMaterial );

	quad.position.z = -100;

	sceneScreen.add( quad );

	// Set up player and controls.
	// TODO Needs input vector normalization to prevent old-school diagonal run cheat.

	hud = new HUD();
	hud.initialize();

	player = new Player( camera );
	sceneGame.add( player.getObject() );

	// Initialize the scene and load the world.

	weapon = new Weapon();
	weapon.initialize( hud );

	lightWeapon = new THREE.PointLight( 0xe56d22, 2, 50 );
	sceneGame.add( lightWeapon );

	SetupScene();

	// Setup sprites.

	spriteMap = THREE.ImageUtils.loadTexture( 'data/sprites/shotgun.png', undefined, createHUDSprites );

	weaponSprites[0] = THREE.ImageUtils.loadTexture( 'data/sprites/shotgun.png' );
	weaponSprites[1] = THREE.ImageUtils.loadTexture( 'data/sprites/shotgunfire.png' );
	weaponSprites[2] = THREE.ImageUtils.loadTexture( 'data/sprites/shotgunreload.png' );

	for (var i = 0; i < weaponSprites.length; i++) {
		var sprite = weaponSprites[i];

		sprite.magFilter = THREE.NearestFilter;
		sprite.minFilter = THREE.NearestFilter;

		sprite.magFilter = THREE.NearestFilter;
		sprite.minFilter = THREE.NearestFilter;
	}

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

	sound1 = new Sound([ 'data/music/d_e1m3.ogg' ], 64, 1);
	sound1.position.copy( camera.position );
//	sound1.play();

	raycaster[0] = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 1, 0, 0 ), 0, 10 );
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

function SetupScene () {

	// Setup fog, gives the scene almost an ambient occlusion feeling.

	sceneGame.fog = new THREE.FogExp2(0x000000, 0.25); // color, density

	ambientLight = new THREE.AmbientLight( 0xffffff );
	sceneGame.add( ambientLight );

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

	var mapTexture = THREE.ImageUtils.loadTexture( 'data/map.png' );

	var mapTextureImg = new Image();
	mapTextureImg.src = 'data/map.png';

	mapTextureImg.onload = function()
	{
		var width = mapTextureImg.width;
		var height = mapTextureImg.height;

		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		canvas.getContext('2d').drawImage(mapTextureImg, 0, 0, width, height);

		var halfExtents = new CANNON.Vec3(UNITSIZE / 2, UNITSIZE / 2, UNITSIZE / 2);

		for (var x = 0; x < width; x++)
		{
			for (var y = 0; y < height; y++)
			{
				var pixelData = canvas.getContext('2d').getImageData(x, y, 1, 1).data;

				// Floor & Ceiling

				if (pixelData[0] != 0 && pixelData[1] != 0 && pixelData[2] != 0 && pixelData[3] == 255) {

					var plane = new THREE.Mesh( cube, materials[0] );

					plane.position.x = x * UNITSIZE;
					plane.position.y = -UNITSIZE;
					plane.position.z = y * UNITSIZE;

					sceneGame.add( plane );

					var plane = new THREE.Mesh( cube, materials[0] );

					plane.position.x = x * UNITSIZE;
					plane.position.y = UNITSIZE;
					plane.position.z = y * UNITSIZE;

					sceneGame.add( plane );

				}

				if (pixelData[0] == 0 && pixelData[1] == 0 && pixelData[2] == 0) {

					var wall = new THREE.Mesh( cube, materials[1] );
					wall.position.x = x * UNITSIZE;
					wall.position.y = 0;
					wall.position.z = y * UNITSIZE;

					sceneGame.add(wall);

					walls.push(wall);

				}

				// Ammo

				if (pixelData[0] == 1 && pixelData[1] == 38 && pixelData[2] == 255) {

					var textureAmmoBox = THREE.ImageUtils.loadTexture('data/textures/DI_Ammo.png');

					textureAmmoBox.magFilter = THREE.NearestFilter;
					textureAmmoBox.minFilter = THREE.NearestFilter;

					var material = new THREE.MeshLambertMaterial({
						map: textureAmmoBox
					});

					var boxSize = 0.25;
					var healthCube = new THREE.Mesh( new THREE.BoxGeometry(boxSize, boxSize, boxSize), material );
					healthCube.position.set(x * UNITSIZE, -UNITSIZE / 3, y * UNITSIZE);

					pickups.push(healthCube);

					sceneGame.add(healthCube);

				}

				// Player spawn

				if (player != undefined) {
					if (pixelData[0] == 1 && pixelData[1] == 255 && pixelData[2] == 10 && pixelData[3] == 255) {
						player.getObject().position.x = x * UNITSIZE;
						player.getObject().position.y = 0;
						player.getObject().position.z = y * UNITSIZE;

						var lookVector = new THREE.Vector3( 0, 90, 0 );
					}
				}

				// Enemy spawn

				if (pixelData[0] == 255 && pixelData[1] == 60 && pixelData[2] == 60 && pixelData[3] == 255) {
					var textureAmmoBox = THREE.ImageUtils.loadTexture('data/textures/DI_Target.png');

					textureAmmoBox.magFilter = THREE.NearestFilter;
					textureAmmoBox.minFilter = THREE.NearestFilter;

					var material = new THREE.MeshLambertMaterial({
						map: textureAmmoBox
					});

					var boxSize = 0.75;
					var enemy = new THREE.Mesh( new THREE.BoxGeometry(boxSize, boxSize, boxSize), material );
					enemy.position.set( x * UNITSIZE, 0, y * UNITSIZE );

					enemies.push( enemy );

					sceneGame.add( enemy );
				}
			}
		}
	}

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

	updateEnemies();

	updatePickups();

	updateWeapon();

	updateBullets();

	player.update();

	weapon.update( delta );

	stats.update();

	if (player != undefined)
	{
		player.isOnObject( false );
		player.BlockX( false );
		player.BlockZ( false );

		raycaster[0].ray.origin.copy( player.getObject().position );

		var oriX = raycaster[0].ray.origin.x;


		var lookDirection = new THREE.Vector3( 0, 0, -1 );
		lookDirection.applyEuler(player.getObject().rotation);

		raycaster[0].near = 0.05;
		raycaster[0].far = 0.15;
		raycaster[0].ray.direction = lookDirection;


		var intersections = raycaster[0].intersectObjects( walls );

		if ( intersections.length > 0 ) {


		}

		var rays = [
		new THREE.Vector3(0, 0, 1),
		new THREE.Vector3(1, 0, 1),
		new THREE.Vector3(1, 0, 0),
		new THREE.Vector3(1, 0, -1),
		new THREE.Vector3(0, 0, -1),
		new THREE.Vector3(-1, 0, -1),
		new THREE.Vector3(-1, 0, 0),
		new THREE.Vector3(-1, 0, 1)
		];

		var colCaster = new THREE.Raycaster();

		var collisions;// Maximum distance from the origin before we consider collision
		var distance = 0.25;

		for (var i = 0; i < rays.length; i++) {

			var a = player.getObject().position;

			colCaster.set(a, rays[i]);

			var hits = colCaster.intersectObjects( walls );

			if (hits.length > 0 && hits[0].distance <= distance) {

				if (i === 0 || i === 4) {
					player.BlockZ( true );
				}

				if (i === 2 || i === 6) {
					player.BlockX( true );
				}
			}

		}

		raycaster[0].ray.origin.x = oriX;

	}
}

function render () {

	requestAnimationFrame( render );

	renderer.clear();

	// Draw game scene into texture.

	renderer.render( sceneGame, camera, renderTexture, true );

	// Draw ortographic scene into texture.

	renderer.render( sceneOrtho, cameraOrtho, renderTexture, false );

	// Draw scene with full screen quad using generated render texture.

	renderer.render( sceneScreen, cameraScreen );

}

function updateEnemies () {

	if (player == undefined) {
		return;
	}

	var pickupRotationSpeed = 1;
	var distanceToPickup = 0.5;
	var ammoPerPickup = 12;

	// Bob the weapon using a sine wave.

	var baseY = -0.25;
	var magnitude = 0.05;
	var speed = 1;

	for (var i = 0; i < enemies.length; i++) {

		var pickup = enemies[i];

		// Spin the pickup.

		//pickup.rotation.y += pickupRotationSpeed * delta;
	//	pickup.position.y = baseY + Math.sin(clock.getElapsedTime() * speed) * magnitude;

		var direction = new THREE.Vector3();
		direction.subVectors(player.getObject().position, pickup.position);
		direction = direction.normalize();

	//	direction = direction.normalize();

	//	pickup.position.set( pickup.position.x + direction.x, pickup.position.y + direction.y, pickup.position.z + direction.z );
		pickup.position.setX( pickup.position.x + direction.x * 1 * delta );
		pickup.position.setY( pickup.position.y + direction.y * 1 * delta );
		pickup.position.setZ( pickup.position.z + direction.z * 1 * delta );

	//	pickup.lookAt( direction );

		// Check distance between pickup and player, for picking up.

		var a = player.getObject().position;
		var b = pickup.position;

		var distance = a.distanceTo( b );

		// The player is close enough, pick it up.

		if (distance <= distanceToPickup) {

			sceneGame.remove( pickup );
			pickups.splice( i, 1 );

			weapon.addAmmo( ammoPerPickup );

		//	var sound2 = new Sound([ 'data/sounds/pickup_ammo.wav' ], 64, 1);
		//	sound2.position.copy( player.getObject().position );
			//sound2.play();

		}

	}

}

function updatePickups () {

	if (player == undefined) {
		return;
	}

	var pickupRotationSpeed = 1;
	var distanceToPickup = 0.5;
	var ammoPerPickup = 12;

	// Bob the weapon using a sine wave.

	var baseY = -0.25;
	var magnitude = 0.05;
	var speed = 1;

	for (var i = 0; i < pickups.length; i++) {

		var pickup = pickups[i];

		// Spin the pickup.

		pickup.rotation.y += pickupRotationSpeed * delta;
		pickup.position.y = baseY + Math.sin(clock.getElapsedTime() * speed) * magnitude;

		// Check distance between pickup and player, for picking up.

		var a = player.getObject().position;
		var b = pickup.position;

		var distance = a.distanceTo( b );

		// The player is close enough, pick it up.

		if (distance <= distanceToPickup) {

			sceneGame.remove( pickup );
			pickups.splice( i, 1 );

			weapon.addAmmo( ammoPerPickup );

			var sound2 = new Sound([ 'data/sounds/pickup_ammo.wav' ], 64, 1);
			sound2.position.copy( player.getObject().position );
			sound2.play();

		}

	}

}

function updateWeapon () {

	if (spriteWeapon == undefined) {
		return;
	}

	updateWeaponBobbing();
		lightWeapon.intensity = 0;

	if (weapon.isFiring()) {
		spriteWeapon.material.map = weaponSprites[1];
		lightWeapon.intensity = 2;

		return;
	} else {
		spriteWeapon.material.map = weaponSprites[0];
	}

	if (weapon.isReloading()) {

		reloadTimeElapsed += 1.0 * delta;

		if (reloadTimeElapsed >= reloadTime) {

			spriteWeapon.material.map = weaponSprites[0];

			reloadTimeElapsed = 0;

			weapon.setReload( false );

		} else {

			spriteWeapon.material.map = weaponSprites[2];

		}
	}

}

function updateWeaponBobbing () {

	var speed = 6;
	var magnitude = 8;

	// Bob the weapon up and down.

	spriteWeapon.position.y = baseY + Math.sin(clock.getElapsedTime() * speed) * magnitude;

	// When the player moves, sway the weapon left and right.

	if (player.Velocity() >= 0.0005 || player.Velocity() <= -0.0005) {

		spriteWeapon.position.x = baseX + Math.sin(clock.getElapsedTime() * (speed / 2)) * (magnitude * 2);

	}

}

function updateBullets () {

	for (var i = bullets.length - 1; i >= 0; i--) {

		var bullet = bullets[i];

		var bulletSpeed = 8;

		bullet.translateX(bulletSpeed * bullet.ray.direction.x * delta);
		bullet.translateY(bulletSpeed * bullet.ray.direction.y * delta);
		bullet.translateZ(bulletSpeed * bullet.ray.direction.z * delta);

	}

}


function createBullet () {

	if (weapon == undefined) {
		return;
	}

	if (!weapon.CanFire()) {
		return;
	}

	if (weapon.isFiring() || weapon.isReloading())
	{
		return;
	}

	weapon.fire();

	obj = player.getObject();

	lightWeapon.position.copy( obj.position );

	var sound2 = new Sound([ 'data/sounds/shotgun_fire.wav' ], 64, 1);
	sound2.position.copy( obj.position );
	sound2.play();

	var sphere = new THREE.Mesh( sphereGeo );
	sphere.position.set( obj.position.x, obj.position.y, obj.position.z );

	var obstacles, collisions;

	var vector = new THREE.Vector3( 0, 0, -1 );
	vector.applyEuler(obj.rotation, obj.order);

	var rayCam = new THREE.Ray( obj.position, vector );

	var rayCaster = new THREE.Raycaster(rayCam.origin, rayCam.direction);
	sphere.ray = rayCaster.ray;

	obstacles = walls;

	collisions = rayCaster.intersectObjects(obstacles);

	var distance = 0.15;

	var intersects = rayCaster.intersectObjects( walls );

	if (intersects.length > 0)
	{
		for (var i = 0; i < intersects.length; i++)
		{
			var collision = intersects[0];

			var hitSphere = new THREE.Mesh( sphereGeo );
			hitSphere.position.set(collision.point.x, collision.point.y, collision.point.z);

		//	console.log(collision);

			sceneGame.add(hitSphere);

			break;
		}
	}

	var enemyHits = rayCaster.intersectObjects( enemies );

	if (enemyHits.length > 0)
	{
		for (var i = 0; i < enemyHits.length; i++)
		{
			var collision = enemyHits[0];

			console.log( collision );

			sceneGame.remove( collision.object );
			//enemies.splice( i, 1 );

			break;
		}
	}


	sphere.owner = obj;

	//bullets.push(sphere);

	//sceneGame.add(sphere);

	return sphere;

}