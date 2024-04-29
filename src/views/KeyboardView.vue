<script setup>
import { ref } from 'vue'
import mova from '@/assets/sounds/a.mov'
import movb from '@/assets/sounds/b.mov'
import movc from '@/assets/sounds/c.mov'
import movd from '@/assets/sounds/d.mov'
import move from '@/assets/sounds/e.mov'
import movf from '@/assets/sounds/f.mov'
import movg from '@/assets/sounds/g.mov'
import movh from '@/assets/sounds/h.mov'
import movi from '@/assets/sounds/i.mov'
import movj from '@/assets/sounds/j.mov'
import movk from '@/assets/sounds/k.mov'
import movl from '@/assets/sounds/l.mov'
import movm from '@/assets/sounds/m.mov'
import movn from '@/assets/sounds/n.mov'
import movo from '@/assets/sounds/o.mov'
import movp from '@/assets/sounds/p.mov'
import movq from '@/assets/sounds/q.mov'
import movr from '@/assets/sounds/r.mov'
import movs from '@/assets/sounds/s.mov'
import movt from '@/assets/sounds/t.mov'
import movu from '@/assets/sounds/u.mov'
import movv from '@/assets/sounds/v.mov'
import movw from '@/assets/sounds/w.mov'
import movx from '@/assets/sounds/x.mov'
import movy from '@/assets/sounds/y.mov'
import movz from '@/assets/sounds/z.mov'

const alphabet = ref('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
const sounds = ref({
  A: mova,
  B: movb,
  C: movc,
  D: movd,
  E: move,
  F: movf,
  G: movg,
  H: movh,
  I: movi,
  J: movj,
  K: movk,
  L: movl,
  M: movm,
  N: movn,
  O: movo,
  P: movp,
  Q: movq,
  R: movr,
  S: movs,
  T: movt,
  U: movu,
  V: movv,
  W: movw,
  X: movx,
  Y: movy,
  Z: movz,
})

const playSound = (letter) => {
  const audio = new Audio(sounds.value[letter])
  audio.load();
  audio.play();
}
</script> 

<template>
  <div id="app">
    <div class="game-container">
      <div class="keyboard">
        <h1>Keyboard game</h1>
        <button v-for="letter in alphabet" :key="letter" @click="playSound(letter)" class="key">{{ letter }}</button>
      </div>
      <div class="panel">
        <h2>Levels</h2>
        <ul>
          <li v-for="level in levels" :key="level.id">{{ level.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
}

#app {
  text-align: center;
  max-width: 100%;
  overflow-x: hidden;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
}

.keyboard {
  width: 100%;
}

.panel {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

h1, h2 {
  margin-bottom: 10px;
}

.key {
  font-size: 20px;
  padding: 10px 20px;
  margin: 5px;
  border: 2px solid #333;
  background-color: #484141;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.key:hover {
  background-color: #63a1c7;
  border-color: #333;
}

@media (min-width: 768px) {
  .game-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .keyboard {
    width: 70%;
  }

  .panel {
    width: 25%;
  }
}
</style>
