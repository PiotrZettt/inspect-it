# Generated by Django 4.0.6 on 2022-08-04 19:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_defect_part_instance'),
    ]

    operations = [
        migrations.AlterField(
            model_name='defect',
            name='part_instance',
            field=models.ForeignKey(default='00-0000000', on_delete=django.db.models.deletion.CASCADE, related_name='part_instance', to='api.partinstance'),
        ),
    ]
