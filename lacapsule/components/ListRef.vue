<template>
  <li>
    <div v-if="!reference.contact">
      <div v-if="reference.logo.url" class="logo">
        <img :src="reference.logo.url" :alt="reference.logo.alt">
      </div>
      <h2>{{ reference.company }}</h2>
      <p>{{ reference.title }}</p>
      <div class="button">
        <nuxt-link :to="reference.url">Plus de détails</nuxt-link>
      </div>
    </div>

    <div v-if="reference.contact" class="contact">
      <div class="logo">
        <img src="/img/helmet-contact.svg" alt="">
      </div>
      <h2>Et pourquoi pas vous ?</h2>
      <div class="button">
        <nuxt-link to="/contact">Contactez-nous</nuxt-link>
      </div>
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
@import './assets/scss/abstracts/_variables.scss';

li {
    width: calc(25% - 15px);
    padding: 90px 30px 25px;
    margin: 0 7px;
    text-align: center;
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
        pointer-events: none;
    }
    &:nth-child(2n) {
        margin-top: 50px;
        margin-bottom: -50px;
    }
    > div {
        display: flex;
        height: 100%;
        flex-wrap: wrap;
        align-items: flex-start;
    }
}

h2 {
    width: 100%;
    font-size: 2.4rem;
    margin: 1em 0 0;
    .contact & {
        max-width: 190px;
        margin: 1em auto;
    }
}

p {
    width: 100%;
}

.logo {
    display: flex;
    width: 100%;
    max-width: 250px;
    position: relative;
    margin: 0 auto 20px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.25);
    background: #fff;
    &:before {
        content: '';
        display: block;
        padding: 0 0 100%;
        z-index: -2;
    }
    .contact & {
        background: rgba(#000, 0.1);
        &:after {
            content: '';
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.25);
            z-index: -1;
        }
    }
    img {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
    }
}

img {
    max-width: 80%;
}

.button {
    width: 100%;
    align-self: flex-end;
}

@media (max-width: $container) {
    li {
        padding: 90px 15px 15px;
        &:nth-child(2n) {
            margin-top: 0;
            margin-bottom: 0;
        }
    }
}

@media (max-width: $desktop) {
    li {
        width: calc(33% - 14px);
        margin: 0 7px;
        padding: 90px 20px 20px;
    }
}

@media (max-width: $tablet) {
    li {
        width: calc(50% - 20px);
        margin: 0 10px 50px;
        padding-top: 50px;
        &:nth-child(2n) {
            margin-bottom: 50px;
        }
    }
}

@media (max-width: $phone) {
    li {
        width: 100%;
    }
}
</style>
