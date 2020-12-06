<template>
  <div class="book">
    <br />
    <div style="overflow-y : auto; height:200">
      <v-card v-for="result in resultOfSearch" :key="result">
        <br />
        <div v-for="(value, name) in result" :key="name">
          <div v-if="name === 'image'">
            <a v-if="value" target="_blank">
              <v-img
                :src="value"
                class="grey lighten-2"
                :style="styleImage"
                max-width="300"
                max-height="800"
              />
            </a>
            <span v-else>
              <v-img
                src="https://vignette2.wikia.nocookie.net/legendmarielu/images/b/b4/No_image_available.jpg/revision/latest?cb=20130511180903"
                class="grey lighten-2"
                :style="styleImage"
                max-width="300"
                max-height="800"
              />
            </span>
          </div>
          <div v-else style="margin-left:5%; width:90%">
            <b v-if="name != 'description'">{{ upFirstChar(name) }} :</b>
            <span
              v-if="
                name != 'accessLink' &&
                  name != 'previewLink' &&
                  name != 'description'
              "
            >
              <i>{{ value }}</i>
            </span>
            <span v-else-if="name === 'description'">
              <p class="text-justify">
                <b>{{ upFirstChar(name) }}:</b>
                {{ value }}
              </p>
            </span>
            <span v-else style="text-align: justify">
              <a :href="value" target="_blank">
                <i>{{ value }}</i>
              </a>
            </span>
          </div>
        </div>
        <br />
        <hr />
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    styleImage: {
      cursor: 'pointer',
      border: '3px solid black',
      left: '5%'
    },
    image: null,
    resultOfSearch: []
  }),
  mounted() {
    let searchedResult = JSON.parse(sessionStorage.getItem('result'))
    if (searchedResult) {
      this.resultOfSearch = searchedResult
    }
  },
  methods: {
    upFirstChar(word) {
      return (
        word[0].toUpperCase() +
        word
          .slice(1)
          .split(/(?=[A-Z])/)
          .join(' ')
      )
    }
  }
}
</script>
