# Generated by Django 4.2.6 on 2024-04-18 18:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_questionmodel_withoptions'),
    ]

    operations = [
        migrations.RenameField(
            model_name='questionmodel',
            old_name='op1',
            new_name='opt1',
        ),
        migrations.RenameField(
            model_name='questionmodel',
            old_name='op2',
            new_name='opt2',
        ),
        migrations.RenameField(
            model_name='questionmodel',
            old_name='op3',
            new_name='opt3',
        ),
        migrations.RenameField(
            model_name='questionmodel',
            old_name='op4',
            new_name='opt4',
        ),
        migrations.RenameField(
            model_name='questionmodel',
            old_name='op5',
            new_name='opt5',
        ),
    ]
