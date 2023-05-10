export const fetchCountries = name =>
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw `Oops, there is no country with that name: "${name}"`;
    }
    return response.json();
  });
