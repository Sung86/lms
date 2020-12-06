<template>
  <div>
    <v-footer color="primary blue darken-1" padless absolute>
      <v-row justify="center" no-gutters>
        <router-link :to="{ name: selectedRoute }">
          <v-btn
            v-for="link in links"
            :key="link"
            @click="formatRouteLink(link)"
            color="white"
            text
            rounded
            class="my-2"
            >{{ link }}</v-btn
          >
        </router-link>
        <v-col
          class="primary blue darken-4 py-4 text-center white--text"
          cols="12"
        >
          &copy; {{ new Date().getFullYear() }} —
          <strong>LMS</strong>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    link: '../assets/Privacy.pdf',
    selectedRoute: null,
    links: ['Home', 'About']
  }),
  methods: {
    formatRouteLink(link) {
      let routeName = link.toLowerCase().replace(/\s/g, '-')
      this.selectedRoute = routeName
    }
  }
}
</script>

<style></style>
