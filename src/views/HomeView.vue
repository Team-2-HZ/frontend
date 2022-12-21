<script setup>
import DailyNutritionCardVue from '../components/DailyNutritionCard.vue';
import ProgressBar from '../components/ProgressBar.vue'
</script>

<template>
  <main>
    <DailyNutritionCardVue />
    <div style="margin-left: 79%; font-size: large;">Target</div>
    <ProgressBar :currentValue="1090" :targetValue="500" label="Energy" unit="kcal"/>
    <ProgressBar :currentValue="190" :targetValue="500" label="Protein" unit="gram"/>
    <ProgressBar :currentValue="490" :targetValue="500" label="Carbs" unit="gram"/>
    <ProgressBar :currentValue="100" :targetValue="500" label="Unsaturated Fats" unit="gram"/>
  </main>
</template>
