# Generated by Django 4.0.6 on 2022-09-03 06:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_alter_partinstance_serial_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='partinstance',
            name='passed',
            field=models.BooleanField(default=True),
        ),
    ]
