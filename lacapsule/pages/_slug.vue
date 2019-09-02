<template>
    <div>
        <div :class='[{"appear": isMounted}, "to-anim", "container"]'>
            <div class='small-content'>
                <div class='title'>
                    <nuxt-link to='/' class='breadcrumb'>Accueil</nuxt-link>
                    <h1 class='title'>{{ page.title }}</h1>
                </div>
                <div class='intro' v-if='page.intro' v-html='page.intro'/>
                <div v-if='page.text' v-html='page.text'/>
            </div>

            <ul v-if='page.blocks' :class='[{"circle": page.blocks.length === 4}, "blocks"]'>
                <listItem v-for='item in page.blocks' :key='item.item_title[0].text' :item='item'/>
            </ul>

            <!--
            <ul v-if='page.logos' class='logos'>
                <listLogo v-for='logo in page.logos' :key='logo.logo_title[0].text' :logo='logo'/>
            </ul> -->

            <ul v-if='page.custom_post === "references" && refs[0]' class='logos'>
                <listRef v-for='ref in refs' :key='ref.title' :reference='ref'/>
            </ul>

            <form v-if='page.cats' class='cats'>
                <select v-model='currentCat'>
                    <option value='all' selected>Toutes les ressources</option>
                    <option v-for='cat in page.cats' :key='cat' :value='cat'>{{cat}}</option>
                </select>
            </form>
            <ul v-if='page.files' class='files'>
                <listFile v-for='file in page.files' :key='file.file_title[0].text' :file='file' :cat='currentCat' v-if='currentCat == "all" || currentCat == file.cat'/>
            </ul>

            <contact v-if='page.contact' :content='page.contact'></contact>

            <who v-if='page.who' :content='page.who' :team='page.team' :story='page.story' :dimensions='page.dimensions' :video='page.video'></who>

            <div v-if='page.cta' class='cta'>
                <div v-for='item in page.cta' :key='item.link_text'>
                    <div :class='[{"inverted": item.style === "transparent"}, "button"]'>
                        <a :href='item.link.url'>
                            {{item.link_text}}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

import btn from '~/mixins/btn.js';

import ListItem from '~/components/ListItem.vue';
//import ListLogo from '~/components/ListLogo.vue';
import ListRef from '~/components/ListRef.vue';
import ListFile from '~/components/ListFile.vue';
import Contact from '~/components/Contact.vue';
import Who from '~/components/Who.vue';

export default {
    data() {
        return {
            isMounted: false,
            currentCat: 'all',
        };
    },
    mixins: [btn],
    components: {
        ListItem,
        //ListLogo,
        ListRef,
        ListFile,
        Contact,
        Who
    },
    async asyncData({ params, error }) {
        const apiEndpoint = 'https://lacapsule.cdn.prismic.io/api/v2';
        const api = await Prismic.getApi(apiEndpoint);

        let page = {},
            data = {},
            refData = false,
            refs = [];

        await api.query(Prismic.Predicates.at('my.page.uid', params.slug)).then(
            function(response) {
                if (!response.results.length) return;

                data = response.results[0].data;

                page = {
                    'type': response.results[0].type,
                    'title': data.title[0] ? data.title[0].text : '',
                    'desc': data.desc ? data.desc : '',
                    'intro': data.intro ? PrismicDOM.RichText.asHtml(data.intro) : '',
                    'text': data.text ? PrismicDOM.RichText.asHtml(data.text) : '',
                    'custom_post': data.custom_post ? data.custom_post : '',
                    'cta': data.cta[0] ? data.cta : '',
                    'blocks': data.blocks[0] ? data.blocks : '',
                    //'logos': data.logos[0] ? data.logos : '',
                    'cats': data.cats ? data.cats.split(',') : '',
                    'files': data.files[0] ? data.files : '',
                    'contact': data.contact[0] ? data.contact[0] : '',
                    'who': data.who[0] ? data.who[0] : '',
                    'team': data.team ? data.team : '',
                    'story': data.story_group[0] ? data.story_group[0] : '',
                    'dimensions': data.dimensions ? data.dimensions : '',
                    'video': data.video_group[0] ? data.video_group[0] : ''
                };
            }, function(error){
                error({ statusCode: error.response.status, message: error.message });
            }
        );

        if (Object.keys(page).length === 0 && page.constructor === Object) {
            error({ statusCode: '404', message: 'Page not found' });
        }

        await api.query(Prismic.Predicates.at('document.type', 'references')).then(
            function(response) {
                if (!response.results.length) return;

                refData = response.results;
                
            }, function(error){
                error({ statusCode: error.response.status, message: error.message });
            }
        );

        if( refData ){
            refData.forEach((ref, i) => {
                refs[i] = {
                    'url': ref.uid ? '/reference/' + ref.uid : '',
                    'title': ref.data.title[0] ? ref.data.title[0].text : '',
                    'company': ref.data.company ? ref.data.company : '',
                    'logo': ref.data.logo ? ref.data.logo : '',
                };
            });
        }

        return { page, refs };
    },
    mounted() {
        this.$store.commit('setHoverBurger', false);
        this.$store.commit('setClickBurger', false);
        document.body.classList.remove('menuOpen');

        //this.page.blocks ? document.body.classList.add('content-under') : document.body.classList.remove('content-under');

        this.setBtn();
        setTimeout(() => {
            this.isMounted = true;
        }, 300);
    },
    head() {
        return {
            title: this.page.title,
            meta: [{ hid: 'description', name: 'description', content: this.page.desc }]
        };
    }
};
</script>

<style lang='scss' scoped>
@import "./assets/scss/abstracts/_variables.scss";

.small-content {
    margin: 0 $col;
}

.cta {
    text-align: center;
    > div {
        margin: 50px 0 0;
    }
}

.blocks,
.logos,
.files {
    display: flex;
    margin: 0 $gutter * -2;
    flex-wrap: wrap;
}

.logos,
.files {
    justify-content: space-between;
}

.files{
    margin-bottom: 200px;
}

.blocks,
.logos {
    text-align: center;
}

.blocks {
    padding: 4vh 0 80px;
    justify-content: center;
    &.circle {
        justify-content: space-between;
    }
}

.cats{
    margin: 90px 0 40px;
}

@media (max-width: 1252px) {
    .blocks,
    .files {
        margin: 0 $gutter * -1;
    }
}

@media (max-width: $container) {
    .logos {
        margin: 0 $gutter * -1;
    }

    .files {
        display: block;
        margin-bottom: 150px;
    }
}

@media (max-width: $desktop) {
    .cta {
        > div {
            &:first-child {
                margin: 0;
            }
        }
    }

    .logos {
        margin: 0 $gutter * -2;
    }

    .blocks {
        margin: 0;
    }
}

@media (max-width: $tablet) {
    .small-content {
        margin: 0;
    }
}

@media (max-width: $phone) {
    .logos {
        margin: 10vh $gutter * -1 0;
    }
}

@media (max-width: $phone-small) {
    .logos {
        margin-left: 0;
        margin-right: 0;
    }
}
</style>
