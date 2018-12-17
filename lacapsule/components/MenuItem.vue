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
        isBurgerClicked: function() {
            return this.$store.state.menuHTML.clickBurger;
        }
    },
    watch: {
        isBurgerClicked: function(val) {
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
            onReady: function(svg) {
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
        top: 27%;
        left: $gutter * 2;
    }
    &:nth-of-type(2) {
        top: 59%;
        left: 10%;
    }
    &:nth-of-type(3) {
        top: 69%;
        left: 41%;
    }
    &:nth-of-type(4) {
        top: 55%;
        left: 67%;
    }
    &:nth-of-type(5) {
        top: 31%;
        left: 58%;
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

.postcard {
    span {
        top: 40%;
        left: 115%;
    }
}

.mail {
    span {
        top: 50%;
        left: 100%;
    }
}
</style>
