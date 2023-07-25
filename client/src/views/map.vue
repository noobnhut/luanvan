<template>
 <MapboxMap
    style="margin-top: 1em; height: 400px;"
    :access-token="mapboxAccessToken"
    map-style="mapbox://styles/mapbox/streets-v11">
    <MapboxGeocoder />
  </MapboxMap>
  </template>
  
  <script setup>
  import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';
  import { MapboxMap, MapboxMarker,MapboxGeocoder } from '@studiometa/vue-mapbox-gl';
  const mapboxAccessToken = 'pk.eyJ1Ijoibmh1dHN0dSIsImEiOiJjbGswbXVxOG0wMTJ3M2pyZjlwOGFuN3JlIn0.Td1W0CHDk-A4QdlxHSNq8A';
  </script>
  