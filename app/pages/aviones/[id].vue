<script setup>
import Utteranc from '../../../components/global/utteranc.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
function formatPrice(price, currency = 'USD') {
  if (price == null) return ''
  try {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency }).format(price)
  } catch (e) {
    return price
  }
}

const { data: posts } = await useAsyncData('allPosts', () =>
  queryCollection('content').all()
)

const avion = posts.value
  .filter(p => p.path.startsWith('/aviones'))
  .find(p => p.path === `/aviones/${route.params.id}`)

const fabricante = posts.value
  .filter(f => f.path.startsWith('/fabricantes'))
  .find(f => f.path.split('/').pop() === avion.meta.manufacturerId)

const aerolineas = posts.value
  .filter(a => a.path.startsWith('/aerolineas'))
  .filter(a => avion.meta.airlineIds?.includes(a.path.split('/').pop()))

console.log(avion)
</script>

<template>
  <div class="container">
    <div v-if="avion" class="snipcart-test">
      <button type="button" class="snipcart-add-item snipcart-button" aria-label="Añadir al carrito"
        :data-item-id="avion.id ?? avion.path" :data-item-name="avion.meta.model" :data-item-price="avion.meta.price"
        :data-item-url="`http://localhost:3000${avion.path}`" :data-item-description="avion.description"
        :data-item-image="avion.meta.image">
        Añadir al carrito
      </button>
      <button type="button" class="snipcart-checkout snipcart-button secondary" aria-label="Ir al carrito">
        <span class="snipcart-items-count">0</span>
        aviones en 🛒
      </button>
    </div>
    <div class="avion-header">

      <img :src="avion.meta.image" alt="" class="avion-image">

      <div class="avion-info-container">
        <h1 class="avion-name">{{ avion.meta.model }}</h1>

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
          Primer vuelo: {{ avion.meta.first_flight }} • Capacidad: {{ avion.meta.capacity }} pasajeros • Alcance: {{
            avion.meta.range_km }} km
        </p>

        <p class="avion-price">Precio: {{ formatPrice(avion.meta.price, avion.meta.currency) }}</p>

        <p class="avion-desc">{{ avion.description }}</p>
      </div>

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

.avion-header {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
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

.avion-price {
  color: #0f172a;
  font-weight: 700;
  margin-top: 6px;
  margin-bottom: 8px;
  font-size: 1rem;
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

/* Snipcart floating controls */
.snipcart-test {
  margin-top: 16px;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;
  /* move to the right */
}

.snipcart-button {
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.18);
}

.snipcart-button.secondary {
  background: #ffffff;
  color: #2563eb;
  border: 1px solid #e6eefc;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.06);
}

.snipcart-button:hover {
  transform: translateY(-1px);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
