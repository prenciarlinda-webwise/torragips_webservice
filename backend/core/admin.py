from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from unfold.admin import ModelAdmin, TabularInline
from .models import (
    ServiceCatalog, Client, Project,
    ListeCmimesh, ListeCmimeshItem,
    Preventiv, PreventivItem,
    Situacion, SituacionItem,
    Payment, Cost,
)


# ── Inlines ──────────────────────────────────────────────────────

class ListeCmimeshItemInline(TabularInline):
    model = ListeCmimeshItem
    extra = 1
    fields = ['service', 'service_name', 'description', 'unit', 'price', 'order']


class PreventivItemInline(TabularInline):
    model = PreventivItem
    extra = 1
    fields = ['service', 'service_name', 'description', 'quantity', 'unit', 'price', 'total', 'order']
    readonly_fields = ['total']


class SituacionItemInline(TabularInline):
    model = SituacionItem
    extra = 1
    fields = ['service_name', 'description', 'quantity', 'unit', 'price', 'total', 'order']
    readonly_fields = ['total']


class CostInline(TabularInline):
    model = Cost
    extra = 0
    fields = ['category', 'description', 'amount', 'date', 'supplier']


# ── ServiceCatalog ───────────────────────────────────────────────

@admin.register(ServiceCatalog)
class ServiceCatalogAdmin(ModelAdmin):
    list_display = ['name', 'default_unit', 'default_price', 'is_active']
    list_editable = ['default_price', 'is_active']
    list_filter = ['is_active', 'default_unit']
    search_fields = ['name', 'description']


# ── Client ───────────────────────────────────────────────────────

@admin.register(Client)
class ClientAdmin(ModelAdmin):
    list_display = ['name', 'business_name', 'phone', 'city', 'display_project_count', 'display_total_revenue']
    search_fields = ['name', 'phone', 'business_name', 'email']
    list_filter = ['city']
    fieldsets = (
        (None, {
            'fields': ('name', 'business_name', 'phone', 'email'),
        }),
        ('Adresa', {
            'fields': ('city', 'address'),
        }),
        ('Shenime', {
            'fields': ('notes',),
            'classes': ('collapse',),
        }),
    )

    @admin.display(description='Projekte')
    def display_project_count(self, obj):
        return obj.project_count

    @admin.display(description='Te ardhura totale')
    def display_total_revenue(self, obj):
        return f"{obj.total_revenue:,.0f} ALL"


# ── Project ──────────────────────────────────────────────────────

@admin.register(Project)
class ProjectAdmin(ModelAdmin):
    list_display = ['name', 'client', 'project_type', 'status', 'display_revenue', 'display_costs', 'display_profit']
    list_filter = ['status', 'project_type', 'city']
    search_fields = ['name', 'client__name']
    autocomplete_fields = ['client']
    inlines = [CostInline]
    fieldsets = (
        ('Informacion', {
            'fields': ('client', 'name', 'project_type', 'city', 'status', 'start_date', 'notes'),
        }),
        ('Permbledhje Financiare', {
            'fields': ('display_preventiv_total', 'display_revenue', 'display_costs', 'display_profit'),
        }),
        ('Dokumente', {
            'fields': ('display_documents',),
        }),
    )
    readonly_fields = [
        'display_preventiv_total', 'display_revenue',
        'display_costs', 'display_profit', 'display_documents',
    ]

    @admin.display(description='Total Preventiv')
    def display_preventiv_total(self, obj):
        if not obj.pk:
            return '-'
        return f"{obj.preventiv_total:,.0f} ALL"

    @admin.display(description='Te ardhura')
    def display_revenue(self, obj):
        if not obj.pk:
            return '-'
        return f"{obj.total_revenue:,.0f} ALL"

    @admin.display(description='Kosto')
    def display_costs(self, obj):
        if not obj.pk:
            return '-'
        return f"{obj.total_costs:,.0f} ALL"

    @admin.display(description='Fitimi')
    def display_profit(self, obj):
        if not obj.pk:
            return '-'
        profit = obj.profit
        color = 'green' if profit >= 0 else 'red'
        return format_html(
            '<span style="color: {}; font-weight: bold;">{:,.0f} ALL</span>',
            color, profit
        )

    @admin.display(description='Dokumente')
    def display_documents(self, obj):
        if not obj.pk:
            return '-'
        links = []
        try:
            lc = obj.liste_cmimesh
            url = reverse('admin:core_listecmimesh_change', args=[lc.pk])
            pdf_url = reverse('pdf-liste-cmimesh', args=[lc.pk])
            links.append(f'<a href="{url}">Liste Cmimesh</a> (<a href="{pdf_url}" target="_blank">PDF</a>)')
        except Exception:
            links.append('Liste Cmimesh: -')
        try:
            p = obj.preventiv
            url = reverse('admin:core_preventiv_change', args=[p.pk])
            pdf_url = reverse('pdf-preventiv', args=[p.pk])
            links.append(f'<a href="{url}">Preventiv</a> (<a href="{pdf_url}" target="_blank">PDF</a>)')
        except Exception:
            links.append('Preventiv: -')
        situacions = obj.situacions.all()
        for s in situacions:
            url = reverse('admin:core_situacion_change', args=[s.pk])
            pdf_url = reverse('pdf-situacion', args=[s.pk])
            links.append(f'<a href="{url}">Situacion #{s.situacion_number}</a> (<a href="{pdf_url}" target="_blank">PDF</a>)')
        return format_html(' | '.join(links))


# ── ListeCmimesh ─────────────────────────────────────────────────

@admin.register(ListeCmimesh)
class ListeCmimeshAdmin(ModelAdmin):
    list_display = ['__str__', 'project', 'date', 'display_grand_total', 'display_pdf_link']
    autocomplete_fields = ['project']
    inlines = [ListeCmimeshItemInline]
    readonly_fields = ['display_grand_total']

    class Media:
        js = ['js/admin/service_autofill.js']

    @admin.display(description='Total')
    def display_grand_total(self, obj):
        if not obj.pk:
            return '-'
        return f"{obj.grand_total:,.0f} ALL"

    @admin.display(description='PDF')
    def display_pdf_link(self, obj):
        url = reverse('pdf-liste-cmimesh', args=[obj.pk])
        return format_html('<a href="{}" target="_blank">Shkarko PDF</a>', url)


# ── Preventiv ────────────────────────────────────────────────────

@admin.register(Preventiv)
class PreventivAdmin(ModelAdmin):
    list_display = ['__str__', 'project', 'preventiv_number', 'date', 'display_grand_total', 'display_pdf_link']
    autocomplete_fields = ['project']
    inlines = [PreventivItemInline]
    readonly_fields = ['display_grand_total']

    class Media:
        js = ['js/admin/service_autofill.js']

    @admin.display(description='Total')
    def display_grand_total(self, obj):
        if not obj.pk:
            return '-'
        return f"{obj.grand_total:,.0f} ALL"

    @admin.display(description='PDF')
    def display_pdf_link(self, obj):
        url = reverse('pdf-preventiv', args=[obj.pk])
        return format_html('<a href="{}" target="_blank">Shkarko PDF</a>', url)


# ── Situacion ────────────────────────────────────────────────────

@admin.register(Situacion)
class SituacionAdmin(ModelAdmin):
    list_display = [
        '__str__', 'project', 'situacion_number', 'date',
        'display_grand_total', 'display_payment_status', 'display_pdf_link',
    ]
    list_filter = ['payment_status']
    autocomplete_fields = ['project']
    inlines = [SituacionItemInline]
    readonly_fields = ['display_grand_total', 'display_preventiv_reference']
    fieldsets = (
        (None, {
            'fields': ('project', 'situacion_number', 'date', 'city', 'payment_status', 'paid_date'),
        }),
        ('Referenca Preventivit', {
            'fields': ('display_preventiv_reference',),
            'classes': ('collapse',),
        }),
    )

    @admin.display(description='Total')
    def display_grand_total(self, obj):
        if not obj.pk:
            return '-'
        return f"{obj.grand_total:,.0f} ALL"

    @admin.display(description='Statusi')
    def display_payment_status(self, obj):
        if obj.payment_status == 'paid':
            return format_html(
                '<span style="background:#22c55e;color:white;padding:3px 10px;border-radius:12px;">Paguar</span>'
            )
        return format_html(
            '<span style="background:#eab308;color:white;padding:3px 10px;border-radius:12px;">Ne pritje</span>'
        )

    @admin.display(description='PDF')
    def display_pdf_link(self, obj):
        url = reverse('pdf-situacion', args=[obj.pk])
        return format_html('<a href="{}" target="_blank">Shkarko PDF</a>', url)

    @admin.display(description='Artikujt e Preventivit (referece)')
    def display_preventiv_reference(self, obj):
        if not obj.pk:
            return '-'
        try:
            preventiv = obj.project.preventiv
            items = preventiv.items.all()
            if not items:
                return 'Preventivi nuk ka artikuj.'
            rows = ''.join(
                f'<tr><td>{i.service_name}</td><td>{i.quantity}</td><td>{i.unit}</td>'
                f'<td>{i.price:,.0f}</td><td>{i.total:,.0f}</td></tr>'
                for i in items
            )
            return format_html(
                '<table style="width:100%;border-collapse:collapse;">'
                '<thead><tr style="background:#f1f5f9;"><th style="padding:6px;text-align:left;">Sherbimi</th>'
                '<th style="padding:6px;">Sasia</th><th style="padding:6px;">Njesia</th>'
                '<th style="padding:6px;">Cmimi</th><th style="padding:6px;">Total</th></tr></thead>'
                '<tbody>{}</tbody>'
                '<tfoot><tr style="font-weight:bold;border-top:2px solid #333;"><td colspan="4" '
                'style="padding:6px;">Total Preventiv</td><td style="padding:6px;">{:,.0f} ALL</td></tr></tfoot>'
                '</table>',
                format_html(rows), preventiv.grand_total,
            )
        except Exception:
            return 'Nuk ka Preventiv per kete projekt.'


# ── Payment ──────────────────────────────────────────────────────

@admin.register(Payment)
class PaymentAdmin(ModelAdmin):
    list_display = ['__str__', 'project', 'situacion', 'amount', 'date']
    list_filter = ['date']
    search_fields = ['project__name', 'project__client__name']
    readonly_fields = ['project', 'situacion', 'amount', 'date', 'notes']

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


# ── Cost ─────────────────────────────────────────────────────────

@admin.register(Cost)
class CostAdmin(ModelAdmin):
    list_display = ['description', 'project', 'category', 'amount', 'date', 'supplier']
    list_filter = ['category', 'date']
    search_fields = ['description', 'project__name', 'supplier']
    autocomplete_fields = ['project']
