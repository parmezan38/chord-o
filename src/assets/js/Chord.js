import OptionsContainer from '@/components/OptionsContainer'
import ChordName from '@/components/ChordName'
import ChordNotes from '@/components/ChordNotes'
import PianoKeys from '@/components/PianoKeys'

import {Howl, Howler} from 'howler'

export default {
  name: 'Chord',
  components: {
    OptionsContainer,
    ChordName,
    ChordNotes,
    PianoKeys
  },
  data () {
    return {
      NOTES: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      CHORDS: [
        {name: 'Major triad', notes: [0, 4, 7], used: true},
        {name: 'Minor triad', notes: [0, 3, 7], used: true},
        {name: 'Major seventh', notes: [0, 4, 7, 11], used: true},
        {name: 'Minor seventh', notes: [0, 3, 7, 10], used: true}

      ],
      optionsData: {
        show: false,
        chordDisplayOn: true,
        notesDisplayOn: true,
        keysDisplayOn: true,
        volume: 1
      },
      bpm: 60,
      isLooping: false,
      chordDisplay: 'Chord Name',
      notesDisplay: 'Notes',
      interval: null
    }
  },
  methods: {
    playSound (keyNumber) {
      let sound = new Howl({
        src: [require('../../assets/sounds/piano_' + keyNumber + '.mp3'), require('../../assets/sounds/piano_' + keyNumber + '.ogg')]
      })
      sound.play()
      // Change global volume.
      Howler.volume(this.optionsData.volume)
    },
    newChord () {
      let usedChords = []
      this.CHORDS.forEach(usedChord => {
        if (usedChord.used) {
          usedChords.push(usedChord)
        }
      })
      let randomNumForRoot = Math.round(Math.random() * (this.NOTES.length - 1)),
          randomNumForChord = Math.round(Math.random() * (usedChords.length - 1)),
          newRoot = {note: this.NOTES[randomNumForRoot], index: this.NOTES.indexOf(this.NOTES[randomNumForRoot])},
          newChord = usedChords[randomNumForChord],
          notesFromChordPositions = () => {
            let notes = { textNotes: [], keyNotes: [] }
            newChord.notes.forEach(pos => {
              let newTextPos = (pos + newRoot.index) % this.NOTES.length,
                  newKeyPos = pos + newRoot.index
              notes.textNotes.push({index: newTextPos, name: this.NOTES[newTextPos]})
              notes.keyNotes.push({index: newKeyPos, name: this.NOTES[newKeyPos]})
            })
            return notes
          },
          newNotes = notesFromChordPositions()

      this.chordDisplay = newRoot.note + ' ' + newChord.name
      let notesString = () => {
        let str = ''
        newNotes.textNotes.forEach(note => {
          str += note.name + ' '
        })
        return str
      }
      this.notesDisplay = notesString()

      let keys = document.querySelector('#keys').children,
          renderOrder = document.querySelector('#renderOrder')

      for (let i = 0; i < keys.length; i++) {
        // Remove selected-key style
        keys[i].classList.remove('selected-key')
        // Remove from render order
        while (renderOrder.firstChild) {
          renderOrder.removeChild(renderOrder.firstChild)
        }
      }
      for (let i = 0; i < newNotes.keyNotes.length; i++) {
        let noteIndex = newNotes.keyNotes[i].index
        // Add selected-key style
        keys[noteIndex].classList.add('selected-key')
        // Add to render order
        renderOrder.insertAdjacentHTML('beforeend', '<use xlink:href="#' + keys[noteIndex].id + '"/>')
        // Play Note Sounds
        this.playSound(noteIndex)
      }
    },
    startCreateChordLoop () {
      let tempo = 60000 / this.bpm
      this.interval = setInterval(() => {
        this.newChord()
      }, tempo)
      this.isLooping = true
    },
    stopCreateChordLoop () {
      if (this.interval) {
        clearInterval(this.interval)
      }
      this.isLooping = false
    },
    toggleShowOptions () {
      this.optionsData.show = !this.optionsData.show
    },
    validateBpm () {
      this.bpm = Number((typeof this.bpm !== 'number') ? 60 : (this.bpm >= 500) ? 499 : (this.bpm <= 1) ? 1 : this.bpm)
    },
    changeBpm (num) {
      this.bpm += num
      this.validateBpm()
    }
  }
}
