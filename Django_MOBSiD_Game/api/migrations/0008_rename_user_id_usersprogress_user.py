# Generated by Django 4.2.6 on 2024-04-06 09:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_usersprogress'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usersprogress',
            old_name='user_id',
            new_name='user',
        ),
    ]