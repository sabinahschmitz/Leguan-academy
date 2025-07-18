<template>
  <div class="cybersec-view">
    <h1>Cyber Security Training</h1>
    <div class="game-area">
      <div class="game-frame">
        <p class="placeholder">Game frame</p>
      </div>
      <div class="sidebar">
        <button class="play-button" @click="playGame">Play</button>
        <div class="level-selector">
          <label for="level">Level:</label>
          <select id="level" v-model="selectedLevel">
            <option v-for="level in levels" :key="level" :value="level">Level {{ level }}</option>
          </select>
        </div>
        <div class="options">
          <h2>Settings</h2>
          <label><input type="checkbox" v-model="motions" /> Motions</label>
          <label><input type="checkbox" v-model="feedback" /> Feedback</label>
          <label><input type="checkbox" v-model="bugs" /> Bugs</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const levels = [1, 2, 3]
const selectedLevel = ref(1)
const motions = ref(true)
const feedback = ref(true)
const bugs = ref(false)

function playGame() {
  console.log(`Play level ${selectedLevel.value}`)
}
</script>

<style scoped>
.cybersec-view {
  text-align: center;
}

.game-area {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.game-frame {
  width: 600px;
  height: 400px;
  border: 2px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin-right: 20px;
}

.placeholder {
  color: #888;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.play-button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
}

.level-selector,
.options {
  text-align: left;
}

.options label {
  display: block;
  margin-bottom: 5px;
}
</style>
