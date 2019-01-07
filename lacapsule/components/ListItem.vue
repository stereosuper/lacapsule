<template>
    <li>
        <h2>{{item.item_title[0].text}}</h2>
        <div v-if='content' v-html='content'/>
    </li>
</template>

<script>
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            content: ''
        };
    },
    created() {
        this.content = this.item.item_content ? PrismicDOM.RichText.asHtml(this.item.item_content) : '';
    }
};
</script>

<style lang='scss' scoped>
li{
    width: calc(25% - #{$gutter*3/4});
    padding: 0 $gutter 20px;
    z-index: 1;
    &:before{
        content: none;
    }
    &:after{
        content: '';
        height: 1000px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        border-radius: 18px;
        background: linear-gradient(360deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 71.6%);
    }
    &:nth-child(2), &:nth-child(3){
        margin: 50px 0 -50px;
    }
}

h2{
    max-width: 180px;
    margin: 0 auto 2em;
    font-size: 2.2rem;
    line-height: 1.3;
}
</style>
