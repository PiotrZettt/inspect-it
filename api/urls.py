from django.urls import path, include
from rest_framework import routers
from .views import PartViewSet, part_instance, DefectViewSet, get_part_instance

router = routers.DefaultRouter()
router.register(r'parts', PartViewSet, 'part')
router.register(r'defects', DefectViewSet, 'inspections')

urlpatterns = [
    path('', include(router.urls)),
    path('part-instances/', part_instance, name='part-instance'),
    path('part-instances/<int:pk>', get_part_instance, name='get-part-instance'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]