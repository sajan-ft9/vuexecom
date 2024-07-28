<template>
    <GuestLayout>
        <div class="flex justify-center">
            <form @submit.prevent="register">
                <div v-if="errors" class="error-messages p-2 m-4">
                    <ul>
                        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                    </ul>
                </div>
                <input v-model="name" class="p-2 block m-4 w-full" type="text" placeholder="Name" required />
                <input v-model="email" class="p-2 block m-4 w-full" type="email" placeholder="Email" required />
                <input v-model="password" type="password" class="p-2 block m-4 w-full" placeholder="Password"
                    required />
                <input v-model="password_confirmation" type="password" class="p-2 block m-4 w-full"
                    placeholder="Confirm password" required />
                <button type="submit" class="bg-blue-700 py-2 px-5 mx-4 text-white rounded w-full">Register</button>
            </form>
        </div>
    </GuestLayout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import GuestLayout from './GuestLayout.vue';
import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';

const store = useStore();
const router = useRouter();
const toast = useToast();
const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const errors = computed(() => store.getters.errors ? store.getters.errors : []);

const register = async () => {
    const success = await store.dispatch('register', { name: name.value, email: email.value, password: password.value, password_confirmation: password_confirmation.value });
    if (success) {
        router.push({ name: 'Dashboard' });
        toast.success('Registered successfully.')
    }
    name.value = '';
    email.value = '';
    password.value = '';
    password_confirmation.value = '';
};
</script>

<style scoped>
.error-messages {
    color: red;
    margin-bottom: 1em;
}
</style>