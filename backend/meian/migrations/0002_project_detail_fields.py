from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("meian", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="slug",
            field=models.SlugField(blank=True, max_length=16),
        ),
        migrations.AddField(
            model_name="project",
            name="subtitle",
            field=models.CharField(blank=True, max_length=220),
        ),
        migrations.AddField(
            model_name="project",
            name="highlights",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="project",
            name="detail_sections",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="project",
            name="inheritance_value",
            field=models.TextField(blank=True),
        ),
    ]
