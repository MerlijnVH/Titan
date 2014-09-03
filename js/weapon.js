Weapon = function () {

	var _hud;

	var ammoCurrent = 10;
	var ammoMax = 100;

	var ammoClip = 0;
	var ammoClipMax = 2;

	var fireTime = 0.075;
	var fireTimeElapsed = 0; 

	var isFire = false;
	var isReload = false;

	this.isFiring = function () {

		return isFire;

	};

	this.isReloading = function () {

		return isReload;

	};

	this.setReload = function ( bool ) {

		isReload = bool;

	};

	this.initialize = function ( hud ) {

		ammoClip = ammoClipMax;

		_hud = hud;

	};

	this.update = function ( delta ) {

		_hud.setAmmo( ammoCurrent );

		if (isFire) {
			fireTimeElapsed += 1.0 * delta;

			if (fireTimeElapsed >= fireTime) {

				fireTimeElapsed = 0;

				isFire = false;
			}
		}

	};

	this.fire = function () {

		// If there is ammo in the clip, remove a bullet and fire it.

		if (ammoClip > 0) {

			isFire = true;

			ammoClip--;

		}

		// Reload the weapon if it's empty.

		if (ammoClip <= 0) {

			reload();

		}

	};

	this.addAmmo = function ( amount ) {

		for (var i = 0; i < amount; i++) {

			if (ammoCurrent >= ammoMax) {
				break;
			}

			ammoCurrent++;

		}

		// Reload the weapon if it's empty.

		if (ammoClip <= 0) {

			reload();

		}

	};

	var reload = function () {

		console.log( 'reloading' );

		// If the clip is empty, attempt to reload the clip.
		// Don't bother if we have no ammo left.

		if (ammoCurrent <= 0) {
			return;
		}

		isReload = true;

		if (ammoClip <= 0) {

			for (var i = 0; i < ammoClipMax; i++) {

				// Stop if we've no ammo left.

				if (ammoCurrent <= 0) {
					break;
				}

				// Remove a bullet and put it in the clip.

				ammoCurrent--;
				ammoClip++;

			}

		}

	};

};