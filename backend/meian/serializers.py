from rest_framework import serializers

from .models import Project, Source, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["tag", "category", "description", "use_cases", "aliases", "enabled"]


class SourceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = ["id", "title", "person", "topic", "period", "location", "source_name", "source_url", "tags", "usable_for_qa"]


class SourceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = ["id", "title", "person", "topic", "period", "location", "content", "source_name", "source_url", "tags", "usable_for_qa", "note"]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "year",
            "slug",
            "title",
            "subtitle",
            "summary",
            "directions",
            "cities",
            "outputs",
            "images",
            "links",
            "highlights",
            "detail_sections",
            "inheritance_value",
            "reusable_assets",
        ]
