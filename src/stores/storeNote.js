// stores/counter.js
import { defineStore } from 'pinia'
import { collection, onSnapshot, doc, deleteDoc, updateDoc, query, orderBy,  addDoc } from "firebase/firestore"
import { db } from '@/js/firebase'
import { useStoreAuth } from '@/stores/storeAuth'


let notesCollectionRef 
let notesCollectionQuery
let getNotesSnapshot = null

export const useStoreNotes = defineStore('storeNotes', {
state: () => {
    return {
        notes: [],
        notesLoaded: false
    }
},

actions: {
    init() {
        //initialize our database refs
        const storeAuth = useStoreAuth()
        notesCollectionRef = collection(db,'users', storeAuth.user.id ,'notes')
        notesCollectionQuery= query(notesCollectionRef, orderBy('date', 'desc'))
        this.getNotes()
    },
    async getNotes() {
    this.notesLoaded = false

    
    getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
            let note = {
                id: doc.id,
                content: doc.data().content,
                date: doc.data().date
            }
            notes.push(note)
        })
        this.notes = notes
        this.notesLoaded = true
    }, error => {
        console.log('error.message', error.message);
        
    })
    },
    clearNotes() {
        this.notes = []
        if (getNotesSnapshot) getNotesSnapshot()
    },
    async addNote(newNoteContent) {   
    let currentDate = new Date().getTime(),
        date = currentDate.toString()

    await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date
    })   



    },
    async deleteNote(idToDelete) {
        await deleteDoc(doc(notesCollectionRef, idToDelete))
        // this.notes = this.notes.filter(note => { return note.id !== idToDelete })

    },
    async updateNote(id, content) {
        const washingtonRef = doc(notesCollectionRef, id)
        await updateDoc(washingtonRef, {
        content
        })
    }
},



getters: {
    getNoteContent: (state) => {
        return (id) => {
            return state.notes.filter(note => { return note.id === id })[0].content
        }
    },
    totalNotes: (state) => {
        return state.notes.length
    },
    totalCharactersCount: (state) => {
        let count = 0
        state.notes.forEach(note => {
            count += note.content.length
        })
        return count
    }
}

})