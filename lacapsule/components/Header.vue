<template>
    <header class='header'>
        <div class='header-container'>
            <nuxt-link to='/' class='logo'>
                <svg ref='logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.71 38.88" width='175.71' height='38.88'>
                    <path d="M74.89,26.94V27c-.26,1-4.88.74-10.25-.39l-.29-2.73L59.5,22.55l-1.36,2.38c-5.37-1.72-9.14-3.69-8.87-4.77V20.1h-.08l7.31-7,4.58-8.68h0c.14-.56,3-.89,5.92-.1h0l.7-2.77a.87.87,0,0,1-.3-.38.82.82,0,0,1,0-.49A.72.72,0,0,1,67.53.4a1.1,1.1,0,0,1,.22-.21A.77.77,0,0,1,68,.09a.81.81,0,0,1,.31,0,.86.86,0,0,1,.48.38.84.84,0,0,1,.08.6.7.7,0,0,1-.27.42.78.78,0,0,1-.46.18l-.68,2.7c2.62.74,4.28,2.22,4.3,2.76h.1l-.22,10L75,27ZM65,9.08a2.87,2.87,0,0,0-1.55.49,2.73,2.73,0,0,0-1.16,2.86,2.81,2.81,0,0,0,5.08,1,2.71,2.71,0,0,0,.47-1.54,2.81,2.81,0,0,0-.22-1.07A2.66,2.66,0,0,0,67,9.89a2.82,2.82,0,0,0-.92-.6A2.85,2.85,0,0,0,65,9.08Zm2.94,14.1-.18-3.3h-.15c-.35-.18-4-1.16-4.71-1.35s-3.39-.86-3.74-.86H59l-1.75,2.69c-3.37-.6-5.74-.64-5.9,0s2.42,1.89,6.27,3.12l1.22-2L65.5,23.2l.14,2.39c4.12.94,7.17,1.29,7.35.56s-1.9-1.8-5.08-3Z" transform="translate(0 -0.08)" fill="#fff"/>
                    <path d="M128.33,28.94c-6.25,0-9.58-3.07-9.58-9.08V4.16h5.59V18.23c0,4.07,1.25,5.26,4,5.26s4-1.19,4-5.26V4.16h5.59v15.7C137.9,25.87,134.57,28.94,128.33,28.94ZM115,21.1c0,5.81-4.46,7.84-9.25,7.84a14.4,14.4,0,0,1-9.22-3.21l2.8-4.67s3.27,2.75,6,2.75c1.22,0,3.54-.12,3.54-2.39,0-1.77-2.61-2.57-5.53-4s-4.67-3.72-4.67-6.26c0-4.54,4-7.43,8-7.43A14.1,14.1,0,0,1,114.23,6L112,10.45a10.06,10.06,0,0,0-5-1.69c-1.9,0-2.91.86-2.91,2.19s2.31,2.33,5.11,3.51S115,17.91,115,21.1ZM87.3,19.47H83.94v9H78.35V4.16h9c4.79,0,8.39,2.45,8.39,7.49S92.09,19.47,87.3,19.47ZM85.52,8.59H83.94v6.46h1.58c2.2,0,4.28-.74,4.28-3.22S87.72,8.59,85.52,8.59ZM51.4,25.84a11.76,11.76,0,0,1-8.23,3.1c-6.93,0-13.29-5.6-13.29-12.56S36.21,3.72,43.17,3.72C48.49,3.72,51.23,6,51.23,6l-2.38,4.72A8.57,8.57,0,0,0,44,9.18c-5.62,0-8.09,3.89-8.09,7.14s2.47,7.16,8.09,7.16a8.12,8.12,0,0,0,3-.54ZM148.25,4.16h-5.59V28.5h14V23.63h-8.44Zm27.46,0h-15.5V28.5h15.5V23.63H165.8v-4.9h9.55V13.87H165.8V9h9.91Z" transform="translate(0 -0.08)" fill="#fff"/>
                    <path d="M2.72,10H0V22.5H6.83V20H2.72Zm12.46,0H12.66L7.84,22.5h2.93l.88-2.5h4.54l.89,2.5H20Zm.09,7.5H12.58l1.33-3.64Z" transform="translate(0 -0.08)" fill="#fff"/>
                </svg>
                <b class='morse r r1'></b>
                <b class='morse r r2'></b>
                <b class='morse r r3'></b>
                <b class='morse c c1'></b>
                <b class='morse c c2'></b>
                <b class='morse c c3'></b>
                <b class='morse c c4'></b>
                <b class='morse c c5'></b>
                <b class='morse r r4'></b>
                <b class='morse c c6'></b>
            </nuxt-link>

            <button :class='[{"menuClicked": isBurgerClicked}, "menu-btn"]' @click='toggleMenu' @mouseover='indicateMenu' @mouseleave='hideIndicateMenu' ref='btn'>
                {{menuText}}<b class='burger'><b class='b-on'></b><b class='b-off'></b></b>
            </button>

            <nav :class='[{"menuClicked": isBurgerClicked, "pageChanging": isPageTransitioning}, "menu"]' id='menu' ref='menu'>
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
        },
        isPageTransitioning() {
            return this.$store.state.pageTransitioning;
        }
    },
    methods: {
        toggleMenu() {
            if(this.menuOpen){
                this.$store.commit('setClickBurger', false);
                document.body.classList.remove('menuOpen');
            }else{
                this.$store.commit('setClickBurger', true);
                document.body.classList.add('menuOpen');
            }
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
        },
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
    z-index: 10;
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
    &:hover, &:focus{
        .r{
            transform: scaleX(0);
        }
        .c{
            transform: scale(0);
        }
        .r1{
            animation: animRect 0.03s ease-out;
        }
        .r2{
            animation: animRect 0.03s ease-out 0.04s;
        }
        .r3{
            animation: animRect 0.03s ease-out 0.08s;
        }
        .c1{
            animation: animCirc 0.03s ease-out 0.12s;
        }
        .c2{
            animation: animCirc 0.03s ease-out 0.16s;
        }
        .c3{
            animation: animCirc 0.03s ease-out 0.2s;
        }
        .c4{
            animation: animCirc 0.03s ease-out 0.24s;
        }
        .c5{
            animation: animCirc 0.03s ease-out 0.28s;
        }
        .r4{
            animation: animRect 0.03s ease-out 0.32s;
        }
        .c6{
            animation: animCirc 0.03s ease-out 0.36s;
        }
        .morse{
            animation-fill-mode: forwards;
        }
    }
}

.morse{
    position: absolute;
    bottom: 0;
    background: $primary;
    transform-origin: 0 0;
}
.r{
    height: 1px;
    width: 8px;
    bottom: 1px;
}
.c{
    width: 3px;
    height: 3px;
    border-radius: 50%;
}
.r1{
    right: 68px;
}
.r2{
    right: 58.5px;
}
.r3{
    right: 49.5px;
}
.c1{
    right: 42px;
}
.c2{
    right: 38px;
}
.c3{
    right: 34px;
}
.c4{
    right: 25px;
}
.c5{
    right: 15px;
}
.r4{
    right: 5.5px;
}
.c6{
    right: 1.5px;
}

@keyframes animRect {
    0%{
        transform: scaleX(0);
    }
    20%{
        transform: scaleX(0);
    }
    100%{
        transform: scaleX(1);
    }
}
@keyframes animCirc {
    0%{
        transform: scale(0);
    }
    20%{
        transform: scale(0);
    }
    100%{
        transform: scale(1);
    }
}

.menu {
    width: 100%;
    height: 100vh;
    max-width: $container;
    position: fixed;
    top: 0;
    left: 45%;
    transform: translate(-50%);
    transition: $transition;
    &.pageChanging{
       opacity: 0;
    }
    > ul {
        width: 100%;
        height: 1200px;
        position: absolute;
        top: -100px;
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
    height: 1200px;
    top: -100px;
    left: -5%;
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
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border-radius: 50%;
        transform: translate3d(0, 0, 0);
    }
    &:before{
        width: 780px;
        height: 780px;
    }
    &:after {
        width: 390px;
        height: 390px;
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
        position: relative;
        right: 0;
    }
}

@media (max-height: 880px) {
    .menu{
        top: -50px;
    }
}

@media (max-height: 800px) {
    .menu{
        top: -100px;
    }
}

@media (max-height: 670px){
    .menu{
        top: -150px;
    }
}

@media (max-height: 600px), (max-width: $tablet){
    .menu{
        padding: 150px 0 0;
        top: 0;
        left: 0;
        font-size: 1.8rem;
        letter-spacing: 0.1em;
        text-align: center;
        transform: none;
        > ul{
            display: inline-block;
            width: auto;
            height: auto;
            position: static;
        }
    }
}

@media (max-width: $tablet){
    .bg-menu{
        left: -225px;
    }    
}
</style>
