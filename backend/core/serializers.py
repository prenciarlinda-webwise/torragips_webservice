from rest_framework import serializers
from .models import (
    ServiceCatalog, Client, Project,
    ListeCmimesh, ListeCmimeshItem,
    Preventiv, PreventivItem,
    Situacion, SituacionItem,
    Payment, Cost,
)


class ServiceCatalogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCatalog
        fields = '__all__'


class ClientSerializer(serializers.ModelSerializer):
    project_count = serializers.IntegerField(read_only=True)
    total_revenue = serializers.DecimalField(read_only=True, max_digits=12, decimal_places=2)

    class Meta:
        model = Client
        fields = '__all__'


class CostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cost
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ['project', 'situacion', 'amount', 'date']


class ListeCmimeshItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListeCmimeshItem
        fields = '__all__'


class ProjectBriefSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.name', read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'city', 'client_name', 'project_type']


class ListeCmimeshSerializer(serializers.ModelSerializer):
    items = ListeCmimeshItemSerializer(many=True, read_only=True)
    grand_total = serializers.DecimalField(read_only=True, max_digits=12, decimal_places=2)
    project_detail = ProjectBriefSerializer(source='project', read_only=True)

    class Meta:
        model = ListeCmimesh
        fields = '__all__'


class PreventivItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PreventivItem
        fields = '__all__'


class PreventivSerializer(serializers.ModelSerializer):
    items = PreventivItemSerializer(many=True, read_only=True)
    grand_total = serializers.DecimalField(read_only=True, max_digits=12, decimal_places=2)
    project_detail = ProjectBriefSerializer(source='project', read_only=True)

    class Meta:
        model = Preventiv
        fields = '__all__'


class SituacionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SituacionItem
        fields = '__all__'


class SituacionSerializer(serializers.ModelSerializer):
    items = SituacionItemSerializer(many=True, read_only=True)
    grand_total = serializers.DecimalField(read_only=True, max_digits=12, decimal_places=2)
    project_detail = ProjectBriefSerializer(source='project', read_only=True)

    class Meta:
        model = Situacion
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    total_revenue = serializers.DecimalField(read_only=True, max_digits=12, decimal_places=2)
    total_costs = serializers.DecimalField(read_only=True, max_digits=12, decimal_places=2)
    profit = serializers.DecimalField(read_only=True, max_digits=12, decimal_places=2)
    client_name = serializers.CharField(source='client.name', read_only=True)

    class Meta:
        model = Project
        fields = '__all__'
