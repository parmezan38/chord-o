<template>
  <div>
    <div id="app">
      <h1>Chord-O</h1>
      <h2>A simple app to help you with practicing chords</h2>
      <chord-main></chord-main>
    </div>
  </div>
</template>

<script>
import ChordMain from './components/ChordMain'

export default {
  name: 'App',
  components: {
    ChordMain
  },
  data () {
    return {}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #764462;
  margin-top: 28px;
}
html {
  height: 100%;
}
body {
  background-image: linear-gradient(15deg, #EDB4A1, #A1E0ED );
  background-attachment:fixed;
}
</style>
