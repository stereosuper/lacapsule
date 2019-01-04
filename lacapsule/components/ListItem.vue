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
    width: calc(25% - #{2*$gutter});
    padding: 0;
    &:before{
        content: none;
    }
}

h2{
    margin: 0;
    font-size: 2.2rem;
    line-height: 1.3;
}
</style>
