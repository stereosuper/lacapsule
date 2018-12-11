<template>
    <div class='wrapper' id='wrapper'>
        <siteHeader/>
        <nuxt/>
        <stars/>
        <!--<siteHeader @letrucmenu='jechangelopacity'/> <truc :opacity='opacityDucanvas' />-->

    </div>
</template>

<script>
import SiteHeader from '~/components/Header.vue';
import Stars from '~/components/Stars.vue';

import btn from '~/mixins/btn.js';

export default {
    // data(){
    //     return {
    //         opacityDucanvas: false
    //     }
    // },
    components: {
        SiteHeader,
        Stars
    },
    mixins: [btn],
    // methods: {
    //     jechangelopacity: function(val){
    //         opacityDucanvas
    //     }
    // }
};
</script>
