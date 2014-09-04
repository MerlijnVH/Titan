<!DOCTYPE html>
<html lang="en">

<head>

	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="author" content="Merlijn Van Holder">

	<title>Titan - WebGL</title>

	<link rel="stylesheet" href="css/style.css" />

	<style>
		html, body {
			width: 100%;
			height: 100%;
		}

		body {
			background-color: #ffffff;
			margin: 0;
			overflow: hidden;
			font-family: arial;
		}

		#blocker {

			position: absolute;

			width: 100%;
			height: 100%;

			background-color: rgba(0,0,0,0.5);

		}

		#instructions {

			width: 100%;
			height: 100%;

			display: -webkit-box;
			display: -moz-box;
			display: box;

			-webkit-box-orient: horizontal;
			-moz-box-orient: horizontal;
			box-orient: horizontal;

			-webkit-box-pack: center;
			-moz-box-pack: center;
			box-pack: center;

			-webkit-box-align: center;
			-moz-box-align: center;
			box-align: center;

			color: #ffffff;
			text-align: center;

			cursor: pointer;

		}

	</style>

</head>

<body>

	<div id="blocker">

		<div id="instructions">
			<span style="font-size: 40px">Click to play</span>

			<br />

			<p>(W, A, S, D = Move, MOUSE = Look around)</p>
		</div>

	</div>

	<!-- Library - Three.js -->
	<script src="js/three/three.js"></script>
	<script src="js/three/libs/stats.min.js"></script>
	<script src="js/three/core/Raycaster.js"></script>
	<script src="js/three/misc/Detector.js"></script>
	<script src="js/three/loaders/JSONLoader.js"></script>
	<script src="js/three/loaders/ObjectLoader.js"></script>
	<script src="js/three/loaders/ColladaLoader.js"></script>
	
	<!-- Library - Cannon.js -->
	<script src="js/cannon/cannon.min.js"></script>
	<script src="js/cannon/PointerLockControls.js"></script>

	<!-- Titan by Merlijn Van Holder -->
	<script src="js/hud.js"></script>
	
	<script src="js/player.js"></script>
	<script src="js/weapon.js"></script>

	<script src="js/main.js"></script>

</body>

</html>