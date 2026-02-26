from django.http import HttpResponse, HttpResponseForbidden
from django.template.loader import render_to_string
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from core.models import ListeCmimesh, Preventiv, Situacion


def render_pdf(template_name, context, filename):
    import io
    from xhtml2pdf import pisa
    html_string = render_to_string(template_name, context)
    result = io.BytesIO()
    pisa_status = pisa.CreatePDF(io.StringIO(html_string), dest=result)
    if pisa_status.err:
        return HttpResponse('PDF generation error', status=500)
    response = HttpResponse(result.getvalue(), content_type='application/pdf')
    response['Content-Disposition'] = f'inline; filename="{filename}"'
    return response


def check_auth(request):
    """Allow staff via session OR token auth."""
    if request.user.is_authenticated and request.user.is_staff:
        return True
    auth = request.META.get('HTTP_AUTHORIZATION', '')
    if auth.startswith('Token '):
        token_key = auth.split(' ', 1)[1]
        try:
            token = Token.objects.select_related('user').get(key=token_key)
            if token.user.is_staff:
                request.user = token.user
                return True
        except Token.DoesNotExist:
            pass
    return False


def liste_cmimesh_pdf(request, pk):
    if not check_auth(request):
        return HttpResponseForbidden('Not authorized')
    obj = get_object_or_404(ListeCmimesh.objects.select_related('project__client'), pk=pk)
    context = {
        'doc': obj,
        'items': obj.items.all(),
        'project': obj.project,
        'client': obj.project.client,
    }
    filename = f"liste_cmimesh_{obj.project.name}.pdf"
    return render_pdf('pdf/liste_cmimesh.html', context, filename)


def preventiv_pdf(request, pk):
    if not check_auth(request):
        return HttpResponseForbidden('Not authorized')
    obj = get_object_or_404(Preventiv.objects.select_related('project__client'), pk=pk)
    context = {
        'doc': obj,
        'items': obj.items.all(),
        'project': obj.project,
        'client': obj.project.client,
    }
    filename = f"preventiv_{obj.preventiv_number}_{obj.project.name}.pdf"
    return render_pdf('pdf/preventiv.html', context, filename)


def situacion_pdf(request, pk):
    if not check_auth(request):
        return HttpResponseForbidden('Not authorized')
    obj = get_object_or_404(Situacion.objects.select_related('project__client'), pk=pk)
    context = {
        'doc': obj,
        'items': obj.items.all(),
        'project': obj.project,
        'client': obj.project.client,
    }
    filename = f"situacion_{obj.situacion_number}_{obj.project.name}.pdf"
    return render_pdf('pdf/situacion.html', context, filename)
