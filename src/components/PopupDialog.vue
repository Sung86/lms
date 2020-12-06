<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-spacer></v-spacer>
        <v-row align="center" justify="center">
          <v-card-text>
            <p style="font-size:20pt">{{ dialogMessage }}</p>
          </v-card-text>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="userAcknowledged" v-if="okayBtn"
            >Okay</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ['dialogMessage', 'okayBtn'],
  data: () => ({
    dialog: true
  }),
  methods: {
    userAcknowledged() {
      this.dialog = false
      this.$store.dispatch('resetSignup')
    }
  }
}
</script>
