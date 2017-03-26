from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic.base import TemplateView
from django.utils.decorators import method_decorator
from serializers import *
from rest_framework import viewsets, generics
from django.core.paginator import Paginator
from rest_framework.decorators import list_route, detail_route
from django.core.paginator import Paginator

# Create your views here.
class IndexView(TemplateView):
	"""
	Default routing to main.html
	"""
	template_name = 'redstar/main.html'

	@method_decorator(ensure_csrf_cookie)
	def dispatch(self, *args, **kwargs):
		return super(IndexView, self).dispatch(*args, **kwargs)

# allows topics to be read, created, updated, deleted
class TopicViewSet(viewsets.ModelViewSet):
	"""
	Read, Create, Update, Delete topics
	"""
	queryset = Topic.objects.all().order_by('-upvotes')
	serializer_class = TopicSerializer

def getNumPages(request):
	"""
	get total number of pages for pagination
	"""
	all_topics = Topic.objects.all()
	p = Paginator(all_topics, 20)
	return JsonResponse({'data':p.num_pages})

def upvote(request, topicId):
	"""
	Upvote a particular topic
	Reason for not using TopicViewSet is to allow for syncing in database
	"""
	try:
		topic = Topic.objects.get(pk=topicId)
	except Topic.DoesNotExist:
		return HttpResponse(status=404)

	if request.method == 'PATCH':
		topic.upvotes = topic.upvotes + 1
		topic.save()
		return HttpResponse(status=200)
	return HttpResponse(status=400)

def downvote(request, topicId):
	"""
	Downvote a particular topic
	Reason for not using TopicViewSet is to allow for syncing in database
	"""
	try:
		topic = Topic.objects.get(pk=topicId)
	except Topic.DoesNotExist:
		return HttpResponse(status=404)

	if request.method == 'PATCH':
		topic.downvotes = topic.downvotes + 1
		topic.save()
		return HttpResponse(status=200)
	return HttpResponse(status=400)
