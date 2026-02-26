from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render
from django.db.models import Sum, Count, Q, F
from django.db.models.functions import TruncMonth, TruncYear
from django.utils import timezone
from decimal import Decimal
from core.models import Client, Project, Payment, Cost, Situacion


@staff_member_required
def main_dashboard(request):
    now = timezone.now()

    active_projects = Project.objects.filter(status='active').count()
    total_clients = Client.objects.count()
    total_revenue = Payment.objects.aggregate(total=Sum('amount'))['total'] or Decimal('0')
    total_costs = Cost.objects.aggregate(total=Sum('amount'))['total'] or Decimal('0')
    profit = total_revenue - total_costs

    pending_situacions = Situacion.objects.filter(payment_status='pending')
    pending_count = pending_situacions.count()
    pending_amount = sum(s.grand_total for s in pending_situacions)

    # Monthly revenue (last 12 months)
    monthly_revenue = (
        Payment.objects
        .filter(date__gte=now - timezone.timedelta(days=365))
        .annotate(month=TruncMonth('date'))
        .values('month')
        .annotate(total=Sum('amount'))
        .order_by('month')
    )
    chart_labels = [m['month'].strftime('%b %Y') for m in monthly_revenue]
    chart_data = [float(m['total']) for m in monthly_revenue]

    # Top clients by revenue
    top_clients = (
        Client.objects
        .annotate(revenue=Sum('projects__payments__amount'))
        .filter(revenue__gt=0)
        .order_by('-revenue')[:10]
    )

    # Per-project P&L
    projects_pl = []
    for p in Project.objects.select_related('client').all()[:50]:
        projects_pl.append({
            'name': p.name,
            'client': p.client.name,
            'preventiv_total': p.preventiv_total,
            'revenue': p.total_revenue,
            'costs': p.total_costs,
            'profit': p.profit,
        })

    context = {
        'active_projects': active_projects,
        'total_clients': total_clients,
        'total_revenue': total_revenue,
        'total_costs': total_costs,
        'profit': profit,
        'pending_count': pending_count,
        'pending_amount': pending_amount,
        'chart_labels': chart_labels,
        'chart_data': chart_data,
        'top_clients': top_clients,
        'projects_pl': projects_pl,
    }
    return render(request, 'dashboard/main.html', context)


@staff_member_required
def monthly_report(request):
    monthly_data = (
        Payment.objects
        .annotate(month=TruncMonth('date'))
        .values('month')
        .annotate(revenue=Sum('amount'))
        .order_by('-month')
    )

    monthly_costs = (
        Cost.objects
        .annotate(month=TruncMonth('date'))
        .values('month')
        .annotate(costs=Sum('amount'))
        .order_by('-month')
    )
    costs_by_month = {m['month']: m['costs'] for m in monthly_costs}

    report = []
    for m in monthly_data:
        month = m['month']
        revenue = m['revenue'] or Decimal('0')
        costs = costs_by_month.get(month, Decimal('0'))
        report.append({
            'month': month,
            'revenue': revenue,
            'costs': costs,
            'profit': revenue - costs,
        })

    return render(request, 'dashboard/monthly_report.html', {'report': report})


@staff_member_required
def yearly_report(request):
    yearly_revenue = (
        Payment.objects
        .annotate(year=TruncYear('date'))
        .values('year')
        .annotate(revenue=Sum('amount'))
        .order_by('-year')
    )

    yearly_costs = (
        Cost.objects
        .annotate(year=TruncYear('date'))
        .values('year')
        .annotate(costs=Sum('amount'))
        .order_by('-year')
    )
    costs_by_year = {y['year']: y['costs'] for y in yearly_costs}

    report = []
    for y in yearly_revenue:
        year = y['year']
        revenue = y['revenue'] or Decimal('0')
        costs = costs_by_year.get(year, Decimal('0'))
        report.append({
            'year': year,
            'revenue': revenue,
            'costs': costs,
            'profit': revenue - costs,
        })

    return render(request, 'dashboard/yearly_report.html', {'report': report})
