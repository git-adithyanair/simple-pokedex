from django.urls import path
from pokedex.api.views import registration_view, paginate_pokemon_view, add_fav, search, get_fav
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'pokedex'

urlpatterns = [
    path('register', registration_view, name='register'),
    path('login', obtain_auth_token, name='login'),
    path('paginate_pokemon', paginate_pokemon_view, name='paginate_pokemon'),
    path('add_fav', add_fav, name='add_fav'),
    path('search', search, name='search'),
    path('get_fav', get_fav, name='get_fav')
]