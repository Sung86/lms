<template>
  <div>
    <v-app-bar color="blue darken-1" dark>
      <div class="flex-grow-1" />
      <span
        v-if="$store.getters.getIsLogin"
        style="float:left; position: absolute"
        >{{ $store.getters.getCurrentUser.displayName }}
      </span>
      <TopNav />
    </v-app-bar>
  </div>
</template>

<script>
import TopNav from './TopNav'
export default {
  components: {
    TopNav
  }
}
</script>

<style></style>
