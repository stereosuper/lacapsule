<template>
    <header class='header'>
        <div class='header-container'>
            <nuxt-link to='/' class='logo'>
                <img :src='settings.logo.url' :alt='settings.logo.alt'>
            </nuxt-link>

            <button :class='[{"menuClicked": isBurgerClicked}, "menu-btn"]' @click='toggleMenu' @mouseover='indicateMenu' @mouseleave='hideIndicateMenu' ref='btn'>
                {{menuText}}<b class='burger'><b class='b-on'></b><b class='b-off'></b></b>
            </button>

            <nav :class='[{"menuClicked": isBurgerClicked}, "menu"]' id='menu'>
                <ul>
                    <menuItem v-for='item in menu' v-if='!item.isBroken' :key='item.label' :item='item'/>
                </ul>
                <div :class='[{"menuClicked": isBurgerClicked}, "bg-menu"]'>
                    <div class='lines'></div>
                    <div class='lines'></div>
                    <div class='lines'></div>
                </div>
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
        isBurgerClicked() {
            return this.$store.state.menuHTML.clickBurger;
        }
    },
    methods: {
        toggleMenu() {
            this.menuOpen ? this.$store.commit('setClickBurger', false) : this.$store.commit('setClickBurger', true);
            this.$refs.btn.blur();
        },
        indicateMenu() {
            this.$store.commit('setHoverBurger', true);
        },
        hideIndicateMenu() {
            if (!this.menuOpen) {
                this.$store.commit('setHoverBurger', false);
            }
        },
        closeMenu(e){
            if (e.key === 'Escape' && this.menuOpen) this.toggleMenu();
        }
    },
    watch: {
        isBurgerClicked() {
            this.menuOpen = !this.menuOpen;
            this.menuText = this.menuOpen ? 'Fermer' : 'Menu';
        }
    },
    data() {
        return {
            menuOpen: false,
            menuText: 'Menu'
        };
    },
    mounted(){
        window.addEventListener('keyup', this.closeMenu);
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
    left: 45%;
    transform: translate(-50%);
    > ul {
        width: 100%;
        height: 1200px;
        position: absolute;
        top: -10%;
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
    &:hover, &:focus{
        opacity: 0.7;
    }
}
.burger{
    display: block;
    width: 20px;
    position: relative;
    margin: 0 0 0 19px;
}
.b-on, .b-off{
    height: 2px;
    position: absolute;
    top: 0;
    right: 0;
}
.b-on {
    width: 19px;
    border-radius: 2px;
    background: #fff;
    transform-origin: 0 0;
    transition: 0.15s $transition;
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
    .menuClicked &{
        transform: scaleX(0);
        transition: $transition;
    }
}
.b-off{
    width: 100%;
    transform-origin: 50% 50%;
    transform: rotate(45deg);
    &:before, &:after{
        content: '';
        position: absolute;
        left: 0;
        border-radius: 2px;
        background: #fff;
        transform-origin: 0 0;
        transition: $transition;
    }
    &:before{
        height: 2px;
        width: 20px;
        top: 0;
        transform: scaleX(0);
    }
    &:after{
        width: 2px;
        height: 20px;
        top: -9px;
        right: 0;
        margin: auto;
        transform: scaleY(0);
    }
    .menuClicked &{
        &:before{
            transform: scaleX(1);
            transition: 0.15s $transition;
        }
        &:after{
            transform: scaleY(1);
            transition: 0.2s $transition;
        }
    }
}

.bg-menu,
.bg-menu:after,
.bg-menu:before {
    height: 0;
    position: absolute;
    border: 1px solid #5675ae;
}
.bg-menu {
    width: 1200px;
    max-width: 100%;
    padding: 0 0 100%;
    top: -8%;
    left: -3.4%;
    z-index: -1;
    border-radius: 50%;
    opacity: 0;
    transition: $transition;
    transform-origin: 50% 50%;
    &.menuClicked {
        opacity: 0.5;
        transform: rotate(45deg);
        transition: 0.5s ease-out;
        .lines {
            &:nth-of-type(2),
            &:nth-of-type(3) {
                transform: rotate(45deg);
                &:before {
                    transform: rotate(-22.5deg);
                }
                &:after {
                    transform: rotate(22.5deg);
                }
            }
            &:nth-of-type(3) {
                transform: rotate(135deg);
            }
        }
    }
    &:before,
    &:after {
        content: '';
        width: 780px;
        max-width: 66%;
        padding: 0 0 66%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border-radius: 50%;
        transform: translate3d(0, 0, 0);
    }
    &:after {
        width: 390px;
        max-width: 33%;
        padding: 0 0 33%;
    }
}

.lines,
.lines:before,
.lines:after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.lines {
    &:first-of-type {
        &:before,
        &:after {
            content: '';
            margin: auto;
            background: #5675ae;
        }
        &:before {
            width: 1px;
        }
        &:after {
            height: 1px;
        }
    }
    &:nth-of-type(2),
    &:nth-of-type(3) {
        width: 1px;
        margin: auto;
        background: #5675ae;
        transform-origin: 50% 50%;
        transition: 0.5s ease-out;
        &:before,
        &:after {
            content: '';
            width: 1px;
            margin: auto;
            background: #5675ae;
            transform-origin: 50% 50%;
            transition: 0.5s ease-out;
        }
    }
    &:nth-of-type(3) {
        transform-origin: 50% 50%;
    }
}

// $container + 2*130
@media (max-width: $desktop-big) {
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
