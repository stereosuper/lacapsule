<template>
    <div>
        <div v-if='text' v-html='text'/>

        <h2>{{content.team_title[0].text}}</h2>
        <div v-if='teamText' v-html='teamText'/>

        <ul v-if='team'>
            <li v-for='member in team' :key='member.name'>
                {{member.name}}
            </li>
        </ul>

        <div v-if='storyText' v-html='storyText'/>

        <h2>{{story.our_way_title[0].text}}</h2>
        <div class='intro'>{{story.our_way_text}}</div>

        <ul v-if='dimensions'>
            <li v-for='(dimension, index) in dimensions' :key='dimension.dimension_title[0].text'>
                <h3>{{dimension.dimension_title[0].text}}</h3>
                <div v-if='dimensionTexts[index]' v-html='dimensionTexts[index]'/>
            </li>
        </ul>

        <div v-if='video.video.html' v-html='video.video.html'/>

        <div v-if='videoText' v-html='videoText'/>
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
        },
        team: {
            type: Array,
            required: true
        },
        story: {
            type: Object,
            required: true
        },
        dimensions: {
            type: Array,
            required: true
        },
        video: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            text: '',
            teamText: '',
            storyText: '',
            videoText: '',
            dimensionTexts: []
        };
    },
    created() {
        this.text = this.content.who_text ? PrismicDOM.RichText.asHtml(this.content.who_text) : '';
        this.teamText = this.content.team_text ? PrismicDOM.RichText.asHtml(this.content.team_text) : '';
        this.storyText = this.story.story ? PrismicDOM.RichText.asHtml(this.story.story) : '';
        this.videoText = this.video.video_text ? PrismicDOM.RichText.asHtml(this.video.video_text) : '';

        this.dimensions.forEach((dim, i) => {
            this.dimensionTexts[i] = dim.dimension_text ? PrismicDOM.RichText.asHtml(dim.dimension_text) : '';
        });
    }
};
</script>

<style lang='scss' scoped>

</style>
