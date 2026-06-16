async function consultarPais() {

    const pais = document.getElementById("txtPais").value.trim();
    const resultado = document.getElementById("resultado");

    if (pais === "") {
        resultado.innerHTML = `
            <div class="alert alert-warning">
                Escribe un país.
            </div>
        `;
        return;
    }

    try {

        const respuesta = await fetch(
            `https://restcountries.com/v3.1/name/${pais}?fullText=true`
        );

        if (!respuesta.ok) {
            throw new Error("País no encontrado");
        }

        const datos = await respuesta.json();

        const info = datos[0];

        resultado.innerHTML = `
            <div class="card shadow-sm">
                <div class="card-body text-center">

                    <img
                        src="${info.flags.png}"
                        class="bandera mb-3">

                    <h3>${info.name.common}</h3>

                    <p><strong>Capital:</strong> ${info.capital ? info.capital[0] : "No disponible"}</p>

                    <p><strong>Región:</strong> ${info.region}</p>

                    <p><strong>Población:</strong> ${info.population.toLocaleString()}</p>

                </div>
            </div>
        `;

    } catch (error) {

        resultado.innerHTML = `
            <div class="alert alert-danger">
                País no encontrado
            </div>
        `;
    }
}
