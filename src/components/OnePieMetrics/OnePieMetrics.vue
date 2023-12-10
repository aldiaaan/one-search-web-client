<script setup lang="ts">
import OneCard from '../OneCard'
import ApexChart from 'vue3-apexcharts'
import randomColor from 'randomcolor'
import OneProgressBar from '../OneProgressBar'

const props = withDefaults(defineProps<{
  data?: { [key in string]: number }
}>(), {
  data: () => ({
    'ID': 200,
    'US': 230,
    'AU': 100
  })
})

const options = {
  // colors: Object.values(props.data).map(_ => randomColor({ hue: 'black', luminosity: 'bright' })),
  states: {
    normal: {
      filter: {
        type: 'none',
        value: 0,
      }
    },
    hover: {
      filter: {
        type: 'none',
        value: 0.15,
      }
    },
  },
  chart: {
    animations: {
      enabled: false,
    },
    height: '100%'
  },
  tooltip: {
    // enabled: false,
    onDatasetHover: {
      highlightDataSeries: false,
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    lineCap: 'round',
    width: 5,
  },
  theme: {
    monochrome: {
      enabled: true
    }
  },
  plotOptions: {
    pie: {
      dataLabels: {
        offset: 10
      },
      donut: {
        size: '65%'
      }
    }
  },
  legend: {
    show: false
  }
}

</script>

<template>
  <OneCard>
    <template #header>
      Domains by Country
    </template>
    <div class="flex gap-4 px-6 pb-6">
      <!-- <div class="my-4 h-[320px] w-[320px] flex items-center justify-center">
        <ApexChart :width="280" :height="280" :options="options" class="h-[120px]" :series="Object.values(data)"
          type="donut"></ApexChart>
      </div> -->
      <div class="flex-1 flex flex-col pt-6 gap-3">
        <OneProgressBar v-for="key in Object.keys(data)" :key="key" :title="key"
          :max="Object.values(data).reduce((acc, val) => acc + val, 0)" :current="data[key]">
        </OneProgressBar>
      </div>
    </div>
  </OneCard>
</template>