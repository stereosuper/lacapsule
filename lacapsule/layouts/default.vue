<template>
    <div class='wrapper' id='wrapper'>
        <siteHeader/>
        <div id='content' :class='[{"menuClicked": isBurgerClicked}, "content"]'><nuxt/></div>
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
    },
    watch: {
        $route() {
            this.$store.commit('setHoverBurger', false);
            this.$store.commit('setClickBurger', false);
        }
    },
};
</script>

<style lang='scss' scoped>
.content {
    transition: $transition;
    &.menuClicked {
        pointer-events: none;
        opacity: 0;
    }
}

.page-enter-active, .page-leave-active {
    transition: $transition;
}
.page-enter, .page-leave-active {
    opacity: 0;
}
</style>
