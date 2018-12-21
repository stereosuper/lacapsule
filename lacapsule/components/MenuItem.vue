<template>
    <li :class='[item.ref, "item"]'>
        <a v-if='!item.link.slug' :href='item.link.url' :target='item.link.target' :class='[{"menuClicked": isBurgerClicked}, "link"]'>
            <div :id='item.ref'></div>
            <span>{{ item.label }}</span>
        </a>
        <nuxt-link v-if='item.link.slug' :to='item.link.slug' :class='[{"menuClicked": isBurgerClicked, "menuNotClicked": !isBurgerClicked}, "link"]'>
            <div :id='item.ref'></div>
            <span>{{ item.label }}</span>
        </nuxt-link>
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
    }
};
</script>

<style lang='scss' scoped>
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
        top: 59%;
        left: 10%;
    }
    &:nth-of-type(3) {
        top: 66%;
        left: 41%;
    }
    &:nth-of-type(4) {
        top: 55%;
        left: 67%;
    }
    &:nth-of-type(5) {
        top: 33%;
        left: 53%;
    }
    &:nth-of-type(6) {
        top: 45.4%;
        left: 33.6%;
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
        &:nth-of-type(4){
            top: 52%;
        }
    }
}

@media (max-width: $desktop){
    .item{
        &:nth-of-type(2){
            left: 8%;
        }
        &:nth-of-type(3){
            left: 44%;
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
