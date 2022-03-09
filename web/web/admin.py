from django.contrib import admin
from .models import TypeOfHelp, HelpGiver

@admin.register(TypeOfHelp)
class TypeOfHelpAdmin(admin.ModelAdmin):
	pass


@admin.register(HelpGiver)
class HelpGiverAdmin(admin.ModelAdmin):
	list_display = ['is_verified', '__str__', 'type_of_help']
	list_filter = ['type_of_help', 'is_verified']
