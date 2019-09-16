<template>
    <li>
        <img v-if='file.file_img.url' :src='file.file_img.url' :alt='file.file_img.alt'/>
        <div>
            <h2>{{file.file_title[0].text}}</h2>
            <div v-if='content' v-html='content'/>
            <a :href='file.file.url' class='download' v-if='file.file.url'>
                <svg width="11" height="14" viewBox="0 0 11 14" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.541016 13.1653H10.4577V11.7487H0.541016V13.1653ZM10.4577 4.37363H7.62435V0.123632H3.37435V4.37363H0.541016L5.49935 9.33199L10.4577 4.37363Z"/>
                </svg>
                Télécharger
            </a>
            <!--<a :href='file.mailto.url' class='download' v-if='file.mailto.url'>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2918 2.13477H2.54785V11.3743H15.2918V2.13477ZM3.54785 3.8483V9.67323L6.7786 6.44256L3.54785 3.8483ZM13.6217 10.3743H4.26094L7.56298 7.0724L9.22511 8.40708L10.4945 7.24708L13.6217 10.3743ZM14.2918 9.63021V3.77716L11.2335 6.57182L14.2918 9.63021ZM13.5124 3.13477H4.25641L9.18309 7.09085L13.5124 3.13477Z" fill="#FF438A"/>
                </svg>
                Demander le document
            </a>-->
            <!--<button :class='[{"off": form}, "download"]' @click='displayForm' v-else>-->
            <button class='download' v-else @click='openPopin'>
                <svg class='mail' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2918 2.13477H2.54785V11.3743H15.2918V2.13477ZM3.54785 3.8483V9.67323L6.7786 6.44256L3.54785 3.8483ZM13.6217 10.3743H4.26094L7.56298 7.0724L9.22511 8.40708L10.4945 7.24708L13.6217 10.3743ZM14.2918 9.63021V3.77716L11.2335 6.57182L14.2918 9.63021ZM13.5124 3.13477H4.25641L9.18309 7.09085L13.5124 3.13477Z"/>
                </svg>
                Demander le document
            </button>
            <!--<form method='post' action='/api/ressource' :class='[{"on": form}]' @submit='checkForm'>
                <label>Email</label>
                <input type='email' name='email' v-model='email'/>
                <button type='submit' class='ok' name='submit'>
                    OK
                    <svg width="11" height="14" viewBox="0 0 11 14" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.541016 13.1653H10.4577V11.7487H0.541016V13.1653ZM10.4577 4.37363H7.62435V0.123632H3.37435V4.37363H0.541016L5.49935 9.33199L10.4577 4.37363Z"/>
                    </svg>
                </button>
            </form>
            <p v-if='formError' class='error'>{{formError}}</p>-->
        </div>
    </li>
</template>

<script>
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

export default {
    props: {
        file: {
            type: Object,
            required: true
        },
        nb: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            content: '',
        };
    },
    created() {
        this.content = this.file.file_text ? PrismicDOM.RichText.asHtml(this.file.file_text) : '';
    },
    methods: {
        displayForm(){
            this.form = true;
        },
        openPopin (){
            this.$store.commit('openPopin', 'ressource'+(this.nb+1));
        }
    }
};
</script>

<style lang='scss' scoped>
@import "./assets/scss/abstracts/_variables.scss";

li{
    display: flex;
    width: calc(50% - #{$gutter/2});
    padding: 30px;
    align-items: flex-start;
    margin: 0 0 35px;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    &:before{
        content: none;
    }
    &:nth-child(2){
        margin: 50px 0 -50px;
    }
    &:nth-child(2n){
        margin: 85px 0 -50px;
    }
    > div{
        padding: 0 0 0 25px;
    }
}

h2{
    margin: 0;
    font-size: 2.1rem;
}

img{
    margin: 10px 0 0;
}

svg{
    fill: currentColor;
}

.download{
    padding: 0 0 0 20px;
    position: relative;
    line-height: 1;
    font-style: italic;
    color: $primary;
    text-decoration: underline;
    &.off{
        display: none;
    }
    &:hover, &:focus{
        color: #fff;
    }
    svg{
        position: absolute;
        top: 4px;
        left: 0;
    }
    .mail{
        top: 3px;
    }
}


@media (max-width: $container){
    li{
        width: 100%;
        max-width: 700px;
        margin: 0 auto 35px;
        &:nth-child(2), &:nth-child(2n) {
            margin: 0 auto 35px;
        }
    }
}

@media (max-width: $phone){
    li{
        display: block;
        > div{
            padding: 30px 0 0;
        }
    }
}
</style>
