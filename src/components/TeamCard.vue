<template>
  <div
    @click="handleClick"
    :class="[
      'team-card',
      'cursor-pointer',
      'bg-white',
      'rounded-lg',
      'shadow-md',
      'p-4',
      'md:p-6',
      'border-2',
      'border-transparent',
      'transition-all',
      'duration-200',
      'hover:shadow-lg',
      'hover:border-can-green',
      'hover:scale-105',
      'active:scale-95',
      'min-w-[140px]',
    ]"
  >
    <div class="flex flex-col items-center gap-2">
      <div class="text-4xl">{{ team.flag }}</div>
      <div class="text-lg font-semibold text-gray-800 text-center">
        {{ team.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  team: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["select-team"]);

function handleClick() {
  emit("select-team", props.team);
}
</script>

<style scoped>
.team-card {
  user-select: none;
  -webkit-user-select: none;
}
</style>

