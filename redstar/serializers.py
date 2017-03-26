from rest_framework import serializers
from redstar.models import *

class TopicSerializer(serializers.ModelSerializer):
	class Meta:
		model = Topic
		fields = ('id', 'text', 'upvotes', 'downvotes')