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

const dailyNutritionMale = {
    KCAL: 2500,
    CARBS: 300,
    SUGAR: 65,
    FAT: 95,
    PROTEIN: 55
  }
  
  const dailyNutritionFemale = {
    KCAL: 2000,
    CARBS: 230,
    SUGAR: 49,
    FAT: 73,
    PROTEIN: 45
  }

  async function getDailyNutrition(apiUrl) {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data[0];
  }


async function getPercentualData() {
  // should change depending on users gender
  const nutritionGoals = dailyNutritionMale
  const data : number[] = [];
  const dailyIntake = await getDailyNutrition(this.apiUrl);
  const dailyIntakeKeys = Object.keys(dailyIntake)
  for (let i = 0; i < dailyIntakeKeys.length; i++) {
    let key = dailyIntakeKeys[i];
    const percentage = (dailyIntake[key] / nutritionGoals[key]) * 100;
    if (!(percentage > 0)) continue;
    data.push(percentage);
  }
  return data;
}

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    PolarArea
  },
  props: {
    apiUrl: {
      type: String,
      required: true
    },
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
    return {
      data: {
        labels: [
          'KCAL',
          'CARBS',
          'SUGAR',
          'FAT',
          'PROTEIN',
          ],
        datasets: [
          {
            label: "Daily intake",
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [0, 0, 0, 0, 0]
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scale: {
          r: {
            min: 0,
            max: 100,
            beginAtZero: true,
            angleLines: {
              color: "red",
          },
          }
        }
      }
    }
  },
    // Making the diagram load the data async
    async mounted () {
      try {
        const data = await getPercentualData.bind(this)();
        this.data["datasets"][0].data = data;
        // console.log(this.chartData["datasets"][0].data);
        this.isLoaded = true
      } catch (e) {
        console.error(e);
      }
    }
}
</script>