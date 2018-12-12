<template>
    <li :class='[item.ref, "item"]'>
        <div :id='item.ref'></div>
        <a :href='item.link.slug ? item.link.slug : item.link.url' :target='item.link.target' :class='[{"menuClicked": isBurgerClicked}, "link"]'>{{ item.label }}</a>
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
        this.icons[this.item.ref] = new Vivus(this.item.ref, { duration: 200, animTimingFunction: Vivus.EASE_OUT, file: '/img/' + this.item.ref + '.svg', start: 'manual' });
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
        top: 30%;
        left: $gutter * 2;
    }
}

.link {
    display: none;
    position: absolute;
    font-family: $league;
    font-style: normal;
    color: #fff;
    text-decoration: none;
    &.menuClicked {
        display: block;
    }
}

.arrow {
    .link {
        top: 60%;
        left: 68%;
    }
}
</style>
