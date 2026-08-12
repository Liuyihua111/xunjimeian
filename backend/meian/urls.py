from django.urls import path

from .views import ChatView, ModelInfoView, ProjectListView, SourceDetailView, SourceListView, TagListView

urlpatterns = [
    path("chat/", ChatView.as_view(), name="chat"),
    path("tags/", TagListView.as_view(), name="tags"),
    path("sources/", SourceListView.as_view(), name="sources"),
    path("sources/<int:pk>/", SourceDetailView.as_view(), name="source-detail"),
    path("projects/", ProjectListView.as_view(), name="projects"),
    path("model/", ModelInfoView.as_view(), name="model"),
]
