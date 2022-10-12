from django.urls import path, include
from rest_framework import routers
from .views import PartViewSet, PartInstanceViewSet, DefectViewSet

router = routers.DefaultRouter()
router.register(r'parts', PartViewSet, 'part')
router.register(r'part_instances', PartInstanceViewSet, 'part_instances')
router.register(r'defectss', DefectViewSet, 'inspections')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]