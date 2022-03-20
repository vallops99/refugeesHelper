# Generated by Django 4.0.3 on 2022-03-07 23:00

from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TypeOfHelp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(choices=[('food', 'Food'), ('house', 'House'), ('health', 'Health')], default='food', max_length=6)),
                ('subcategory', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='HelpGiver',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('surname', models.CharField(blank=True, max_length=100, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, null=True, region=None)),
                ('address', models.CharField(blank=True, max_length=500, null=True)),
                ('is_verified', models.BooleanField(default=False)),
                ('type_of_help', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='help_givers', to='web.typeofhelp')),
            ],
        ),
    ]