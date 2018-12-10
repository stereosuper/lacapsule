<template>
    <header class='header'>
        <div class='header-container'>
            <a href='./' class='Logo'>
                <img :src='settings.logo.url' :alt='settings.logo.alt'>
            </a>

            <button class='menu-btn' @click='toggleMenu'>Menu<i class='burger'></i></button>

            <ul class='menu' id='menu'>
                <menuItem v-for='item in menu' v-if='!item.isBroken' :key='item.label' :item='item'/>
            </ul>
        </div>
    </header>
</template>

<script>
import { TweenMax } from 'gsap';

import MenuItem from '~/components/MenuItem.vue';

export default {
    components: {
        MenuItem
    },
    computed: {
        settings() {
            return this.$store.state.settings;
        },
        menu() {
            return this.$store.state.menu.items;
        }
    },
    methods: {
        toggleMenu: function(e){
            TweenMax.to(document.getElementById('content'), 0.3, {opacity: 0});
            TweenMax.to(document.getElementById('stars'), 0.3, {opacity: 0.5});
            TweenMax.set(document.getElementById('menu'), {display: 'block'});
        }
    }
};
</script>

<style lang='scss' scoped>
.header {
    padding: $gutter 0;
}

.header-container {
    display: flex;
    max-width: 2600px;
    padding: 0 $gutter;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
}

.menu {
    display: none;
    width: 100%;
    height: 100vh;
    max-width: $container;
    position: fixed;
    top: 0;
    left: $gutter;
}

.menu-btn {
    display: flex;
    position: fixed;
    right: 50%;
    justify-content: space-between;
    align-items: center;
    font-family: $league;
    transform: translateX(1277px); // half the container size
}
.burger {
    display: block;
    width: 19px;
    height: 2px;
    position: relative;
    margin: 0 0 0 20px;
    border-radius: 2px;
    background: #fff;
    &:before,
    &:after {
        content: '';
        position: absolute;
        height: 2px;
        left: 0;
        border-radius: 2px;
        background: #fff;
    }
    &:before {
        width: 14px;
        top: -6px;
    }
    &:after {
        width: 19px;
        bottom: -6px;
    }
}

@media (max-width: 2660px) {
    .menu-btn {
        right: $gutter;
        transform: none;
    }
}

@media (max-width: $tablet) {
    .menu-btn {
        position: static;
    }
}
</style>
