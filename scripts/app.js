// Vue.js setup
const app = Vue.createApp({

    data() {
        return {
            // Title for the web page
            title: 'Karanveer Virdi #1244140',

            // User info object
            userData: {
                name: '',
                age: '',
                avatar: ''
            },

            // Weather info & input
            weatherData: {
                city: 'London',
                province: 'Ontario',
                country: 'Canada',
                temp: '',
                windSpeed: '',
                description: ''
            },

            // Word definition data
            dictionary: {
                word: '',
                phonetic: '',
                definition: ''
            }
        }
    },

    // Called when app loads
    created() {
        this.getUserProfile()
        this.getWeatherInfo()
    },
    computed: {},
    methods: {

        // Random user profile fetch
        getUserProfile() {
            fetch('https://comp6062.liamstewart.ca/random-user-data')
                .then(response => response.json())
                .then(data => {
                    this.userData.name = `${data.user_profile.first_name} ${data.user_profile.last_name}`
                    this.userData.age = data.user_profile.age
                    this.userData.avatar = data.user_profile.avatar_url
                })
                .catch(error => {
                    console.log('User fetch error:', error)
                })
        },

        // Weather data fetch
        getWeatherInfo() {
            fetch(`https://comp6062.liamstewart.ca/weather-data?city=${this.weatherData.city}&province=${this.weatherData.province}&country=${this.weatherData.country}`)
                .then(response => response.json())
                .then(data => {
                    this.weatherData.temp = data.weather_data.temperature
                    this.weatherData.windSpeed = data.weather_data.wind_speed
                    this.weatherData.description = data.weather_data.weather_description
                })
                .catch(error => {
                    console.log('Weather fetch error:', error)
                })
        },

        // Dictionary definition lookup
        getDictionary() {
            fetch(`https://comp6062.liamstewart.ca/api/define?word=${this.dictionary.word}`)
                .then(response => response.json())
                .then(data => {
                    this.dictionary.word = data.word
                    this.dictionary.phonetic = data.phonetic
                    this.dictionary.definition = data.definition
                })
                .catch(error => {
                    console.log('Dictionary fetch error:', error)
                })
        }
    }
})

// Attaching  .js to the page
app.mount('#app')
