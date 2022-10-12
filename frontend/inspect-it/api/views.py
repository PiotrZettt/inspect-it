from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Part, PartInstance, Defect
from .serializers import PartSerializer, PartInstanceSerializer, DefectSerializer

# Create your views here.


class PartViewSet(ModelViewSet):
    queryset = Part.objects.all()
    serializer_class = PartSerializer


class PartInstanceViewSet(ModelViewSet):
    queryset = PartInstance.objects.all()
    serializer_class = PartInstanceSerializer


class DefectViewSet(ModelViewSet):
    queryset = Defect.objects.all()
    serializer_class = DefectSerializer

