# Generated by Django 3.2.7 on 2021-09-21 23:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokedex', '0011_auto_20210921_2307'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='favorite_pokemon_ids',
            field=models.TextField(default='[]', null=True),
        ),
    ]
