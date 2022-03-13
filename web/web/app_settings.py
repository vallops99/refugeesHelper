import os

GET_HELP = 'get'
GIVE_HELP = 'give'

CATEGORIES = [
	'food',
	'house',
	'health'
]

CHOICES_CATEGORIES = [
	('food', 'Food'),
	('house', 'House'),
	('health', 'Health')
]

TYPE_OF_HELP = [
	GET_HELP,
	GIVE_HELP
]

MAPBOX_TOKEN = os.getenv('MAPBOX_TOKEN', None)

MAPSTYLE_BY_CATEGORY = {
	'food': 'mapbox://styles/vfarrotti/cl0dlp9d1002o14ta47a6sia5',
	'house': 'mapbox://styles/vfarrotti/cl0dxz6yc002714koas5d74m0',
	'health': 'mapbox://styles/vfarrotti/cl0dmg2w6000314pm77jn94xr'
}