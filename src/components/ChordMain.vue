<template>
  <div id="chord">
    <button class="chordButton" v-on:click="toggleShowOptions">Options</button>
    <div>
      <transition name="slide-fade">
        <options-container v-show="optionsData.show" :optionsData="optionsData" :chordData="CHORDS"></options-container>
      </transition>
    </div>

    <span>
      <button class="chordButton" id="minusButton" v-on:click="changeBpm(-1)">-</button>
      <input class="chordButton" id="bpm" type="number" placeholder="60" v-model.number="bpm" v-on:change="validateBpm">
      <button class="chordButton" id="plusButton" v-on:click="changeBpm(1)">+</button>
    </span>

    <span v-if="isLooping">
      <button class="chordButton" id="startStopButton" v-on:click="stopCreateChordLoop">Stop</button>
    </span>
    <span v-else>
      <button class="chordButton" id="startStopButton" v-on:click="startCreateChordLoop">Start</button>
    </span>

    <transition name="slide-fade">
      <div v-show="optionsData.chordDisplayOn">
        <chord-name :chordDisplay="chordDisplay"></chord-name>
      </div>
    </transition>

    <transition name="slide-fade">
      <div v-show="optionsData.notesDisplayOn">
        <chord-notes :notesDisplay="notesDisplay"></chord-notes>
      </div>
    </transition>

    <transition name="slide-fade">
        <div v-show="optionsData.keysDisplayOn">
          <piano-keys></piano-keys>
        </div>
    </transition>

  </div>
</template>

<script src="../assets/js/ChordMain.js"></script>
<style src="../assets/css/ChordMain.css" scoped></style>
