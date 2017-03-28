from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from django.views.generic.base import TemplateView
from django.utils.decorators import method_decorator
from serializers import *
from rest_framework import viewsets, generics
from django.core.paginator import Paginator
from rest_framework.decorators import list_route, detail_route
from django.core.paginator import Paginator
from models import *
from multiprocessing import Process, Lock

topic_list = TopicList()
mutex_create_topic = Lock()
mutex_upvote = Lock()
mutex_downvote = Lock()

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

def getTopics(request):
	"""
	get all topics
	"""
	topics = topic_list.getTopics()
	topic_data = [{
		'topic_id':topic.topic_id,
		'text':topic.text,
		'upvotes':topic.upvotes,
		'downvotes':topic.downvotes} 
	for topic in topics]
	topic_data = sorted(topic_data, key=lambda k: k['upvotes'], reverse=True)
	return JsonResponse({'topics':topic_data})

@require_http_methods(["POST"])
def createTopic(request):
	"""
	create a topic, use mutex for race condition prevention
	"""
	if request.method == 'POST':
		try:
			text = request.POST.get("text")
			# start critical section
			mutex_create_topic.acquire()
			try:
				new_topic_id = topic_list.getCurrentTopicId()
				topic = Topic.create(new_topic_id, text)
				topic_list.addTopic(topic)
			finally:
				mutex_create_topic.release()
			# end critical section
			return HttpResponse(status=200)
		except:
			return HttpResponse(status=400)
	return HttpResponse(status=400)

def getNumPages(request):
	"""
	get total number of pages for pagination
	"""
	all_topics = Topic.objects.all()
	p = Paginator(all_topics, 20)
	return JsonResponse({'data':p.num_pages})

def upvote(request, topic_id):
	"""
	Upvote a particular topic, use mutex for race condition prevention
	"""
	if request.method == 'PATCH':
		topic_id = int(topic_id)
		# start critical section
		mutex_upvote.acquire()
		try:
			topic = topic_list.getTopicById(topic_id)
			if topic is not None:
				topic.upvotes = topic.upvotes + 1
		finally:
			mutex_upvote.release()
		# end critical section
		return HttpResponse(status=200)
	return HttpResponse(status=400)

def downvote(request, topic_id):
	"""
	Downvote a particular topic, use mutex for race condition prevention
	"""
	if request.method == 'PATCH':
		topic_id = int(topic_id)

		# start critical section
		mutex_downvote.acquire()
		try:
			topic = topic_list.getTopicById(topic_id)
			if topic is not None:
				topic.downvotes = topic.downvotes + 1
		finally:
			mutex_downvote.release()
		# end critical section
		return HttpResponse(status=200)
	return HttpResponse(status=400)
