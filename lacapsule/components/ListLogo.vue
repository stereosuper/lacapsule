<template>
    <li :class='[{"has-logo": logo.logo.url}]'>
        <div v-if='!logo.link.url' class='logo' :style='"background-color:"+logo.bd'>
            <img v-if='logo.logo.url' :src='logo.logo.url' :alt='logo.logo.alt'/>
        </div>
        <a v-if='logo.link.url' :href='logo.link.url' :target='logo.link.target' class='logo' :style='"background-color:"+logo.bd'>
            <img v-if='logo.logo.url' :src='logo.logo.url' :alt='logo.logo.alt'/>
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
    width: 25%;
    padding: 0;
    margin: 0 0 20px;
    text-align: center;
    &:before{
        content: none;
    }
    &:nth-child(4n-2), &:nth-child(4n-1){
        margin-top: 50px;
    }
    &:last-child{
        margin-right: auto;
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
    margin: 0 auto 20px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.25);
    .has-logo &{
        background: #fff;
    }
    &:after{
        content: '';
        position: absolute;
        top: -18px;
        left: -18px;
        right: -18px;
        bottom: -18px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        transition: $transition;
    }
}

a{
    &:hover, &:focus{
        &:after{
            transform: scale(0.95);
        }
    }
}

img{
    max-width: 80%;
}


@media (max-width: $desktop){
    li{
        width: 33%;
        &:nth-child(4n-1){
            margin-top: 0;
        }
    }
}

@media (max-width: $tablet){
    li{
        width: 50%;
        margin: 0 0 50px;
        &:nth-child(4n-2){
            margin-top: 0;
        }
    }
}

@media (max-width: $phone){
    li{
        width: 100%;
    }
}
</style>
