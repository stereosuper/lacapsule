<template>
    <div class='wrapper' id='wrapper'>
        <siteHeader/>
        <div :class='[{"menuClicked": isBurgerClicked}, "content"]'>
            <nuxt/>
            <siteFooter v-if='hasFooter'/>
            <popin v-for='(doc, i) in footer.docs' :name='"doc"+(i+1)' :key='i' :labelID='i' :file='doc.text' :ref='"popin"+i' v-if='!doc.link.url'/>
        </div>
        <stars/>
    </div>
</template>

<script>
import SiteHeader from '~/components/Header.vue';
import SiteFooter from '~/components/Footer.vue';
import Stars from '~/components/Stars.vue';
import Popin from '~/components/Popin.vue';

export default {
    components: {
        SiteHeader,
        SiteFooter,
        Stars,
        Popin
    },
    computed: {
        isBurgerClicked() {
            return this.$store.state.menuHTML.clickBurger;
        },
        hasFooter(){
            return this.$store.state.hasFooter;
        },
        footer() {
            return this.$store.state.footer;
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
@import "./assets/scss/abstracts/_variables.scss";

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
