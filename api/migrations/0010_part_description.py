# Generated by Django 4.0.6 on 2022-08-07 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_part_img_reference'),
    ]

    operations = [
        migrations.AddField(
            model_name='part',
            name='description',
            field=models.CharField(default='', max_length=200),
        ),
    ]
