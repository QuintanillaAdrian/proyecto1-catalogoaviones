<script setup>
import Utteranc from '../../../components/global/utteranc.vue'
const route = useRoute()

const { data: posts } = await useAsyncData('allPosts', () =>
  queryCollection('content').all()
)

const aerolinea = posts.value
  .filter(p => p.path.startsWith('/aerolineas'))
  .find(p => p.path === `/aerolineas/${route.params.id}`)

const aviones = posts.value
  .filter(p => p.path.startsWith('/aviones') && p.meta.airlineIds?.includes(route.params.id))
</script>

<template>
  <div class="container">
    <div class="airline-header">
  <img :src="aerolinea.meta.logo" alt="" class="airline-logo">
      <div>
        <h1 class="airline-name">{{ aerolinea.meta.name }}</h1>
        <p class="airline-info">País: {{ aerolinea.meta.country }} - Fundada: {{ aerolinea.meta.founded_year }}</p>
        <p class="airline-desc">{{ aerolinea.description }}</p>
        <a :href="aerolinea.meta.website" target="_blank" class="airline-link">Sitio web oficial</a>
      </div>
    </div>

    <div class="aviones-section">
      <h2>Aviones en su flota</h2>
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

.airline-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}

.airline-logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 12px;
}

.airline-name {
  font-size: 2rem;
  color: #1e3a8a;
  margin: 0 0 6px 0;
}

.airline-info {
  color: #6b7280;
  margin: 0 0 8px 0;
}

.airline-desc {
  font-size: 0.95rem;
  color: #4b5563;
  margin-bottom: 10px;
}

.airline-link {
  display: inline-block;
  text-decoration: none;
  color: #2563eb;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  background: #f0f7ff;
  transition: all 0.3s ease;
}

.airline-link:hover {
  background: #2563eb;
  color: #fff;
  box-shadow: 0 6px 12px rgba(37,99,235,0.3);
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
