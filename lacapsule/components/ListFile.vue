<template>
    <li>
        <img v-if='file.file_img.url' :src='file.file_img.url' :alt='file.file_img.alt'/>
        <div>
            <h2>{{file.file_title[0].text}}</h2>
            <div v-if='content' v-html='content'/>
            <!--<a :href='file.file.url' class='download'>
                <svg width="11" height="14" viewBox="0 0 11 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.541016 13.1653H10.4577V11.7487H0.541016V13.1653ZM10.4577 4.37363H7.62435V0.123632H3.37435V4.37363H0.541016L5.49935 9.33199L10.4577 4.37363Z"/>
                </svg>
                Télécharger
            </a>-->
            <button :class='[{"off": form}, "download"]' @click='displayForm'>
                <svg width="11" height="14" viewBox="0 0 11 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.541016 13.1653H10.4577V11.7487H0.541016V13.1653ZM10.4577 4.37363H7.62435V0.123632H3.37435V4.37363H0.541016L5.49935 9.33199L10.4577 4.37363Z"/>
                </svg>
                Télécharger
            </button>
            <form method='post' action='/api/contact' :class='[{"on": form}]' @submit='checkForm'>
                <label>Email</label>
                <input type='email' name='email' v-model='email'/>
                <button type='submit' class='ok' name='submit'>
                    OK
                    <svg width="11" height="14" viewBox="0 0 11 14" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.541016 13.1653H10.4577V11.7487H0.541016V13.1653ZM10.4577 4.37363H7.62435V0.123632H3.37435V4.37363H0.541016L5.49935 9.33199L10.4577 4.37363Z"/>
                    </svg>
                </button>
            </form>
            <p v-if='formError' class='error'>{{formError}}</p>
        </div>
    </li>
</template>

<script>
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import validator from 'validator';

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
            form: false,
            formError: '',
            email: ''
        };
    },
    created() {
        this.content = this.file.file_text ? PrismicDOM.RichText.asHtml(this.file.file_text) : '';
    },
    methods: {
        displayForm(){
            this.form = true;
        },
        async checkForm(e){
            e.preventDefault();

            const self = this;

            if (self.email) {
                if(validator.isEmail(self.email)){
                    self.$axios.$post('/api/contact', 'email='+self.email+'&title='+self.file.file_title[0].text)
                        .then(res => res.json())
                        .catch(error => {
                            self.formError = error.response ? "Désolé, un problème est survenu!" : "Bien envoyé! La ressource vous sera envoyée par mail :)";
                        });
                }else{
                    self.formError = "L'adresse email semble invalide..."; 
                }
            }else{
                self.formError = "L'adresse email est requise!";
            }
        }
    }
};
</script>

<style lang='scss' scoped>
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

form{
    display: none;
    align-items: center;
    &.on{
        display: flex;
    }
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
        top: 2px;
        left: 0;
    }
}
svg{
    fill: currentColor;
}

.ok{
    padding: 9px 10px 8px;
    font-family: $league;
    font-size: 1.1rem;
    white-space: nowrap;
    border-radius: 5px;
    background: $primary;
    &:hover, &:focus{
        background: #fff;
        color: $primary;
    }
    svg{
        margin: -4px 0 0 3px;
    }
}

.error{
    margin: 10px 0 0;
    font-size: 1.2rem;
    color: $primary;
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
