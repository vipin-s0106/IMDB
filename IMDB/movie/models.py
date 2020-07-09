from django.db import models
from django.utils import timezone

from django.utils.translation import gettext_lazy as _
from django_mysql.models import ListCharField


# Create your models here.
class Movie(models.Model):
    popularity = models.FloatField(_("99popularity"), null=True)
    director = models.CharField(_("director"), max_length="300", null=False),
    genre = ListCharField(
        base_field=models.CharField(max_length=10),
        size=10,
        max_length=(10 * 11)  # 6 * 10 character nominals, plus commas
    )
    imdb_score = models.FloatField(_("imdb_score"), null=False)
    name = models.CharField(_("name"), max_length=300, null=False)
    time_stamp = models.DateTimeField(_('timestamp'), default=timezone.now)
