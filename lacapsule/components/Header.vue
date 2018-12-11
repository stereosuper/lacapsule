<template>
    <header class='header'>
        <div class='header-container'>
            <a href='./' class='logo'>
                <img :src='settings.logo.url' :alt='settings.logo.alt'>
            </a>

            <button class='menu-btn' @click='toggleMenu' @mouseover='indicateMenu' @mouseleave='hideIndicateMenu'>Menu<b class='burger'></b></button>

            <nav class='menu' id='menu'>
                <ul>
                    <menuItem v-for='item in menu' v-if='!item.isBroken' :key='item.label' :item='item'/>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
import { TweenMax } from 'gsap';
import Vivus from 'vivus';

import MenuItem from '~/components/MenuItem.vue';

let arrow, menuHtml, menuOpen = false, stars;

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
    mounted(){
        menuHtml = document.getElementById('menu');
        stars = document.getElementById('stars');
        arrow = new Vivus('arrow', {duration: 200, animTimingFunction: Vivus.EASE_OUT, file: '/img/arrow.svg', start: 'manual'});
    },
    methods: {
        toggleMenu: function(){
            function openMenu(){
                TweenMax.to(document.getElementById('content'), 0.3, {opacity: 0});
                TweenMax.to(stars, 0.3, {opacity: 0.5});
                TweenMax.set(menuHtml.querySelectorAll('.link'), {display: 'block'});
                arrow.stop().play();
            }

            function closeMenu(){
                TweenMax.to(document.getElementById('content'), 0.3, {opacity: 1});
                TweenMax.to(stars, 0.3, {opacity: 1});
                TweenMax.set(menuHtml.querySelectorAll('.link'), {display: 'none'});
                arrow.stop().reset();
            }

            menuOpen ? closeMenu() : openMenu();
            menuOpen = !menuOpen;
        },
        indicateMenu: function(){
            TweenMax.to(stars, 0.3, {opacity: 0.5});
            //this.$emit('lemenutruc', true)
        },
        hideIndicateMenu: function(){
            if(!menuOpen){
                TweenMax.to(stars, 0.3, {opacity: 1});
            }
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
    padding: 0 130px;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
}

.logo{
    position: relative;
    z-index: 1;
}

.menu {
    //display: none;
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
    //right: 50%;
    right: 130px;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    font-family: $league;
    //transform: translateX(1430px); // half the container size
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

// @media (max-width: 2660px) {
//     .menu-btn {
//         right: 130px;
//         transform: none;
//     }
// }

// $container + 2*130
@media (max-width: 1420px) {
    .header-container{
        max-width: 1252px; // $container + 4*$gutter
        padding: 0 2*$gutter;
    }

    .menu-btn{
        right: 50%;
        transform: translateX(580px); // half the container size
    }
}

@media (max-width: 1252px) {
    .menu-btn{
        right: 2*$gutter;
        transform: none;
    }
}

@media (max-width: $tablet) {
    .menu-btn {
        position: static;
    }
}
</style>
