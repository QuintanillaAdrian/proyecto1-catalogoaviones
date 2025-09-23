<script setup>
const { data: posts } = await useAsyncData('allPosts', () =>
  queryCollection('content').all()
)

const aerolineas = posts.value.filter(p => p.path.startsWith('/aerolineas'))
</script>

<template>
  <div class="container">
    <h1>Aerolíneas</h1>

    <div class="grid">
      <div v-for="aero in aerolineas" :key="aero._id" class="card">
        <img :src="aero.meta.logo" alt="" class="card-logo" />
        <h2 class="card-title">{{ aero.meta.name }}</h2>
        <p class="card-info">País: {{ aero.meta.country }} • Fundada: {{ aero.meta.founded_year }} • Flota: {{ aero.meta.fleet_size }}</p>
        <p class="card-desc">{{ aero.description }}</p>
        <NuxtLink :to="aero.path" class="card-link">Ver más</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style>
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

.card-logo {
  width: 80px;
  height: 80px;
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
  margin-bottom: 10px;
}

.card-desc {
  font-size: 0.85rem;
  color: #4b5563;
  margin-bottom: 15px;
  text-align: center;
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
