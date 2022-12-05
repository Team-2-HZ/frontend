<script setup>
import DailyNutrition from '../components/charts/DailyNutrition.vue';
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <DailyNutrition />
          </div>
          <div class="col-sm">
            <DailyNutrition />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>