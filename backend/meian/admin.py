from django.contrib import admin

from .models import Project, Source, Tag

admin.site.register(Project)
admin.site.register(Source)
admin.site.register(Tag)
