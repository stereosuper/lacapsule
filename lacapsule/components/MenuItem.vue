<template>
    <li :class='[item.ref, "item"]'>
        <a v-if='!item.link.slug' :href='item.link.url' :target='item.link.target' :class='[{"menuClicked": isBurgerClicked}, "link"]'>
            <div :id='item.ref'></div>
            <span>{{ item.label }}</span>
        </a>
        <nuxt-link v-if='item.link.slug' :to='item.link.slug' :class='[{"menuClicked": isBurgerClicked}, "link"]'>
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
    mounted() {
        this.icons[this.item.ref] = new Vivus(this.item.ref, {
            duration: 200,
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
    position: absolute;
    &:before {
        display: none;
    }
    &:nth-of-type(1) {
        top: 20%;
        left: $gutter * 2;
    }
    &:nth-of-type(2) {
        top: 47%;
        left: $gutter;
    }
    &:nth-of-type(3) {
        top: 65%;
        left: 50%;
    }
    &:nth-of-type(4) {
        top: 55%;
        left: 70%;
    }
    &:nth-of-type(5) {
        top: 25%;
        left: 70%;
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
    > span {
        display: none;
        position: absolute;
    }
}

.arrow {
    .link {
        > span {
            top: 60%;
            left: 68%;
        }
    }
}

.question {
    .link {
        > span {
            top: 55%;
        }
    }
}
</style>
