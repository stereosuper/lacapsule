<template>
    <div>        
        <div class='container'>
            <div class='text'>
                <h1 class='title'>{{ home.title[0].text }}</h1>
                <div v-html='intro' class='inner-text'/>
                <div class='illu'>
                    <div class='earth'></div>
                    <div class='ovni'></div>
                </div>
                <div v-html='text' class='inner-text'/>
            </div>
        </div>
    </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

import btn from '~/mixins/btn.js';

export default {
    mixins: [btn],
    async asyncData() {
        const apiEndpoint = 'https://lacapsule.cdn.prismic.io/api/v2';
        const api = await Prismic.getApi(apiEndpoint);

        let home = {},
            intro,
            text;

        await api.query(Prismic.Predicates.at('document.type', 'frontpage')).then(function(response) {
            home = response.results[0].data;
            intro = PrismicDOM.RichText.asHtml(home.intro);
            text = PrismicDOM.RichText.asHtml(home.text);
        });

        return { home, intro, text };
    },
    mounted() {
        this.$busPageMounted.$emit('newPageIsLoaded', true);
        this.setBtn();
    }
};
</script>

<style lang='scss' scoped>
h1 {
    position: relative;
    z-index: 1;
    margin: 0 0 0.55em;
    text-align: left;
    text-shadow: none;
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

.inner-text{
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


@media (max-height: 800px){
    .container{
        margin-top: 25vh;
    }
}

@media (max-width: $desktop-big){
    .ovni{
        left: 45%;
    }
}

@media (max-width: $tablet){
    h1{
        text-align: center;
    }

    .container{
        margin-top: 5em;
        text-align: center;
    }

    .text{
        width: 100%;
    }

    .illu{
        position: relative;
        height: 330px;
        margin: 100px 0 50px;
    }

    .ovni, .earth{
        position: absolute;
    }

    .earth{
        width: 200px;
        height: 200px;
        top: -80px;
        left: -80px;
    }

    .ovni{
        width: 600px;
        height: 495px;
        top: 0;
        left: 40%;
    }
}

@media (max-width: $phone){
    .earth{
        left: -120px;
    }
    .ovni{
        left: 10%;
    }
}
</style>
