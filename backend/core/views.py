from rest_framework import viewsets
from .models import (
    ServiceCatalog, Client, Project,
    ListeCmimesh, ListeCmimeshItem,
    Preventiv, PreventivItem,
    Situacion, SituacionItem,
    Payment, Cost,
)
from .serializers import (
    ServiceCatalogSerializer, ClientSerializer, ProjectSerializer,
    ListeCmimeshSerializer, ListeCmimeshItemSerializer,
    PreventivSerializer, PreventivItemSerializer,
    SituacionSerializer, SituacionItemSerializer,
    PaymentSerializer, CostSerializer,
)
from .filters import (
    ServiceCatalogFilter, ClientFilter, ProjectFilter,
    ListeCmimeshFilter, PreventivFilter, SituacionFilter,
    PaymentFilter, CostFilter,
)


class ServiceCatalogViewSet(viewsets.ModelViewSet):
    queryset = ServiceCatalog.objects.all()
    serializer_class = ServiceCatalogSerializer
    filterset_class = ServiceCatalogFilter
    search_fields = ['name', 'description']


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    filterset_class = ClientFilter
    search_fields = ['name', 'phone', 'business_name', 'email']


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.select_related('client').all()
    serializer_class = ProjectSerializer
    filterset_class = ProjectFilter
    search_fields = ['name', 'client__name']


class ListeCmimeshViewSet(viewsets.ModelViewSet):
    queryset = ListeCmimesh.objects.select_related('project').prefetch_related('items').all()
    serializer_class = ListeCmimeshSerializer
    filterset_class = ListeCmimeshFilter


class ListeCmimeshItemViewSet(viewsets.ModelViewSet):
    queryset = ListeCmimeshItem.objects.all()
    serializer_class = ListeCmimeshItemSerializer
    filterset_fields = ['liste_cmimesh']


class PreventivViewSet(viewsets.ModelViewSet):
    queryset = Preventiv.objects.select_related('project').prefetch_related('items').all()
    serializer_class = PreventivSerializer
    filterset_class = PreventivFilter


class PreventivItemViewSet(viewsets.ModelViewSet):
    queryset = PreventivItem.objects.all()
    serializer_class = PreventivItemSerializer
    filterset_fields = ['preventiv']


class SituacionViewSet(viewsets.ModelViewSet):
    queryset = Situacion.objects.select_related('project').prefetch_related('items').all()
    serializer_class = SituacionSerializer
    filterset_class = SituacionFilter


class SituacionItemViewSet(viewsets.ModelViewSet):
    queryset = SituacionItem.objects.all()
    serializer_class = SituacionItemSerializer
    filterset_fields = ['situacion']


class PaymentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Payment.objects.select_related('project', 'situacion').all()
    serializer_class = PaymentSerializer
    filterset_class = PaymentFilter


class CostViewSet(viewsets.ModelViewSet):
    queryset = Cost.objects.select_related('project').all()
    serializer_class = CostSerializer
    filterset_class = CostFilter
    search_fields = ['description', 'supplier']
