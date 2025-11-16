<template>
  <div>
    <NuxtPage />
  </div>
      <div hidden id="snipcart" data-api-key="ZWM3ZGYxN2QtMWE1Yy00OTY2LWIwOTAtNDcyYjI0OTZhNDAwNjM4OTg4NDAzOTA2NjEyOTcy"></div>
</template>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  window.SnipcartSettings = {
    publicApiKey: "ZWM3ZGYxN2QtMWE1Yy00OTY2LWIwOTAtNDcyYjI0OTZhNDAwNjM4OTg4NDAzOTA2NjEyOTcy",
    loadStrategy: "on-user-interaction"
  }
})

</script>
