<template>
    <div class="edit-note">
        <AddEditNote
            v-model="noteContent"
            ref="addEditNoteRef"
            bgColor="link"
            placeholder="Edit Note"
            label="Edit Note"
    >
      <template #buttons>
        <button
          @click="handleSaveClicked"
          class="button is-link has-background-link mr-3"
          :disabled="!noteContent"
        >
          Save Note
        </button>
        <button
            @click="$router.back()"
          class="button is-link is-light"
          
        >
          Cancel
        </button>
      </template>
    </AddEditNote>
    </div>
</template>


<script setup>

/*
Imports 
*/
import AddEditNote from '@/components/Notes/AddEditNote.vue';
import { ref } from 'vue';
import { useStoreNotes } from '@/stores/storeNote';
import { useRoute, useRouter } from 'vue-router';



/*
route
*/
const route = useRoute()
const router = useRouter()


/*
Note
*/

const noteContent = ref('')


/*
store
*/

const storeNotes = useStoreNotes()

noteContent.value = storeNotes.getNoteContent(route.params.id)



/*
save clicked
*/

const handleSaveClicked = () => {
  storeNotes.updateNote(route.params.id, noteContent.value)
  router.push('/')
}



</script>