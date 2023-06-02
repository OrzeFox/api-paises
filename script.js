document.addEventListener("DOMContentLoaded", () => {
  const countryList = document.getElementById("country-list");
  const sortAscButton = document.getElementById("asc-button");
  const descButton = document.getElementById("desc-button");
  const searchInput = document.getElementById("search-input");
  let sortOrder = "asc";
  let countries = [];

  const sortCountries = () => {
    countries.sort((a, b) => {
      const nameA = a.name.common.toLowerCase();
      const nameB = b.name.common.toLowerCase();

      if (sortOrder === "asc") {
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
      } else {
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
      }

      return 0;
    });

    renderCountries();
  };

  const renderCountries = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredCountries = countries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.includes(searchTerm);
    });

    countryList.innerHTML = "";

    const countryElements = filteredCountries.map((country) => {
      const { name, flags, population, region, capital } = country;

      const listItem = document.createElement("li");
      const flagImg = document.createElement("img");
      flagImg.classList.add("flag");
      flagImg.src = flags.png;
      flagImg.alt = `${name.common} Flag`;

      const countryInfo = document.createElement("div");
      countryInfo.classList.add("country-info");
      const countryName = document.createElement("h3");
      countryName.textContent = name.common;
      const populationInfo = document.createElement("p");
      populationInfo.innerHTML = `<strong>Population:</strong> ${population.toLocaleString()}`;
      const regionInfo = document.createElement("p");
      regionInfo.innerHTML = `<strong>Region:</strong> ${region}`;
      const capitalInfo = document.createElement("p");
      capitalInfo.innerHTML = `<strong>Capital:</strong> ${capital}`;

      countryInfo.appendChild(countryName);
      countryInfo.appendChild(populationInfo);
      countryInfo.appendChild(regionInfo);
      countryInfo.appendChild(capitalInfo);

      listItem.appendChild(flagImg);
      listItem.appendChild(countryInfo);

      return listItem;
    });

    countryElements.forEach((element) => {
      countryList.appendChild(element);
    });
  };

  sortAscButton.addEventListener("click", () => {
    sortOrder = "asc";
    sortCountries();
  });

  descButton.addEventListener("click", () => {
    sortOrder = "desc";
    sortCountries();
  });

  searchInput.addEventListener("input", () => {
    renderCountries();
  });

  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      countries = data;
      sortCountries();
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});
