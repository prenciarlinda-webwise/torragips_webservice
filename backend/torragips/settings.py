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
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DATABASE_NAME', default='torragips_db'),
        'USER': config('DATABASE_USER', default=''),
        'PASSWORD': config('DATABASE_PASSWORD', default=''),
        'HOST': config('DATABASE_HOST', default='localhost'),
        'PORT': config('DATABASE_PORT', default='5432'),
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
    # In production only expose JSON — no public HTML browsable API explorer.
    'DEFAULT_RENDERER_CLASSES': (
        [
            'rest_framework.renderers.JSONRenderer',
            'rest_framework.renderers.BrowsableAPIRenderer',
        ] if DEBUG else [
            'rest_framework.renderers.JSONRenderer',
        ]
    ),
    'DEFAULT_PAGINATION_CLASS': 'core.pagination.StandardPagination',
    'PAGE_SIZE': 25,
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '20/minute',
        'user': '200/minute',
        'login': '5/minute',
    },
}

# CORS
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:3000,http://localhost:3001',
    cast=Csv(),
)
# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '[{asctime}] {levelname} {name} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': 'WARNING',
            'class': 'logging.FileHandler',
            'filename': BASE_DIR / 'logs' / 'django.log',
            'formatter': 'verbose',
        },
        'security_file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': BASE_DIR / 'logs' / 'security.log',
            'formatter': 'verbose',
        },
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file', 'console'],
            'level': 'WARNING',
            'propagate': True,
        },
        'django.security': {
            'handlers': ['security_file', 'console'],
            'level': 'INFO',
            'propagate': False,
        },
        'django.request': {
            'handlers': ['file', 'console'],
            'level': 'WARNING',
            'propagate': False,
        },
        'core': {
            'handlers': ['file', 'console'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}

CORS_ALLOW_HEADERS = [
    'accept',
    'authorization',
    'content-type',
    'origin',
    'x-csrftoken',
    'x-requested-with',
]

# ── Production security hardening ──
# Applied only when DEBUG is off, so local dev over http is unaffected.
# NOTE: SECURE_SSL_REDIRECT / HSTS are intentionally left out here — enable them
# in your hosting/proxy config once HTTPS is confirmed (see PRODUCTION_CHECKLIST.md)
# to avoid redirect loops behind a misconfigured proxy.
if not DEBUG:
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    CSRF_COOKIE_SECURE = True
    X_FRAME_OPTIONS = 'DENY'

# Unfold admin
UNFOLD = {
    "SITE_TITLE": "Torra Gips",
    "SITE_HEADER": "Torra Gips Management",
    "SITE_SYMBOL": "construction",
    "STYLES": [
        lambda request: "css/admin_custom.css",
    ],
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
                    {
                        "title": "Te gjithe Klientet",
                        "icon": "groups",
                        "link": "/admin/dashboard/clients/",
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
