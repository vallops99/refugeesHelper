"use strict";

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

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
	);
}

(function() {
	const map = createMap();
	const geo = navigator.geolocation;
	geo.getCurrentPosition((position) => {
		if ('coords' in position) {
			const userLongLat = [position.coords.longitude, position.coords.latitude];
			const el = document.createElement('div');
			el.className = 'user-marker';

			new mapboxgl.Marker(el).setLngLat(
				userLongLat
			).addTo(map);

			map.flyTo({
				center: userLongLat,
				zoom: 14
			});
		}
	});
})();
