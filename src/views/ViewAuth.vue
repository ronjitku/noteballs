<template>
    <div class="auth">
        <div class="tabs is-centered">
            <ul>
                <li :class="{ 'is-active': !register }">
                    <a @click.prevent="register = false">Login</a>
                </li>
                <li :class="{ 'is-active': register }">
                    <a @click.prevent="register = true">Register</a>
                </li>
            </ul>
        </div>
        <div class="card auth-form">
            <div class="card-content">
                <div class="title has-text-centered">{{ formTitle }}</div>
                <form
                  @submit.prevent="onSubmit"
                >
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input
                              v-model="credential.email"
                              class="input"
                              placeholder="e.g. alexsmith@gmail.com"
                              type="email"
                            />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                           <input
                              v-model="credential.password"
                              class="input"
                              placeholder="Enter a password"
                              type="password"
                            />
                        </div>
                    </div>
                    <div class="field is-grouped is-grouped-right">
                        <p class="control">
                            <button class="button is-primary">
                                {{ formTitle }}
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
/*
Imports
*/

import { computed, reactive, ref } from "vue"
import { useStoreAuth } from "@/stores/storeAuth";

/*
    register/ login
*/

const register = ref(false)
const storeAuth = useStoreAuth()

/*
form title 
*/

const formTitle = computed(() => {
    return register.value ? "Register" : "Login";
})

/*
credential 
*/

const credential = reactive({
    email: '',
    password: ''
})

/*
form submit 
*/

const onSubmit = () => {
    if (!credential.email || !credential.password) {
        alert('Please enter an email and password!')
    }
    else {
        if (register.value) {
            storeAuth.registerUser(credential)
        }
        else {
            storeAuth.loginUser(credential)
        }
    }
}


</script>

<style>
.auth-form {
    max-width: 400px;
    margin: 0 auto;
}
</style>