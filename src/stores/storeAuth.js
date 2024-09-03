// stores/counter.js
import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/js/firebase'
import { useStoreNotes } from '@/stores/storeNote'




export const useStoreAuth = defineStore('storeAuth', {
state: () => {  
    return {
        user: {}
    }
},

actions: {
    init() {
        const storeNotes = useStoreNotes()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user.id = user.uid
                this.user.email = user.email
                this.router.push('/')
                storeNotes.init()
            } else {
                this.user = {}
                this.router.replace('/auth')
                storeNotes.clearNotes()
            }
          })
    },
    registerUser(credential) {
        createUserWithEmailAndPassword(auth, credential.email, credential.password).then((userCredential) => {
            const user = userCredential.user
        }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
        })
    },
    loginUser(credential) {
        signInWithEmailAndPassword(auth, credential.email, credential.password).then((userCredential) => {
            const user = userCredential.user
        }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
        })
    },
    logoutUser() {
        signOut(auth).then(() => {
            console.log('User signed out')
          }).catch((error) => {
            console.log(error.message)
          })
    }
}

})