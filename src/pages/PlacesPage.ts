import { geoNaturalEarth1, geoPath } from 'd3-geo';
import type { FeatureCollection, Geometry } from 'geojson';
import { feature } from 'topojson-client';
import worldAtlas from 'world-atlas/countries-110m.json';

import { createElement, appendChildren } from '../utils/dom';

type VisitedCountry = {
  name: string;
  label: string;
  year: string;
  note: string;
};

const visitedCountries: VisitedCountry[] = [
  {
    name: 'United States of America',
    label: 'United States',
    year: '2021 - 2025',
    note: 'Most of the scenes on this page are from across the US.',
  },
  {
    name: 'Canada',
    label: 'Canada',
    year: '2026',
    note: 'Graduate school home base and the newest stop on the map.',
  },
  {
    name: 'United Arab Emirates',
    label: 'United Arab Emirates',
    year: '2025',
    note: 'Dubai scenes and travel memories.',
  },
  {
    name: 'India',
    label: 'India',
    year: '2022 - 2025',
    note: 'Delhi, New Delhi, and Goa scenes.',
  },
  {
    name: 'Thailand',
    label: 'Thailand',
    year: '2025',
    note: 'A recent travel stop.',
  },
  {
    name: 'Vietnam',
    label: 'Vietnam',
    year: '2025',
    note: 'First-time visit highlighted on the map.',
  },
];

const visitedCountryLookup = new Map(visitedCountries.map((country) => [country.name, country]));

// Map each place location to its country (null if unmapped/event-based)
const placeToCountryMap: Record<string, string | null> = {
  'Minneapolis': 'United States of America',
  'Chicago': 'United States of America',
  'Dubai': 'United Arab Emirates',
  'Kendrick Lamar & SZA': null,
  'My first solo apartment': null,
  'New Delhi': 'India',
  'Santa Cruz': 'United States of America',
  'Delhi': 'India',
  'Detroit': 'United States of America',
  'Lake of the Isles': 'United States of America',
  'Kendrick Lamar': null,
  'Baby Keem': null,
  'SZA': null,
  'Playing Smash Bros at work': null,
  'Ferrari World': 'United Arab Emirates',
  'St. Paul': 'United States of America',
  'Wisconsin': 'United States of America',
};

export function createPlacesPage(): HTMLElement {
  const page = createElement('div', 'page places-page');

  const header = createElement('section', 'page-header');
  const title = createElement('h1', 'page-title', 'Scenes');
  const subtitle = createElement('p', 'page-subtitle', 'Scenes that live rent free in my brain');

  appendChildren(header, title, subtitle);

  // Create country filters section (between map and carousel)
  const countryFiltersSection = createElement('section', 'country-filters-section');
  const countryFiltersList = createElement('div', 'country-filters-list');
  
  // Add "Show All" button at the start
  const countryFilterShowAll = createElement('button', 'country-filter-item show-all', 'All Photos');
  countryFilterShowAll.setAttribute('data-country', 'all');
  countryFiltersList.appendChild(countryFilterShowAll);

  // Add "Core" button
  const coreFilterButton = createElement('button', 'country-filter-item', 'Core');
  coreFilterButton.setAttribute('data-filter', 'core');
  countryFiltersList.appendChild(coreFilterButton);
  
  // Add visited countries
  visitedCountries.forEach((country) => {
    const countryItem = createElement('button', 'country-filter-item', country.label);
    countryItem.setAttribute('data-country', country.name);
    countryFiltersList.appendChild(countryItem);
  });
  
  appendChildren(countryFiltersSection, countryFiltersList);

  const mapSection = createElement('section', 'world-map-section');
  const mapHeader = createElement('div', 'world-map-header');

  const mapCard = createElement('div', 'world-map-card');
  const mapSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  mapSvg.setAttribute('class', 'world-map-svg');
  mapSvg.setAttribute('viewBox', '0 0 960 480');
  mapSvg.setAttribute('role', 'img');
  mapSvg.setAttribute('aria-label', 'Interactive world map');

  const mapLoading = createElement('p', 'world-map-loading', 'Rendering world map...');
  const mapOverlay = createElement('div', 'world-map-overlay');
  appendChildren(mapOverlay, mapLoading);
  mapCard.appendChild(mapSvg);
  mapCard.appendChild(mapOverlay);
  appendChildren(mapSection, mapHeader, mapCard);

  const content = createElement('section', 'page-content');

  // Places data - 31 locations with their years
  const places = [
    { location: 'Minneapolis', year: '2021' },
    { location: 'Chicago', year: '2022' },
    { location: 'Dubai', year: '2025' },
    { location: 'Kendrick Lamar & SZA', year: '2025' },
    { location: 'My first solo apartment', year: '2025' },
    { location: 'Dubai', year: '2025' },
    { location: 'Minneapolis', year: '2024' },
    { location: 'Minneapolis', year: '2022' },
    { location: 'New Delhi', year: '2022' },
    { location: 'Minneapolis', year: '2024' },
    { location: 'Santa Cruz', year: '2022' },
    { location: 'Dubai', year: '2025' },
    { location: 'Delhi', year: '2025' },
    { location: 'Dubai', year: '2025' },
    { location: 'Detroit', year: '2025' },
    { location: 'Lake of the Isles', year: '2025' },
    { location: 'Detroit', year: '2025' },
    { location: 'Detroit', year: '2025' },
    { location: 'Kendrick Lamar', year: '2023' },
    { location: 'Baby Keem', year: '2023' },
    { location: 'SZA', year: '2025' },
    { location: 'Playing Smash Bros at work', year: '2025' },
    { location: 'Ferrari World', year: '2025' },
    { location: 'St. Paul', year: '2022' },
    { location: 'Kendrick Lamar', year: '2023' },
    { location: 'Minneapolis', year: '2023' },
    { location: 'Minneapolis', year: '2025' },
    { location: 'Wisconsin', year: '2022' },
    { location: 'Minneapolis', year: '2023' },
    { location: 'Dubai', year: '2025' },
    { location: 'Minneapolis', year: '2021' },
  ];

  // Create place cards with images
  places.forEach((place, idx) => {
    const placeCard = createElement('div', 'place-card');
    placeCard.setAttribute('data-index', String(idx + 1));

    const imageWrapper = createElement('div', 'place-image-wrapper');

    const leftZone = createElement('div', 'image-nav-zone left-zone');
    const rightZone = createElement('div', 'image-nav-zone right-zone');

    const image = createElement('img', 'place-image') as HTMLImageElement;
    image.src = `/image/scenes/${idx + 1}.jpeg`;
    image.alt = place.location;
    image.loading = 'lazy';

    appendChildren(imageWrapper, leftZone, image, rightZone);

    const placeInfo = createElement('div', 'place-info');
    const location = createElement('h3', 'place-location', place.location);
    const year = createElement('span', 'place-year', place.year);
    appendChildren(placeInfo, location, year);

    appendChildren(placeCard, imageWrapper, placeInfo);
    content.appendChild(placeCard);
  });

  const numberList = createElement('div', 'number-list');
  const controls = createElement('div', 'number-controls');
  const prevBtn = createElement('div', 'number-button prev');
  prevBtn.innerHTML = `<span class="icon">◀</span><span>prev</span>`;
  const nextBtn = createElement('div', 'number-button next');
  nextBtn.innerHTML = `<span>next</span><span class="icon">▶</span>`;
  appendChildren(controls, prevBtn, numberList, nextBtn);

  appendChildren(page, header, mapSection, countryFiltersSection, content, controls);

  const worldTopology = worldAtlas as any;
  const worldGeo = feature(worldTopology, worldTopology.objects.countries) as unknown as FeatureCollection<
    Geometry,
    { name?: string }
  >;
  const projection = geoNaturalEarth1().fitSize([960, 480], worldGeo);
  const pathGenerator = geoPath(projection);
  const svgNS = 'http://www.w3.org/2000/svg';

  const createSvgElement = <K extends keyof SVGElementTagNameMap>(tagName: K, className?: string) => {
    const element = document.createElementNS(svgNS, tagName);
    if (className) element.setAttribute('class', className);
    return element as SVGElementTagNameMap[K];
  };

  const countryPaths = new Map<string, SVGPathElement>();
  let selectedCountryName = visitedCountries[0].name;
  let selectedCountryForFilter: string | null = null;
  let filteredIndices: number[] = Array.from({ length: 31 }, (_, i) => i + 1); // All indices initially
  let currentFilteredPosition: number = 0; // 0-based position in filtered list

  // Helper: count photos for a country
  const getPhotoCountForCountry = (countryName: string): number => {
    let count = 0;
    places.forEach((place) => {
      const placeCountry = placeToCountryMap[place.location] ?? null;
      if (placeCountry === countryName) {
        count++;
      }
    });
    return count;
  };

  // Create tooltip element
  const tooltip = createElement('div', 'country-hover-tooltip');
  tooltip.style.display = 'none';
  tooltip.style.position = 'fixed';
  tooltip.style.zIndex = '1000';
  page.appendChild(tooltip);

  const cards = content.querySelectorAll<HTMLElement>('.place-card');

  // Helper: get all indices matching a country
  const getFilteredIndices = (countryFilter: string | null): number[] => {
    if (countryFilter === null) {
      return Array.from({ length: 31 }, (_, i) => i + 1); // All indices
    }

    const matching: number[] = [];
    places.forEach((place, idx) => {
      const placeCountry = placeToCountryMap[place.location] ?? null;
      if (placeCountry === countryFilter) {
        matching.push(idx + 1); // 1-indexed
      }
    });
    return matching;
  };

  // Helper: regenerate number list based on filtered indices
  const updateNumberList = () => {
    numberList.innerHTML = '';
    filteredIndices.forEach((_, position) => {
      // Display position as 1, 2, 3... (not the actual index)
      const numberItem = createElement('span', 'number-item', (position + 1).toString());
      numberList.appendChild(numberItem);
    });
  };

  const applyFilter = (filteredPosition: number | null) => {
    const numberItems = page.querySelectorAll('.number-item');

    numberItems.forEach((n) => {
      const pos = parseInt(n.textContent || '0', 10);
      if (filteredPosition !== null && pos === filteredPosition) {
        n.classList.add('active');
      } else {
        n.classList.remove('active');
      }
    });

    cards.forEach((card) => {
      const cardIdx = parseInt(card.getAttribute('data-index') || '0', 10);

      // Check if this card's index is in the filtered list
      const positionInFiltered = filteredIndices.indexOf(cardIdx);

      if (filteredPosition === null) {
        // Show all cards in filtered list
        card.style.display = positionInFiltered >= 0 ? '' : 'none';
      } else {
        // Show only the card at this position
        const targetIdx = filteredIndices[filteredPosition - 1]; // filteredPosition is 1-indexed
        card.style.display = cardIdx === targetIdx ? '' : 'none';
      }
    });
  };

  const updateSelectedCountry = (countryName: string) => {
    selectedCountryName = countryName;

    // Toggle country filter: if clicking same country, clear it; otherwise set it
    if (selectedCountryForFilter === countryName) {
      selectedCountryForFilter = null;
    } else {
      selectedCountryForFilter = countryName;
    }

    // Update filtered indices and regenerate number list
    filteredIndices = getFilteredIndices(selectedCountryForFilter);
    updateNumberList();
    currentFilteredPosition = filteredIndices.length > 0 ? 1 : 0; // 1-indexed position

    countryPaths.forEach((path, name) => {
      path.classList.toggle('selected', name === selectedCountryName);
    });

    // Apply filtering - show first item if available
    applyFilter(filteredIndices.length > 0 ? 1 : null);
  };

  worldGeo.features.forEach((featureItem) => {
    const countryName = featureItem.properties?.name ?? 'Unknown';
    const pathData = pathGenerator(featureItem as any);

    if (!pathData) return;

    const path = createSvgElement('path', 'world-country');
    path.setAttribute('d', pathData);
    path.setAttribute('data-country', countryName);
    path.setAttribute('tabindex', '0');
    path.setAttribute('role', 'button');
    path.setAttribute('aria-label', countryName);
    path.dataset.visited = visitedCountryLookup.has(countryName) ? 'true' : 'false';

    const titleNode = createSvgElement('title');
    titleNode.textContent = visitedCountryLookup.has(countryName) ? `${countryName} - visited` : countryName;
    path.appendChild(titleNode);

    path.addEventListener('click', () => updateSelectedCountry(countryName));
    path.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        updateSelectedCountry(countryName);
      }
    });

    // Add hover tooltip for visited countries
    if (visitedCountryLookup.has(countryName)) {
      const photoCount = getPhotoCountForCountry(countryName);
      path.addEventListener('mouseover', () => {
        tooltip.textContent = `View all ${photoCount} photo${photoCount !== 1 ? 's' : ''}`;
        tooltip.style.display = 'block';
        
        const rect = path.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
      });

      path.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
      });
    }

    countryPaths.set(countryName, path);
    mapSvg.appendChild(path);
  });


  mapOverlay.remove();

  if (filteredIndices.length > 0) {
    updateNumberList(); // Initialize number list

    numberList.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target || !target.classList.contains('number-item')) return;
      const position = target.textContent ? parseInt(target.textContent, 10) : NaN;
      if (isNaN(position) || position < 1 || position > filteredIndices.length) return;

      currentFilteredPosition = position;
      applyFilter(position);
    });

    // Show first photo initially
    applyFilter(1);
    currentFilteredPosition = 1;

    const navigateToPrev = () => {
      if (currentFilteredPosition > 1) {
        currentFilteredPosition--;
        applyFilter(currentFilteredPosition);
      }
    };

    const navigateToNext = () => {
      if (currentFilteredPosition < filteredIndices.length) {
        currentFilteredPosition++;
        applyFilter(currentFilteredPosition);
      }
    };

    prevBtn.addEventListener('click', navigateToPrev);
    nextBtn.addEventListener('click', navigateToNext);

    const leftZones = page.querySelectorAll('.left-zone');
    const rightZones = page.querySelectorAll('.right-zone');

    leftZones.forEach((zone) => {
      zone.addEventListener('click', navigateToPrev);
    });

    rightZones.forEach((zone) => {
      zone.addEventListener('click', navigateToNext);
    });

    // Country filter event listeners
    const countryFilterItems = page.querySelectorAll('.country-filter-item');
    countryFilterItems.forEach((item) => {
      item.addEventListener('click', () => {
        const countryName = item.getAttribute('data-country');
        const filterType = item.getAttribute('data-filter');
        
        if (countryName === 'all') {
          // Show all photos
          selectedCountryForFilter = null;
          filteredIndices = Array.from({ length: 31 }, (_, i) => i + 1);
          updateNumberList();
          currentFilteredPosition = 1;
          applyFilter(1);
          
          // Update map styling
          countryPaths.forEach((path) => {
            path.classList.remove('selected');
          });
          selectedCountryName = '';
        } else if (filterType === 'core') {
          // Show all unmapped photos (photos not assigned to a country)
          filteredIndices = places
            .map((place, idx) => placeToCountryMap[place.location] === null ? idx + 1 : null)
            .filter((idx): idx is number => idx !== null);
          updateNumberList();
          currentFilteredPosition = 1;
          applyFilter(1);
          
          // Update map styling
          countryPaths.forEach((path) => {
            path.classList.remove('selected');
          });
          selectedCountryName = '';
          selectedCountryForFilter = null;
        } else {
          // Filter to selected country
          updateSelectedCountry(countryName!);
        }

        // Update country filter item highlighting
        countryFilterItems.forEach((filterItem) => {
          const itemCountry = filterItem.getAttribute('data-country');
          const itemFilter = filterItem.getAttribute('data-filter');
          
          if (itemCountry === 'all') {
            filterItem.classList.toggle('active', selectedCountryForFilter === null && filterType !== 'core');
          } else if (itemFilter === 'core') {
            filterItem.classList.toggle('active', filterType === 'core');
          } else {
            filterItem.classList.toggle('active', itemCountry === selectedCountryForFilter);
          }
        });
      });
    });

    // Initialize country filter highlighting
    countryFilterItems.forEach((item) => {
      const itemCountry = item.getAttribute('data-country');
      if (itemCountry === 'all') {
        item.classList.add('active');
      }
    });
  }

  return page;
}
