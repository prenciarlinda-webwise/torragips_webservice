from django.urls import path
from . import views

urlpatterns = [
    path('', views.main_dashboard, name='dashboard-main'),
    path('monthly-report/', views.monthly_report, name='dashboard-monthly'),
    path('yearly-report/', views.yearly_report, name='dashboard-yearly'),
    path('clients/', views.clients_list, name='dashboard-clients'),
    path('clients/<int:client_id>/', views.client_detail, name='dashboard-client-detail'),
]
