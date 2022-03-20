from django.views.decorators.http import require_safe, require_POST
from django.http import HttpResponseBadRequest
from django.shortcuts import render, redirect

from django.conf import settings

from .models import TypeOfHelp, HelpGiver

@require_safe
def homepage(request):
	return render(
		request,
		'pages/homepage.html'
	)

@require_safe
def get_or_give(request, category):

	category = category.lower()

	if category not in settings.CATEGORIES:
		return HttpResponseBadRequest()

	return render(
		request,
		'pages/choose-help.html',
		{
			'category': category
		}
	)

@require_safe
def handle_help(request, category, help_type, **kwargs):
	category = category.lower()
	help_type = help_type.lower()

	if category not in settings.CATEGORIES or help_type not in settings.TYPE_OF_HELP:
		return HttpResponseBadRequest()

	map_style = None
	mapbox_token = None
	subcategories = []
	if help_type == settings.GET_HELP:
		map_style = settings.MAPSTYLE_BY_CATEGORY[category]
		mapbox_token = settings.MAPBOX_TOKEN
	else:
		subcategories = TypeOfHelp.objects.filter(category=category)
	
	is_form_issued = 0
	has_form_errors = 0
	if 'is_form_issued' in request.session:
		is_form_issued = request.session['is_form_issued']
	if 'has_form_errors' in request.session:
		has_form_errors = request.session['has_form_errors']

	request.session['is_form_issued'] = 0
	request.session['has_form_errors'] = 0

	template = 'pages/%s-help.html' % help_type

	return render(
		request,
		template,
		{
			'category': category,

			# Get help context
			'map_style': map_style,
			'MAPBOX_TOKEN': mapbox_token,

			# Give help context
			'subcategories': subcategories,
			'is_form_issued': 1 if is_form_issued else 0,
			'has_form_errors': 1 if has_form_errors else 0
		}
	)

@require_POST
def give_help(request):
	name = request.POST.get('user-name', None)
	surname = request.POST.get('user-surname', None)
	email = request.POST.get('user-email', None)
	phone = request.POST.get('user-phone', None)
	state = request.POST.get('user-state', None)
	province = request.POST.get('user-province', None)
	address = request.POST.get('user-address', None)
	category = request.POST.get('user-category', None)
	subcategory = request.POST.get('user-subcategory', None)

	request.session['is_form_issued'] = True
	request.session['has_form_errors'] = False

	if (
		not (name and surname and email and phone and state and province and address and category and subcategory)
		and category not in settings.CATEGORIES
	):
		request.session['has_form_errors'] = True

	subcategory = TypeOfHelp.objects.get(subcategory=subcategory)

	if not subcategory.category == category:
		request.session['has_form_errors'] = True
	
	if not request.session['has_form_errors']:
		try:
			HelpGiver.objects.create(
				name = name,
				surname = surname,
				email = email,
				phone_number = phone,
				type_of_help = subcategory,
				state = state,
				province = province,
				address = address,
				is_verified = False
			)
		except Exception:
			request.session['has_form_errors'] = True

	return redirect(
		'handle_help',
		category = category,
		help_type = 'give'
	)