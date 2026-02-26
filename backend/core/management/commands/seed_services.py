from django.core.management.base import BaseCommand
from core.models import ServiceCatalog


SERVICES = [
    # (name, default_unit, default_price)
    ('Prishje Muri + Tavan', 'm2', 100000),
    ('Mure Gipsi', 'm2', 4500),
    ('Dyer Inkaso', 'cope', 40000),
    ('Tavan Gipsi', 'm2', 3000),
    ('Ndricim I Fshehte', 'ml', 2000),
    ('Rrjet Kolle', 'm2', 1500),
    ('Harqe Dekorative + Led', 'ml', 30000),
    ('Baxho Gipsi', 'cope', 3000),
    ('Rafte Gipsi', 'cope', 30000),
    ('Hapje Dere Tualeti', 'cope', 40000),
    ('Ishull + Banak + Kollon Gipsi', 'cope', 100000),
    ('Montim Spote Gipsi', 'cope', 1000),
    ('Patinim', 'm2', 800),
    ('Boje', 'm2', 500),
    ('Lesh Guri 75kg/m2', 'm2', 100),
    ('Ele metalike kendore', 'ml', 150),
    ('Montim shinash magnetike', 'ml', 1200),
    ('Montim ledi te holle', 'ml', 600),
    ('Ndarje me gips dhe leshguri banjo', 'm2', 1200),
    ('Korniza gipsi me hark', 'ml', 1000),
    ('Korniza gipsi ne mure', 'ml', 300),
    ('Montim gipsesh allciu', 'm2', 300),
    ('Lyerje brenda', 'm2', 200),
    ('Spote Tavan, Allci, Incaso', 'cope', 700),
    ('Montim dekori jashte', 'm2', 500),
    ('Ndricime te fshehta', 'ml', 1000),
    ('Patinime', 'm2', 400),
]


class Command(BaseCommand):
    help = 'Seed the ServiceCatalog with default services'

    def handle(self, *args, **options):
        created_count = 0
        for name, unit, price in SERVICES:
            _, created = ServiceCatalog.objects.get_or_create(
                name=name,
                defaults={
                    'default_unit': unit,
                    'default_price': price,
                    'is_active': True,
                }
            )
            if created:
                created_count += 1
                self.stdout.write(f'  Created: {name}')
            else:
                self.stdout.write(f'  Exists:  {name}')
        self.stdout.write(self.style.SUCCESS(f'\nDone! {created_count} services created.'))
