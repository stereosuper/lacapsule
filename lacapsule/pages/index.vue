<template>
    <div>
        <siteHeader :logo='settings[0].data.logo' :menu='menu[0].data.items'/>
        
        <div class='container'>
            <h1 class='title'>{{ home[0].data.title[0].text }}</h1>
            <div v-html='homeText'/>
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

        let settings = {},
            menu = {},
            home = {},
            homeText;

        await api
            .query(Prismic.Predicates.at('document.type', 'settings'))
            .then(function(response) {
                settings = response.results;
            });

        await api
            .query(Prismic.Predicates.at('document.type', 'menu'))
            .then(function(response) {
                menu = response.results;
                console.log(menu[0].data.items);
            });

        await api
            .query(Prismic.Predicates.at('document.type', 'frontpage'))
            .then(function(response) {
                home = response.results;
                homeText = PrismicDOM.RichText.asHtml(home[0].data.text);
            });

        return { settings, menu, home, homeText };
    }
};
</script>

<style>
</style>
