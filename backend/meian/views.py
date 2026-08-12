from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Project, Source, Tag
from .serializers import ProjectSerializer, SourceDetailSerializer, SourceListSerializer, TagSerializer
from .services import answer_question


class ChatView(APIView):
    def post(self, request):
        return Response(answer_question(request.data.get("question", "")))


class TagListView(APIView):
    def get(self, request):
        data = TagSerializer(Tag.objects.filter(enabled=True).order_by("id"), many=True).data
        return Response({"results": data})


class SourceListView(APIView):
    def get(self, request):
        data = SourceListSerializer(Source.objects.order_by("id"), many=True).data
        return Response({"results": data})


class SourceDetailView(APIView):
    def get(self, request, pk):
        source = get_object_or_404(Source, pk=pk)
        return Response(SourceDetailSerializer(source).data)


class ProjectListView(APIView):
    def get(self, request):
        data = ProjectSerializer(Project.objects.order_by("year"), many=True).data
        return Response({"results": data})


class ModelInfoView(APIView):
    def get(self, request):
        return Response({
            "name": "谢远定数字分身模型",
            "model_url": "",
            "preview_url": "/assets/models/xieyuanding/preview.png",
            "status": "building",
            "description": "谢远定静态人物模型正在制作中，当前展示为占位版本。",
        })
