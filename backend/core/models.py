from django.db import models
from django.db.models import Sum
from django.core.validators import MinValueValidator
from decimal import Decimal


class ServiceCatalog(models.Model):
    UNIT_CHOICES = [
        ('m2', 'm2'),
        ('ml', 'ml'),
        ('cope', 'cope'),
    ]

    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, default='')
    default_unit = models.CharField(max_length=10, choices=UNIT_CHOICES, default='m2')
    default_price = models.DecimalField(max_digits=10, decimal_places=2, default=0, validators=[MinValueValidator(Decimal('0'))])
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Sherbim'
        verbose_name_plural = 'Katalogu Sherbimeve'
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.default_price} ALL/{self.default_unit})"


class Client(models.Model):
    name = models.CharField(max_length=200)
    business_name = models.CharField(max_length=200, blank=True, default='')
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True, default='')
    city = models.CharField(max_length=100, blank=True, default='')
    address = models.TextField(blank=True, default='')
    notes = models.TextField(blank=True, default='')
    is_archived = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Klient'
        verbose_name_plural = 'Klientet'
        ordering = ['-created_at']

    def __str__(self):
        if self.business_name:
            return f"{self.name} ({self.business_name})"
        return self.name

    @property
    def project_count(self):
        return self.projects.count()

    @property
    def total_revenue(self):
        total = self.projects.aggregate(
            total=Sum('payments__amount')
        )['total']
        return total or Decimal('0.00')


class Project(models.Model):
    PROJECT_TYPE_CHOICES = [
        ('supply_work', 'Furnizim + Pune'),
        ('work_only', 'Vetem Pune'),
    ]
    STATUS_CHOICES = [
        ('active', 'Aktiv'),
        ('completed', 'Perfunduar'),
        ('cancelled', 'Anulluar'),
    ]

    client = models.ForeignKey(Client, on_delete=models.PROTECT, related_name='projects')
    name = models.CharField(max_length=200)
    project_type = models.CharField(max_length=20, choices=PROJECT_TYPE_CHOICES, default='supply_work')
    city = models.CharField(max_length=100, blank=True, default='')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    is_archived = models.BooleanField(default=False)
    start_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Projekt'
        verbose_name_plural = 'Projektet'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.client.name}"

    @property
    def total_revenue(self):
        total = self.payments.aggregate(total=Sum('amount'))['total']
        return total or Decimal('0.00')

    @property
    def total_costs(self):
        total = self.costs.aggregate(total=Sum('amount'))['total']
        return total or Decimal('0.00')

    @property
    def profit(self):
        return self.total_revenue - self.total_costs

    @property
    def preventiv_total(self):
        try:
            preventiv = self.preventiv
            total = preventiv.items.aggregate(total=Sum('total'))['total']
            return total or Decimal('0.00')
        except Preventiv.DoesNotExist:
            return Decimal('0.00')

    @property
    def liste_cmimesh_total(self):
        try:
            lc = self.liste_cmimesh
            total = lc.items.aggregate(total=Sum('price'))['total']
            return total or Decimal('0.00')
        except ListeCmimesh.DoesNotExist:
            return Decimal('0.00')


class ListeCmimesh(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE, related_name='liste_cmimesh')
    date = models.DateField()
    city = models.CharField(max_length=100, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Liste Cmimesh'
        verbose_name_plural = 'Lista Cmimesh'

    def __str__(self):
        return f"Liste Cmimesh - {self.project.name}"

    @property
    def grand_total(self):
        total = self.items.aggregate(total=Sum('price'))['total']
        return total or Decimal('0.00')


class ListeCmimeshItem(models.Model):
    liste_cmimesh = models.ForeignKey(ListeCmimesh, on_delete=models.CASCADE, related_name='items')
    service = models.ForeignKey(ServiceCatalog, on_delete=models.SET_NULL, null=True, blank=True)
    service_name = models.CharField(max_length=200)
    description = models.TextField(blank=True, default='')
    unit = models.CharField(max_length=20, default='m2')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0, validators=[MinValueValidator(Decimal('0'))])
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Artikull'
        verbose_name_plural = 'Artikujt'

    def __str__(self):
        return self.service_name


class Preventiv(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE, related_name='preventiv')
    preventiv_number = models.PositiveIntegerField(default=1)
    date = models.DateField()
    city = models.CharField(max_length=100, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Preventiv'
        verbose_name_plural = 'Preventiva'

    def __str__(self):
        return f"Preventiv #{self.preventiv_number} - {self.project.name}"

    @property
    def grand_total(self):
        total = self.items.aggregate(total=Sum('total'))['total']
        return total or Decimal('0.00')


class PreventivItem(models.Model):
    preventiv = models.ForeignKey(Preventiv, on_delete=models.CASCADE, related_name='items')
    service = models.ForeignKey(ServiceCatalog, on_delete=models.SET_NULL, null=True, blank=True)
    service_name = models.CharField(max_length=200)
    description = models.TextField(blank=True, default='')
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=0, validators=[MinValueValidator(Decimal('0'))])
    unit = models.CharField(max_length=20, default='m2')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0, validators=[MinValueValidator(Decimal('0'))])
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0, editable=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Artikull'
        verbose_name_plural = 'Artikujt'

    def __str__(self):
        return self.service_name

    def save(self, *args, **kwargs):
        self.total = self.quantity * self.price
        super().save(*args, **kwargs)


class Situacion(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Ne pritje'),
        ('paid', 'Paguar'),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='situacions')
    situacion_number = models.PositiveIntegerField(default=1)
    date = models.DateField()
    city = models.CharField(max_length=100, blank=True, default='')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    paid_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Situacion'
        verbose_name_plural = 'Situacione'
        ordering = ['situacion_number']

    def __str__(self):
        return f"Situacion nr. {self.situacion_number} - {self.project.name}"

    @property
    def grand_total(self):
        total = self.items.aggregate(total=Sum('total'))['total']
        return total or Decimal('0.00')


class SituacionItem(models.Model):
    situacion = models.ForeignKey(Situacion, on_delete=models.CASCADE, related_name='items')
    service_name = models.CharField(max_length=200)
    description = models.TextField(blank=True, default='')
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=0, validators=[MinValueValidator(Decimal('0'))])
    unit = models.CharField(max_length=20, default='m2')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0, validators=[MinValueValidator(Decimal('0'))])
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0, editable=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Artikull'
        verbose_name_plural = 'Artikujt'

    def __str__(self):
        return self.service_name

    def save(self, *args, **kwargs):
        self.total = self.quantity * self.price
        super().save(*args, **kwargs)


class Payment(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='payments')
    situacion = models.OneToOneField(Situacion, on_delete=models.CASCADE, related_name='payment')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    date = models.DateField()
    notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Pagese'
        verbose_name_plural = 'Pagesat'
        ordering = ['-date']

    def __str__(self):
        return f"Pagese {self.amount} ALL - {self.project.name}"


class Cost(models.Model):
    CATEGORY_CHOICES = [
        ('materials', 'Materiale'),
        ('labor', 'Puntori'),
        ('transport', 'Transport'),
        ('equipment', 'Pajisje'),
        ('other', 'Tjeter'),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='costs', null=True, blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='materials')
    description = models.CharField(max_length=300)
    amount = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(Decimal('0'))])
    date = models.DateField()
    supplier = models.CharField(max_length=200, blank=True, default='')
    notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Kosto'
        verbose_name_plural = 'Kostot'
        ordering = ['-date']

    def __str__(self):
        return f"{self.get_category_display()}: {self.description} ({self.amount} ALL)"
