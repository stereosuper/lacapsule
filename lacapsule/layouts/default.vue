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
    }
};
</script>

<style lang='scss' scoped>
.content {
    &.menuClicked {
        opacity: 0;
    }
}
</style>
