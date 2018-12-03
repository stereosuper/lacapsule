<template>
    <div class='Logo'>
        <img :src='img.url' :alt='img.alt'>
    </div>
</template>

<script>
export default {
    props: {
        img: {
            type: Object,
            required: true,
            default: () => []
        }
    }
};
</script>

<style>
</style>
