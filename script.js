document.addEventListener("DOMContentLoaded", () => {
  const listaPaises = document.getElementById("lista-paises");
  const botonOrdenAsc = document.getElementById("boton-ascendente");
  const botonOrdenDesc = document.getElementById("boton-descendente");
  const inputBusqueda = document.getElementById("input-busqueda");
  let ordenamiento = "asc";
  let paises = [];

  const ordenarPaises = () => {
    paises.sort((a, b) => {
      const nombreA = a.name.common.toLowerCase();
      const nombreB = b.name.common.toLowerCase();

      if (ordenamiento === "asc") {
        if (nombreA < nombreB) return -1;
        if (nombreA > nombreB) return 1;
      } else {
        if (nombreA > nombreB) return -1;
        if (nombreA < nombreB) return 1;
      }

      return 0;
    });

    mostrarPaises();
  };

  const mostrarPaises = () => {
    const terminoBusqueda = inputBusqueda.value.toLowerCase().trim();

    const paisesFiltrados = paises.filter((pais) => {
      const nombrePais = pais.name.common.toLowerCase();
      return nombrePais.includes(terminoBusqueda);
    });

    listaPaises.innerHTML = "";

    const elementosPais = paisesFiltrados.map((pais) => {
      const { name, flags, population, region, capital } = pais;

      const elementoLista = document.createElement("li");
      const banderaImg = document.createElement("img");
      banderaImg.classList.add("bandera");
      banderaImg.src = flags.png;
      banderaImg.alt = `Bandera de ${name.common}`;

      const infoPais = document.createElement("div");
      infoPais.classList.add("info-pais");
      const nombrePaisElemento = document.createElement("h3");
      nombrePaisElemento.textContent = name.common;
      const poblacionInfo = document.createElement("p");
      poblacionInfo.innerHTML = `<strong>Población:</strong> ${population.toLocaleString()}`;
      const regionInfo = document.createElement("p");
      regionInfo.innerHTML = `<strong>Región:</strong> ${region}`;
      const capitalInfo = document.createElement("p");
      capitalInfo.innerHTML = `<strong>Capital:</strong> ${capital}`;

      infoPais.appendChild(nombrePaisElemento);
      infoPais.appendChild(poblacionInfo);
      infoPais.appendChild(regionInfo);
      infoPais.appendChild(capitalInfo);

      elementoLista.appendChild(banderaImg);
      elementoLista.appendChild(infoPais);

      return elementoLista;
    });

    elementosPais.forEach((elemento) => {
      listaPaises.appendChild(elemento);
    });
  };

  botonOrdenAsc.addEventListener("click", () => {
    ordenamiento = "asc";
    ordenarPaises();
  });

  botonOrdenDesc.addEventListener("click", () => {
    ordenamiento = "desc";
    ordenarPaises();
  });

  inputBusqueda.addEventListener("input", () => {
    mostrarPaises();
  });

  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      paises = data;
      ordenarPaises();
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});
