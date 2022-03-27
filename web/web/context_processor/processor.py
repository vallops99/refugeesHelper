from django.conf import settings

def analytics(request):
	print(settings.ANALYTICS_ID)
	return {
		'ANALYTICS_ID': settings.ANALYTICS_ID
	}