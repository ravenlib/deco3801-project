# Generated by Django 2.1 on 2018-10-02 05:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('systemsdb', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chrom_time',
            old_name='over_temp',
            new_name='oven_temp',
        ),
    ]
