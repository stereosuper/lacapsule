<template>
    <li>
        <h2>{{file.file_title[0].text}}</h2>
        <div v-if='content' v-html='content'/>
        <button class='download'>Télécharger</button>
        <form method='post' action=''>
            <label>Email</label>
            <input type='email'/>
            <button type='submit' class='ok'>OK</button>
        </form>
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
        }
    },
    data() {
        return {
            content: '',
            form: false
        };
    },
    created() {
        this.content = this.file.file_text ? PrismicDOM.RichText.asHtml(this.file.file_text) : '';
    },
    methods: {}
};
</script>

<style lang='scss' scoped>
li{
    width: calc(50% - #{$gutter/2});
    padding: 30px 35px;
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
}

h2{
    margin: 0;
    font-size: 2.1rem;
}

form{
    display: none;
    align-items: center;
    &.on{
        display: flex;
    }
}

input{
    width: 100%;
    padding: 4px 10px;
    border: 1px solid #fff;
    margin: 0 10px 0 15px;
    border-radius: 5px;
    color: #fff;
}

.download{
    font-style: italic;
    color: $primary;
    text-decoration: underline;
    &.off{
        display: none;
    }
}

.ok{
    padding: 9px 10px 8px;
    font-family: $league;
    font-size: 1.1rem;
    border-radius: 5px;
    background: $primary;
}
</style>
