<template>
    <div>
        <div class="for-container">
            <h1>Forbidden</h1>
            <h1><b>403</b></h1>
            <p>Anda dilarang mengakses halaman ini.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style scoped>

.for-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #f8f9fa;
    font-family: Arial, sans-serif;
}

.for-container h1 {
    font-size: 3em;
    margin-bottom: 10px;
    color: #dc3545; /* Warna merah */
}

.for-container .status-code {
    font-size: 5em;
    margin-bottom: 20px;
}

.for-container p {
    font-size: 1.2em;
    color: #6c757d;
    text-align: center;
}

@media (max-width: 768px) {
    .for-container h1 {
        font-size: 2em;
    }

    .for-container .status-code {
        font-size: 4em;
    }

    .for-container p {
        font-size: 1em;
    }
}
</style>