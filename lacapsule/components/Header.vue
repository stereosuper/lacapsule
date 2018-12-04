<template>
    <header class='header'>
        <logo/>
        <ul>
            <li v-for='item in menu' v-if='!item.isBroken' :key='item.label'>
                <a :href='item.link.slug ? item.link.slug : item.link.url' :target='item.link.target'>{{ item.label }}</a>
            </li>
        </ul>
    </header>
</template>

<script>
import Logo from '~/components/Logo.vue';

export default {
    components: {
        Logo
    },
    computed: {
        menu() {
            return this.$store.state.menu.items;
        }
    }
};
</script>

<style>
</style>
