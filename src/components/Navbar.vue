<template>
    <nav class="h-16 shadow-md p-4 bg-white bg-opacity-30 flex justify-between gap-4">
        <div v-if="isAuthenticated">
        <router-link class="inline-flex px-4 items-center font-semibold hover:bg-purple-300"
            :to="{ name: 'Home' }">Home</router-link>
                <router-link class="inline-flex px-4 items-center font-semibold hover:bg-purple-300"
            :to="{ name: 'Dashboard' }">Dashboard</router-link>
        </div>
        <div v-else>
            <router-link class="inline-flex px-4 items-center font-semibold hover:bg-purple-300"
            :to="{ name: 'Home' }">Home</router-link>
            <router-link class="inline-flex px-4 items-center font-semibold hover:bg-purple-300"
            :to="{ name: 'Login' }">Login</router-link>
                <router-link class="inline-flex px-4 items-center font-semibold hover:bg-purple-300"
            :to="{ name: 'Register' }">Register</router-link>
        </div>
        <button v-if="isAuthenticated" @click="logout">Logout</button>
    </nav>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import router from '../router';
import { useToast } from 'vue-toastification';

const store = useStore();

const isAuthenticated = computed(() => store.getters.isAuthenticated)
const toast = useToast();

const logout = async () => {
    const success = await store.dispatch('logout');
    if(success){
        router.push({name:'Login'});
        toast.success('User logged out!');
    }else{
        alert("Something went wrong");
    }
}
</script>