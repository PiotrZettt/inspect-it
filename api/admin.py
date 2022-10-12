from django.contrib import admin
from .models import *

# Register your models here.


class PartAdmin(admin.ModelAdmin):
    list_display = ['FG_code']


class PartInstanceAdmin(admin.ModelAdmin):
    list_display = ('part_origin', 'serial_number', 'stage')


class DefectAdmin(admin.ModelAdmin):
    list_display = ('defect_name', 'defect_location', 'status', 'operator')


admin.site.register(Part, PartAdmin)
admin.site.register(PartInstance, PartInstanceAdmin)
admin.site.register(Defect, DefectAdmin)
