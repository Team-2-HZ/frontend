<script>
import DailyNutrition from '../components/charts/DailyNutrition.vue';

const ingredients = [{ type: "Griekse Yoghurt", kcal: 91, fat: 2, carbs: 4.7, sugar:4.7, fibers: 0, protein: 6 }, { type: "Cottage Cheese", kcal: 101, fat: 2, carbs: 4.7, sugar:2.7, fibers: 0, protein: 12 }];

export default {
  components: {
    DailyNutrition
  },
  data() {
    return {
      ingredients: ingredients,
    }
  },
}
</script>

<template lang="pug">
.container-fluid
  .row
    .col
      .card
        .card-body
          .card-title
            h2 Meals nutrition
          .card-text
            DailyNutrition
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
                      td {{ingredient.carbs}}
                      td {{ingredient.sugar}} 
                      td {{ingredient.fibers}}
                      td {{ingredient.protein}}
            template(v-else)
              p Nothing scanned yet for this meal
</template>
