from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Part, PartInstance, Defect
from .serializers import PartSerializer, PartInstanceSerializer, DefectSerializer
from django.views import generic

# Create your views here.


class PartViewSet(ModelViewSet):
    queryset = Part.objects.all()
    serializer_class = PartSerializer


@api_view(['GET', 'POST'])
def part_instance(request):
    if request.method == 'GET':
        part_instances = PartInstance.objects.all()
        serializer = PartInstanceSerializer(part_instances, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PartInstanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_part_instance(request, pk):
    if request.method == 'GET':
        part = PartInstance.objects.get(pk=pk)
        serializer = PartInstanceSerializer(part, many=False)
        return Response(serializer.data)


class DefectViewSet(ModelViewSet):
    queryset = Defect.objects.all()
    serializer_class = DefectSerializer

class PartInstanceDetailView(generic.DetailView):
    model = PartInstance

