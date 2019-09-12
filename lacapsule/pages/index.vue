<template>  
    <div>
        <div class='container'>
            <div class='text'>
                <h1 class='title to-anim' :class='{"appear": isMounted}'>
                    {{ home.title1 }}
                    <span v-if='home.keywords' id='typed'></span>
                </h1>
                <!--<div v-if='intro' v-html='intro' :class='{"appear": isMounted}' class='inner-text to-anim'/>-->
                <div class='illu'>
                    <div class='earth to-anim' :class='{"appear": isMounted}'></div>
                    <div class='ovni to-anim' :class='{"appear": isMounted}'></div>
                </div>
                <div class='inner-text to-anim' :class='{"appear": isMounted}'>
                    <!--<div v-if='text' v-html='text'/>-->
                    <div v-if='home.btn && !home.btn.isBroken' class='button'>
                        <a v-if='!home.btn.slug' :href='home.btn.url' :target='home.btn.target'>
                            {{home.btn_label}}
                        </a>
                        <nuxt-link v-if='home.btn.uid' :to='`/${home.btn.uid}`'>
                            {{home.btn_label}}
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

import Typed from 'typed.js';

import btn from '~/mixins/btn.js';

export default {
    layout: 'footerless',
    data() {
        return {
            isMounted: false
        };
    },
    mixins: [btn],
    async asyncData({ params, error, store }) {
        const apiEndpoint = 'https://lacapsule.cdn.prismic.io/api/v2';
        const api = await Prismic.getApi(apiEndpoint);

        let home = {},
            intro,
            text;

        await api.query(Prismic.Predicates.at('document.type', 'frontpage')).then(
            function(response) {
                home = response.results[0].data;
                intro = PrismicDOM.RichText.asHtml(home.intro);
                text = PrismicDOM.RichText.asHtml(home.text);
            },
            function(error) {
                error({ statusCode: error.response.status, message: error.message });
            }
        );

        store.commit('setHasFooter', false);

        return { home, intro, text };
    },
    mounted() {
        this.$store.commit('setHoverBurger', false);
        this.$store.commit('setClickBurger', false);
        document.body.classList.remove('menuOpen');
        //document.body.classList.remove('content-under');

        this.setBtn();
        setTimeout(() => {
            this.isMounted = true;
        }, 300);

        let keywords = this.home.keywords;
        keywords = keywords.split(',');

        new Typed('#typed', {
            strings: keywords,
            typeSpeed: 55,
            backSpeed: 30,
            backDelay: 2500,
            loop: true,
            showCursor: false
        });
    },
    head() {
        return {
            titleTemplate: null,
            title: 'La Capsule',
            meta: [{ hid: 'description', name: 'description', content: this.home.desc ? this.home.desc : '' }]
        };
    }
};
</script>

<style lang='scss' scoped>
@import "./assets/scss/abstracts/_variables.scss";

h1 {
    position: relative;
    z-index: 1;
    margin: 0 0 0.55em;
    font-size: 4.5rem;
    text-align: left;
    text-shadow: none;
    > span{
        display: block;
        height: 70px;
    }
}

.container {
    position: relative;
    top: -50%;
    margin-top: 35vh;
    z-index: 1;
}

.text {
    width: 40%;
}

.inner-text {
    position: relative;
    z-index: 1;
}

.earth {
    width: 358px;
    height: 357px;
    position: fixed;
    top: 0;
    left: 25%;
    background: url(../static/img/earth.png) no-repeat 0 0 / 100%;
}
.ovni {
    width: 1038px;
    height: 677px;
    position: fixed;
    top: 25%;
    left: 54%;
    background: url(../static/img/ovni.png) no-repeat 0 0 / 100%;
}

// @media (max-height: 800px) {
//     .container {
//         margin-top: 25vh;
//     }
// }

@media (max-width: $desktop-big) {
    .ovni {
        left: 45%;
    }
}

@media (max-width: $tablet) {
    h1 {
        margin-left: auto;
        margin-right: auto;
        font-size: 4rem;
        text-align: center;
    }

    .container {
        margin-top: 5em;
        text-align: center;
    }

    .text {
        width: 100%;
    }

    .illu {
        position: relative;
        height: 330px;
        margin: 100px 0 50px;
    }

    .ovni,
    .earth {
        position: absolute;
    }

    .earth {
        width: 200px;
        height: 200px;
        top: -80px;
        left: -80px;
    }

    .ovni {
        width: 600px;
        height: 495px;
        top: 0;
        left: 40%;
    }
}

@media (max-width: $phone) {
    .earth {
        left: -120px;
    }
    .ovni {
        left: 10%;
    }
}
</style>
