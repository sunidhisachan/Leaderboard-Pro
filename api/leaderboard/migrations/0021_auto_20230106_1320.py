# Generated by Django 3.2.4 on 2023-01-06 13:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leaderboard', '0020_auto_20230106_1006'),
    ]

    operations = [
        migrations.AddField(
            model_name='usernames',
            name='lt_uname',
            field=models.CharField(default='', max_length=64),
        ),
        migrations.AddField(
            model_name='usernames',
            name='ol_uname',
            field=models.CharField(default='', max_length=64),
        ),
    ]
