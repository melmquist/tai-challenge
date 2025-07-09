<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Task {
  id: number
  title: string
  completed: boolean
  createdAt: string
  tags: string[]
}

const API_URL = 'http://localhost:3000/tasks'

const tasks = ref<Task[]>([])
const newTaskTitle = ref('')
const newTaskTags = ref('')
const isLoading = ref(false)
const error = ref<string | null>(null)
const selectedTag = ref<string>('')

const allTags = computed(() => {
  const tagSet = new Set<string>()
  tasks.value.forEach(task => task.tags.forEach(tag => tagSet.add(tag)))
  return Array.from(tagSet).sort()
})

const filteredTasks = computed(() => {
  if (!selectedTag.value) return tasks.value
  return tasks.value.filter(task => task.tags.includes(selectedTag.value))
})

async function fetchTasks() {
  isLoading.value = true
  error.value = null
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Failed to fetch tasks')
    tasks.value = await res.json()
  } catch (err: any) {
    error.value = err.message || 'Unknown error'
  } finally {
    isLoading.value = false
  }
}

async function addTask() {
  if (!newTaskTitle.value.trim()) return
  isLoading.value = true
  error.value = null
  try {
    const tags = newTaskTags.value.split(',').map(t => t.trim()).filter(Boolean)
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTaskTitle.value, tags })
    })
    if (!res.ok) throw new Error('Failed to add task')
    const task = await res.json()
    tasks.value.unshift(task)
    newTaskTitle.value = ''
    newTaskTags.value = ''
  } catch (err: any) {
    error.value = err.message || 'Unknown error'
  } finally {
    isLoading.value = false
  }
}

async function toggleTask(task: Task) {
  isLoading.value = true
  error.value = null
  try {
    const res = await fetch(`${API_URL}/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed })
    })
    if (!res.ok) throw new Error('Failed to update task')
    const updated = await res.json()
    const idx = tasks.value.findIndex(t => t.id === task.id)
    if (idx !== -1) tasks.value[idx] = updated
  } catch (err: any) {
    error.value = err.message || 'Unknown error'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchTasks)
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-white shadow p-4 flex items-center justify-center">
      <span class="text-2xl font-extrabold tracking-tight text-blue-600 drop-shadow-sm select-none">Transformer.AI</span>
      <span class="ml-2 text-xl font-semibold text-gray-800 select-none">Task Manager</span>
    </header>
    <main class="flex-1 flex flex-col px-2 py-4 sm:px-8 sm:py-8">
      <div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-6">
        <form @submit.prevent="addTask" class="flex flex-col sm:flex-row gap-2 sm:gap-0 flex-1">
          <input
            v-model="newTaskTitle"
            type="text"
            placeholder="Add a new task..."
            class="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            :disabled="isLoading"
          />
          <input
            v-model="newTaskTags"
            type="text"
            placeholder="Tags (comma separated)"
            class="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            :disabled="isLoading"
          />
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition sm:rounded-l-none sm:rounded-r"
            :disabled="isLoading"
          >
            Add
          </button>
        </form>
        <div class="flex items-center gap-2 mt-2 sm:mt-0">
          <label for="tag-filter" class="text-sm text-gray-700">Filter by tag:</label>
          <select id="tag-filter" v-model="selectedTag" class="border rounded px-2 py-1">
            <option value="">All</option>
            <option v-for="tag in allTags" :key="tag" :value="tag">{{ tag }}</option>
          </select>
        </div>
      </div>
      <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>
      <div v-if="isLoading" class="text-gray-500 mb-4">Loading...</div>
      <ul class="flex-1 overflow-y-auto">
        <li
          v-for="task in filteredTasks"
          :key="task.id"
          class="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b last:border-b-0 gap-1 sm:gap-0"
        >
          <div class="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" :checked="task.completed" @change="toggleTask(task)" :disabled="isLoading" />
              <span :class="task.completed ? 'line-through text-gray-400' : 'text-gray-900'">{{ task.title }}</span>
            </label>
            <div class="flex flex-wrap gap-1 mt-1 sm:mt-0">
              <span v-for="tag in task.tags" :key="tag" class="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">{{ tag }}</span>
            </div>
          </div>
          <span class="text-xs text-gray-400 sm:text-right">{{ new Date(task.createdAt).toLocaleString() }}</span>
        </li>
      </ul>
    </main>
    <footer class="p-4 text-gray-400 text-xs text-center">AI Integration: UI generated by ChatGPT</footer>
  </div>
</template>

<style scoped>
</style>
