<template>
    <div class="container reference">
        <aside>
            <h3>{{page.data.sidebar_title}}</h3>
            <svg class='top-stars' viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M31.905 29.37l2.752.784-2.87.337-.79 2.769-.33-2.824-2.78-.756 2.833-.426.752-2.764.433 2.88zM9.814 8.328l4.243 2.929-5.092-1.083-2.946 4.27 1.065-5.01-4.305-2.896 5.079.909 2.88-4.283-.924 5.164z" fill="#FF438A"/></svg>
            <div v-for='detail in page.data.sidebar_details' :key='detail.title_detail'>
                <div class='detail'>
                    <h4>{{detail.title_detail}}</h4>
                    <span>{{detail.text_detail}}</span>
                </div>
            </div>
            <svg class='bottom-stars' viewBox="0 0 63 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.84 4.614l3.727-.173L7.16 6.05l.174 3.749-1.582-3.351-3.747.22 3.322-1.703-.218-3.728 1.73 3.378zM53.083 14.555l7.576-.351-6.924 3.268.353 7.622-3.215-6.813-7.62.446 6.755-3.46-.443-7.58 3.518 6.868z" fill="#FF438A"/></svg>
        </aside>
        <div class='content'>
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

.reference{
    display: flex;
    align-items: flex-start;
    aside{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
        flex-shrink: 0;
        padding: 0 $gutter $gutter;
        border-radius: 18px;
        background: linear-gradient(360deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 71.6%);
        h3{
            margin-bottom: 60px;
        }
        > div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            text-align: center;
            margin-bottom: 50px;
            &:last-of-type{
                margin-bottom: 0;
            }
            &:before, &:after{
                content: '';
                display: block;
                flex-shrink: 0;
                height: 3px;
                width: 25px;
                background-color: $primary;
            }
        }
        .detail{
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            align-items: center;
            margin: 0 8px;
        }
        h4{
            margin: 0;
        }
        .top-stars{
            width: 34px;
            height: 32px;
        }
        .bottom-stars{
            margin-top: 15px;
            width: 62px;
            height: 28px;
        }
    }
    .content{
        padding: 0 $gutter;
    }
}

</style>
