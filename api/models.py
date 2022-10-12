from django.db import models
from django.shortcuts import reverse
from .constants import *


# Create your models here.
class Part(models.Model):
    FG_code = models.CharField(max_length=10)
    description = models.CharField(max_length=200, default="")
    img_reference = models.ImageField(null=True, blank=True, upload_to='images/')

    class Meta:
        ordering = ['FG_code']

    def get_absolute_url(self):
        """Returns the url to access a particular instance of the model."""
        return reverse('part-detail', args=[str(self.id)])

    def __str__(self):
        return self.FG_code


class PartInstance(models.Model):
    part_origin = models.ForeignKey(Part, on_delete=models.CASCADE, related_name='part_instance')
    serial_number = models.CharField(max_length=11, null=False)
    stage = models.CharField(max_length=200)
    passed = models.BooleanField(default=True)


    def __str__(self):
        return self.serial_number


class Defect(models.Model):
    part_instance = models.ForeignKey(PartInstance, on_delete=models.CASCADE, related_name='part_instance')
    status = models.CharField(max_length=200, default="OK")
    defect_name = models.CharField(max_length=200, null=True)
    defect_location = models.JSONField(max_length=10, null=True)
    operator = models.CharField(max_length=80, default=" ")
    date = models.DateField(auto_now=True)


    def __repr__(self):
        return self.defect_name


