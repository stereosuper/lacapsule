<template>
    <li>
        <h2>{{logo.logo_title[0].text}}</h2>
        <img v-if='logo.logo' :src='logo.logo.url' :alt='logo.logo.alt'/>
    </li>
</template>

<script>
// import Prismic from 'prismic-javascript';
// import PrismicDOM from 'prismic-dom';

export default {
    props: {
        logo: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            //img: ''
        };
    },
    created() {
        //this.img = this.logo.logo.url ? PrismicDOM.RichText.asHtml(this.logo.logo) : '';
    }
};
</script>

<style lang='scss' scoped>
li{
    &:before{
        content: none;
    }
}
</style>
