# Generated by Django 5.0.4 on 2024-04-14 18:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chore_mate', '0002_person_toes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='person',
            name='toes',
        ),
    ]