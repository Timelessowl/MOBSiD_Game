# Generated by Django 4.2.6 on 2024-05-10 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_rename_background_appuser_avatar'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='activeTestId',
            field=models.IntegerField(blank=True, default=1, null=True),
        ),
    ]
