"use strict";

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

class MapboxButtonControl {
	constructor({
		className = '',
		title = '',
		icon = '',
		eventHandler = () => {}
	}) {
		this._className = className;
		this._title = title;
		this._icon = icon;
		this._eventHandler = eventHandler;
	}

	onAdd(map) {
		this._btn = document.createElement('button');
		this._btn.className = 'mapboxgl-ctrl-icon ' + this._className;
		this._btn.type = 'button';
		this._btn.title = this._title;
		this._btn.onclick = (sender) => {
			this._eventHandler(map);
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
	const map = new mapboxgl.Map({
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
			title: 'Recenter with your location',
			icon: 'fas fa-location-arrow',
			eventHandler: startFollowingUser
		})
	);

	map.on('drag', stopFollowingUser);

	return map;
}

function setUserPositionOnMap(map, userLongLat) {
	const constantId = 'user-marker-id';

	let el = document.getElementById(constantId);

	if (!el) {
		el = document.createElement('div');
		el.className = 'user-marker';
		el.id = constantId;
	}

	new mapboxgl.Marker(el).setLngLat(
		userLongLat
	).addTo(map);

	// [TODO] Use this function only when the movement from last flyTo
	// is bigger enough to create a real needing.
	// Possible solution:
	// ((module of (this.centerLong - nowLong) + module of (this.centerLat - nowLat)) > 1)
	let zoom =  map.getZoom();
	if (!map.refugeesAlreadyFlew) {
		zoom = 15;
		map.refugeesAlreadyFlew = true;
	}

	map.flyTo({
		center: userLongLat,
		zoom: zoom
	});
}

function startFollowingUser(map) {
	if (!map) return;

	let userLongitude = window.sessionStorage.getItem('last-user-longitude');
	let userLatitude = window.sessionStorage.getItem('last-user-latitude');
	if (userLongitude && userLatitude) {
		setUserPositionOnMap(
			map,
			[
				userLongitude,
				userLatitude
			]
		);
	}

	const options = {
		enableHighAccuracy: false,
		timeout: 5000,
		maximumAge: 0
	};

	window.followingIdHandler = navigator.geolocation.watchPosition((position) => {
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

function stopFollowingUser() {
	if (!window.followingIdHandler) return;

	navigator.geolocation.clearWatch(window.followingIdHandler);

	window.followingIdHandler = null;
}

(function() {
	const map = createMap();

	startFollowingUser(map);
})();
