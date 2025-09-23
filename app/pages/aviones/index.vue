<script setup>
const { data: posts } = await useAsyncData('allPosts', () =>
  queryCollection('content').all()
)

// Filtrar solo aviones
const aviones = posts.value.filter(p => p.path.startsWith('/aviones'))

// Fabricantes y aerolíneas para referencia
const fabricantes = posts.value.filter(p => p.path.startsWith('/fabricantes'))
const aerolineas = posts.value.filter(p => p.path.startsWith('/aerolineas'))

// Funciones de ayuda para obtener relaciones
const getFabricante = (manufacturerId) =>
  fabricantes.find(f => f.path.split('/').pop() === manufacturerId)

const getAerolineas = (airlineIds) =>
  aerolineas.filter(a => airlineIds?.includes(a.path.split('/').pop()))

</script>

<template>
  <div class="container">
    <h1>Aviones</h1>

    <div class="grid">
      <div v-for="avion in aviones" :key="avion.id" class="card">
        <img :src="avion.meta.image" alt="" class="card-image" />
        <h2 class="card-title">{{ avion.meta.model }}</h2>

        <p class="card-info">
          Fabricante: 
          <NuxtLink :to="getFabricante(avion.meta.manufacturerId)?.path" class="link">
            {{ getFabricante(avion.meta.manufacturerId)?.meta.name }}
          </NuxtLink>
        </p>

        <p class="card-info">
          Aerolíneas usuarias: 
          <span v-for="(airline, idx) in getAerolineas(avion.meta.airlineIds)" :key="airline.id">
            <NuxtLink :to="airline.path" class="link">{{ airline.meta.name }}</NuxtLink>
            <span v-if="idx < avion.meta.airlineIds.length - 1">, </span>
          </span>
        </p>

        <p class="card-specs">
          Primer vuelo: {{ avion.meta.first_flight }} • Capacidad: {{ avion.meta.capacity }} pasajeros • Alcance: {{ avion.meta.range_km }} km
        </p>

        <NuxtLink :to="avion.path" class="card-link">Ver más</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style>
/* Mantener el mismo CSS que tenías */
body {
  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background: #f4f6f8;
  margin: 0;
  padding: 0;
  color: #333;
}

.container {
  max-width: 1000px;
  margin: 60px auto;
  padding: 30px;
  text-align: center;
}

.container h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 30px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 25px 15px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.15);
}

.card-image {
  width: 150px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 15px;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 6px;
  text-align: center;
}

.card-info {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 6px;
}

.card-specs {
  font-size: 0.85rem;
  color: #4b5563;
  margin-bottom: 12px;
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

.card-link {
  text-decoration: none;
  color: #2563eb;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  background: #f0f7ff;
  transition: all 0.3s ease;
}

.card-link:hover {
  background: #2563eb;
  color: #fff;
  box-shadow: 0 6px 12px rgba(37,99,235,0.3);
}
</style>
