import django_filters
from .models import (
    ServiceCatalog, Client, Project,
    ListeCmimesh, Preventiv, Situacion,
    Payment, Cost,
)


class ServiceCatalogFilter(django_filters.FilterSet):
    class Meta:
        model = ServiceCatalog
        fields = {'is_active': ['exact'], 'default_unit': ['exact']}


class ClientFilter(django_filters.FilterSet):
    class Meta:
        model = Client
        fields = {'city': ['exact', 'icontains'], 'name': ['icontains']}


class ProjectFilter(django_filters.FilterSet):
    class Meta:
        model = Project
        fields = {
            'client': ['exact'],
            'status': ['exact'],
            'project_type': ['exact'],
            'city': ['exact', 'icontains'],
        }


class ListeCmimeshFilter(django_filters.FilterSet):
    class Meta:
        model = ListeCmimesh
        fields = {'project': ['exact']}


class PreventivFilter(django_filters.FilterSet):
    class Meta:
        model = Preventiv
        fields = {'project': ['exact']}


class SituacionFilter(django_filters.FilterSet):
    class Meta:
        model = Situacion
        fields = {'project': ['exact'], 'payment_status': ['exact']}


class PaymentFilter(django_filters.FilterSet):
    class Meta:
        model = Payment
        fields = {'project': ['exact'], 'date': ['gte', 'lte']}


class CostFilter(django_filters.FilterSet):
    class Meta:
        model = Cost
        fields = {
            'project': ['exact'],
            'category': ['exact'],
            'date': ['gte', 'lte'],
        }
