<template>
    <div class='contact'>
        <aside class='contact-sidebar'>
            <div v-if='content.contact_img' class='contact_img'>
                <div><img :src='content.contact_img.url' :alt='content.contact_img.alt'/></div>
            </div>
            <a v-if='content.contact_email' :href='"mailto:"+content.contact_email'>{{content.contact_email}}</a>
        </aside>
        <div>
            <h2>{{content.form_title[0].text}}</h2>
            <div v-if='text' v-html='text'/>
                <form method='post' action='/api/contact' @submit='checkForm'>
                    <div>
                        <label for='name'>Votre nom*</label>
                        <input type='text' name='name' id='name' v-model='name' required/>
                    </div>
                    <div>
                        <label for='email'>Votre email*</label>
                        <input type='email' name='email' id='email' v-model='email' required/>
                    </div>
                    <div>
                        <label for='object'>Sujet</label>
                        <input type='text' name='object' id='object' v-model='object'/>
                    </div>
                    <div>
                        <label for='message'>Votre message</label>
                        <textarea name='message' id='message' v-model='message'></textarea>
                    </div>
                    <div>
                        <input type='checkbox' name='rgpd' id='rgpd' value='1' v-model='rgpd'/>
                        <label for='rgpd'>J'accepte que les informations saisies soient utilisées exclusivement dans le cadre de ma demande et de la relation commerciale personnalisée qui peut en découler (par e-mail et/ou par téléphone)</label>
                    </div>
                    <div class='button'>
                        <button type='submit' name='submit'>Envoyer</button>
                    </div>
                </form>
                <p v-if='formError' class='error'>{{formError}}</p>
            </div>
        </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import validator from 'validator';

export default {
    props: {
        content: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            text: '',
            formError: '',
            email: '',
            name: '',
            object: '',
            message: '',
            rgpd: ''
        };
    },
    created() {
        this.text = this.content.form_text ? PrismicDOM.RichText.asHtml(this.content.form_text) : '';
    },
    methods: {
        async checkForm(e){
            e.preventDefault();

            const self = this;

            if (!self.name){
                self.formError = "Le nom est requis!";
                return;
            }

            if (!self.email){
                self.formError = "L'adresse email est requise!";
                return;
            }

            if(!validator.isEmail(self.email)){
               self.formError = "L'adresse email semble invalide..."; 
               return;
            }

            if (!self.rgpd){
                self.formError = "Vous devez accepter les conditions d'utilisation!";
                return;
            }

            self.$axios.$post('/api/contact', 'email='+self.email+'&name='+self.name+'&object='+self.object+'&message='+self.message+'&rgpd='+self.rgpd)
                .then(res => {
                    console.log(res);
                    self.formError = "Bien envoyé! Nous répondons à votre message dans les plus brefs délais :)";
                }, err => {
                    console.log(err);
                    self.formError = "Désolé, un problème est survenu! Veulliez réessayer plus tard.";
                });
        }
    }
};
</script>

<style lang='scss' scoped>
@import "./assets/scss/abstracts/_variables.scss";

.contact{
    display: flex;
    justify-content: space-between;
}
.contact-sidebar {
    text-align: center;
    h2 {
        margin: 0;
        font-size: 2.1rem;
    }
    a {
        font-weight: 600;
        font-style: normal;
    }
}
.contact_img {
    display: inline-block;
    padding: 20px;
    margin: 0 0 30px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.1);
    > div {
        border: 5px solid #fff;
        border-radius: 50%;
        overflow: hidden;
    }
}
</style>
