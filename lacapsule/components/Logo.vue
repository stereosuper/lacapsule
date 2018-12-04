<template>
    <div class='Logo'>
        <img :src='settings.logo.url' :alt='settings.logo.alt'>
    </div>
</template>

<script>
export default {
    computed: {
        settings() {
            return this.$store.state.settings;
        }
    }
};
</script>

<style>
</style>
