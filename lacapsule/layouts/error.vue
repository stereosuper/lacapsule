<template>
    <div>
        <div :class='[{"appear": isMounted}, "to-anim", "container"]'>
            <div class='title'>
                <nuxt-link to='/' class='breadcrumb'>Accueil</nuxt-link>
                <h1 class='title'>{{ error.statusCode }}</h1>
                <img src='../static/img/blackhole.png' alt='Black Hole' class='hole' @mouseenter='animCursor' @mouseleave='resetCursor' ref='hole'/>
            </div>
        </div>
        <img src='../static/img/cursor.png' alt='' width='16' class='cursor' ref='cursor'/>
    </div>
</template>

<script>
import { TweenMax, CSSPlugin, Expo } from 'gsap';

export default {
    props: {
        error: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            isMounted: false
        }
    },
    mounted() {
        this.$store.commit('setHoverBurger', false);
        this.$store.commit('setClickBurger', false);
        document.body.classList.remove('menuOpen');
        
        setTimeout(() => { this.isMounted = true; }, 300);
    },
    head() {
        return{
            title: '404',
        }
    },
    methods: {
        animCursor(e){
            if(TweenMax.isTweening(this.$refs.cursor)) return;

            let holeY = this.$refs.hole.getBoundingClientRect().top + this.$refs.hole.height / 2;

            TweenMax.fromTo(this.$refs.cursor, 0.6, {top: e.clientY + 'px', left: e.clientX + 'px', opacity: 1, scale: 1}, {top: holeY + 'px', left: '50%', opacity: 0, scaleX: 2, scaleY: 0.2, ease: Expo.easeIn});
        },
        resetCursor(e){
            this.$refs.cursor.style.opacity = 0;
        }
    }
};
</script>

<style lang='scss' scoped>
@import "./assets/scss/abstracts/_variables.scss";

h1{
    position: relative;
    z-index: 1;
    font-size: 21.9rem;
    pointer-events: none;
}

.title{
    h1{
        margin: 30px 0 0;
    }
}

.hole{
    width: 650px;
    position: absolute;
    top: 25%;
    left: 0;
    right: 0;
    margin: auto;
    &:hover{
        cursor: none;
    }
}

.cursor{
    position: fixed;
    opacity: 0;
}

@media (max-width: $phone){
    h1{
        font-size: 15rem;
    }
}

@media (max-width: $phone-small){
    h1{
        font-size: 10rem;
    }
}
</style>
