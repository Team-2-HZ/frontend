<template>
    <div class="progress">
        <div class="progress-bar" 
        role="progressbar" 
        :style="{ 'width': ariaValue + '%'}" 
        :aria-valuenow="ariaValue"
        aria-valuemin="0" 
        aria-valuemax="100">
        {{ currentValue }} / {{ targetValue }}</div>
    </div>
</template>

<script>
export default {
    name: 'ProgressBar',
    props: {
        currentValue: {
            type: Number,
            required: true,
            default: 0
        },
        targetValue: {
            type: Number,
            required: true,
            default: 100 // TODO: Prevent this from being set to 0. Please never set this to 0.
        },
    },
    computed: {
        ariaValue() {
            return Math.round(this.currentValue / this.targetValue * 100);
        }
    }
}
</script>