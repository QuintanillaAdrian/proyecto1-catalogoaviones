<script setup>
const route = useRoute()

// Obtener todos los posts
const { data: posts } = await useAsyncData('allPosts', () =>
  queryCollection('content').all()
)

// Avión seleccionado
const avion = posts.value
  .filter(p => p.path.startsWith('/aviones'))
  .find(p => p.path === `/aviones/${route.params.id}`)

// Fabricante relacionado
const fabricante = posts.value
  .filter(f => f.path.startsWith('/fabricantes'))
  .find(f => f.id === avion.meta.manufacturerId)

// Aerolíneas usuarias
const aerolineas = posts.value
  .filter(a => a.path.startsWith('/aerolineas') && avion.meta.airlineIds?.includes(a.id))
</script>

<template>
  <div class="container">
    <div class="avion-header">
      <img :src="avion.meta.image" alt="" class="avion-image" />
      <div class="avion-info-container">
        <h1 class="avion-name">{{ avion.model }}</h1>

        <p class="avion-info">
          Fabricante: 
          <NuxtLink :to="fabricante?.path" class="link">{{ fabricante?.meta.name }}</NuxtLink>
        </p>

        <p class="avion-info">
          Aerolíneas usuarias: 
          <span v-for="(airline, idx) in aerolineas" :key="airline.id">
            <NuxtLink :to="airline.path" class="link">{{ airline.meta.name }}</NuxtLink>
            <span v-if="idx < aerolineas.length - 1">, </span>
          </span>
        </p>

        <p class="avion-specs">
          Primer vuelo: {{ avion.meta.first_flight }} • Capacidad: {{ avion.meta.capacity }} pasajeros • Alcance: {{ avion.meta.range_km }} km
        </p>

        <p class="avion-desc">{{ avion.description }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  max-width: 900px;
  margin: 60px auto;
  padding: 30px;
  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.avion-header {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}

.avion-image {
  width: 250px;
  height: 200px;
  object-fit: contain;
  border-radius: 12px;
}

.avion-info-container {
  flex: 1;
}

.avion-name {
  font-size: 2rem;
  color: #1e3a8a;
  margin: 0 0 6px 0;
}

.avion-info {
  color: #6b7280;
  margin-bottom: 6px;
}

.avion-specs {
  color: #4b5563;
  margin-bottom: 10px;
  font-size: 0.95rem;
}

.avion-desc {
  font-size: 0.95rem;
  color: #4b5563;
  margin-top: 10px;
}

.link {
  text-decoration: none;
  color: #2563eb;
  font-weight: 600;
}

.link:hover {
  text-decoration: underline;
  color: #1d4ed8;
}
</style>
