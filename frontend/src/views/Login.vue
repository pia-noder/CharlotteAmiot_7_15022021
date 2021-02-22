<template>
  <div class="connection">
    <img class="logo-connexion" src="@/assets/icon-above-font.svg" alt="logo Groupomania">

    <div class="bloc-connexion">
        <form class="bloc-logIn" @submit.prevent="onSubmitLogIn" novalidate >
            <input v-model="email"  type="text" placeholder="email" @blur="$v.email.$touch()">
            <div class="div" v-if="$v.email.$error">
                <p v-if="!$v.email.required">Remplir bleu le champ</p>
                <p v-if="!$v.email.email">Rentrer une addresse email valide</p>
            </div>
            <input v-model="password" type="text" placeholder="mot de passe" @blur="$v.password.$touch()">
            <div v-if="$v.password.$error">
                <p class="errorDisplay" v-if="!$v.password.required">Remplir le champ</p>
                <p class="errorDisplay" v-if="!$v.password.minLength || !$v.password.maxLength"> Rentrer entre 8 et 50 caractères</p>
            </div>
            <a href="#">Mot de passe oublié ?</a>

            <button :disabled="$v.$invalid">Connexion</button>
        </form>
        <router-link to="/SignUp"> <button class="btntoSignBloc">Incrivez-vous</button></router-link>
    </div>    
  </div>
</template>
<script>

import {
        required,
        email,
        minLength,
        maxLength
        
    } from "vuelidate/lib/validators";

export default {
    name: 'logIn',
    data() {
        return {
             email: '',
             password:'',

        }
    },
     validations: {
   
        email: { 
            required, 
            email 
        }, // Matches this.contact.email
        password: {
            required, 
            minLength: minLength (8),
            maxLength: maxLength(50)
        }
    },
    methods: {
        onSubmitLogIn () {
            this.$v.$touch();
            if(!this.$v.$invalid)[
                fetch('http://localhost:3000')
                .then(response => console.log(response))
                .catch(error => console.log(error))
            ]
        }
    }
}
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap');

.logo-connexion{
    width: 42%;
}
.connection{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-family: 'Montserrat', sans-serif;
}
.bloc-logIn, .bloc-SignIn{
    display: flex;
    flex-direction: column;

    padding: 48px 35px 61px 35px;
    border: solid 2px #E57373;
    border-radius: 27px;
}

.bloc-logIn input{
    font-size: 16px;
    background-color: #DDDCDC;
    margin: 20px 0;
    border: none;
    padding: 19px 22px
}

.bloc-SignIn input{
    font-size: 16px;
    background-color: #DDDCDC;
    margin: 5px 0;
    border: none;
    padding: 19px 22px
}

a{
    text-decoration: none;
    color: black;
    font-size: 15px;
    margin: 20px 0 32px 0;
}

.btnValider{
    margin-top: 20px;
}

p{
    font-weight: 700;
}


.btntoSignBloc{
    margin-top: 48px;
    background-color: #E57373;
    width: 100%;
}

button {
        background: linear-gradient(270deg, rgba(229, 115, 155) 30%, rgba(229, 115, 155, 0.3));
        font-size: 24px;
        padding: 20px 47px;
        border-radius: 27px;
        border:none;
    }
</style>