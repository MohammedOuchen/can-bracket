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

    <div
      class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-8"
    >
      <TeamCard
        v-if="match.teams[0]"
        :team="match.teams[0]"
        @select-team="handleClickWinner"
        class="w-full md:w-auto"
      />

      <div class="text-2xl font-bold text-gray-400">VS</div>

      <TeamCard
        v-if="match.teams[1]"
        :team="match.teams[1]"
        @select-team="handleClickWinner"
        class="w-full md:w-auto"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import TeamCard from "./TeamCard.vue";
import ProgressStepper from "./ProgressStepper.vue";

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
});

const emit = defineEmits(["select-winner"]);

const roundLabels = {
  round_of_16: "Round of 16",
  quarter_final: "Quarter-finals",
  semi_final: "Semi-finals",
  final: "Final",
};

const roundLabel = computed(() => {
  if (!props.match) return "";
  return roundLabels[props.match.round] || props.match.round;
});

function handleClickWinner(team) {
  emit("select-winner", team);
}
</script>
