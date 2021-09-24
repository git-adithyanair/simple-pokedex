from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
import json


class UserManager(BaseUserManager):
    
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractUser):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True, error_messages={'email': ' a valid email address.'})
    username = models.CharField(max_length=60)
    favorite_pokemon_ids = models.TextField(null=True, default=json.dumps([]))
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = UserManager()

    def add_pokemon(self, pokemon_id):
        json_decoder = json.decoder.JSONDecoder()
        curr_favorite_pokemon_ids = json_decoder.decode(self.favorite_pokemon_ids)
        curr_favorite_pokemon_ids.append(pokemon_id)
        self.favorite_pokemon_ids = json.dumps(curr_favorite_pokemon_ids)
        
    def remove_pokemon(self, pokemon_id):
        json_decoder = json.decoder.JSONDecoder()
        curr_favorite_pokemon_ids = json_decoder.decode(self.favorite_pokemon_ids)
        curr_favorite_pokemon_ids.remove(pokemon_id)
        self.favorite_pokemon_ids = json.dumps(curr_favorite_pokemon_ids)
        
    def get_pokemon(self):
        json_decoder = json.decoder.JSONDecoder()
        return json_decoder.decode(self.favorite_pokemon_ids)
    
    def __str__(self):
        return self.email
    
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)