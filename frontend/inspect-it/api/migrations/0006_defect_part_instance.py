# Generated by Django 4.0.6 on 2022-08-04 19:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_defect_partinstance_operator_partinstance_stage_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='defect',
            name='part_instance',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='part_instance', to='api.partinstance'),
        ),
    ]
