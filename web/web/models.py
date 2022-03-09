from typing import Type
from django.db import models
from django.conf import settings
from phonenumber_field.modelfields import PhoneNumberField

class TypeOfHelp(models.Model):
	category = models.CharField(choices = settings.CHOICES_CATEGORIES, default = 'food', max_length = 6)

	subcategory = models.CharField(max_length = 50, null = True, blank = True)

	def __str__(self):
		return '%s-%s' % (self.category, self.subcategory)


class HelpGiver(models.Model):
	name = models.CharField(max_length = 100, null = True, blank = True)
	surname = models.CharField(max_length = 100, null = True, blank = True)

	email = models.EmailField(null = True, blank = True)
	phone_number = PhoneNumberField(null = True, blank = True)

	type_of_help = models.ForeignKey(TypeOfHelp, on_delete = models.CASCADE, related_name = 'help_givers')

	address = models.CharField(max_length = 500, null = True, blank = True)

	is_verified = models.BooleanField(default = False)

	def __str__(self):
		return '%s %s' % (self.name, self.surname)