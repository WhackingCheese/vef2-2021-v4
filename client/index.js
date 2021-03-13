import { fetchEarthquakes } from './lib/earthquakes';
import { el, element, formatDate, toISL, toSize } from './lib/utils';
import { init, createPopup } from './lib/map';

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.has('type') ? urlParams.get('type') : 'all';
  const period = urlParams.has('period') ? urlParams.get('period') : 'hour';
  const earthquakes = await fetchEarthquakes(period, type);
  const loading = document.querySelector('.loading');
  const parent = loading.parentNode;
  if (!earthquakes) {
    parent.removeChild(loading);
    parent.appendChild(el('p', 'Villa við að sækja gögn'),);
  }
  init(document.querySelector('.map'));
  const earthquake_list = document.querySelector('.earthquakes');
  earthquake_list.textContent = '';
  earthquakes.data.features.forEach((quake) => {
    const {
      title, mag, time, url,
    } = quake.properties;
    const link = element('a', { href: url, target: '_blank' }, null, 'Skoða nánar');
    const markerContent = el('div',
      el('h3', title),
      el('p', formatDate(time)),
      el('p', link));
    const marker = createPopup(quake.geometry, markerContent.outerHTML);
    const onClick = () => {
      marker.openPopup();
    };
    const li = el('li');
    li.appendChild(
      el('div',
        el('h2', title),
        el('dl',
          el('dt', 'Tími'),
          el('dd', formatDate(time)),
          el('dt', 'Styrkur'),
          el('dd', `${mag}M`),
          el('dt', 'Nánar'),
          el('dd', url.toString())),
        element('div', { class: 'buttons' }, null,
          element('button', null, { click: onClick }, 'Sjá á korti'),
          link)),
    );
    earthquake_list.appendChild(li);
  });
  const h1 = document.querySelector('.earthquakes_h1');
  h1.innerHTML = `Sýnir ${toSize(type)} ${toISL(period)}`;
  const cache = document.querySelector('.cache');
  const cachedText = earthquakes.info.cached ? 'Gögn eru í Cache.' : 'Gögn eru ekki i Cache.';
  cache.innerHTML = `${cachedText} Fyrirspurn í USGS tók ${earthquakes.info.elapsed} sekúndur.`;
  if (earthquakes.data.features.length == 0) {
    parent.removeChild(loading);
    parent.appendChild(el('p', 'Engir jarðskjálftar fundust.'));
  } else {
    loading.classList.add('hidden');
  }
});
