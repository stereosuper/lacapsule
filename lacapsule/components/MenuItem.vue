<template>
    <li :class='[item.ref, "item"]'>
        <nuxt-link v-if='item.link.uid' :to='"/" + item.link.uid' :class='[{"menuClicked": isBurgerClicked, "menuNotClicked": !isBurgerClicked}, "link"]' @click.native='closeMenu'>
            <div :id='item.ref'></div>
            <span>{{ item.label }}</span>
        </nuxt-link>
        <a v-else :href='item.link.url' :target='item.link.target' :class='[{"menuClicked": isBurgerClicked}, "link"]'>
            <div :id='item.ref'></div>
            <span>{{ item.label }}</span>
        </a>
    </li>
</template>

<script>
import Vivus from 'vivus';

export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    computed: {
        isBurgerClicked() {
            return this.$store.state.menuHTML.clickBurger;
        }
    },
    watch: {
        isBurgerClicked(val) {
            val ? this.icons[this.item.ref].stop().play() : this.icons[this.item.ref].stop().reset();
        }
    },
    data() {
        return {
            icons: []
        };
    },
    beforeMount() {
        this.icons[this.item.ref] = new Vivus(this.item.ref, {
            duration: 30,
            animTimingFunction: Vivus.EASE_OUT,
            file: '/img/' + this.item.ref + '.svg',
            start: 'manual',
            onReady(svg) {
                svg.el.setAttribute('height', svg.el.viewBox.baseVal.height);
                svg.el.setAttribute('width', svg.el.viewBox.baseVal.width);
            }
        });
    },
    methods: {
        closeMenu(e){
            if(e.target.attributes[0].nodeValue == this.$nuxt.$route.path){
                this.$store.commit('setClickBurger', false);
                document.body.classList.remove('menuOpen');
            }
        }
    }
};
</script>


<style lang='scss'>
@import "./assets/scss/abstracts/_variables.scss";
.menu-stars{
    opacity: 0;
    transition: $transition;
    .menuOpen &{
        opacity: 1;
    }
}
</style>

<style lang='scss' scoped>
@import "./assets/scss/abstracts/_variables.scss";

.item {
    padding: 0;
    position: absolute;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    &:before {
        display: none;
    }
    &:nth-of-type(1) {
        top: 32%;
        left: 8%;
    }
    &:nth-of-type(2) {
        top: 57%;
        left: 7%;
    }
    &:nth-of-type(3) {
        top: 69%;
        left: 30%;
    }
    &:nth-of-type(4) {
        top: 44%;
        left: 75%;
    }
    &:nth-of-type(5) {
        top: 28%;
        left: 51%;
    }
    &:nth-of-type(6) {
        top: 45.4%;
        left: 33.6%;
    }
    &:nth-of-type(7) {
        top: 61%;
        left: 58%;
    }
}

.link {
    display: block;
    position: relative;
    font-family: $league;
    font-style: normal;
    color: #fff;
    text-decoration: none;
    &:hover, &:focus{
        opacity: 0.7;
    }
    &.menuClicked {
        > span {
            display: block;
        }
    }
    &.menuNotClicked{
        pointer-events: none;
    }
    > span {
        display: none;
        position: absolute;
        white-space: nowrap;
    }
}

.arrow {
    span {
        top: 60%;
        left: 68%;
    }
}

.question {
    div {
        margin: 0 0 0 60px;
    }
    span {
        top: 55%;
    }
}

.star {
    span {
        top: 70%;
        left: 100%;
    }
}

.download {
    span {
        top: 35%;
        left: 70%;
    }
}

.helmet {
    span {
        top: 40%;
        left: 100%;
    }
}

.mail {
    span {
        top: 50%;
        left: 100%;
    }
}

.blog {
    span {
        top: 64%;
        left: 107%;
    }
}

@media (max-height: 800px) {
    .item{
        &:nth-of-type(1){
            top: 36%;
            left: 9%;
        }
        &:nth-of-type(2){
            top: 58%;
        }
        &:nth-of-type(3){
            top: 65%;
        }
    }
}

@media (max-width: $desktop){
    .item{
        &:nth-of-type(2){
            left: 8%;
        }
        &:nth-of-type(3){
            left: 35%;
        }
        &:nth-of-type(4){
            left: 77%;
        }
        &:nth-of-type(5){
            left: 65%;
        }
        &:nth-of-type(6){
            left: 43%;
        }
        &:nth-of-type(7){
            left: 70%;
            top: 67%;
        }
    }
}

@media (max-height: 600px), (max-width: $tablet){
    .item{
        position: static;
        margin: 5.5vh 0 0;
        transform: none;
        &:last-of-type{
            margin-top: 10vh;
            text-shadow: 0 0 24px rgba(255, 255, 255, 0.25), 0 0 15px rgba(255, 255, 255, 0.68);
        }
    }

    .link{
        text-transform: uppercase;
        > div{
            display: none;
        }
        > span{
            position: static;
        }
    }
}

@media (max-height: 600px){
    .item{
        margin: 3vh 0 0;
        &:last-of-type{
            margin-top: 6vh;
        }
    }
}

@media (max-width: $phone){
    .bg-menu{
        left: -40%;
    }
}
</style>
