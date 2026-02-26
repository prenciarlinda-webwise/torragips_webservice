from django.urls import path
from . import views

urlpatterns = [
    path('liste-cmimesh/<int:pk>/', views.liste_cmimesh_pdf, name='pdf-liste-cmimesh'),
    path('preventiv/<int:pk>/', views.preventiv_pdf, name='pdf-preventiv'),
    path('situacion/<int:pk>/', views.situacion_pdf, name='pdf-situacion'),
]
