# Generated by Django 5.0.4 on 2024-04-14 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chore_mate', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='toes',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]