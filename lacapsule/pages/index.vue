<template>
    <div>
        <siteHeader/>
        
        <div class='container'>
            <div class='text'>
                <h1 class='title'>{{ home.title[0].text }}</h1>
                <div v-html='homeText'/>
            </div>
        </div>
    </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import SiteHeader from '~/components/Header.vue';

export default {
    components: {
        SiteHeader
    },
    async asyncData() {
        const apiEndpoint = 'https://lacapsule.cdn.prismic.io/api/v2';
        const api = await Prismic.getApi(apiEndpoint);
        const PrismicDOM = require('prismic-dom');

        let home = {},
            homeText;

        await api
            .query(Prismic.Predicates.at('document.type', 'frontpage'))
            .then(function(response) {
                home = response.results[0].data;
                homeText = PrismicDOM.RichText.asHtml(home.text);
            });

        return { home, homeText };
    }
};
</script>

<style lang='scss' scoped>
.container {
    position: relative;
    top: -50%;
    margin-top: 40vh;
}

.text {
    width: 40%;
}
</style>
