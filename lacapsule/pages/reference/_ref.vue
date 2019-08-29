<template>
    <div>
        <aside>
            <h3>{{page.data.sidebar_title}}</h3>
            <div v-for='detail in page.data.sidebar_details' :key='detail.title_detail'>
                <h4>{{detail.title_detail}}</h4>
                <span>{{detail.text_detail}}</span>
            </div>
        </aside>
        <div>
            <div>
                <img :src='page.data.logo.url' :alt='page.data.logo.alt'>
                <span>{{page.data.company}}</span>
                <h1>{{page.data.title[0].text}}</h1>
            </div>
            <div v-html='contentText'></div>
            <div class="quote" v-for='(q, i) in page.data.quotes' :key='i'>
                <blockquote>
                    <span>
                        {{q.citation}}
                    </span>
                    <cite>
                        {{q.author}}
                    </cite>
                    <span>
                        {{q.position}}
                    </span>
                </blockquote>
            </div>
        </div>
    </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

import btn from '~/mixins/btn.js';

export default {
    data() {
        return {
            isMounted: false,
            currentCat: 'all',
        };
    },
    mixins: [btn],
    computed: {
        contentText(){
            return PrismicDOM.RichText.asHtml(this.page.data.content);
        }
    },
    async asyncData({ params, error }) {
        const apiEndpoint = 'https://lacapsule.cdn.prismic.io/api/v2';
        const api = await Prismic.getApi(apiEndpoint);

        let page = {},
            data = {};

        await api.query(Prismic.Predicates.at('my.references.uid', params.ref)).then(
            function(response) {
                
                if (!response.results.length) return;

                data = response.results[0].data;
                console.log(data);

                page = {
                    type: response.results[0].type,
                    data: data
                };
            }, function(error){
                error({ statusCode: error.response.status, message: error.message });
            }
        );

        if (Object.keys(page).length === 0 && page.constructor === Object) {
            error({ statusCode: '404', message: 'Page not found' });
        }

        return { page };
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

.intro {
    max-width: 560px;
    margin: 0 auto;
    padding: 0 #{$gutter + 10px};
    position: relative;
    font-size: 1.7rem;
    font-style: italic;
    text-align: center;
    &:before,
    &:after {
        content: '';
        width: $gutter;
        height: 3px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        background: $primary;
    }
    &:before {
        left: 0;
    }
    &:after {
        right: 0;
    }
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
    .intro {
        padding: 0;
        &:before,
        &:after {
            content: none;
        }
    }

    .logos {
        margin-left: 0;
        margin-right: 0;
    }
}
</style>
