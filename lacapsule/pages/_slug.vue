<template>
    <div>
        <div :class='[{"appear": isMounted}, "to-anim", "container"]'>
            <div class='small-content'>
                <div class='title'>
                    <nuxt-link to='/' class='breadcrumb'>Accueil</nuxt-link>
                    <h1 class='title'>{{ page.title }}</h1>
                </div>
                <div v-if='page.text' v-html='page.text'/>
            </div>
            <ul v-if='page.blocks' class='blocks'>
                <listItem v-for='item in page.blocks' :key='item.item_title[0].text' :item='item'/>
            </ul>
            <ul v-if='page.logos' class='logos'>
                <listLogo v-for='logo in page.logos' :key='logo.logo_title[0].text' :logo='logo'/>
            </ul>
            <ul v-if='page.files' class='files'>
                <listFile v-for='file in page.files' :key='file.file_title[0].text' :file='file'/>
            </ul>
            <div v-if='page.contact.contact_name' class='contact'>
                <div v-if='page.contact.contact_img' class='contact_img'>
                    <div><img :src='page.contact.contact_img.url' :alt='page.contact.contact_img.alt'/></div>
                </div>
                <h2>{{page.contact.contact_name}}</h2>
                <a v-if='page.contact.contact_email' :href='"mailto:"+page.contact.contact_email'>{{page.contact.contact_email}}</a>
            </div>
        </div>
    </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

import btn from '~/mixins/btn.js';

import ListItem from '~/components/ListItem.vue';
import ListLogo from '~/components/ListLogo.vue';
import ListFile from '~/components/ListFile.vue';

export default {
    data(){
        return {
            isMounted: false
        }
    },
    mixins: [btn],
    components: {
        ListItem,
        ListLogo,
        ListFile
    },
    async asyncData({ params }) {
        const apiEndpoint = 'https://lacapsule.cdn.prismic.io/api/v2';
        const api = await Prismic.getApi(apiEndpoint);

        let page = {}, data = {};

        await api.query(Prismic.Predicates.at('my.page.uid', params.slug)).then(function(response) {
            if( !response.results.length ) return;

            data = response.results[0].data;

            page = {
                'type': response.results[0].type,
                'title': data.title[0] ? data.title[0].text : '',
                'text': data.text ? PrismicDOM.RichText.asHtml(data.text) : '',
                'blocks': data.blocks[0] ? data.blocks : '',
                'logos': data.logos[0] ? data.logos : '',
                'files': data.files[0] ? data.files : '',
                'contact': data.contact[0] ? data.contact[0] : '',
            };
        });

        return { page };
    },
    mounted() {
        this.$store.commit('setHoverBurger', false);
        this.$store.commit('setClickBurger', false);
        document.body.classList.remove('menuOpen');
        
        this.setBtn();
        setTimeout(() => { this.isMounted = true; }, 300);
    }
};
</script>

<style lang='scss' scoped>
.small-content {
    margin: 0 $col;
}

.title{
    text-align: center;
    h1{
        margin-top: 0.5em;
    }
}

.breadcrumb{
    display: inline-block;
    margin: 1em 0 0;
    font-style: normal;
    color: $lightGrey;
    text-decoration: none;
}

.blocks, .logos, .files{
    display: flex;
    margin: 0 $gutter*-2;
    justify-content: space-between;
    flex-wrap: wrap;
}

.blocks, .logos{
    text-align: center;
}

.blocks{
    padding: 4vh 0 80px;
}

.contact{
    max-width: 250px;
    margin: 0 auto;
    text-align: center;
    h2{
        margin: 0;
        font-size: 2.1rem;
    }
    a{
        font-weight: 600;
        font-style: normal;
    }
}
.contact_img{
    display: inline-block;
    padding: 20px;
    margin: 0 0 30px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.1);
    > div{
        border: 5px solid #fff;
        border-radius: 50%;
        overflow: hidden;
    }
}


@media (max-width: 1252px){
    .blocks{
        margin: 0 $gutter*-1;
    }
}

@media (max-width: $container){
    .logos{
        margin: 0 $gutter*-1;
    }
}

@media (max-width: $desktop){
    .logos{
        margin: 0 $gutter*-2;
    }

    .blocks{
        margin: 0;
    }
}

@media (max-width: $tablet) {
    .small-content {
        margin: 0;
    }
}

@media (max-width: $phone){
    .logos{
        margin: 10vh $gutter*-1 0;
    }
}

@media (max-width: $phone-small){
    .logos{
        margin-left: 0;
        margin-right: 0;
    }
}
</style>
