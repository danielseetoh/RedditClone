from __future__ import unicode_literals

from django.db import models

# Create your models here.

# topic model
class Topic(models.Model):
	text = models.CharField(max_length=255)
	upvotes = models.IntegerField()
	downvotes = models.IntegerField()