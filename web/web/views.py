from django.views.decorators.http import require_http_methods
from django.shortcuts import render
from django.http import HttpResponseBadRequest
from django.conf import settings

@require_http_methods(["GET"])
def homepage(request):
	return render(
		request,
		'pages/homepage.html'
	)

@require_http_methods(["GET"])
def get_or_give(request, category):

	category = category.lower()

	if category not in settings.CATEGORIES:
		return HttpResponseBadRequest()

	return render(
		request,
		'pages/choose_help.html',
		{
			'category': category
		}
	)

@require_http_methods(["GET"])
def handle_help(request, category, help_type):

	category = category.lower()
	help_type = help_type.lower()

	if category not in settings.CATEGORIES or help_type not in settings.TYPE_OF_HELP:
		return HttpResponseBadRequest()

	template = 'pages/%s-help.html' % help_type

	return render(
		request,
		template,
		{
			category: category
		}
	)