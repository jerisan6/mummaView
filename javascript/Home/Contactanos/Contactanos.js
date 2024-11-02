document.addEventListener('DOMContentLoaded', function() {
    const selectPais = document.getElementById('codigoPais');
    
    // Llamada a la API de países
    fetch('https://restcountries.com/v3.1/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return response.json();
        })
        .then(countries => {
            // Limpiar el select
            selectPais.innerHTML = '';
            
            // Crear array de códigos de país
            const codigosPais = countries
                .filter(country => country.idd && country.idd.root)
                .map(country => {
                    const codigo = country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '');
                    return {
                        codigo: codigo,
                        nombre: country.name.common
                    };
                })
                .sort((a, b) => a.codigo.localeCompare(b.codigo));

            // Agregar Perú como primera opción
            const optionPeru = document.createElement('option');
            optionPeru.value = '+51';
            optionPeru.textContent = '+51';
            optionPeru.selected = true;
            selectPais.appendChild(optionPeru);

            // Agregar todos los códigos de país
            codigosPais.forEach(pais => {
                if (pais.codigo !== '+51') {  // Evitar duplicar Perú
                    const option = document.createElement('option');
                    option.value = pais.codigo;
                    option.textContent = pais.codigo;
                    selectPais.appendChild(option);
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar los códigos de país:', error);
            // Opción de respaldo si falla la API
            selectPais.innerHTML = '<option value="+51">+51</option>';
        });
});