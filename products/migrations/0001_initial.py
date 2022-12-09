# Generated by Django 3.2.13 on 2022-12-09 04:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import imagekit.models.fields
import multiselectfield.db.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=80)),
                ('price', models.BigIntegerField()),
                ('productType', models.CharField(choices=[('사용감 있음', '사용감 있음'), ('거의 새 것', '거의 새 것'), ('미개봉', '미개봉')], max_length=20, null=True)),
                ('tradeType', multiselectfield.db.fields.MultiSelectField(choices=[('직거래', '직거래'), ('택배거래', '택배거래')], max_length=10)),
                ('location', models.CharField(blank=True, max_length=80)),
                ('image', imagekit.models.fields.ProcessedImageField(default='default.jpg', upload_to='images/product')),
                ('content', models.TextField()),
                ('contentStripTag', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_updated', models.BooleanField(default=False)),
                ('hits', models.PositiveBigIntegerField(default=0, verbose_name='조회수')),
                ('like_users', models.ManyToManyField(related_name='like_product', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Product_Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=80)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='reply_set', to='products.product_comment')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
