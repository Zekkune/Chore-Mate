# Generated by Django 5.0.4 on 2024-04-03 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chore_mate', '0003_alter_chore_chore_icon_alter_person_profile_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='sender_name',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]