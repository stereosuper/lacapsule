<template>
    <div>
        <div :class='[{"appear": isMounted}, "to-anim", "container"]'>
            <div class='title'>
                <nuxt-link to='/' class='breadcrumb'>Accueil</nuxt-link>
                <h1 class='title'>{{ error.statusCode }}</h1>
                <img src='../static/img/blackhole.png' alt='Black Hole'/>
            </div>
        </div>
    </div>
</template>

<script>
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
};
</script>

<style lang='scss' scoped>
h1{
    position: relative;
    z-index: 1;
    font-size: 21.9rem;
}

.title{
    h1{
        margin: 30px 0 0;
    }
}

img{
    width: 650px;
    position: absolute;
    top: 25%;
    left: 0;
    right: 0;
    margin: auto;
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
