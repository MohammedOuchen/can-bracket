<template>
  <div
    @drop="handleDrop"
    @dragover="handleDragOver"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    :class="[
      'drop-zone',
      'rounded-lg',
      'border-2',
      'border-dashed',
      'p-8',
      'text-center',
      'transition-all',
      'duration-200',
      'min-h-[120px]',
      'flex',
      'items-center',
      'justify-center',
      isDragOver
        ? 'border-can-green bg-can-green bg-opacity-10 scale-105'
        : 'border-gray-300 bg-gray-50',
    ]"
  >
    <div class="flex flex-col items-center gap-2">
      <div class="text-2xl">🏆</div>
      <div
        :class="[
          'text-lg',
          'font-semibold',
          isDragOver ? 'text-can-green' : 'text-gray-600',
        ]"
      >
        Drop winner here
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['drop'])

const isDragOver = ref(false)

function handleDragOver(event) {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

function handleDragEnter(event) {
  event.preventDefault()
  isDragOver.value = true
}

function handleDragLeave(event) {
  // Only set to false if we're leaving the drop zone itself
  if (!event.currentTarget.contains(event.relatedTarget)) {
    isDragOver.value = false
  }
}

function handleDrop(event) {
  event.preventDefault()
  isDragOver.value = false
  
  try {
    const teamData = event.dataTransfer.getData('team')
    if (teamData) {
      const team = JSON.parse(teamData)
      emit('drop', team)
    }
  } catch (error) {
    console.error('Error parsing dropped team data:', error)
  }
}
</script>

<style scoped>
.drop-zone {
  user-select: none;
  -webkit-user-select: none;
}
</style>

