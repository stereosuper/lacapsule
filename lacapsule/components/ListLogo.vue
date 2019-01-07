<template>
    <li>
        <div v-if='!logo.link.url' class='logo'>
            <img v-if='logo.logo' :src='logo.logo.url' :alt='logo.logo.alt'/>
        </div>
        <a v-if='logo.link.url' :href='logo.link.url' :target='logo.link.target'>
            <img v-if='logo.logo' :src='logo.logo.url' :alt='logo.logo.alt'/>
        </a>
        <h2>{{logo.logo_title[0].text}}</h2>
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
    text-align: center;
    &:before{
        content: none;
    }
}

h2{
    margin: 0;
    font-family: $ibm;
    font-weight: 400;
    font-style: italic;
    font-size: 1.6rem;
}

.logo{
    display: flex;
    width: 185px;
    height: 185px;
    position: relative;
    margin: 0 0 20px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #fff;
    &:after{
        content: '';
        position: absolute;
        top: -18px;
        left: -18px;
        right: -18px;
        bottom: -18px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
    }
}
</style>
