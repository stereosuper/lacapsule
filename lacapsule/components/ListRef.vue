<template>
    <li>
        <div class='logo' v-if='reference.logo.url'>
            <img :src='reference.logo.url' :alt='reference.logo.alt'/>
        </div>
        <h2>{{reference.company}}</h2>
        <p>{{reference.title}}</p>
        <div class='button'>
            <a :href='reference.url'>Plus de détails</a>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        reference: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang='scss' scoped>
@import "./assets/scss/abstracts/_variables.scss";

li{
    width: calc(25% - 14px);
    padding: 0 30px 25px;
    margin: 0 15px;
    text-align: center;
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
    &:nth-child(2n){
        margin-top: 50px;
        margin-bottom: -50px;
    }
    &:last-child{
        margin-right: auto;
    }
}

h2{
    font-size: 2.4rem;
    margin: 2em 0 0;
    // margin: 0;
    // font-family: $ibm;
    // font-weight: 400;
    // font-style: italic;
    // font-size: 1.6rem;
}

.logo{
    display: flex;
    width: 225px;
    height: 225px;
    position: relative;
    margin: 0 auto 20px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.25);
    background: #fff;
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
