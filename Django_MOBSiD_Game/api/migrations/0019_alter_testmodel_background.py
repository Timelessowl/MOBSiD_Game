# Generated by Django 4.2.6 on 2024-04-26 09:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_rename_test_id_testmodel_testid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='testmodel',
            name='background',
            field=models.ImageField(upload_to='uploads'),
        ),
    ]
