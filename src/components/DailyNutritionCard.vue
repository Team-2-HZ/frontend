<script>
import PolarArea from '../components/charts/PolarArea.vue';
import DailyNutrition from '../components/charts/DailyNutrition.vue';

const ingredients = [{ type: "Griekse Yoghurt", kcal: 91, fat: 2, sat_fat: 1.7, carbs: 4.7, sugar:4.7, fibers: 0, protein: 6 }, { type: "Cottage Cheese", kcal: 101, fat: 2, sat_fat: 0, carbs: 2.7, sugar:2.7, fibers: 0, protein: 12 }];

const dailyNutritionMale = {
  KCAL: 2500,
  CARBS: 300,
  SUGAR: 65,
  FAT: 95,
  PROTEIN: 55
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

const data = {
  labels: [
    'KCAL',
    'CARBS',
    'SUGAR',
    'FAT',
    'PROTEIN',
    ],
  datasets: [
    {
      label: 'My Second dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [28, 48, 39, 96, 100],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

export default {
  components: {
    DailyNutrition,
    PolarArea
  },
  data() {
    return {
      ingredients: ingredients,
      data: data,
      options: options
    }
  },
}
</script>

<template lang="pug">
.container-fluid.h-100
  .row.mt-4.h-50
    .col
      .card
        .card-body 
          .card-title
            h2 Ingredients
          .card-text
            template(v-if="ingredients")
              table.table
                thead
                  tr 
                    th(scope="col") Ingredient
                    th(scope="col") KCAL
                    th(scope="col") Fat
                    th(scope="col") Sat. Fats
                    th(scope="col") Carbs
                    th(scope="col") Sugar
                    th(scope="col") Fibers 
                    th(scope="col") Protein
                tbody
                  template(v-for="ingredient in ingredients")
                    tr
                      th(scope="row") {{ingredient.type}} 
                      td {{ingredient.kcal}}
                      td {{ingredient.fat}}
                      td {{ingredient.sat_fat}}
                      td {{ingredient.carbs}}
                      td {{ingredient.sugar}} 
                      td {{ingredient.fibers}}
                      td {{ingredient.protein}}
            template(v-else)
              p Nothing scanned yet for this meal 
  .row.mt-4.mb-4
    .col-sm.w-50
      .card
        .card-body
          .card-title
            h2 Meals nutrition
          .card-text
            DailyNutrition
    .col-sm.mh-100.w-50
      .card.h-100
        .card-body 
          .card-text.h-75
            PolarArea(:width="450" :height="450")
          hr
          .card-text
            .align-middle
              form(action="" method="")
                .form-floating
                  input#mealName.form-control(placeholder="Meal's name")
                  label(for="mealName") Meal's name
                  .d-grid.gap-2.d-md-flex.justify-content-md-end.mt-2
                    button.btn.btn-success.me-md-2(type="submit") Save
</template>
