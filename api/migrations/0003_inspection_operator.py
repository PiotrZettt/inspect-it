# Generated by Django 4.0.6 on 2022-08-02 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_part_options_remove_part_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='inspection',
            name='operator',
            field=models.CharField(max_length=200, null=True),
        ),
    ]