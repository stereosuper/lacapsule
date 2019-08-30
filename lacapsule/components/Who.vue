<template>
    <div>
        <div v-if='text' v-html='text'/>
        <h2>{{content.team_title[0].text}}</h2>
        <div v-if='teamText' v-html='teamText'/>
    </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

export default {
    props: {
        content: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            text: '',
            teamText: ''
        };
    },
    created() {
        this.text = this.content.who_text ? PrismicDOM.RichText.asHtml(this.content.who_text) : '';
        this.teamText = this.content.team_text ? PrismicDOM.RichText.asHtml(this.content.team_text) : '';
    }
};
</script>

<style lang='scss' scoped>

</style>
