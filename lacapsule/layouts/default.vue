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

import btn from '~/mixins/btn.js';

export default {
    components: {
        SiteHeader,
        Stars
    },
    mixins: [btn],
    computed: {
        isBurgerClicked: function() {
            return this.$store.state.menuHTML.clickBurger;
        }
    },
    watch: {
        $route() {
            this.$store.commit('setHoverBurger', false);
            this.$store.commit('setClickBurger', false);
        }
    }
};
</script>

<style lang='scss' scoped>
.content {
    transition: opacity $transition;
    &.menuClicked {
        opacity: 0;
    }
}
</style>
