<script setup lang="ts">
import { ref } from "vue";

const countRef = ref(0);
</script>

<template>
  <div>
    <button @click="countRef++">Increment</button>
    <span style="padding: 0 0.5rem">{{ countRef }}</span>
    <button @click="countRef--">Decrement</button>
  </div>
</template>
