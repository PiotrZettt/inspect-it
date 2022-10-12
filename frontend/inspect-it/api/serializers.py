from rest_framework.serializers import ModelSerializer
from .models import Part, PartInstance, Defect


class PartSerializer(ModelSerializer):
    class Meta:
        model = Part
        fields = ['id', 'FG_code', 'description', 'img_reference']


class PartInstanceSerializer(ModelSerializer):
    class Meta:
        model = PartInstance
        fields = '__all__'


class DefectSerializer(ModelSerializer):
    class Meta:
        model = Defect
        fields = '__all__'
