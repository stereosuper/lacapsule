<template>
    <header class='header'>
        <div class='container'>
            <a href='./' class='Logo'>
                <img :src='settings.logo.url' :alt='settings.logo.alt'>
            </a>

            <button class='burger'>Menu</button>

            <ul class='menu'>
                <li v-for='item in menu' v-if='!item.isBroken' :key='item.label'>
                    <a :href='item.link.slug ? item.link.slug : item.link.url' :target='item.link.target'>{{ item.label }}</a>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
export default {
    computed: {
        settings() {
            return this.$store.state.settings;
        },
        menu() {
            return this.$store.state.menu.items;
        }
    }
};
</script>

<style lang='scss' scoped>
.header {
    width: 100%;
    padding: 55px 0 0;
    position: fixed;
    top: 0;
    left: 0;
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.menu {
    display: none;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
}
</style>
