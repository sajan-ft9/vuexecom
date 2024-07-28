<template>
    <div class="bg-slate-100">
        <Navbar />
        <main class="p-8">
            <slot></slot>
        </main>
    </div>
</template>

<script setup>
import Navbar from './Navbar.vue';
import { onMounted } from 'vue';
import apiClient from '../axios';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const toast = useToast();
const store = useStore();

const fetchUserData = async () => {
    try {
        const response = await apiClient.get('/user');
        store.commit('SET_USER', response.data.data);
    } catch (error) {
        console.error('Failed to fetch user:', error);
        toast.error('Failed to fetch user.');
    }
}


onMounted(() => {
    fetchUserData();
});
</script>