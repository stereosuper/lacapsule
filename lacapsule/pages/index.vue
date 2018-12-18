<template>
    <div>        
        <div class='container'>
            <div class='text'>
                <h1 class='title'>{{ home.title[0].text }}</h1>
                <div v-html='homeText'/>
            </div>
        </div>

        <div class='earth'></div>
        <div class='ovni'></div>
    </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

import btn from '~/mixins/btn.js';

export default {
    async asyncData() {
        const apiEndpoint = 'https://lacapsule.cdn.prismic.io/api/v2';
        const api = await Prismic.getApi(apiEndpoint);

        let home = {},
            homeText;

        await api.query(Prismic.Predicates.at('document.type', 'frontpage')).then(function(response) {
            home = response.results[0].data;
            homeText = PrismicDOM.RichText.asHtml(home.text);
        });

        return { home, homeText };
    },
    mixins: [btn],
    mounted() {
        this.setBtn();
    }
};
</script>

<style lang='scss' scoped>
h1 {
    margin-top: 0;
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

.earth {
    width: 358px;
    height: 357px;
    position: absolute;
    top: 0;
    left: 25%;
    background: url(../static/img/earth.png) no-repeat 0 0 / 100%;
}
.ovni {
    width: 1038px;
    height: 677px;
    position: absolute;
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
    .container{
        margin-top: 40vh;
    }
    .ovni{
        top: 15%;
    }
    .text{
        width: 61%;
    }
}
</style>
