<template>
  <div>
    <gmap-map :center="center" :zoom="15" style="width:90%;  height: 400px">
      <gmap-marker :key="index" :position="center"></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  data: () => ({
    center: { lat: -42.894654, lng: 147.326231 }
  }),

  mounted() {
    this.geolocate()
  },

  methods: {
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
  }
}
</script>
