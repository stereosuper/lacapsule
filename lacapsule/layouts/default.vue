<template>
    <div class='wrapper' id='wrapper'>
        <siteHeader/>
        <div :class='[{"menuClicked": isBurgerClicked}, "content"]'><nuxt/></div>
        <stars/>
    </div>
</template>

<script>
import SiteHeader from '~/components/Header.vue';
import Stars from '~/components/Stars.vue';

export default {
    components: {
        SiteHeader,
        Stars
    },
    computed: {
        isBurgerClicked() {
            return this.$store.state.menuHTML.clickBurger;
        }
    }
};
</script>

<style lang='scss' scoped>
.content {
    position: relative;
    z-index: 1;
    transition: $transition;
    &.menuClicked {
        pointer-events: none;
        opacity: 0;
    }
}
</style>
