<template>
  <div>
    <div v-if="text" class="header">
      <div class="header-text" v-html="text"/>
            <!--<img v-if='content.who_img.url' :src='content.who_img.url' :alt='content.who_img.alt' :whidth='content.who_img.dimensions.width' :height='content.who_img.dimensions.height'>
            --><div id="galaxy" ref="galaxy" class="galaxy"/>
    </div>

    <h2 v-if="content.team_title[0]" class="title-line"><span>{{ content.team_title[0].text }}</span></h2>
    <div class="team-wrapper">
      <div v-if="teamText" v-html="teamText"/>
      <div v-if="team">
        <ul class="team-list">
          <li v-for="member in team" :key="member.name">
            <img v-if="member.photo.url" :src="member.photo.url" :alt="member.photo.alt" :whidth="member.photo.dimensions.width" :height="member.photo.dimensions.height">
            <p>{{ member.name }}</p>
            <a v-if="member.linkedin.url" :href="member.linkedin.url" :target="member.linkedin.target">
              <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M14.1123 27C21.5079 27 27.5033 21.0046 27.5033 13.6089C27.5033 6.21325 21.5079 0.217865 14.1123 0.217865C6.71657 0.217865 0.721191 6.21325 0.721191 13.6089C0.721191 21.0046 6.71657 27 14.1123 27ZM10.0719 9.85636C9.36368 9.85636 8.79248 9.28316 8.79248 8.57764C8.79248 7.87212 9.36368 7.29892 10.0719 7.29892C10.7767 7.29892 11.3493 7.87212 11.3493 8.57764C11.3493 9.28316 10.7767 9.85636 10.0719 9.85636ZM19.4321 17.9189H17.2277V14.4691C17.2277 13.6466 17.2131 12.5886 16.082 12.5886C14.9349 12.5886 14.7601 13.485 14.7601 14.4106V17.9189H12.5577V10.8251H14.6709V11.7953H14.7015C14.9954 11.2374 15.7149 10.6489 16.7875 10.6489C19.0198 10.6489 19.4321 12.1178 19.4321 14.0283V17.9189ZM11.1741 17.919H8.96706V10.8252H11.1741V17.919Z"/>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="storyText" class="story" v-html="storyText"/>

    <h2 v-if="story.our_way_title[0]" class="title-line"><span>{{ story.our_way_title[0].text }}</span></h2>
    <div class="intro">{{ story.our_way_text }}</div>

    <div v-if="dimensions" class="dimensions">
      <ul>
        <li v-for="(dimension, index) in dimensions" v-if="dimension.dimension_title[0]" :key="dimension.dimension_title[0].text">
          <h3>{{ dimension.dimension_title[0].text }}</h3>
          <img v-if="dimension.img.url" :src="dimension.img.url" :alt="dimension.img.alt" :whidth="dimension.img.dimensions.width" :height="dimension.img.dimensions.height">
          <div v-if="dimensionTexts[index]" v-html="dimensionTexts[index]"/>
        </li>
      </ul>
    </div>

    <div class="video">
      <div v-if="video.video.html" v-html="video.video.html"/>
      <div v-if="videoText" class="video-text" v-html="videoText"/>
    </div>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import lottie from 'lottie-web';

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
    },
    mounted() {
        lottie.loadAnimation({
            container: this.$refs.galaxy,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/planets.json'
        });
    }
};
</script>

<style lang='scss' scoped>
@import './assets/scss/abstracts/_variables.scss';

.header {
    display: flex;
    padding: 40px 0;
    justify-content: space-between;
    /deep/ h2 {
        margin-top: 20px;
    }
    // img{
    //     margin: 0 $gutter * -2 0 0;
    // }
}
.header-text {
    width: 36%;
    padding: 0 $gutter;
    margin: 0 0 0 10%;
}
.galaxy {
    flex: 1;
    margin: -80px -100px 0 0;
}

.team-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    > div {
        padding: 0 $gutter;
        &:first-child {
            width: 36%;
            margin: 0 0 0 10%;
        }
        &:last-child {
            width: 50%;
        }
    }
}
.team-list {
    display: flex;
    flex-wrap: wrap;
    font-style: italic;
    > li {
        width: 205px;
        height: 205px;
        padding: 21px 20px;
        background: rgba(#000, 0.1);
        border-radius: 200px;
        &:before {
            content: none;
        }
        &:nth-child(odd) {
            margin: 0 70px 70px 0;
        }
        &:nth-child(even) {
            margin-top: 50px;
        }
    }
    a {
        position: absolute;
        bottom: 5px;
        right: 20px;
        color: #fff;
        &:hover,
        &:focus {
            color: $primary;
        }
    }
    p {
        margin: 15px 0 0;
    }
}

.story {
    width: 50%;
    padding: 0 $gutter;
    margin: 0 auto 90px;
    text-align: center;
}

.dimensions {
    margin: 40px 12% 90px;
    ul {
        display: flex;
        justify-content: space-between;
        text-align: center;
        margin: 0 $gutter * -1;
    }
    li {
        width: 31%;
        padding: 0 $gutter 20px;
        z-index: 1;
        &:before {
            content: none;
        }
        &:after {
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
    img {
        margin: 10px 0 25px;
    }
}

.video {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.video-text {
    width: 50%;
    padding: 0 30px;
    text-align: center;
    /deep/ h3 {
        margin: 25px 0 15px;
        font-size: 1.8rem;
    }
}

@media (max-width: $container) {
    .header-text {
        width: 40%;
        margin: 0;
    }

    .galaxy {
        margin: -50px -50px 0 0;
    }

    .team-wrapper {
        > div {
            &:first-child {
                width: 50%;
                margin: 0;
            }
        }
    }

    .team-list {
        > li {
            width: 180px;
            height: 180px;
            &:nth-child(odd) {
                margin: 0 5% 0 0;
            }
        }
    }

    .story {
        width: 60%;
    }

    .dimensions {
        margin-left: 0;
        margin-right: 0;
    }

    .video {
        display: block;
        text-align: center;
    }
    .video-text {
        margin: 30px auto 0;
        width: 60%;
    }
}

@media (max-width: $desktop) {
    .header {
        display: block;
        // img{
        //     margin: 30px 0 0;
        // }
    }

    .header-text {
        width: 100%;
    }

    .galaxy {
        margin-left: -50px;
    }

    .team-wrapper {
        display: block;
        > div {
            &:first-child,
            &:last-child {
                width: 100%;
            }
        }
    }

    .team-list {
        margin: 30px 0;
        justify-content: space-between;
        > li {
            &:nth-child(odd),
            &:nth-child(even) {
                margin: 0 0 50px;
            }
        }
    }

    .dimensions {
        margin-top: 0;
        ul {
            display: block;
            margin: 0;
        }
        li {
            width: 100%;
            max-width: 400px;
            margin: 0 auto 20px;
        }
    }

    .video-text,
    .story {
        width: 80%;
    }
}

@media (max-width: $tablet) {
    .header-text {
        padding: 0;
    }

    .team-wrapper {
        > div {
            padding: 0;
        }
    }

    .team-list {
        margin-bottom: 0;
        > li {
            width: 150px;
            height: 150px;
            margin: 0 0 20px;
            &:nth-child(odd),
            &:nth-child(even) {
                margin: 0 0 30px;
            }
        }
    }

    .story,
    .video-text {
        width: 100%;
        padding: 0;
    }
}
</style>
