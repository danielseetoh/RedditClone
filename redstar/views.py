from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic.base import TemplateView
from django.utils.decorators import method_decorator
from serializers import *
from rest_framework import viewsets, generics

# Create your views here.
class IndexView(TemplateView):
	# route the user to main.html, and let angular routing do its job
    template_name = 'redstar/main.html'

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)

# allows topics to be read, created, updated, deleted
class TopicViewSet(viewsets.ModelViewSet):
	queryset = Topic.objects.all().order_by('-upvotes')
	serializer_class = TopicSerializer


