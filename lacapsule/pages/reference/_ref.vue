<template>
<div>
    <div :class='[{"appear": isMounted}, "to-anim"]'>
        <div class="container reference">
            <div class='top'>
                <div>
                    <div class="logo">
                        <img :src='page.data.logo.url' :alt='page.data.logo.alt'>
                    </div>
                    <span>{{page.data.company}}</span>
                </div>
                <h1>{{page.data.title[0].text}}</h1>
            </div>
            <div class='bottom'>
                <aside>
                    <h3>{{page.data.sidebar_title}}</h3>
                    <svg class='top-stars' viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M31.905 29.37l2.752.784-2.87.337-.79 2.769-.33-2.824-2.78-.756 2.833-.426.752-2.764.433 2.88zM9.814 8.328l4.243 2.929-5.092-1.083-2.946 4.27 1.065-5.01-4.305-2.896 5.079.909 2.88-4.283-.924 5.164z" fill="#FF438A"/></svg>
                    <div class='details'>
                        <div v-for='detail in page.data.sidebar_details' :key='detail.title_detail'>
                            <div class='detail'>
                                <h4>{{detail.title_detail}}</h4>
                                <span>{{detail.text_detail}}</span>
                            </div>
                        </div>
                    </div>
                    <svg class='bottom-stars' viewBox="0 0 63 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.84 4.614l3.727-.173L7.16 6.05l.174 3.749-1.582-3.351-3.747.22 3.322-1.703-.218-3.728 1.73 3.378zM53.083 14.555l7.576-.351-6.924 3.268.353 7.622-3.215-6.813-7.62.446 6.755-3.46-.443-7.58 3.518 6.868z" fill="#FF438A"/></svg>
                </aside>
                <div class='content'>
                    <div v-html='contentText'></div>
                    <div class="quote" v-for='(q, i) in page.data.quotes' :key='i'>
                        <blockquote>
                            <span>
                                «&nbsp;{{q.citation}}&nbsp;»
                            </span>
                            <div v-if='q.author && q.position'>
                                <cite>
                                    {{q.author}}. 
                                </cite>
                                <span>
                                    {{q.position}}
                                </span>
                            </div>
                        </blockquote>
                    </div>
                    <div v-if='conclusionText' v-html='conclusionText'></div>
                    <div class="tags">
                        <span v-for="tag in page.tags" :key='tag'>#{{tag}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if='page.data.others.length > 0' class="container">
            <h2 class="align-center">Autres références</h2>
            <div class='others'>    
                <div v-for='o in page.data.others' :key='o.other.id' class='other'>
                    <div class="logo">
                        <img :src='o.other.data.logo.url' :alt='o.other.data.logo.alt'>
                    </div>
                    <h3>{{o.other.data.company}}</h3>
                    <p>{{o.other.data.title[0].text}}</p>
                    <div class='button'>
                        <nuxt-link :to='`/reference/${o.other.uid}`'>Plus de détails</nuxt-link>
                    </div>
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

export default {
    data() {
        return {
            isMounted: false,
            currentCat: 'all',
        };
    },
    key: to => to.fullPath,
    mixins: [btn],
    computed: {
        contentText(){
            return PrismicDOM.RichText.asHtml(this.page.data.content);
        },
        conclusionText(){
            return PrismicDOM.RichText.asHtml(this.page.data.conclusion);
        }
    },
    async asyncData({ params, error }) {
        const apiEndpoint = 'https://lacapsule.cdn.prismic.io/api/v2';
        const api = await Prismic.getApi(apiEndpoint);

        let page = {},
            data = {};

        await api.query(Prismic.Predicates.at('my.references.uid', params.ref), { fetchLinks : ['references.company', 'references.title', 'references.logo'] }).then(
            function(response) {
                
                if (!response.results.length) return;

                data = response.results[0].data;

                page = {
                    type: response.results[0].type,
                    tags: response.results[0].tags,
                    data: data,
                    title: data.title[0] ? data.title[0].text : '',
                    desc: data.desc ? data.desc : '',
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

.others{
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
}

.other{
    position: relative;
    top: 55px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 24%;
    padding: 20px;
    border-radius: 18px;
    text-align: center;
    background: linear-gradient(360deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 71.6%);
    &:nth-child(odd){
        top: 0;
    }
    .logo{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 227px;
        height: 227px;
        padding: 35px;
        border-radius: 50%;
        background-color: white;
    }
    .button{
        margin-top: auto;
    }
    p{
        margin-bottom: 45px;
    }
    h3{
        margin: 30px 0 0;
    }
}

.tags{
    display: flex;
    flex-wrap: wrap;
    font-style: italic;
    font-size: 2.2rem;
    margin-top: 70px;
    span{
        margin-right: 5px;
    }
}
blockquote{
    display: flex;
    flex-direction: column;
    margin: 55px auto 35px;
    max-width: 530px;
    > div {
        align-self: flex-end;
    }
    > span{
        width: 100%;
        font-size: 1.7rem;
        padding-bottom: 15px;
        margin-bottom: 15px;
        border-bottom: 1px solid $primary;
    }
    cite{
        font-size: 1.5rem;
        font-weight: 700;
        font-style: normal;
        & + span{
            font-size: 1.1rem;
            font-style: italic;
        }
    }
}

.top{
    display: flex;
    align-self: flex-end;
    padding: 0 $gutter;
    width: calc(100% - 275px);
    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 33%;
        flex-shrink: 0;
        margin: 0 $gutter 0 0;
    }
    h1{
        flex-grow: 1;
        margin: 0;
        text-align: left;
    }
    .logo{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 115px;
        height: 115px;
        padding: 25px;
        margin-bottom: 25px;
        border-radius: 50%;
        background-color: white;
    }
}

.bottom{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

.reference{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 100px;
    margin-bottom: 150px;
    .details{
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
    }
    aside{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
        min-width: 275px;
        margin-top: -120px;
        flex-shrink: 0;
        padding: 0 $gutter $gutter;
        border-radius: 18px;
        background: linear-gradient(360deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 71.6%);
        h3{
            margin-bottom: 60px;
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
        width: 73%;
    }
}
@media(max-width: $container){
    .others{
        flex-wrap: wrap;
        justify-content: center;
    }

    .other{
        width: calc(50% - 46px);
        max-width: 300px;
        margin: 0 $gutter;
        .logo{
            width: 120px;
            height: 120px;
            padding: 25px;
        }
    }
}

@media(max-width: 1060px){
    .bottom{
        flex-direction: column;
    }
    .top{
        width: 100%;
    }
    .reference{
        aside{
            margin-top: 0;
            width: 100%;
            min-width: 0;
            h3{
                margin-bottom: 20px;
            }
        }
        .content{
            width: 100%;
        }
        .details{
            display: flex;
            align-items: center;
            > div{
                margin-bottom: 0;
            }
        }
    }
}

@media (max-width: $tablet){

    .other{
        width: 100%;
        max-width: 400px;
        margin: 0 0 25px;
        top: 0;
    }
    .top{
        flex-direction: column;
        align-items: center;
        > div {
            margin-right: 0;
        }
        h1 {
            text-align: center;
            margin-top: 20px;
        }
    }
    .reference{
        .details{
            flex-direction: column;
            > div {
                max-width: 250px;
                margin-bottom: 40px;
            }
        }
    }
}

</style>
