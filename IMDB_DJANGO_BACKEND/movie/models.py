from django.db import models
from django.utils import timezone

from django.utils.translation import gettext_lazy as _
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.
class Movie(models.Model):
    popularity = models.FloatField(null=True,db_column="99popularity",validators=[MinValueValidator(0.0), MaxValueValidator(100.0)])
    director = models.CharField(_("director"), max_length=300, null=False)
    genre = models.CharField(_("genre"), max_length=300,null=False)
    imdb_score = models.FloatField(_("imdb_score"), null=False,validators=[MinValueValidator(0.0), MaxValueValidator(10.0)])
    name = models.CharField(_("name"), max_length=300, null=False)
    time_stamp = models.DateTimeField(_('timestamp'), default=timezone.now)

    def __str__(self):
        return self.name


'''
sqlite db not accepting the ArrayList so made the genre as CharField
During Posting and Retriving of the genre Array Format Handled Using serializer
ListField Can be provide to mysql if I used mysql db
'''
    
