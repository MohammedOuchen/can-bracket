<template>
  <div class="app min-h-screen bg-gradient-to-br from-morocco-red via-red-600 to-morocco-red">
    <div class="container mx-auto py-8">
      <header class="text-center mb-8">
        <h1 class="text-3xl md:text-5xl font-bold text-white mb-2">
          🏆 CAN Bracket 🏆
        </h1>
        <p class="text-white text-opacity-90 text-lg">
          Africa Cup of Nations Predictions
        </p>
      </header>

      <div v-if="isFinalRecap" class="fade-in">
        <FinalRecapCard
          :matches="allMatches"
          :champion="champion"
          @reset="handleReset"
        />
      </div>

      <div v-else-if="currentMatch" class="fade-in">
        <MatchStep
          :match="currentMatch"
          :current-match-number="currentMatchNumber"
          :total-matches-in-round="totalMatchesInRound"
          @select-winner="handleSelectWinner"
        />
      </div>

      <div v-else class="text-center text-white">
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useBracket } from './composables/useBracket.js'
import MatchStep from './components/MatchStep.vue'
import FinalRecapCard from './components/FinalRecapCard.vue'

const {
  allMatches,
  currentMatch,
  isFinalRecap,
  champion,
  getMatchesByRound,
  selectWinner,
  resetPredictions,
  loadFromLocalStorage,
} = useBracket()

// Calculate current match number and total matches in round
const currentMatchNumber = computed(() => {
  if (!currentMatch.value) return 0
  const roundMatches = getMatchesByRound(currentMatch.value.round)
  const indexInRound = roundMatches.findIndex(m => m.id === currentMatch.value.id)
  return indexInRound + 1
})

const totalMatchesInRound = computed(() => {
  if (!currentMatch.value) return 0
  return getMatchesByRound(currentMatch.value.round).length
})

function handleSelectWinner(team) {
  selectWinner(team)
}

function handleReset() {
  resetPredictions()
}

onMounted(() => {
  loadFromLocalStorage()
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fade-in 0.4s ease-out;
}
</style>

