<script setup>
const { data: posts } = await useAsyncData('allPosts', () =>
    queryCollection('content').all()
)

const fabricantes = posts.value.filter(post => post.path.startsWith('/fabricantes'))
console.log(fabricantes)
</script>

<template>
    <div class="container">
        <h1>Fabricantes</h1>

        <div class="grid">
            <div v-for="f in fabricantes" :key="f.id" class="card">
                <img :src="f.meta.logo" alt="" class="card-logo" />
                <h2 class="card-title">{{ f.meta.name }}</h2>
                <NuxtLink :to="f.path" class="card-link">
                    Ver más
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style>
.container {
    max-width: 1000px;
    margin: 60px auto;
    padding: 30px;
    text-align: center;
    font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
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
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
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
    margin-bottom: 12px;
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
    color: #ffffff;
    box-shadow: 0 6px 12px rgba(37, 99, 235, 0.3);
}
</style>
