from pathlib import Path
from decouple import config, Csv

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1', cast=Csv())

INSTALLED_APPS = [
    'unfold',
    'unfold.contrib.filters',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'django_filters',
    'corsheaders',
    'core',
    'pdf',
    'dashboard',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'torragips.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'torragips.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': config('DATABASE_ENGINE', default='django.db.backends.sqlite3'),
        'NAME': config('DATABASE_NAME', default=str(BASE_DIR / 'db.sqlite3')),
        'USER': config('DATABASE_USER', default=''),
        'PASSWORD': config('DATABASE_PASSWORD', default=''),
        'HOST': config('DATABASE_HOST', default=''),
        'PORT': config('DATABASE_PORT', default=''),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Europe/Tirane'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# DRF
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 25,
}

# CORS
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:3000,http://localhost:3001',
    cast=Csv(),
)
CORS_ALLOW_HEADERS = [
    'accept',
    'authorization',
    'content-type',
    'origin',
    'x-csrftoken',
    'x-requested-with',
]

# Unfold admin
UNFOLD = {
    "SITE_TITLE": "Torra Gips",
    "SITE_HEADER": "Torra Gips Management",
    "SITE_SYMBOL": "construction",
    "SIDEBAR": {
        "show_search": True,
        "navigation": [
            {
                "title": "Dashboard",
                "items": [
                    {
                        "title": "Dashboard",
                        "icon": "dashboard",
                        "link": "/admin/dashboard/",
                    },
                ],
            },
            {
                "title": "Projektet",
                "items": [
                    {
                        "title": "Projektet",
                        "icon": "engineering",
                        "link": "/admin/core/project/",
                    },
                    {
                        "title": "Kostot",
                        "icon": "account_balance_wallet",
                        "link": "/admin/core/cost/",
                    },
                ],
            },
            {
                "title": "Dokumente",
                "items": [
                    {
                        "title": "Lista Cmimesh",
                        "icon": "list_alt",
                        "link": "/admin/core/pricinglist/",
                    },
                    {
                        "title": "Preventiva",
                        "icon": "description",
                        "link": "/admin/core/preventiv/",
                    },
                    {
                        "title": "Situacione",
                        "icon": "receipt_long",
                        "link": "/admin/core/situacion/",
                    },
                ],
            },
            {
                "title": "Menaxhimi",
                "items": [
                    {
                        "title": "Klientet",
                        "icon": "people",
                        "link": "/admin/core/client/",
                    },
                    {
                        "title": "Katalogu Sherbimeve",
                        "icon": "home_repair_service",
                        "link": "/admin/core/servicecatalog/",
                    },
                    {
                        "title": "Pagesat",
                        "icon": "payments",
                        "link": "/admin/core/payment/",
                    },
                ],
            },
            {
                "title": "Raporte",
                "items": [
                    {
                        "title": "Raport Mujor",
                        "icon": "bar_chart",
                        "link": "/admin/dashboard/monthly-report/",
                    },
                    {
                        "title": "Raport Vjetor",
                        "icon": "trending_up",
                        "link": "/admin/dashboard/yearly-report/",
                    },
                ],
            },
            {
                "title": "Sistema",
                "items": [
                    {
                        "title": "Perdoruesit",
                        "icon": "admin_panel_settings",
                        "link": "/admin/auth/user/",
                    },
                ],
            },
        ],
    },
}
