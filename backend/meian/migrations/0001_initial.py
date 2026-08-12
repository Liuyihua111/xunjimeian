from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Project",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("year", models.PositiveIntegerField(unique=True)),
                ("title", models.CharField(max_length=160)),
                ("summary", models.TextField()),
                ("directions", models.JSONField(blank=True, default=list)),
                ("cities", models.JSONField(blank=True, default=list)),
                ("outputs", models.JSONField(blank=True, default=list)),
                ("images", models.JSONField(blank=True, default=list)),
                ("links", models.JSONField(blank=True, default=list)),
                ("reusable_assets", models.TextField(blank=True)),
            ],
            options={"ordering": ["year"]},
        ),
        migrations.CreateModel(
            name="Source",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=120)),
                ("person", models.CharField(blank=True, max_length=80)),
                ("topic", models.CharField(blank=True, max_length=80)),
                ("period", models.CharField(blank=True, max_length=80)),
                ("location", models.CharField(blank=True, max_length=80)),
                ("content", models.TextField()),
                ("source_name", models.CharField(max_length=160)),
                ("source_url", models.URLField(blank=True)),
                ("tags", models.JSONField(blank=True, default=list)),
                ("usable_for_qa", models.BooleanField(default=True)),
                ("note", models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name="Tag",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("tag", models.CharField(max_length=64, unique=True)),
                ("category", models.CharField(max_length=64)),
                ("description", models.TextField()),
                ("use_cases", models.TextField(blank=True)),
                ("aliases", models.JSONField(blank=True, default=list)),
                ("enabled", models.BooleanField(default=True)),
            ],
        ),
    ]
