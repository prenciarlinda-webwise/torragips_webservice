from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'services', views.ServiceCatalogViewSet)
router.register(r'clients', views.ClientViewSet)
router.register(r'projects', views.ProjectViewSet)
router.register(r'liste-cmimesh', views.ListeCmimeshViewSet)
router.register(r'liste-cmimesh-items', views.ListeCmimeshItemViewSet)
router.register(r'preventiv', views.PreventivViewSet)
router.register(r'preventiv-items', views.PreventivItemViewSet)
router.register(r'situacion', views.SituacionViewSet)
router.register(r'situacion-items', views.SituacionItemViewSet)
router.register(r'payments', views.PaymentViewSet)
router.register(r'costs', views.CostViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
