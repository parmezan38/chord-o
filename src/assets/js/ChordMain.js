import OptionsContainer from '@/components/OptionsContainer'
import ChordName from '@/components/ChordName'
import ChordNotes from '@/components/ChordNotes'
import PianoKeys from '@/components/PianoKeys'
import PianoKeysData from '@/assets/js/PianoKeysData'

import {Howl, Howler} from 'howler'

export default {
  name: 'ChordMain',
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
      pianoKeysData: PianoKeysData.data,
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
      let newRoot = this.newRandomRoot(),
          newChord = this.newRandomChord(),
          newNotes = this.notesFromChordPositions(newRoot, newChord)
      this.chordDisplay = newRoot.note + ' ' + newChord.name
      this.notesDisplay = this.createNotesString(newNotes)

      this.clearDisplayedNotes()
      this.addDisplayedNotes(newNotes)
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
      if (typeof this.bpm !== 'number') {
        this.bpm = 60
      } else if (this.bpm >= 500) {
        this.bpm = 499
      } else if (this.bpm <= 1) {
        this.bpm = 1
      }
      this.bpm = Number(this.bpm)
    },
    changeBpm (num) {
      this.bpm += num
      this.validateBpm()
    },
    newRandomRoot () {
      let randomNumForRoot = Math.round(Math.random() * (this.NOTES.length - 1))
      return {
        note: this.NOTES[randomNumForRoot],
        index: this.NOTES.indexOf(this.NOTES[randomNumForRoot])
      }
    },
    newRandomChord () {
      let usedChords = []
      this.CHORDS.forEach(usedChord => {
        if (usedChord.used) {
          usedChords.push(usedChord)
        }
      })
      let randomNumForChord = Math.round(Math.random() * (usedChords.length - 1))
      return usedChords[randomNumForChord]
    },
    notesFromChordPositions (newRoot, newChord) {
      let notes = { textNotes: [], keyNotes: [] }
      newChord.notes.forEach(pos => {
        let newTextPos = (pos + newRoot.index) % this.NOTES.length,
            newKeyPos = pos + newRoot.index
        notes.textNotes.push({index: newTextPos, name: this.NOTES[newTextPos]})
        notes.keyNotes.push({index: newKeyPos, name: this.NOTES[newKeyPos]})
      })
      return notes
    },
    createNotesString (newNotes) {
      let str = ''
      newNotes.textNotes.forEach(note => {
        str += note.name + ' '
      })
      return str
    },
    clearDisplayedNotes () {
      for (let i = 0; i < this.pianoKeysData.length; i++) {
        this.pianoKeysData[i].selected = false
      }
    },
    addDisplayedNotes (newNotes) {
      for (let i = 0; i < newNotes.keyNotes.length; i++) {
        let noteIndex = newNotes.keyNotes[i].index
        this.pianoKeysData[noteIndex].selected = true
        // Play Note Sounds
        this.playSound(noteIndex)
      }
    }
  }
}
