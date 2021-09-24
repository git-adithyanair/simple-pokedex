from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from pokedex.api.serializers import RegistrationSerializer

import requests

POKEMON_PAGINATION_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=24&offset={}'
POKEMON_GET_ALL_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0'
POKEMON_GET_SINGLE_API_URL = 'https://pokeapi.co/api/v2/pokemon/{}'

@api_view(["POST"])
def registration_view(request):
    if request.method == "POST":
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            user = serializer.save()
            data['response'] = 'Successfully registered new user.'
            data['email'] = user.email
            token = Token.objects.get(user=user).key
            data['token'] = token
        else:
            data = serializer.errors
        return Response(data)
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def paginate_pokemon_view(request):
    
    # pokemon_page = requests.get(POKEMON_PAGINATION_API_URL.format(request.GET['offset']))
    if request.GET['offset'] == '0':
        url = 'https://pokeapi.co/api/v2/pokemon?limit=24&offset=0'
        offset = 0
    else:
        # url = request.GET['url']
        offset = int(request.GET['offset'])
        url = 'https://pokeapi.co/api/v2/pokemon?limit=24&offset=' + str(offset)
        
    pokemon_page = requests.get(url)
    
    data_to_send = {}
    data_to_send['results'] = []
    data_to_send['url'] = pokemon_page.json()['next']
    data_to_send['offset'] = offset + 24

    user_fav_pokemon = request.user.get_pokemon()
    
    for pokemon in pokemon_page.json()['results']:
        single_pokemon = requests.get(pokemon['url'])
        pokemon_details = single_pokemon.json()
        data_to_send['results'].append({
            'name': pokemon['name'],
            'pictureUri': pokemon_details['sprites']['front_default'],
            'height': pokemon_details['height'],
            'baseExperience': pokemon_details['base_experience'],
            'weight': pokemon_details['weight'], 
            'isFav': str(pokemon_details['id']) in user_fav_pokemon,
            'id': pokemon_details['id']
        })
        
    return Response(data_to_send)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_fav(request):
    
    user = request.user
    user_fav_pokemon = request.user.get_pokemon()
    
    is_fav = None
    
    if request.data['pokemonId'] in user_fav_pokemon:
        user.remove_pokemon(request.data['pokemonId'])
        user.save()
        is_fav = False
    else:
        user.add_pokemon(request.data['pokemonId'])
        user.save()
        is_fav = True
    
    return Response({'isFav': is_fav})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def search(request):
    
    all_pokemon = requests.get(POKEMON_GET_ALL_API_URL)
    user_fav_pokemon = request.user.get_pokemon()
    
    data_to_send = {}
    data_to_send['results'] = []
    
    for pokemon in all_pokemon.json()['results']:
        if request.GET['lookup'] in pokemon['name']:
            single_pokemon = requests.get(pokemon['url'])
            pokemon_details = single_pokemon.json()
            data_to_send['results'].append({
                'name': pokemon['name'],
                'pictureUri': pokemon_details['sprites']['front_default'],
                'height': pokemon_details['height'],
                'baseExperience': pokemon_details['base_experience'],
                'weight': pokemon_details['weight'], 
                'isFav': str(pokemon_details['id']) in user_fav_pokemon,
                'id': pokemon_details['id']
            })
            
    return Response(data_to_send)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_fav(request):
    
    user_fav_pokemon = request.user.get_pokemon()
    
    data_to_send = {}
    data_to_send['results'] = []
    
    for pokemon_id in user_fav_pokemon:
        single_pokemon = requests.get(POKEMON_GET_SINGLE_API_URL.format(pokemon_id))
        pokemon_details = single_pokemon.json()
        data_to_send['results'].append({
            'name': pokemon_details['name'],
            'pictureUri': pokemon_details['sprites']['front_default'],
            'height': pokemon_details['height'],
            'baseExperience': pokemon_details['base_experience'],
            'weight': pokemon_details['weight'], 
            'isFav': str(pokemon_details['id']) in user_fav_pokemon,
            'id': pokemon_details['id']
        })
   
    return Response(data_to_send)
