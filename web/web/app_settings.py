import os

CATEGORIES = [
	'food',
	'house',
	'health'
]

TYPE_OF_HELP = [
	'get',
	'give'
]

MAPBOX_TOKEN = os.getenv('MAPBOX_TOKEN', None)

MAPSTYLE_BY_CATEGORY = {
	'food': 'mapbox://styles/vfarrotti/cl0dlp9d1002o14ta47a6sia5',
	'house': 'mapbox://styles/mapbox/navigation-night-v1', # This is default map
	'health': 'mapbox://styles/vfarrotti/cl0dmg2w6000314pm77jn94xr'
}