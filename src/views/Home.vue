<template>
  <div id="home">
    <center>
      <a href="#" target="_self" style="text-decoration: none">
        <p class="font-italic" :style="styleTitle">Library Management System</p>
      </a>

      <div style="position:relative; width:100%">
        <v-text-field
          hide-details
          single-line
          style="width:90%;font-size:18pt"
          placeholder="Search Book Title..."
          v-model="searchBook"
          append-icon="search"
          @keyup.enter="onSearch"
          @click:append="onSearch"
        ></v-text-field>
      </div>
    </center>
    <div>
      <v-dialog v-model="openDialog" max-width="900">
        <v-card v-if="userClickBook">
          <br />
          <v-card-text>
            <center>
              <v-img
                v-if="selectedBookInfo.image"
                :src="selectedBookInfo.image"
                class="grey lighten-2"
                max-width="400"
                max-height="600"
              ></v-img>
            </center>
            <div v-for="(value, name) in selectedBookInfo" :key="name">
              <v-row v-if="name != 'image'">
                <b>
                  {{
                    name[0].toUpperCase() +
                      name
                        .slice(1)
                        .split(/(?=[A-Z])/)
                        .join(' ')
                  }}
                  :
                </b>
                <span v-if="name != 'accessLink' && name != 'previewLink'">
                  <i>{{ value }}</i>
                </span>
                <span v-else style="text-align: justify">
                  <a :href="value" target="_blank">
                    <i>{{ value }}</i>
                  </a>
                </span>
              </v-row>
            </div>
          </v-card-text>
        </v-card>

        <v-card v-else>
          <center>
            <font size="10pt" color="red">
              <b>No Result</b>
            </font>
          </center>
        </v-card>
        <v-btn
          color="white"
          style="background-color:#FB2A2A"
          text
          @click=";(openDialog = false), (userClickBook = false)"
          >Close</v-btn
        >
      </v-dialog>
    </div>
    <div v-if="books && books.items">
      <br v-for="n in 3" :key="n" />
      <marquee-text
        :duration="
          $store.getters.getShowLoginForm || $store.getters.getShowSignupForm
            ? 0
            : 30
        "
      >
        <v-row>
          <div v-for="(item, index) in books.items.slice(0, 15)" :key="index">
            <v-img
              v-if="item.volumeInfo.imageLinks"
              :src="item.volumeInfo.imageLinks.thumbnail.slice(5)"
              @click="popUpBook(item)"
              class="grey lighten-2"
              style="cursor: pointer"
              max-width="300"
              max-height="500"
            ></v-img>
          </div>
        </v-row>
      </marquee-text>
      <marquee-text
        :duration="
          $store.getters.getShowLoginForm || $store.getters.getShowSignupForm
            ? 0
            : 25
        "
      >
        <v-row>
          <div v-for="(item, index) in books.items.slice(15, 30)" :key="index">
            <v-img
              v-if="item.volumeInfo.imageLinks"
              :src="item.volumeInfo.imageLinks.thumbnail.slice(5)"
              @click="popUpBook(item)"
              class="grey lighten-2"
              style="cursor: pointer"
              max-width="300"
              max-height="500"
            ></v-img>
          </div>
        </v-row>
      </marquee-text>
      <marquee-text
        :duration="
          $store.getters.getShowLoginForm || $store.getters.getShowSignupForm
            ? 0
            : 20
        "
      >
        <v-row>
          <div v-for="(item, index) in books.items.slice(30)" :key="index">
            <v-img
              v-if="item.volumeInfo.imageLinks"
              :src="item.volumeInfo.imageLinks.thumbnail.slice(5)"
              @click="popUpBook(item)"
              class="grey lighten-2"
              style="cursor: pointer"
              max-width="300"
              max-height="500"
            ></v-img>
          </div>
        </v-row>
      </marquee-text>
    </div>

    <div v-else class="text-center blackout">
      <br v-for="n in 15" :key="n" />
      <v-overlay opacity="0.9">
        <v-row justify="center">
          <v-progress-circular indeterminate color="blue" size="130" width="15"
            >Loading . . .</v-progress-circular
          >
        </v-row>
      </v-overlay>
    </div>
  </div>
</template>
<script>
const axios = require('axios').default
export default {
  data: () => ({
    openDialog: false,
    userClickBook: false,
    books: null,
    searchBook: null,
    resultOfSearch: [],
    selectedBookInfo: {
      image: null,
      title: null,
      author: null,
      categories: null,
      language: null,
      description: null,
      publisher: null,
      publishedDate: null,
      pages: null,
      previewLink: null,
      accessLink: null
    },
    data: null,
    styleTitle: {
      fontSize: '40pt',
      color: 'blue',
      textShadow:
        '0 0 5px #A5F1FF, 0 0 10px #A5F1FF, 0 0 20px #A5F1FF, ' +
        '0 0 30px #A5F1FF, 0 0 40px #A5F1FF'
    }
  }),

  mounted() {
    axios
      .get(
        'https://www.googleapis.com/books/v1/volumes?q=search+terms&maxResults=40'
      )
      .then(response => {
        this.books = response.data
      })
      .catch(error => {
        this.$store.dispatch('logSystemError', error)
      })
  },
  watch: {
    openDialog() {
      if (this.openDialog === false) {
        this.userClickBook = false
        this.searchBook = null
      }
    }
  },
  components: {},
  methods: {
    onSearch() {
      if (this.searchBook) {
        axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=${this.searchBook}`,
            { crossdomain: true }
          )
          .then(response => {
            if (response.data.totalItems > 0) {
              let bookInfo = {}
              response.data.items.forEach(book => {
                bookInfo = this.assignBookObj(book)
                this.resultOfSearch.push(bookInfo)
              })
              sessionStorage.setItem(
                'result',
                JSON.stringify(this.resultOfSearch)
              )
              let routeData = this.$router.resolve({ name: 'book' })
              window.open(routeData.href, '_self')
            } else {
              this.resultOfSearch = 'No Result'
              this.openDialog = true
            }
          })
          .catch(error => {
            this.$store.dispatch('logSystemError', error)
          })
      }
    },
    popUpBook(selectedBook) {
      this.openDialog = true
      this.userClickBook = true
      this.selectedBookInfo = this.assignBookObj(selectedBook)
    },
    assignBookObj(selectedBook) {
      let book = {}
      Object.assign(book, this.selectedBook)
      let bookInfo = selectedBook.volumeInfo
      if (bookInfo.imageLinks)
        book.image = bookInfo.imageLinks.thumbnail.slice(5)
          ? bookInfo.imageLinks.thumbnail.slice(5)
          : bookInfo.imageLinks.smallThumbnail.slice(5)
          ? bookInfo.imageLinks.smallThumbnail.slice(5)
          : 'N/A'
      else book.image = null

      if (bookInfo.title) book.title = bookInfo.title ? bookInfo.title : 'NA'
      book.author = bookInfo.authors
        ? bookInfo.authors.toString().replace(/,/g, ', ')
        : 'N/A'
      book.categories = bookInfo.categories
        ? bookInfo.categories.toString().replace(/,/g, ', ')
        : 'N/A'
      book.language = bookInfo.language
        ? bookInfo.language.toUpperCase()
        : 'N/A'
      book.publisher = bookInfo.publisher ? bookInfo.publisher : 'N/A'
      book.publishedDate = bookInfo.publishedDate
        ? new Date(bookInfo.publishedDate).toDateString()
        : 'N/A'
      book.pages = bookInfo.pageCount ? bookInfo.pageCount : 'N/A'
      book.description = bookInfo.description ? bookInfo.description : 'N/A'
      book.previewLink = bookInfo.previewLink ? bookInfo.previewLink : 'N/A'
      book.accessLink = bookInfo.infoLink ? bookInfo.infoLink : 'N/A'
      return book
    }
  }
}
</script>
