<template>
    <div>
        <div class='container' :class='{"appear": isMounted}'>
            <div class='text'>
                <h1 class='title'>{{ page.title[0].text }}</h1>
                <div v-html='pageText'/>
            </div>
        </div>
    </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

import btn from '~/mixins/btn.js';

export default {
    data(){
        return {
            isMounted: false
        }
    },
    mixins: [btn],
    async asyncData({ params }) {
        const apiEndpoint = 'https://lacapsule.cdn.prismic.io/api/v2';
        const api = await Prismic.getApi(apiEndpoint);

        let page = {},
            pageText;

        await api.query(Prismic.Predicates.at('my.page.uid', params.slug)).then(function(response) {
            page = response.results[0].data;
            pageText = PrismicDOM.RichText.asHtml(page.text);
        });

        return { page, pageText };
    },
    mounted() {
        this.$store.commit('setHoverBurger', false);
        this.$store.commit('setClickBurger', false);
        document.body.classList.remove('menuOpen');
        
        this.setBtn();
        setTimeout(() => {
            this.isMounted = true;
        }, 300);
    }
};
</script>

<style lang='scss' scoped>
.text {
    margin: 0 $col;
}

.container{
    opacity: 0;
    transform: translateX(200px);
    transition: 0.3s ease-out;
    &.appear{
        opacity: 1;
        transform: translateX(0);
    }
}

@media (max-width: $tablet) {
    .text {
        margin: 0;
    }
}
</style>
