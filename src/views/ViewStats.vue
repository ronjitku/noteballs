<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ storeNotes.totalNotes }}</td>
        </tr>
        <tr>
          <td>Number of Character (of all notes)</td>
          <td>{{ storeNotes.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
    <input
     v-model="loveNoteballs"
      class="input"
      type="text"
      placeholder="Do you love noteballs??"
      v-autofocus
    />
  </div>
</template>


<script setup>

/*
  imports 
*/

import { useStoreNotes } from '@/stores/storeNote'
import { vAutofocus } from '@/directives/vAutofocus';
import { useWatchCharacter } from '@/use/useWatchCharacter';
import { ref } from 'vue';

/*
  Store
*/

const storeNotes = useStoreNotes()


/*
  lovenoteball
*/
const loveNoteballs = ref('')

useWatchCharacter(loveNoteballs, 50)

</script>