<template>
  <div class='nav'>
    <img class="imgLogoBlack" src="@/assets/icon-left-font-monochrome-black.svg" alt="logo en noir et blanc de Groupomania">
    <div class="search">
    <font-awesome-icon class="icon-search" icon="search" />
    <input class="searchBarre" type="text">  
    </div>
    
    <ul>
        <li><router-link 
        :to="{
            name: 'Home',
            params: { userId }}">
            Accueil</router-link></li>
        <li><router-link 
        :to="{
            name: 'Profile',
            params: { userId }}">
            Profile</router-link></li>
        <li><router-link @click.native="logout" 
        :to="{
            name: 'LogIn'}">
            Déconnexion</router-link></li>
    </ul>
  </div>
</template>

<script>

export default {
    name: 'Menu',

    data(){
        return{
            userId: localStorage.getItem('userID'),
        }
    },
    
    methods: {
        logout(){
           localStorage.clear();
        }
    }

}
</script>

<style>
    .nav{
        display: flex;
        justify-content: space-around;
        padding-bottom: 10px;
        border-bottom: 2px solid black;

        font-family: 'Montserrat', sans-serif;
    }

    .imgLogoBlack{
        width: 20%;
        margin-top: 36px;
        margin-left: 41px;
    }

    .search{
        position: relative;
        width: 33%;
        margin: 42px 0 0 21px;
    }

    .searchBarre{
        width: 100%;
        height: 20px;

        background-color: rgba(229, 115, 115, 0.17);
        border: solid 2px rgba(229, 115, 115);
        border-radius: 10px;
    }
    .icon-search{
        position: absolute;
        padding: 5px 0 0 10px;
    }

    ul{
        width: 33%;
        margin: 42px 51px 0 0;
    }

    ul > li{
        list-style: none;
        display: inline;
        margin-left: 36px;

        font-size: 24px;
        font-weight: 700;
    }
    
</style>