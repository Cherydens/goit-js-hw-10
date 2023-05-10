import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import { markupCountryInfo, markupCountryList } from './markup';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  clearOutput();
  const inputValue = evt.target.value.trim();
  if (!inputValue) {
    return;
  }

  fetchCountries(inputValue)
    .then(response => {
      if (!response.ok) {
        throw new Error('Oops, there is no country with that name');
      }
      return response.json();
    })

    .then(data => {
      if (data.length > 10) {
        toManyInfo();
        return;
      }

      if (data.length > 1) {
        refs.countryList.innerHTML = markupCountryList(data);
        return;
      }

      refs.countryInfo.innerHTML = markupCountryInfo(data);
    })

    .catch(onError);
}

function toManyInfo() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function onError(error) {
  return Notify.failure(error.toString());
}

function clearOutput() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
