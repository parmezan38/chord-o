<template>
  <div id="options">
    <h4>Display options:</h4>
    <table id="displayOptions">
      <tr>
        <td>
          <label>Chord Name</label>
        </td>
        <td>
          <label class="switch">
            <input type="checkbox" v-model="optionsData.chordDisplayOn">
            <span class="checkbox-slider"></span>
          </label>
        </td>
      </tr>

      <tr>
        <td>
          <label>Notes</label>
        </td>
        <td>
          <label class="switch">
            <input type="checkbox" v-model="optionsData.notesDisplayOn">
            <span class="checkbox-slider"></span>
          </label>
        </td>
      </tr>

      <tr>
        <td>
          <label>Piano</label>
        </td>
        <td>
          <label class="switch">
            <input type="checkbox" v-model="optionsData.keysDisplayOn">
            <span class="checkbox-slider"></span>
          </label>
        </td>
      </tr>

      <tr>
        <td>
          <label>Volume</label>
        </td>
        <td>
          <input type="range" min="0" max="1" class="slider" step="0.1" v-model="optionsData.volume">
        </td>
      </tr>
    </table>

    <div>
      <h4>Chord options:</h4>
      <table id="chordTypes" v-for="chord in chordData" :key="chord.id">
        <tr>
          <td>
            <label>{{ chord.name }}</label>
          </td>
          <td>
            <label class="switch">
              <input type="checkbox" v-model="chord.used">
              <span class="checkbox-slider"></span>
            </label>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script src="../assets/js/OptionsContainer.js"></script>
<style src="../assets/css/OptionsContainer.css" scoped></style>
