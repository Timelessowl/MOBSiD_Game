# Generated by Django 4.2.6 on 2024-04-23 14:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_testmodel'),
    ]

    operations = [
        migrations.AddField(
            model_name='questionmodel',
            name='test_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.testmodel'),
        ),
    ]
