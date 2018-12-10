<template>
    <div>
        <siteHeader/>
        
        <div class='container'>
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

import SiteHeader from '~/components/Header.vue';

export default {
    components: {
        SiteHeader
    },
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
    }
};
</script>

<style lang='scss' scoped>
.text {
    margin: 0 $col;
}

@media (max-width: $tablet) {
    .text {
        margin: 0;
    }
}
</style>
