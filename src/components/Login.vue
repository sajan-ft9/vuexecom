<template>
    <GuestLayout>
        <div class="flex justify-center">
            <form @submit.prevent="login">
                <div v-if="errors">
                    <ul>
                        <li v-for="(error, index) in errors" :key="index">{{ error.value }}</li>
                    </ul>
                </div>
                <input v-model="email" class="p-2 block m-4 w-full" type="email" placeholder="Email" required />
                <input v-model="password" type="password" class="p-2 block m-4 w-full" placeholder="Password"
                    required />
                <button type="submit" class="bg-blue-700 py-2 px-5 mx-4 text-white rounded w-full">Login</button>
            </form>
        </div>
    </GuestLayout>
</template>

<script setup>
import { useStore } from 'vuex';
import GuestLayout from './GuestLayout.vue';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';

const email = ref('');
const password = ref('');
const store = useStore();
const router = useRouter();
const toast = useToast();
const errors = computed(() => store.getters.errors ? store.getters.errors : []);

const login = async () => {
    const success = await store.dispatch('login', { email: email.value, password: password.value });
    if (success) {
        router.push({ name: 'Dashboard' });
        toast.success('User Logged in!!');
    }else{
        console.log(errors.message);
        toast.error("Error");
    }
};
</script>

<style scoped>
.error-messages {
    color: red;
    margin-bottom: 1em;
}
</style>