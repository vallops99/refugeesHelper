# Generated by Django 4.0.3 on 2022-03-13 17:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='helpgiver',
            name='province',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='helpgiver',
            name='state',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='helpgiver',
            name='address',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='helpgiver',
            name='name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='helpgiver',
            name='surname',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
