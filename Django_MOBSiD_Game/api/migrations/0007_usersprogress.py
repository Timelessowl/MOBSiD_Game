# Generated by Django 4.2.6 on 2024-04-06 09:53

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_rename_question_text_questionmodel_text'),
    ]

    operations = [
        migrations.CreateModel(
            name='UsersProgress',
            fields=[
                ('user_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('position', models.IntegerField(default=0)),
                ('progress', models.JSONField()),
            ],
        ),
    ]
