<template>
  <div class="w-full max-w-2xl mx-auto px-4">
    <div class="flex items-center justify-between mb-2">
      <div class="text-sm font-semibold text-gray-700">
        {{ roundLabel }}
      </div>
      <div class="text-sm text-gray-600">
        Match {{ currentMatchNumber }} of {{ totalMatchesInRound }}
      </div>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2">
      <div
        class="bg-can-green h-2 rounded-full transition-all duration-300"
        :style="{ width: `${progressPercentage}%` }"
      ></div>
    </div>
    <div class="flex justify-between mt-2 text-xs text-gray-500">
      <span>Round of 16</span>
      <span>Quarter-finals</span>
      <span>Semi-finals</span>
      <span>Final</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentRound: {
    type: String,
    required: true,
  },
  currentMatchNumber: {
    type: Number,
    required: true,
  },
  totalMatchesInRound: {
    type: Number,
    required: true,
  },
})

const roundLabels = {
  round_of_16: 'Round of 16',
  quarter_final: 'Quarter-finals',
  semi_final: 'Semi-finals',
  final: 'Final',
}

const roundLabel = computed(() => {
  return roundLabels[props.currentRound] || props.currentRound
})

const progressPercentage = computed(() => {
  if (props.totalMatchesInRound === 0) return 0
  return (props.currentMatchNumber / props.totalMatchesInRound) * 100
})
</script>

