from django.conf.urls import include, url
from rest_framework import routers
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

# router for api routes
router = routers.SimpleRouter()
router.register(r'topics', views.TopicViewSet)

urlpatterns = [
	url('^api/topics/numPages/$', views.getNumPages),
	# url('^api/', include(router.urls)),
	url('^api/createTopic/', views.createTopic),
	url(r'api/upvote/([0-9]+)/$', views.upvote),
	url(r'api/downvote/([0-9]+)/$', views.downvote),
	url('^api/topics/$', views.getTopics),
	url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url('^.*$', views.IndexView.as_view(), name='index'),
]
