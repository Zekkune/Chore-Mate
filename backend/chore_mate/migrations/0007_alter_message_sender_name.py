# Generated by Django 5.0.4 on 2024-04-03 22:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chore_mate', '0006_alter_message_sender_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='sender_name',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
