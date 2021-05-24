<template>
  <div class = "row text-center">
    今日天气: {{ weatherViewModel.city }}&nbsp;
    <q-icon size = "sm" :name = "weatherViewModel.weather_icon"/>
    {{ weatherViewModel.weather }}, 当前温度{{ weatherViewModel.temp_now }}°C,
    全天温度{{ weatherViewModel.temp_whole_day }}
  </div>
</template>

<script>
import {Api} from "src/router";

const weather_icon_map = {
  xue: 'ac_unit',
  lei: 'flash_on',
  shachen: 'nights_stay',
  wu: 'nights_stay',
  bingbao: 'ac_unit',
  yun: 'cloud',
  yu: 'umbrella',
  yin: 'nights_stay',
  qing: 'wb_sunny'
}


export default {
  name: "WeatherBar",
  data() {
    return {
      weatherViewModel: {
        city: '',
        update_time: '',
        weather: '',
        weather_icon: '',
        temp_now: '',
        temp_whole_day: '',
        wind_direction: '',
        wind_level: '',
        wind_speed_by_meter: '',
        air: ''
      },
      weatherApi: Api.api_third_party.weather
    }
  },
  methods: {
    getWeather() {
      fetch(this.weatherApi.url, {method: this.weatherApi.method})
        .then(result => result.json())
        .then(result => {
          this.weatherViewModel.city = result['city']
          this.weatherViewModel.update_time = result['update_time']
          this.weatherViewModel.weather = result['wea']
          this.weatherViewModel.weather_icon = weather_icon_map[result['wea_img']]
          this.weatherViewModel.temp_now = result['tem']
          this.weatherViewModel.temp_whole_day = `${result['tem_day']}°C ～ ${result['tem_night']}°C`
          this.weatherViewModel.wind_direction = result['win']
          this.weatherViewModel.wind_level = result['win_speed']
          this.weatherViewModel.wind_speed_by_meter = result['win_meter']
          this.weatherViewModel.air = result['air']
        })
    }
  },
  mounted() {
    this.getWeather()
  }
}
</script>

<style scoped>

</style>
