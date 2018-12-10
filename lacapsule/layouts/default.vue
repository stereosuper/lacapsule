<template>
    <div class='wrapper' id='wrapper'>
        <nuxt/>
    </div>
</template>

<script>
import btn from '~/mixins/btn.js';
import stars from '~/mixins/stars.js';

export default {
    mixins: [btn, stars]
};
</script>
