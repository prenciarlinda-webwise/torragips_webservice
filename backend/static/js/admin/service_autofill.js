(function() {
    'use strict';

    // Fetch the service catalog data once
    let serviceCatalog = null;

    function fetchServiceCatalog() {
        return fetch('/api/services/?page_size=1000&format=json', {
            credentials: 'same-origin',
        })
        .then(response => response.json())
        .then(data => {
            serviceCatalog = {};
            const results = data.results || data;
            results.forEach(function(service) {
                serviceCatalog[service.id] = service;
            });
        })
        .catch(() => {
            // API not available, autofill won't work
        });
    }

    function setupAutofill() {
        document.addEventListener('change', function(e) {
            if (!e.target.matches('select[id$="-service"]')) return;
            if (!serviceCatalog) return;

            const serviceId = e.target.value;
            if (!serviceId) return;

            const service = serviceCatalog[serviceId];
            if (!service) return;

            // Find the row prefix (e.g., "id_items-0")
            const prefix = e.target.id.replace('-service', '');

            const nameField = document.getElementById(prefix + '-service_name');
            const unitField = document.getElementById(prefix + '-unit');
            const priceField = document.getElementById(prefix + '-price');

            if (nameField && !nameField.value) nameField.value = service.name;
            if (unitField) unitField.value = service.default_unit;
            if (priceField && (!priceField.value || priceField.value === '0')) {
                priceField.value = service.default_price;
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            fetchServiceCatalog();
            setupAutofill();
        });
    } else {
        fetchServiceCatalog();
        setupAutofill();
    }
})();
