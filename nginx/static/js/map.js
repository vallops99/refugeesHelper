"use strict";

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
// Constant that let us understand when the user is exploring and we must stop
// following is geo position.
const minConsideredMovement = 130;


// Mapbox custom button used to let the user re-center the map with its position.
class MapboxButtonControl {
	constructor({
		className = '',
		icon = '',
		params = [],
		eventHandler = () => {}
	}) {
		this._className = className;
		this._icon = icon;
		this._params = params;
		this._eventHandler = eventHandler;
	}

	onAdd(map) {
		this._btn = document.createElement('button');
		this._btn.className = 'mapboxgl-ctrl-icon ' + this._className;
		this._btn.type = 'button';
		this._btn.onclick = (sender) => {
			this._eventHandler(map, ...this._params);
		}

		if (this._icon) {
			this._iEl = document.createElement('i');
			this._iEl.className = this._icon;
			this._btn.appendChild(this._iEl);
		}

		this._container = document.createElement('div');
		this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl';
		this._container.appendChild(this._btn);

		return this._container;
	}

	onRemove() {
		this._container.parentNode.removeChild(this._container);
    	this._map = undefined;
	}
}

// The styles are quick custom styles created on Mapbox Studio, they are 3
// Food, Health, House.
function createMap() {
	return new mapboxgl.Map({
	  container: 'map',
	  style: mapboxgl.customMapStyle,
	  center: [10, 57],
	  zoom: 3.3,
	  scrollZoom: false,
	  attributionControl: false
	})
	.addControl(
	  new mapboxgl.NavigationControl({
		showCompass: false
	  })
	).addControl(
		new MapboxButtonControl({
			className: 'refugeesHelper-center-location',
			icon: 'fas fa-location-arrow',
			params: [true],
			eventHandler: startFollowingUser
		})
	).addControl(
		new mapboxgl.FullscreenControl(),
		'bottom-right'
	).on(
		'click',
		onMapClick
	).on(
		'drag',
		(event) => stopFollowingUser(event.target)
	).on('load', (event) => {
		startFollowingUser(event.target, true);
		event.target.off('load')
	});
}
 
function setUserPositionOnMap(map, newCoords, force = false) {
	const constantId = 'user-marker-id';

	map.lastUserCoords = newCoords;

	let el = document.getElementById(constantId);

	if (!el) {
		el = document.createElement('div');
		el.className = 'user-marker';
		el.id = constantId;
	}

	new mapboxgl.Marker(el).setLngLat(
		newCoords
	).addTo(map);

	// [TODO] Use this function only when the movement from last flyTo
	// is bigger enough to create a real needing.
	// Possible solution:
	// ((module of (this.centerLong - nowLong) + module of (this.centerLat - nowLat)) > 1)
	let zoom =  map.getZoom();
	if (!map.userAlreadyFlew) {
		zoom = 15;
		map.userAlreadyFlew = true;
	}

	const coefficientOfMovement = calcScalarMovement(map);

	if (coefficientOfMovement > minConsideredMovement || force) {
		map.flyTo({
			center: newCoords,
			zoom: zoom
		});
	}
}

// Returns a number that describes how much the user moved around the map
// This is used to avoid firing the flyTo function or to keep tracing the
// user movements if it moved the map of few pixels.
function calcScalarMovement(map) {
	const currentPosition = map.getCenter();

	// Coefficient is 2 power current zoom;
	const coeff = 2**map.getZoom();

	let longDiff = currentPosition.lng * coeff - parseFloat(map.lastUserCoords[0]) * coeff;
	longDiff = (longDiff < 0) ? longDiff * -1 : longDiff;

	let latsDiff = currentPosition.lat * coeff - parseFloat(map.lastUserCoords[1]) * coeff;
	latsDiff = (latsDiff < 0) ? latsDiff * -1 : latsDiff;

	return longDiff + latsDiff;
}

function startFollowingUser(map, forceFly = false) {
	if (!map) return;

	let userLongitude = window.sessionStorage.getItem('last-user-longitude');
	let userLatitude = window.sessionStorage.getItem('last-user-latitude');
	if (userLongitude && userLatitude) {
		setUserPositionOnMap(
			map,
			[
				userLongitude,
				userLatitude
			],
			forceFly
		);
	}

	const options = {
		enableHighAccuracy: false,
		timeout: 5000,
		maximumAge: 0
	};

	map.followingIdHandler = navigator.geolocation.watchPosition((position) => {
		if (!('coords' in position)) return;

		window.sessionStorage.setItem(
			'last-user-longitude',
			position.coords.longitude
		);

		window.sessionStorage.setItem(
			'last-user-latitude',
			position.coords.latitude
		);
		
		setUserPositionOnMap(
			map,
			[
				position.coords.longitude,
				position.coords.latitude
			]
		);
	}, (error) => console.log(error), options);
}

function stopFollowingUser(map) {
	if (!map.followingIdHandler) return;
	if (calcScalarMovement(map) < minConsideredMovement) return;

	navigator.geolocation.clearWatch(map.followingIdHandler);

	map.followingIdHandler = null;
}

function onMapClick(event) {
	const map = event.target;
	let poi = map.queryRenderedFeatures(event.point).filter(
		val => val.sourceLayer === "poi_label"
	);

	if (poi.length < 1) return;
	poi = poi[0];

	new mapboxgl.Popup(
		{ offset: [0, -15] }
	).setLngLat(
		event.lngLat
	).setHTML(
		`<h3 class="text-center">${poi.properties.type}</h3><p class="text-center">${poi.properties.name}</p><a href="http://www.google.com/maps/place/${event.lngLat.lat},${event.lngLat.lng}" target="_blank"><button class="btn btn-primary" type="button">Get route on google Maps</button></a>`
	).addTo(map);
}

(function() {
	createMap();
})();
