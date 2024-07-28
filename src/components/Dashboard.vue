<template>
    <AuthLayout>
        <p v-if="user">Welcome, {{ user.name }}!</p>
    </AuthLayout>
</template>


<script setup>
import { useStore } from 'vuex';
import AuthLayout from './AuthLayout.vue';
import { computed } from 'vue';

const store = useStore();
const user = computed(()=> store.getters.user);

</script>
