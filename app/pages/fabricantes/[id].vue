<script setup>
import Utteranc from '../../../components/global/utteranc.vue'
const route = useRoute()

const { data: posts } = await useAsyncData('allPosts', () =>
  queryCollection('content').all()
)
const fabricante = posts.value
  .filter(p => p.path.startsWith('/fabricantes'))
  .find(p => p.path === `/fabricantes/${route.params.id}`)

const aviones = posts.value
  .filter(p => p.path.startsWith('/aviones') && p.meta.manufacturerId === route.params.id)
</script>

<template>
  <div class="container">
    <div class="fab-header">
      <img :src="fabricante.meta.logo" alt="" class="fab-logo">
      <div>
        <h1 class="fab-name">{{ fabricante.meta.name }}</h1>
        <p class="fab-info">Fundado en {{ fabricante.meta.founded_year }} - {{ fabricante.meta.country }}</p>
        <p class="fab-desc">{{ fabricante.description }}</p>
      </div>
    </div>

    <div class="aviones-section">
      <h2>Modelos destacados</h2>
      <ul>
        <li v-for="avion in aviones" :key="avion.id">
          <NuxtLink :to="avion.path" class="avion-link">{{ avion.meta.model }}</NuxtLink>
        </li>
      </ul>
    </div>
    
    <section id="comments" style="margin-top:32px">
      <h3>Comentarios</h3>
      <Utteranc />
    </section>
  </div>
</template>

<style>
.container {
  max-width: 900px;
  margin: 60px auto;
  padding: 30px;
  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.fab-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}

.fab-logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 12px;
}

.fab-name {
  font-size: 2rem;
  color: #1e3a8a;
  margin: 0 0 6px 0;
}

.fab-info {
  color: #6b7280;
  margin: 0 0 8px 0;
}

.fab-desc {
  font-size: 0.95rem;
  color: #4b5563;
}

.aviones-section {
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}

.aviones-section h2 {
  color: #1e3a8a;
  margin-bottom: 15px;
}

.aviones-section ul {
  list-style: disc;
  padding-left: 20px;
}

.avion-link {
  text-decoration: none;
  color: #2563eb;
  font-weight: 600;
  transition: all 0.3s ease;
}

.avion-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}
</style>
