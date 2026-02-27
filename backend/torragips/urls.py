from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.throttling import AnonRateThrottle


class LoginRateThrottle(AnonRateThrottle):
    rate = '5/minute'


throttled_login = obtain_auth_token
throttled_login.throttle_classes = [LoginRateThrottle]

urlpatterns = [
    path('admin/dashboard/', include('dashboard.urls')),
    path('admin/', admin.site.urls),
    path('api/auth/login/', throttled_login, name='api-login'),
    path('api/', include('core.urls')),
    path('pdf/', include('pdf.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
