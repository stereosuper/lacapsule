<template>
    <div class='wrapper' id='wrapper'>
        <siteHeader/>
        <div :class='[{"menuClicked": isBurgerClicked}, "content"]'>
            <nuxt/>
            <siteFooter v-if='hasFooter'/>
        </div>
        <stars/>
    </div>
</template>

<script>
import SiteHeader from '~/components/Header.vue';
import SiteFooter from '~/components/Footer.vue';
import Stars from '~/components/Stars.vue';

export default {
    components: {
        SiteHeader,
        SiteFooter,
        Stars
    },
    computed: {
        isBurgerClicked() {
            return this.$store.state.menuHTML.clickBurger;
        },
        hasFooter(){
            return this.$store.state.hasFooter;
        }
    },
    head: {
        titleTemplate: '%s - La Capsule',
        htmlAttrs: {
            lang: 'fr',
        }
    }
};
</script>

<style lang='scss' scoped>
.content {
    position: relative;
    z-index: 30;
    transition: $transition;
    &.menuClicked {
        pointer-events: none;
        opacity: 0;
    }
}
</style>
