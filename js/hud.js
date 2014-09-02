HUD = function () {

	var labelHealth;
	var labelAmmo;

	this.labelAmmo = function ( element ) {

		labelHealth = element;

	};

	this.initialize = function () {

		labelHealth = createLabel( labelHealth, 32 );
		labelAmmo = createLabel( labelAmmo, 128 );

		this.setHealth( 100 );
		this.setAmmo( 0 );

	};

	var createLabel = function ( element, offsetX ) {

		element = document.createElement('div');
		element.style.position = 'fixed';
		element.style.width = 200;
		element.style.height = 200;
		element.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
		element.style.color = "rgba(255, 255, 255, 0.75)";
		element.style.fontSize = "32px";
		element.style.padding = "8px";
		element.innerHTML = "0";
		element.style.bottom = 32 + 'px';
		element.style.right = offsetX + 'px';
		document.body.appendChild(element);

		return element;

	};

	this.setLabel = function ( label, text ) {

		label.innerHTML = text;

	};

	this.setHealth = function ( amount ) {

		this.setLabel( labelHealth, amount );

	};

	this.setAmmo = function ( amount ) {

		this.setLabel( labelAmmo, amount );

	};

};