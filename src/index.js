import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import { fetchCountries } from './js/fetchCountries';

import markupList from './js/templates/markupList.hbs';
import markupInfo from './js/templates/markupInfo.hbs';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

function onCountrySearch(evt) {
  const countrySearchValue = evt.target.value.trim();
  if (!countrySearchValue) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }

  fetchCountries(countrySearchValue)
    .then(countries => {
      console.log(countries);
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length > 2 && countries.length <= 10) {
        countryInfo.innerHTML = '';
        renderList(countries);
      } else if (countries.length === 1) {
        countryList.innerHTML = '';
        renderInfo(countries);
      }
    })
    .catch(err => {
      Notiflix.Notify.failure(err.message);
    });
}

function renderList(countries) {
  const markupListCountries = markupList(countries);
  console.log(countries);
  countryList.innerHTML = markupListCountries;
}

function renderInfo(countries) {
  console.log('123');
  const markupInfoCountry = markupInfo(countries);
  console.log(markupInfoCountry);
  countryInfo.innerHTML = markupInfoCountry;
}
