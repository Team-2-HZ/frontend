<template lang="pug">
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
        tr(v-for="ingredient in ingredients" :key="ingredient.id")
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
</template>

<script>
async function getIngredients() {
  const response = await fetch('https://638755cdd9b24b1be3ed676d.mockapi.io/api/v1/activeIngredients');
  const data =  await response.json();
  console.log(data);
  return data;
}

const ingredients = await getIngredients();

export default {
  components: {},
  data() {
    return {
      ingredients: ingredients,
    }
  }
}
</script>