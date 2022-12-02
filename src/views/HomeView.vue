<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import DailyNutritionVue from '../components/charts/DailyNutrition.vue';
</script>

<template>
  <main>
    <TheWelcome />
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
    <DailyNutritionVue v-if="isLoaded" />
  </main>
</template>
