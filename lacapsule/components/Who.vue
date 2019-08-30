<template>
    <div>
        <div class='header' v-if='text'>
            <div class='header-text' v-html='text'/>
            <img v-if='content.who_img.url' :src='content.who_img.url' :alt='content.who_img.alt' :whidth='content.who_img.dimensions.width' :height='content.who_img.dimensions.height'>
        </div>

        <h2 class='title-line'><span>{{content.team_title[0].text}}</span></h2>
        <div class='team-wrapper'>
            <div v-if='teamText' v-html='teamText'/>
            <div v-if='team'>
                <ul class='team-list'>
                    <li v-for='member in team' :key='member.name'>
                        <img v-if='member.photo.url' :src='member.photo.url' :alt='member.photo.alt' :whidth='member.photo.dimensions.width' :height='member.photo.dimensions.height'>
                        <p>{{member.name}}</p>
                    </li>
                </ul>
            </div>
        </div>

        <div class='story' v-if='storyText' v-html='storyText'/>

        <h2 class='title-line'><span>{{story.our_way_title[0].text}}</span></h2>
        <div class='intro'>{{story.our_way_text}}</div>

        <div v-if='dimensions' class='dimensions'>
            <ul>
                <li v-for='(dimension, index) in dimensions' :key='dimension.dimension_title[0].text'>
                    <h3>{{dimension.dimension_title[0].text}}</h3>
                    <img v-if='dimension.img.url' :src='dimension.img.url' :alt='dimension.img.alt' :whidth='dimension.img.dimensions.width' :height='dimension.img.dimensions.height'>
                    <div v-if='dimensionTexts[index]' v-html='dimensionTexts[index]'/>
                </li>
            </ul>
        </div>

        <div class='video'>
            <div v-if='video.video.html' v-html='video.video.html'/>
            <div class='video-text' v-if='videoText' v-html='videoText'/>
        </div>
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
@import "./assets/scss/abstracts/_variables.scss";

.header{
    display: flex;
    padding: 40px 0 0;
    justify-content: space-between;
    align-items: flex-start;
    /deep/ h2{
        margin-top: 20px;
    }
    img{
        margin: 0 $gutter * -2 0 0;
    }
}
.header-text{
    width: 36%;
    padding: 0 $gutter;
    margin: 0 0 0 10%;
}

.team-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    > div{
        padding: 0 $gutter;
        &:first-child{
            width: 36%;
            margin: 0 0 0 10%;
        }
        &:last-child{
            width: 50%;
        }
    }
}
.team-list{
    display: flex;
    flex-wrap: wrap;
    font-style: italic;
    > li{
        width: 205px;
        height: 205px;
        padding: 21px 20px;
        background: rgba(#000, 0.1);
        border-radius: 200px;
        &:before{
            content: none;
        }
        &:first-child{
            margin: 0 70px 70px 0;
        }
        &:nth-child(2){
            margin-top: 50px;
        }
    }
    p{
        margin: 15px 0 0;
    }
}

.story{
    width: 50%;
    padding: 0 $gutter;
    margin: 0 auto 90px;
    text-align: center;
}

.dimensions{
    margin: 90px 12%;
    ul{
        display: flex;
        justify-content: space-between;
        text-align: center;
        margin: 0 $gutter*-1;
    }
    li{
        width: 31%;
        padding: 0 $gutter 20px;
        z-index: 1;
        &:before{
            content: none;
        }
        &:after{
            content: '';
            height: 130%;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            border-radius: 18px;
            background: linear-gradient(360deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 71.6%);
        }
    }
    img{
        margin: 10px 0 25px;
    }
}

.video{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.video-text{
    width: 50%;
    padding: 0 30px;
    text-align: center;
    /deep/ h3{
        margin: 25px 0 15px;
        font-size: 1.8rem;
    }
}
</style>
