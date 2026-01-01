<template>
  <div class="final-recap w-full max-w-6xl mx-auto px-4 py-8">
    <div
      class="bg-white rounded-2xl shadow-2xl p-6 md:p-10 border-4 border-gold animate-fade-in"
    >
      <div v-if="champion" class="text-center mb-10">
        <div class="text-6xl md:text-8xl mb-4 animate-bounce-slow">
          {{ champion.flag }}
        </div>
        <h1 class="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
          🏆 Champion 🏆
        </h1>
        <h2 class="text-2xl md:text-4xl font-bold text-gold mb-4">
          {{ champion.name }}
        </h2>
        <div class="w-24 h-1 bg-gold mx-auto rounded"></div>
      </div>

      <BracketVisual ref="bracketRef" :matches="matches" :champion="champion" class="mb-8" />

      <div class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">Partager mes prédictions</h3>
        <div class="flex flex-wrap justify-center gap-3">
          <button
            @click="handleNativeShare"
            class="flex items-center gap-2 bg-can-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-md"
          >
            <span>📤</span>
            <span>Partager à tout</span>
          </button>

          <button
            @click="handleShareTwitter"
            class="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-md"
          >
            <span>🐦</span>
            <span>Twitter</span>
          </button>

          <button
            @click="handleShareFacebook"
            class="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-md"
          >
            <span>📘</span>
            <span>Facebook</span>
          </button>

          <button
            @click="handleShareWhatsApp"
            class="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-md"
          >
            <span>💬</span>
            <span>WhatsApp</span>
          </button>

          <button
            @click="handleDownloadImage"
            class="flex items-center gap-2 bg-morocco-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-md"
          >
            <span>💾</span>
            <span>Télécharger l'image</span>
          </button>
        </div>
      </div>

      <details class="mb-8">
        <summary class="text-lg font-bold text-morocco-red cursor-pointer mb-4">
          Voir la liste détaillée
        </summary>
        <div class="space-y-8 mt-4">
        <div class="knockout-round">
          <h3 class="text-xl font-bold text-morocco-red mb-4">Round of 16</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              v-for="match in roundOf16Matches"
              :key="match.id"
              class="match-recap bg-gray-50 rounded-lg p-3 border border-gray-200"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 flex-1">
                  <span class="text-xl">{{ match.teams[0]?.flag }}</span>
                  <span
                    class="text-sm flex-1"
                    :class="
                      match.winner?.id === match.teams[0]?.id
                        ? 'font-bold text-can-green'
                        : 'text-gray-600'
                    "
                  >
                    {{ match.teams[0]?.name }}
                  </span>
                </div>
                <span class="text-gray-400 mx-2">vs</span>
                <div class="flex items-center gap-2 flex-1">
                  <span class="text-xl">{{ match.teams[1]?.flag }}</span>
                  <span
                    class="text-sm flex-1 text-right"
                    :class="
                      match.winner?.id === match.teams[1]?.id
                        ? 'font-bold text-can-green'
                        : 'text-gray-600'
                    "
                  >
                    {{ match.teams[1]?.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="knockout-round">
          <h3 class="text-xl font-bold text-morocco-red mb-4">Quarter-finals</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              v-for="match in quarterFinalMatches"
              :key="match.id"
              class="match-recap bg-gray-50 rounded-lg p-3 border border-gray-200"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 flex-1">
                  <span class="text-xl">{{ match.teams[0]?.flag }}</span>
                  <span
                    class="text-sm flex-1"
                    :class="
                      match.winner?.id === match.teams[0]?.id
                        ? 'font-bold text-can-green'
                        : 'text-gray-600'
                    "
                  >
                    {{ match.teams[0]?.name }}
                  </span>
                </div>
                <span class="text-gray-400 mx-2">vs</span>
                <div class="flex items-center gap-2 flex-1">
                  <span class="text-xl">{{ match.teams[1]?.flag }}</span>
                  <span
                    class="text-sm flex-1 text-right"
                    :class="
                      match.winner?.id === match.teams[1]?.id
                        ? 'font-bold text-can-green'
                        : 'text-gray-600'
                    "
                  >
                    {{ match.teams[1]?.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="knockout-round">
          <h3 class="text-xl font-bold text-morocco-red mb-4">Semi-finals</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              v-for="match in semiFinalMatches"
              :key="match.id"
              class="match-recap bg-gray-50 rounded-lg p-3 border border-gray-200"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 flex-1">
                  <span class="text-xl">{{ match.teams[0]?.flag }}</span>
                  <span
                    class="text-sm flex-1"
                    :class="
                      match.winner?.id === match.teams[0]?.id
                        ? 'font-bold text-can-green'
                        : 'text-gray-600'
                    "
                  >
                    {{ match.teams[0]?.name }}
                  </span>
                </div>
                <span class="text-gray-400 mx-2">vs</span>
                <div class="flex items-center gap-2 flex-1">
                  <span class="text-xl">{{ match.teams[1]?.flag }}</span>
                  <span
                    class="text-sm flex-1 text-right"
                    :class="
                      match.winner?.id === match.teams[1]?.id
                        ? 'font-bold text-can-green'
                        : 'text-gray-600'
                    "
                  >
                    {{ match.teams[1]?.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="knockout-round">
          <h3 class="text-xl font-bold text-morocco-red mb-4">Final</h3>
          <div
            v-if="finalMatch"
            class="match-recap bg-gradient-to-r from-gold to-yellow-200 rounded-lg p-4 border-2 border-gold"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 flex-1">
                <span class="text-2xl">{{ finalMatch.teams[0]?.flag }}</span>
                <span
                  class="text-base flex-1 font-semibold"
                  :class="
                    finalMatch.winner?.id === finalMatch.teams[0]?.id
                      ? 'text-can-green'
                      : 'text-gray-700'
                  "
                >
                  {{ finalMatch.teams[0]?.name }}
                </span>
              </div>
              <span class="text-gray-600 mx-3 font-bold">VS</span>
              <div class="flex items-center gap-2 flex-1">
                <span class="text-2xl">{{ finalMatch.teams[1]?.flag }}</span>
                <span
                  class="text-base flex-1 text-right font-semibold"
                  :class="
                    finalMatch.winner?.id === finalMatch.teams[1]?.id
                      ? 'text-can-green'
                      : 'text-gray-700'
                  "
                >
                  {{ finalMatch.teams[1]?.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </details>

      <div class="mt-10 text-center">
        <button
          @click="handleReset"
          class="bg-morocco-red text-white py-3 px-8 rounded-lg font-semibold text-lg shadow-md hover:bg-opacity-90 active:scale-95 transition-all"
        >
          Reset Predictions
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import BracketVisual from './BracketVisual.vue'
import { useSocialShare } from '../composables/useSocialShare.js'

const props = defineProps({
  matches: {
    type: Array,
    required: true,
  },
  champion: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['reset'])

const bracketRef = ref(null)
const { shareToTwitter, shareToFacebook, shareToWhatsApp, shareViaWebAPI, downloadAsImage, shareImageViaWebAPI } = useSocialShare()

const canUseNativeShare = computed(() => {
  return typeof navigator !== 'undefined' && navigator.share !== undefined
})

const shareText = computed(() => {
  if (!props.champion) return 'Voici mes prédictions pour la CAN 2025 !'
  return `🏆 Mon champion prédit pour la CAN 2025 : ${props.champion.name} ${props.champion.flag}\n\nVoici mes prédictions complètes !`
})

const roundOf16Matches = computed(() => {
  return props.matches.filter(m => m.round === 'round_of_16')
})

const quarterFinalMatches = computed(() => {
  return props.matches.filter(m => m.round === 'quarter_final')
})

const semiFinalMatches = computed(() => {
  return props.matches.filter(m => m.round === 'semi_final')
})

const finalMatch = computed(() => {
  return props.matches.find(m => m.round === 'final')
})

function handleShareTwitter() {
  shareToTwitter(shareText.value)
}

function handleShareFacebook() {
  shareToFacebook()
}

function handleShareWhatsApp() {
  shareToWhatsApp(shareText.value)
}

async function handleNativeShare() {
  // Essayer d'abord de partager l'image via l'API native (comme sur mobile)
  if (canUseNativeShare.value) {
    const shared = await shareImageViaWebAPI(bracketRef)
    if (shared) {
      return
    }
    // Si l'image n'a pas pu être partagée, essayer de partager le texte
    const textShared = await shareViaWebAPI(shareText.value)
    if (textShared) {
      return
    }
  }
  
  // Fallback : si l'API native n'est pas disponible, télécharger l'image
  // L'utilisateur pourra ensuite la partager manuellement
  await handleDownloadImage()
}

async function handleDownloadImage() {
  await downloadAsImage(bracketRef, `can-bracket-${props.champion?.name || 'predictions'}.png`)
}

function handleReset() {
  emit('reset')
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}
</style>

