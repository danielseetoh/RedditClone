from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Topic(models.Model):
	"""
	Topic class
	"""
	topic_id = models.IntegerField()
	text = models.CharField(max_length=255)
	upvotes = models.IntegerField()
	downvotes = models.IntegerField()

	@classmethod
	def create(cls, topic_id, text):
		topic = cls(topic_id=topic_id, text=text, upvotes=0, downvotes=0)
		return topic


class TopicList(models.Manager):
	"""
	A class that holds the topics in memory
	"""
	def __init__(self):
		self.topics = []
		self.current_topic_id = 0

	def addTopic(self, topic):
		self.topics.append(topic)
		self.current_topic_id += 1

	def getTopics(self):
		return self.topics

	def getCurrentTopicId(self):
		return self.current_topic_id

	def getTopicById(self, topic_id):
		for topic in self.topics:
			if topic.topic_id == topic_id:
				return topic
		else:
			return None