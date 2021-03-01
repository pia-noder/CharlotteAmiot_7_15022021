<template>
  <div class="connection">
    <img class="logo-connexion" src="@/assets/icon-above-font.svg" alt="logo Groupomania">

    <div class="bloc-connexion">
        
        <form class="bloc-logIn" @submit.prevent="onSubmitLogIn" novalidate >

            <input v-model="email"  type="email" placeholder="email" @blur="$v.email.$touch()">
            <div class="div" v-if="$v.email.$error">
                <p v-if="!$v.email.required">Remplir le champ</p>
                <p v-if="!$v.email.email">Rentrer une addresse email valide</p>
            </div>

            <input v-model="password" type="password" placeholder="mot de passe" @blur="$v.password.$touch()">
            <div v-if="$v.password.$error">
                <p class="errorDisplay" v-if="!$v.password.required">Remplir le champ</p>
                <p class="errorDisplay" v-if="!$v.password.minLength || !$v.password.maxLength"> Rentrer entre 8 et 50 caractères</p>
            </div>
            
            <a href="#">Mot de passe oublié ?</a>

            <BtnConnection :disabled="$v.$invalid" title="connexion"></BtnConnection>

           
        </form>
        <router-link to="/SignUp">
            <BtnConnection title="Inscrivez-vous"></BtnConnection>
         </router-link>
    </div>  

  </div>

</template>
<script>

import {
        required,
        email,
        minLength,
        maxLength
        
    } from "vuelidate/lib/validators"

import BtnConnection from '@/components/BtnConnection.vue'


export default {
    name: 'logIn',

    components: {
        BtnConnection,
    },
    
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
        }, 
        password: {
            required, 
            minLength: minLength (8),
            maxLength: maxLength(50)
        }
    },
    methods: {
        async onSubmitLogIn () {
            //Appel de l'endpoint register auquel on passe email & password
         /* const response = await  ServiceAuthentification.login({
                email: this.email,
                password: this.password
            });
            console.log(response.data)*/
            console.log("envoie du formulaire login correctement déclenché")
        },
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



p{
    font-weight: 700;
}


.btntoSignBloc{

    background-color: #E57373;
    border-radius: 20px;

}

</style>