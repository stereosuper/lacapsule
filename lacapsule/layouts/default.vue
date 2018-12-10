<template>
    <div class='wrapper' id='wrapper'>
        <siteHeader/>
        <nuxt/>
    </div>
</template>

<script>
import SiteHeader from '~/components/Header.vue';

import btn from '~/mixins/btn.js';
import stars from '~/mixins/stars.js';

export default {
    components: {
        SiteHeader
    },
    mixins: [btn, stars]
};
</script>
