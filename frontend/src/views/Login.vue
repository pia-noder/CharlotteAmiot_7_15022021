<template>
  <div class="connection">
    <img class="logo-connexion" src="@/assets/icon-above-font.svg" alt="logo Groupomania">

    <div class="bloc-connexion">

        <span class="message-error">{{messageErreur}}</span>

        <form class="bloc-logIn" @submit.prevent="onSubmitLogIn" novalidate >

            <input v-model="email"  type="email" placeholder="email" @blur="$v.email.$touch()">
            <div class="div" v-if="$v.email.$error">
                <p v-if="!$v.email.required">Remplir le champ</p>
                <p v-if="!$v.email.email">Rentrer une addresse email valide</p>
            </div>

            <input v-model="password" type="password" placeholder="mot de passe" @blur="$v.password.$touch()">
            <div v-if="$v.password.$error">
                <p class="errorDisplay" v-if="!$v.password.required">Remplir le champ</p>
                <p class="errorDisplay" v-if="!$v.password.minLength || !$v.password.maxLength"> Rentrer votre mot de passe </p>
            </div>
            
            <a href="#">Mot de passe oublié ?</a>
           
            <BtnConnection class="btn-connection" :disabled="$v.$invalid" title="connexion"></BtnConnection>
            
            

           
        </form>
        <router-link :to="{name: 'SignUp'}">
            <BtnConnection  class="btn-connection" title="Inscrivez-vous"></BtnConnection>
         </router-link>
    </div>  

  </div>

</template>
<script>
import serviceAuth from '@/service/ServiceAuthentification'
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
             messageErreur:null,

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
          await  serviceAuth.login({
                email: this.email,
                password: this.password
            })
            .then(response => {
                    localStorage.setItem('userToken', response.data.token)
                    localStorage.setItem('userID', response.data.userId)
                    localStorage.setItem('userStatus', response.data.status)
                    const userId = localStorage.getItem('userID');

                    this.$router.push({
                        name: 'Home', 
                        params: { userId } 
                        });
                
            })
            .catch(error => {
                console.log(error)
                this.messageErreur = 'Adresse e-mail ou mot de passe incorrect.'
            })
      
        },
    }
}
</script>

<style lang="scss" >
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap');

.connection{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


    font-family: 'Montserrat', sans-serif;
    
    .logo-connexion{
        width: 42%; 
    }
    .bloc-connexion{
        .message-error{
            color: #74c69d;
            font-weight: bold;
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
        .btn-connection{
            text-align: center;
        }
    }
    .btntoSignBloc{
        background-color: #E57373;
        border-radius: 20px;
    }
}





</style>