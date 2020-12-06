<template>
  <div id="about">
    <center>
      <h1>
        <font style="text-decoration:underline">About LMS</font>
      </h1>
      <div style="width:60%">
        <p class="text-justify">
          LMS is a simple library management system. It allows users to search
          books from google book api. Users can also register an account to let
          us to have a clue about the size of our users. LMS do not keep track
          users' activities, we only store your authentication information in a
          secure place.
        </p>
        <p class="text-justify">
          The technologies used for building LMS include Vue.js, Vuetify,
          Firebase and Google Book API.
        </p>
      </div>
      <br />
      <h3>The map below shows the place of LMS creation</h3>
      <google-map />
    </center>
  </div>
</template>

<script>
import GoogleMap from '@/components/GoogleMap'
export default {
  components: {
    GoogleMap
  }
}
</script>

<style></style>
