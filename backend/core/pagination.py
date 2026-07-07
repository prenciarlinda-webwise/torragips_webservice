from rest_framework.pagination import PageNumberPagination


class StandardPagination(PageNumberPagination):
    """Default page size of 25, but allow the client to request a larger page
    via ?page_size= (capped at max_page_size).

    The stock PageNumberPagination ignores ?page_size entirely, which silently
    capped every list at 25 rows — making the dashboard's revenue/cost totals
    (computed client-side over ?page_size=1000) undercount once a project had
    more than 25 payments/costs.
    """

    page_size = 25
    page_size_query_param = 'page_size'
    max_page_size = 1000
