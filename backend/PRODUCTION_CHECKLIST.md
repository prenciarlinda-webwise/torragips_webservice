# Torra Gips — Production Security Checklist

The dashboard holds private client data (names, phone numbers, finances). This is
the list to work through **on the live server** before/while it serves real data.
Local development (`DEBUG=True`, localhost) is unaffected by any of this.

---

## 1. Server `.env` (the single most important item)

The repo's `backend/.env` is the **local dev** file — it has `DEBUG=True` and a
placeholder secret key. The **live server** must have its own `.env` with:

- [ ] `DEBUG=False`
      → With `DEBUG=True`, Django error pages show stack traces **including
      database values** to anyone who triggers an error. This is the #1 way data leaks.
- [ ] `SECRET_KEY=<long random string>`
      → Generate one: `python -c "import secrets; print(secrets.token_urlsafe(64))"`.
      Never the `django-insecure-change-me…` placeholder.
- [ ] `ALLOWED_HOSTS=torragips.com,www.torragips.com` (your real API host)
- [ ] `CORS_ALLOWED_ORIGINS=https://torragips.com,https://www.torragips.com`
      → Only the real frontend. Never `*`. This is what stops other websites'
      JavaScript from reading the API with a stolen/forwarded session.
- [ ] `DATABASE_*` set to the production database with a strong password.

Verify after deploy:
```bash
DJANGO_SETTINGS_MODULE=torragips.settings python -c \
"import django; django.setup(); from django.conf import settings; \
print('DEBUG', settings.DEBUG); print('HOSTS', settings.ALLOWED_HOSTS)"
# Expect: DEBUG False
```

## 2. HTTPS (enable in the host/proxy, then in Django)

Once the live site is confirmed working over `https://`:

- [ ] TLS termination is handled by the host/reverse proxy (Nginx, Caddy, the PaaS).
- [ ] The proxy forwards `X-Forwarded-Proto: https` (already trusted by
      `SECURE_PROXY_SSL_HEADER` in settings).
- [ ] Then turn on redirect + HSTS by adding to the server `.env` handling or
      `settings.py` (kept out of code to avoid redirect loops behind a bad proxy):
      ```python
      SECURE_SSL_REDIRECT = True
      SECURE_HSTS_SECONDS = 31536000
      SECURE_HSTS_INCLUDE_SUBDOMAINS = True
      SECURE_HSTS_PRELOAD = True
      ```

Already enforced automatically when `DEBUG=False` (see `settings.py`):
secure + httponly cookies, `X-Frame-Options: DENY`, `nosniff`.

## 3. API surface — no leaks

These are already true in code; this is the verification list:

- [ ] **Every endpoint requires login.** Global default is `IsAuthenticated`; no
      viewset overrides it to `AllowAny`. Quick check — hitting the API with no
      token must return 401:
      ```bash
      curl -s -o /dev/null -w "%{http_code}\n" https://API_HOST/api/clients/
      # Expect: 401
      ```
- [ ] **PDF endpoints require staff auth.** `/pdf/...` returns 403 without a staff
      session/token:
      ```bash
      curl -s -o /dev/null -w "%{http_code}\n" https://API_HOST/pdf/situacion/1/
      # Expect: 403
      ```
- [ ] **Browsable API is off in prod.** The HTML API explorer is disabled when
      `DEBUG=False` (JSON only) — `GET /api/clients/` in a browser shows no UI.
- [ ] **Login is throttled** (5/min anon) to slow password guessing.
- [ ] **Admin** (`/admin/`) is protected by Django's staff login (unchanged).

## 4. Search engines / indexing

- [ ] `robots.txt` disallows `/dashboard/` and `/api/` (set in `src/app/robots.ts`).
- [ ] Dashboard pages send `noindex, nofollow` (set in `src/app/dashboard/layout.tsx`).
- [ ] After deploy, confirm `https://www.torragips.com/robots.txt` lists both Disallows.

## 5. Accounts

- [ ] Only real staff have Django user accounts (`/admin/auth/user/`).
- [ ] Strong unique passwords; remove any leftover test/superuser accounts.
- [ ] Reminder: there is currently **one shared level of access** — every logged-in
      user sees all clients and finances. If you need per-employee restrictions,
      that's a separate feature (ask and we'll scope it).

---

### Known follow-ups (not blocking)

- Dashboard revenue/cost totals are computed in the browser over `?page_size=1000`.
  The pagination fix (`core/pagination.py`) lets that work up to 1000 records per
  list; beyond that, totals should move to a server-side aggregate endpoint.
