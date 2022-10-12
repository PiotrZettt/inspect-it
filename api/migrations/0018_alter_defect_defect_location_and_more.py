# Generated by Django 4.0.6 on 2022-08-21 22:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_defect_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='defect',
            name='defect_location',
            field=models.JSONField(max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='defect',
            name='defect_name',
            field=models.CharField(default='', max_length=200),
        ),
    ]
