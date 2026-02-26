from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Situacion, Payment


@receiver(post_save, sender=Situacion)
def handle_situacion_payment(sender, instance, **kwargs):
    if instance.payment_status == 'paid':
        Payment.objects.update_or_create(
            situacion=instance,
            defaults={
                'project': instance.project,
                'amount': instance.grand_total,
                'date': instance.paid_date or instance.date,
            }
        )
    elif instance.payment_status == 'pending':
        Payment.objects.filter(situacion=instance).delete()
