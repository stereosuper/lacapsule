<template>
    <header class='header'>
        <div class='header-container'>
            <nuxt-link to='./' class='logo'>
                <img :src='settings.logo.url' :alt='settings.logo.alt'>
            </nuxt-link>

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
        },
        isBurgerClicked: function() {
            return this.$store.state.menuHTML.clickBurger;
        }
    },
    methods: {
        toggleMenu: function() {
            this.menuOpen ? this.$store.commit('setClickBurger', false) : this.$store.commit('setClickBurger', true);
        },
        indicateMenu: function() {
            this.$store.commit('setHoverBurger', true);
        },
        hideIndicateMenu: function() {
            if (!this.menuOpen) {
                this.$store.commit('setHoverBurger', false);
            }
        }
    },
    watch: {
        isBurgerClicked: function(val) {
            this.menuOpen = !this.menuOpen;
            console.log('header ' + val);
        }
    },
    data() {
        return {
            menuOpen: false
        };
    }
};
</script>

<style lang='scss' scoped>
.header {
    padding: $gutter 0;
    position: relative;
    z-index: 1;
}

.header-container {
    display: flex;
    max-width: 2600px;
    padding: 0 130px;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
}

.logo {
    position: relative;
    z-index: 1;
}

.menu {
    width: 100%;
    height: 100vh;
    max-width: $container;
    position: fixed;
    top: 0;
    left: 10%;
    margin: 0 0 0 $gutter;
    > ul {
        height: 100%;
        position: relative;
        margin: 0;
    }
}

.menu-btn {
    display: flex;
    position: fixed;
    right: 130px;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    font-family: $league;
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

// $container + 2*130
@media (max-width: 1420px) {
    .header-container {
        max-width: 1252px; // $container + 4*$gutter
        padding: 0 2 * $gutter;
    }

    .menu-btn {
        right: 50%;
        transform: translateX(580px); // half the container size
    }
}

@media (max-width: 1252px) {
    .menu-btn {
        right: 2 * $gutter;
        transform: none;
    }
}

@media (max-width: $tablet) {
    .menu-btn {
        position: static;
    }
}
</style>
