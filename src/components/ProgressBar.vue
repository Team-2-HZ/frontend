<template>
    <div class="progress">
        <div class="progress-bar"
        :class="color()"
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
    methods: {
        color: function() {
            // TODO: There's probably a better way of doing this.
            let lowerLimit = this.targetValue * 0.95;
            let upperLimit = this.targetValue * 1.05;
            if (this.currentValue < lowerLimit) {
                console.log('NOT ENOUGH')
                return "bg-warning"
            } else if (this.currentValue >= lowerLimit && this.currentValue <= upperLimit) {
                console.log('JUST RIGHT')
                return "bg-success"
            } else {
                console.log('TOO MUCH')
                return "bg-danger"
            }
        }
    },
    computed: {
        ariaValue() {
            return Math.round(this.currentValue / this.targetValue * 100);
        },        
    }
}
</script>