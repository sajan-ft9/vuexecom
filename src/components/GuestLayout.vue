<template>
    <div>
        <Navbar />
        <main class="p-8">
            <slot></slot>
        </main>
    </div>
</template>
<script setup>
import Navbar from './Navbar.vue';
</script>