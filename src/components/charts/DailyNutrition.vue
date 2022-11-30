<template>
  <Radar  
    v-if="loaded" :chart-data="chartData"
  />
</template>

<script>
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement
} from 'chart.js'
import { locStub } from '@vue/compiler-core';

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

async function getDailyNutrition() {
  const response = await fetch('https://638755cdd9b24b1be3ed676d.mockapi.io/api/v1/nutrition');
  const data = await response.json();
  return data[0];
}

async function getPercentualData() {
  // should change depending on users gender
  const nutritionGoals = dailyNutritionMale
  const data = [];
  const dailyIntake = await getDailyNutrition();
  const dailyIntakeKeys = Object.keys(dailyIntake)
  for (let i = 0; i < dailyIntakeKeys.length; i++) {
    let key = dailyIntakeKeys[i];
    const percentage = (dailyIntake[key] / nutritionGoals[key]) * 100;
    if (!(percentage > 0)) continue;
    data.push(percentage);
  }
  return data;
}

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement
);

export default {
  name: 'RadarChart',
  components: { Radar },
  props: {
    chartId: {
      type: String,
      default: 'radar-chart'
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
      chartData: {
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
            data: getPercentualData(),
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 100
          }
        }
      },
    }
  },
  async mounted () {
    this.loaded = false;

    try {
      const data = await getPercentualData();
      this.chartData = data;

      this.loaded = true
    } catch (e) {
      console.log(e);
    }
  }
}
</script>