<template>
  <q-page padding>

    <h4 class="text-h4 text-center">Dobrodošli na mapu</h4>


    <p class="text-body1 text-center">
      Ovdje možete vidjeti gdje se nalazi knjižnica. Pomičite i zumirajte kartu kako biste istraživali područje.
    </p>


    <div id="map" style="height: 500px; width: 100%;"></div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";

export default {
  setup() {

    const initialMap = ref(null);

    onMounted(() => {

      initialMap.value = L.map('map').setView([45.3312, 14.4322], 13);


      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(initialMap.value);
    });

    return {
      initialMap,
    };
  },
};
</script>

<style scoped>

#map {
  height: 500px;
  width: 100%;
}
</style>
