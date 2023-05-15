
import './css/styles.css';
import {fetchCountries} from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
//import ApiCountry from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

let markup = '';

function onSearch() {
  if (!searchBox.value.trim()) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return;
  }
 
    fetchCountries(searchBox.value.trim())
      .then(renderCountryList)
      .catch(error => {
        console.log(error);
        Notiflix.Notify.failure('Oops, there is no country with that name');
        countryList.innerHTML = '';
      });
  }


function renderCountryList(countries) {
  if (countries.length > 1 && countries.length <= 10) {
    createCoutriesList(countries);
    countryList.innerHTML = '';
    countryInfo.innerHTML = markup;
  } else if (countries.length === 1) {
    createCountryMarkup(countries);
    countryInfo.innerHTML = '';
    countryList.innerHTML = markup;
  } else if (countries.length > 10) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}
function createCoutriesList(countries) {
  markup = countries.map(country => {
      return `<li>
            <img src=" ${country.flags.svg}" width=50 alt="${country.name.common}"/>
            <span> ${country.name.official}</span>
            </li>`;
    })
    .join('');
}
function createCountryMarkup(countries) {
  markup = countries.map(country => {
    return `<li>
    <img src="${country.flags.svg}" width = 30 alt="${country.name.common}" />
    <span>${country.name.official}</span>
    </li>
    <div>Capital: ${country.capital}</div>
    <div>Population: ${country.population}</div>
    <div>Languages: ${Object.values(country.languages).join(`, `)}</div>`;
  });
}
