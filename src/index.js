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
    .then(parseData)
    .catch(error => {
      if (error.message === '404') {
        Notify.failure('Oops, there is no country with that name');
        return;
      }
      console.log(error);
    });
}

function parseData(data) {
  if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  if (data.length > 1) {
    renderCountryList(data);
    return;
  }

  renderCountryInfo(data);
}

function renderCountryList(data) {
  refs.countryList.innerHTML = markupCountryList(data);
}

function renderCountryInfo(data) {
  refs.countryInfo.innerHTML = markupCountryInfo(data);
}

function clearOutput() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
