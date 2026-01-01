<template>
  <div
    v-if="match"
    class="match-step w-full max-w-4xl mx-auto px-4 py-8 transition-all duration-300"
  >
    <ProgressStepper
      :current-round="match.round"
      :current-match-number="currentMatchNumber"
      :total-matches-in-round="totalMatchesInRound"
      class="mb-8"
    />

    <div class="text-center mb-8">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        {{ roundLabel }}
      </h2>
      <p class="text-gray-600">Select the winner</p>
    </div>

    <div class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-8">
      <TeamCard
        v-if="match.teams[0]"
        :team="match.teams[0]"
        class="w-full md:w-auto"
      />
      
      <div class="text-2xl font-bold text-gray-400">VS</div>
      
      <TeamCard
        v-if="match.teams[1]"
        :team="match.teams[1]"
        class="w-full md:w-auto"
      />
    </div>

    <DropZone @drop="handleDrop" class="mb-8" />

    <!-- Mobile click buttons -->
    <div class="md:hidden flex flex-col gap-3">
      <button
        v-if="match.teams[0]"
        @click="handleClickWinner(match.teams[0])"
        class="w-full bg-can-green text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-md hover:bg-opacity-90 active:scale-95 transition-all"
      >
        {{ match.teams[0].flag }} {{ match.teams[0].name }}
      </button>
      <button
        v-if="match.teams[1]"
        @click="handleClickWinner(match.teams[1])"
        class="w-full bg-can-green text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-md hover:bg-opacity-90 active:scale-95 transition-all"
      >
        {{ match.teams[1].flag }} {{ match.teams[1].name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TeamCard from './TeamCard.vue'
import DropZone from './DropZone.vue'
import ProgressStepper from './ProgressStepper.vue'

const props = defineProps({
  match: {
    type: Object,
    default: null,
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

const emit = defineEmits(['select-winner'])

const roundLabels = {
  round_of_16: 'Round of 16',
  quarter_final: 'Quarter-finals',
  semi_final: 'Semi-finals',
  final: 'Final',
}

const roundLabel = computed(() => {
  if (!props.match) return ''
  return roundLabels[props.match.round] || props.match.round
})

function handleDrop(team) {
  emit('select-winner', team)
}

function handleClickWinner(team) {
  emit('select-winner', team)
}
</script>

