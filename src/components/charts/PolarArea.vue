<template>
  <PolarArea     
    :chart-options="options"
    :chart-data="data"
    :chart-id="chartId"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { PolarArea } from 'vue-chartjs'
import * as chartConfig from './chartConfig.js'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    PolarArea
  },
  props: {
    chartId: {
      type: String,
      default: 'PolarArea'
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 600
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return chartConfig
  }
}
</script>