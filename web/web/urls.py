"""web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import (
    homepage,
    get_or_give,
    handle_help,
    give_help
)

urlpatterns = [
    path('f3sa0l/', admin.site.urls),
    path('', homepage, name = 'homepage'),
    path('journey/<str:category>', get_or_give, name = 'get-or-give'),
    path('journey/<str:category>/<str:help_type>', handle_help, name = 'handle_help'),

    # POST
    path('give-help', give_help, name = 'give-help')
]
