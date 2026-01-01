<template>
  <div
    ref="bracketRef"
    class="bracket-visual relative bg-morocco-red rounded-lg p-2 md:p-8 border-2 md:border-4 border-can-green overflow-x-auto"
  >
    <div class="text-center mb-3 md:mb-6">
      <h2 class="text-sm md:text-3xl font-bold text-white px-2">
        CAN 2025 - Le tableau des huitièmes de finale
      </h2>
    </div>

    <div
      class="relative flex justify-between items-start min-h-[400px] md:min-h-[800px] gap-2 md:gap-8"
    >
      <div class="flex-1 flex flex-col justify-center gap-2 md:gap-8 pr-1 md:pr-2">
        <div
          v-for="(match, index) in leftRoundOf16"
          :key="match.id"
          class="match-slot relative flex flex-col items-start"
        >
          <div class="flex flex-col gap-1 w-full">
            <div
              :class="[
                'team-box rounded px-3 py-2 border w-full',
                match.winner?.id === match.teams[0]?.id
                  ? 'bg-can-green text-white border-can-green'
                  : 'bg-white text-gray-800 border-gray-300',
              ]"
            >
              <div class="flex items-center gap-1 md:gap-2">
                <span class="text-base md:text-xl">{{ match.teams[0]?.flag }}</span>
                <span class="text-xs md:text-sm font-semibold flex-1">{{
                  match.teams[0]?.name
                }}</span>
              </div>
            </div>
            <div
              :class="[
                'team-box rounded px-3 py-2 border w-full',
                match.winner?.id === match.teams[1]?.id
                  ? 'bg-can-green text-white border-can-green'
                  : 'bg-white text-gray-800 border-gray-300',
              ]"
            >
              <div class="flex items-center gap-1 md:gap-2">
                <span class="text-base md:text-xl">{{ match.teams[1]?.flag }}</span>
                <span class="text-xs md:text-sm font-semibold flex-1">{{
                  match.teams[1]?.name
                }}</span>
              </div>
            </div>
          </div>

          <div
            v-if="match.winner"
            class="winner-box bg-can-green rounded-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 flex items-center gap-1 md:gap-2 shadow-lg w-full justify-center"
          >
            <span class="text-sm md:text-lg">{{ match.winner.flag }}</span>
            <span class="text-xs md:text-sm font-bold text-white">{{
              match.winner.name
            }}</span>
          </div>
          <div
            v-else
            class="winner-box bg-can-green bg-opacity-30 rounded-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 h-8 md:h-10 flex items-center justify-center w-full"
          >
            <span class="text-[10px] md:text-xs text-white opacity-50">Gagnant</span>
          </div>

          <div
            v-if="index < 4"
            class="absolute left-full top-1/2 w-4 md:w-12 h-0.5 bg-can-green z-0"
            style="transform: translateY(-50%)"
          ></div>
        </div>

        <div class="ml-2 md:ml-20 flex flex-col justify-center gap-2 md:gap-8">
          <div
            v-for="(match, index) in leftQuarterFinals"
            :key="match.id"
            class="match-slot relative flex flex-col items-start"
          >
            <div
              v-if="match.teams[0] && match.teams[1]"
              class="flex flex-col gap-1 w-full"
            >
              <div
                :class="[
                  'team-box rounded px-3 py-2 border w-full',
                  match.winner?.id === match.teams[0]?.id
                    ? 'bg-can-green text-white border-can-green'
                    : 'bg-white text-gray-800 border-gray-300',
                ]"
              >
                <div class="flex items-center gap-1 md:gap-2">
                  <span class="text-base md:text-xl">{{ match.teams[0]?.flag }}</span>
                  <span class="text-xs md:text-sm font-semibold flex-1">{{
                    match.teams[0]?.name
                  }}</span>
                </div>
              </div>
              <div
                :class="[
                  'team-box rounded px-3 py-2 border w-full',
                  match.winner?.id === match.teams[1]?.id
                    ? 'bg-can-green text-white border-can-green'
                    : 'bg-white text-gray-800 border-gray-300',
                ]"
              >
                <div class="flex items-center gap-1 md:gap-2">
                  <span class="text-base md:text-xl">{{ match.teams[1]?.flag }}</span>
                  <span class="text-xs md:text-sm font-semibold flex-1">{{
                    match.teams[1]?.name
                  }}</span>
                </div>
              </div>
            </div>

            <div
              v-if="match.winner"
              class="winner-box bg-can-green rounded-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 flex items-center gap-1 md:gap-2 shadow-lg w-full justify-center"
            >
              <span class="text-sm md:text-lg">{{ match.winner.flag }}</span>
              <span class="text-xs md:text-sm font-bold text-white">{{
                match.winner.name
              }}</span>
            </div>
            <div
              v-else-if="match.teams[0] && match.teams[1]"
              class="winner-box bg-can-green bg-opacity-30 rounded-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 h-8 md:h-10 flex items-center justify-center w-full"
            >
              <span class="text-[10px] md:text-xs text-white opacity-50">Gagnant</span>
            </div>

            <div
              v-if="index < 2 && match.teams[0] && match.teams[1]"
              class="absolute left-full top-1/2 w-4 md:w-12 h-0.5 bg-can-green z-0"
              style="transform: translateY(-50%)"
            ></div>
          </div>
        </div>

        <div class="ml-4 md:ml-40 flex flex-col justify-center gap-2 md:gap-8">
          <div
            v-if="leftSemiFinal"
            class="match-slot relative flex flex-col items-start"
          >
            <div
              v-if="leftSemiFinal.teams[0] && leftSemiFinal.teams[1]"
              class="flex flex-col gap-1 w-full"
            >
              <div
                :class="[
                  'team-box rounded px-3 py-2 border w-full',
                  leftSemiFinal.winner?.id === leftSemiFinal.teams[0]?.id
                    ? 'bg-can-green text-white border-can-green'
                    : 'bg-white text-gray-800 border-gray-300',
                ]"
              >
                <div class="flex items-center gap-1 md:gap-2">
                  <span class="text-base md:text-xl">{{
                    leftSemiFinal.teams[0]?.flag
                  }}</span>
                  <span class="text-xs md:text-sm font-semibold flex-1">{{
                    leftSemiFinal.teams[0]?.name
                  }}</span>
                </div>
              </div>
              <div
                :class="[
                  'team-box rounded px-3 py-2 border w-full',
                  leftSemiFinal.winner?.id === leftSemiFinal.teams[1]?.id
                    ? 'bg-can-green text-white border-can-green'
                    : 'bg-white text-gray-800 border-gray-300',
                ]"
              >
                <div class="flex items-center gap-1 md:gap-2">
                  <span class="text-base md:text-xl">{{
                    leftSemiFinal.teams[1]?.flag
                  }}</span>
                  <span class="text-xs md:text-sm font-semibold flex-1">{{
                    leftSemiFinal.teams[1]?.name
                  }}</span>
                </div>
              </div>
            </div>

            <div
              v-if="leftSemiFinal.winner"
              class="winner-box bg-can-green rounded-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 flex items-center gap-1 md:gap-2 shadow-lg w-full justify-center"
            >
              <span class="text-sm md:text-lg">{{ leftSemiFinal.winner.flag }}</span>
              <span class="text-xs md:text-sm font-bold text-white">{{
                leftSemiFinal.winner.name
              }}</span>
            </div>
            <div
              v-else-if="leftSemiFinal?.teams[0] && leftSemiFinal?.teams[1]"
              class="winner-box bg-can-green bg-opacity-30 rounded-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 h-8 md:h-10 flex items-center justify-center w-full"
            >
              <span class="text-[10px] md:text-xs text-white opacity-50">Gagnant</span>
            </div>

            <div
              v-if="leftSemiFinal?.teams[0] && leftSemiFinal?.teams[1]"
              class="absolute left-full top-1/2 w-4 md:w-12 h-0.5 bg-can-green z-0"
              style="transform: translateY(-50%)"
            ></div>
          </div>
        </div>
      </div>

      <div
        class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
      >
        <div class="text-4xl md:text-9xl mb-1 md:mb-2">🏆</div>
        <div
          v-if="champion"
          class="bg-can-green rounded-full px-3 md:px-6 py-1.5 md:py-3 border-2 border-gold shadow-2xl"
        >
          <div class="flex items-center gap-1 md:gap-2">
            <span class="text-lg md:text-3xl">{{ champion.flag }}</span>
            <span class="text-xs md:text-lg font-bold text-white">{{
              champion.name
            }}</span>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col justify-center gap-2 md:gap-8 pl-1 md:pl-2">
        <div
          v-for="(match, index) in rightRoundOf16"
          :key="match.id"
          class="match-slot relative flex flex-col items-end"
        >
          <div class="flex flex-col gap-1 w-full">
            <div
              :class="[
                'team-box rounded px-3 py-2 border w-full',
                match.winner?.id === match.teams[0]?.id
                  ? 'bg-can-green text-white border-can-green'
                  : 'bg-white text-gray-800 border-gray-300',
              ]"
            >
              <div class="flex items-center gap-1 md:gap-2 justify-end">
                <span class="text-xs md:text-sm font-semibold flex-1 text-right">{{
                  match.teams[0]?.name
                }}</span>
                <span class="text-base md:text-xl">{{ match.teams[0]?.flag }}</span>
              </div>
            </div>
            <div
              :class="[
                'team-box rounded px-3 py-2 border w-full',
                match.winner?.id === match.teams[1]?.id
                  ? 'bg-can-green text-white border-can-green'
                  : 'bg-white text-gray-800 border-gray-300',
              ]"
            >
              <div class="flex items-center gap-1 md:gap-2 justify-end">
                <span class="text-xs md:text-sm font-semibold flex-1 text-right">{{
                  match.teams[1]?.name
                }}</span>
                <span class="text-base md:text-xl">{{ match.teams[1]?.flag }}</span>
              </div>
            </div>
          </div>

          <div
            v-if="match.winner"
            class="winner-box bg-can-green rounded-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 flex items-center gap-1 md:gap-2 shadow-lg w-full justify-center"
          >
            <span class="text-xs md:text-sm font-bold text-white">{{
              match.winner.name
            }}</span>
            <span class="text-sm md:text-lg">{{ match.winner.flag }}</span>
          </div>
          <div
            v-else
            class="winner-box bg-can-green bg-opacity-30 rounded-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 h-8 md:h-10 flex items-center justify-center w-full"
          >
            <span class="text-[10px] md:text-xs text-white opacity-50">Gagnant</span>
          </div>

          <div
            v-if="index < 4"
            class="absolute right-full top-1/2 w-4 md:w-12 h-0.5 bg-can-green z-0"
            style="transform: translateY(-50%)"
          ></div>
        </div>

        <div
          class="mr-2 md:mr-20 flex flex-col justify-center gap-2 md:gap-8 items-end"
        >
          <div
            v-for="(match, index) in rightQuarterFinals"
            :key="match.id"
            class="match-slot relative flex flex-col items-end w-full"
          >
            <div
              v-if="match.teams[0] && match.teams[1]"
              class="flex flex-col gap-1 w-full"
            >
              <div
                :class="[
                  'team-box rounded px-3 py-2 border w-full',
                  match.winner?.id === match.teams[0]?.id
                    ? 'bg-can-green text-white border-can-green'
                    : 'bg-white text-gray-800 border-gray-300',
                ]"
              >
                <div class="flex items-center gap-1 md:gap-2 justify-end">
                  <span class="text-xs md:text-sm font-semibold flex-1 text-right">{{
                    match.teams[0]?.name
                  }}</span>
                  <span class="text-base md:text-xl">{{ match.teams[0]?.flag }}</span>
                </div>
              </div>
              <div
                :class="[
                  'team-box rounded px-3 py-2 border w-full',
                  match.winner?.id === match.teams[1]?.id
                    ? 'bg-can-green text-white border-can-green'
                    : 'bg-white text-gray-800 border-gray-300',
                ]"
              >
                <div class="flex items-center gap-1 md:gap-2 justify-end">
                  <span class="text-xs md:text-sm font-semibold flex-1 text-right">{{
                    match.teams[1]?.name
                  }}</span>
                  <span class="text-base md:text-xl">{{ match.teams[1]?.flag }}</span>
                </div>
              </div>
            </div>

            <div
              v-if="match.winner"
              class="winner-box bg-can-green rounded-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 flex items-center gap-1 md:gap-2 shadow-lg w-full justify-center"
            >
              <span class="text-xs md:text-sm font-bold text-white">{{
                match.winner.name
              }}</span>
              <span class="text-sm md:text-lg">{{ match.winner.flag }}</span>
            </div>
            <div
              v-else-if="match.teams[0] && match.teams[1]"
              class="winner-box bg-can-green bg-opacity-30 rounded-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 h-8 md:h-10 flex items-center justify-center w-full"
            >
              <span class="text-[10px] md:text-xs text-white opacity-50">Gagnant</span>
            </div>

            <div
              v-if="index < 2 && match.teams[0] && match.teams[1]"
              class="absolute right-full top-1/2 w-4 md:w-12 h-0.5 bg-can-green z-0"
              style="transform: translateY(-50%)"
            ></div>
          </div>
        </div>

        <div
          class="mr-4 md:mr-40 flex flex-col justify-center gap-2 md:gap-8 items-end"
        >
          <div
            v-if="rightSemiFinal"
            class="match-slot relative flex flex-col items-end w-full"
          >
            <div
              v-if="rightSemiFinal.teams[0] && rightSemiFinal.teams[1]"
              class="flex flex-col gap-1 w-full"
            >
              <div
                :class="[
                  'team-box rounded px-3 py-2 border w-full',
                  rightSemiFinal.winner?.id === rightSemiFinal.teams[0]?.id
                    ? 'bg-can-green text-white border-can-green'
                    : 'bg-white text-gray-800 border-gray-300',
                ]"
              >
                <div class="flex items-center gap-1 md:gap-2 justify-end">
                  <span class="text-xs md:text-sm font-semibold flex-1 text-right">{{
                    rightSemiFinal.teams[0]?.name
                  }}</span>
                  <span class="text-base md:text-xl">{{
                    rightSemiFinal.teams[0]?.flag
                  }}</span>
                </div>
              </div>
              <div
                :class="[
                  'team-box rounded px-3 py-2 border w-full',
                  rightSemiFinal.winner?.id === rightSemiFinal.teams[1]?.id
                    ? 'bg-can-green text-white border-can-green'
                    : 'bg-white text-gray-800 border-gray-300',
                ]"
              >
                <div class="flex items-center gap-1 md:gap-2 justify-end">
                  <span class="text-xs md:text-sm font-semibold flex-1 text-right">{{
                    rightSemiFinal.teams[1]?.name
                  }}</span>
                  <span class="text-base md:text-xl">{{
                    rightSemiFinal.teams[1]?.flag
                  }}</span>
                </div>
              </div>
            </div>

            <div
              v-if="rightSemiFinal.winner"
              class="winner-box bg-can-green rounded-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 flex items-center gap-1 md:gap-2 shadow-lg w-full justify-center"
            >
              <span class="text-xs md:text-sm font-bold text-white">{{
                rightSemiFinal.winner.name
              }}</span>
              <span class="text-sm md:text-lg">{{ rightSemiFinal.winner.flag }}</span>
            </div>
            <div
              v-else-if="rightSemiFinal?.teams[0] && rightSemiFinal?.teams[1]"
              class="winner-box bg-can-green bg-opacity-30 rounded-full px-2 md:px-4 py-1 md:py-2 mt-1 md:mt-2 h-8 md:h-10 flex items-center justify-center w-full"
            >
              <span class="text-[10px] md:text-xs text-white opacity-50">Gagnant</span>
            </div>

            <div
              v-if="rightSemiFinal?.teams[0] && rightSemiFinal?.teams[1]"
              class="absolute right-full top-1/2 w-4 md:w-12 h-0.5 bg-can-green z-0"
              style="transform: translateY(-50%)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  matches: {
    type: Array,
    required: true,
  },
  champion: {
    type: Object,
    default: null,
  },
});

const bracketRef = ref(null);

const roundOf16Matches = computed(() => {
  return props.matches.filter((m) => m.round === "round_of_16");
});

const leftRoundOf16 = computed(() => roundOf16Matches.value.slice(0, 4));
const rightRoundOf16 = computed(() => roundOf16Matches.value.slice(4, 8));

const quarterFinalMatches = computed(() => {
  return props.matches.filter((m) => m.round === "quarter_final");
});

const leftQuarterFinals = computed(() => quarterFinalMatches.value.slice(0, 2));
const rightQuarterFinals = computed(() =>
  quarterFinalMatches.value.slice(2, 4)
);

const semiFinalMatches = computed(() => {
  return props.matches.filter((m) => m.round === "semi_final");
});

const leftSemiFinal = computed(() => {
  return semiFinalMatches.value[0] || null;
});

const rightSemiFinal = computed(() => {
  return semiFinalMatches.value[1] || null;
});

defineExpose({
  $el: bracketRef,
});
</script>

<style scoped>
.bracket-visual {
  min-width: 100%;
}

.match-slot {
  min-height: 120px;
  display: flex;
  flex-direction: column;
}

.team-box {
  min-width: 150px;
  max-width: 100%;
}

.winner-box {
  min-width: 150px;
  max-width: 100%;
}

@media (max-width: 768px) {
  .bracket-visual {
    font-size: 0.75rem;
  }

  .team-box,
  .winner-box {
    min-width: 100px;
    padding: 0.25rem 0.5rem;
  }

  .match-slot {
    min-height: 80px;
  }
}
</style>
