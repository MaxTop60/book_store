# Generated by Django 5.1.7 on 2025-03-13 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0002_alter_book_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='img',
            field=models.ImageField(upload_to='images/'),
        ),
    ]
