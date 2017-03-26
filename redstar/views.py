from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic.base import TemplateView
from django.utils.decorators import method_decorator

# Create your views here.
# def index(request):
# 	return render(request, 'redstar/main.html')


class IndexView(TemplateView):
    template_name = 'redstar/main.html'

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)

# add apis for increment and decrement votes

# add apis for creating topics