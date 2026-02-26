from django.urls import path
from . import views

urlpatterns = [
    path('', views.main_dashboard, name='dashboard-main'),
    path('monthly-report/', views.monthly_report, name='dashboard-monthly'),
    path('yearly-report/', views.yearly_report, name='dashboard-yearly'),
]
