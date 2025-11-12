<template>
  <div ref="container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const container = ref(null)

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://utteranc.es/client.js'
  script.setAttribute('repo', 'QuintanillaAdrian/proyecto1-catalogoaviones')
  script.setAttribute('issue-term', 'pathname')
  script.setAttribute('label', 'comments')
  script.setAttribute('theme', 'github-light')
  script.crossOrigin = 'anonymous'
  script.async = true
  container.value.appendChild(script)
})
</script>
