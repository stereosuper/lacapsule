<template>
    <header class='header'>
        <logo :img='logo'/>
        <ul>
            <li v-for='item in menu' v-if='!item.isBroken' :menu='menu'>
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
    props: {
        logo: {
            type: Object,
            required: true,
            default: () => []
        },
        menu: {
            type: Array,
            required: true,
            default: () => []
        }
    }
};
</script>

<style>
</style>
