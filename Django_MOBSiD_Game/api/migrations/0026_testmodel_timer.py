# Generated by Django 4.2.6 on 2024-05-11 17:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0025_questionmodel_timer_alter_appuser_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='testmodel',
            name='timer',
            field=models.TimeField(default='00:10:00'),
        ),
    ]
