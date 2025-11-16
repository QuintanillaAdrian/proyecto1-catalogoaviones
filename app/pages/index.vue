<template>
  <div class="container">

    <h1>Catálogo de Aviones</h1>
    <p>Explora los modelos de aviones, sus fabricantes y aerolíneas usuarias.</p>

    <nav class="menu">
      <NuxtLink to="/aviones">Aviones</NuxtLink>
      <NuxtLink to="/fabricantes">Fabricantes</NuxtLink>
      <NuxtLink to="/aerolineas">Aerolíneas</NuxtLink>
    </nav>

  </div>

</template>


<style>
body {
  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background: linear-gradient(135deg, #f9fafb, #eef2f7);
  color: #333;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 800px;
  margin: 80px auto;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
  animation: fadeIn 0.8s ease;
}

.container h1 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a365d;
  margin-bottom: 10px;
}

.container p {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 30px;
}

.menu {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.menu a {
  text-decoration: none;
  font-weight: 600;
  color: #2563eb;
  padding: 10px 18px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: #f0f7ff;
  border: 1px solid transparent;
}

.menu a:hover {
  background: #2563eb;
  color: #fff;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  border-color: #1d4ed8;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
