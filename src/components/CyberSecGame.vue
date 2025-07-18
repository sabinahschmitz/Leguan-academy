<template>
  <div class="cybersec-game">
    <div class="chat-window">
      <div
        v-for="(msg, index) in chatHistory"
        :key="index"
        :class="['message', msg.sender]"
      >
        {{ msg.text }}
      </div>
    </div>
    <div class="game-controls">
      <button v-if="!playing" @click="startGame">Play</button>
      <div v-else class="in-game-controls">
        <button @click="sendResponse">Send Emojis</button>
        <button @click="report">🚨 Report</button>
      </div>
    </div>
    <p v-if="statusMessage">{{ statusMessage }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  selectedLevel: Number,
  motions: Boolean,
  feedback: Boolean,
  bugs: Boolean
})

const emit = defineEmits(['finished'])

const dangerousEmojis = ['\uD83D\uDD2A', '\uD83D\uDCA3', '\uD83E\uDEA8', '\uD83E\uDEA4', '\uD83D\uDD2B', '\u2620\uFE0F']

const partnerMessages = [
  'Hello \uD83D\uDE0A',
  'How are you? \uD83E\uDD17',
  'Check this out! \uD83D\uDD2A',
  'Look at this! \uD83D\uDCA3',
  'Nice weather today \u2600\uFE0F',
  'Oops \uD83E\uDEA8',
  'See you later!'
]

const chatHistory = ref([])
const playing = ref(false)
const msgIndex = ref(0)
const statusMessage = ref('')

function startGame() {
  chatHistory.value = []
  msgIndex.value = 0
  playing.value = true
  statusMessage.value = ''
  nextMessage()
}

function nextMessage() {
  if (msgIndex.value < partnerMessages.length) {
    const text = partnerMessages[msgIndex.value]
    chatHistory.value.push({ sender: 'partner', text })
    msgIndex.value++
  } else {
    endGame()
  }
}

function sendResponse() {
  chatHistory.value.push({ sender: 'player', text: randomPlayerEmojis() })
  nextMessage()
}

function randomPlayerEmojis() {
  const options = ['\uD83D\uDE00\uD83D\uDE00', '\uD83D\uDC4D\uD83D\uDE0A', '\uD83E\uDD14\u2753', '\uD83D\uDE02\uD83D\uDE02', '\uD83D\uDE0E\uD83D\uDD25']
  return options[Math.floor(Math.random() * options.length)]
}

function report() {
  const lastMsg = chatHistory.value[chatHistory.value.length - 1]
  const found = dangerousEmojis.some(e => lastMsg.text.includes(e))
  if (props.feedback) {
    statusMessage.value = found ? 'Correct report!' : 'Nothing dangerous here.'
  }
  if (found) {
    lastMsg.reported = true
  }
}

function endGame() {
  playing.value = false
  emit('finished')
}

watch(() => props.selectedLevel, () => {
  if (playing.value) {
    endGame()
  }
})

defineExpose({ startGame })
</script>

<style scoped>
.cybersec-game {
  border: 1px solid #ccc;
  padding: 10px;
}
.chat-window {
  height: 200px;
  overflow-y: auto;
  border: 1px solid #aaa;
  padding: 5px;
  margin-bottom: 10px;
}
.message {
  margin: 2px 0;
}
.partner {
  text-align: left;
}
.player {
  text-align: right;
}
</style>

