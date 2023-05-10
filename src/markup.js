export const markupCountryList = function (countries) {
  return countries
    .map(({ name, flags }) => {
      return `<li class="country-title">
                <img class="country-img" src="${flags.svg}" alt="${name.official}"/>
                <p class="country-list-name">${name.official}</p>
              </li>`;
    })
    .join('');
};

export const markupCountryInfo = function ([
  { name, capital, population, flags, languages },
]) {
  return `<div class="country-title">
            <img class="country-img" src="${flags.svg}" alt="${name.official}"/>
            <p class="country-name">${name.official}</p>
          </div>
          <div class="country-desc">
            <p class="country-property"><span class="country-key">Capital: </span> ${capital}</p>
            <p class="country-property"><span class="country-key">Population: </span>${population}</p>
            <p class="country-property"><span class="country-key">Languages: </span> ${Object.values(
              languages
            ).join(', ')}</p>
            
          </div>`;
};
