<template>
    <div class='nav'>
        <div class="bloc-top-part">
            <img id="imgLogoBlack" class="imgLogoBlack" src="@/assets/icon-left-font-monochrome-black.svg" alt="logo en noir et blanc de Groupomania">
            <div class="search">
                <font-awesome-icon class="icon-search" icon="search" />
                <input aria-label="Faire une recherche" class="searchBarre" type="text">  
            </div>
        </div>
        <ul>
            <li>
                <a href=""
                aria-label="Aller vers page d'accueil" 
                title="Accueil" >
                    <router-link 
                    :to="{
                        name: 'Home',
                        params: { userId }}">
                        <font-awesome-icon class="icon fa-lg" icon="home" />
                    </router-link>
                </a></li>

            <li><a href="#"
                aria-label="Lien vers page du profile" 
                title="Profile utilisateur">
                <router-link 
                :to="{
                    name: 'Profile',
                    params: { userId }}">
                    <font-awesome-icon class="icon fa-lg" icon="user-circle" />
                </router-link>
            </a></li>
            <li><a href=""
      aria-label="Notifications" 
      title="Notification">
        <router-link class="link" 
      :to="{
            name: 'Notifications',
            params: { userId }}">
        <font-awesome-icon class="icon fa-lg" icon="bell" />
        </router-link>   
      </a></li>
            <li><a href="" 
        aria-label="Newpaper" 
        title="Newpaper">
           <router-link class="link"  
      
      :to="{
            name: 'Newsletter',
            }">
        <font-awesome-icon class="icon fa-lg" icon="newspaper" />
        </router-link> 
        </a></li>
        <li><a href=""
                aria-label="Déconnexion" 
                title="déconnexion">
                <router-link @click.native="logout" 
            :to="{
                name: 'LogIn'}">
                <font-awesome-icon class="icon fa-lg" icon="sign-out-alt" /></router-link>
            </a></li>
            
     
        
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

<style lang="scss">
    .nav{
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        width: 100vw;
        justify-content: space-between;
        padding: 20px 0 10px 0;
        border-bottom: 2px solid black;
        min-height: 5vh;
        background-color: white;
        z-index: 10;

        font-family: 'Montserrat', sans-serif;
        .bloc-top-part{
            display: flex;
            align-items: center;
            width: 45%;

            .imgLogoBlack{
                width: 50%;
                margin-left: 5%;
            }
            .search{
                position: relative;
                width: 35%;
                margin: 0 0 0 21px;

                .searchBarre{
                    width: 100%;
                    height: 20px;

                    background-color: rgba(229, 115, 115, 0.17);
                    border: solid 2px rgb(229, 115, 115);
                    border-radius: 10px;
                }
                .icon-search{
                    position: absolute;
                    padding: 5px 0 0 10px;
                }
            }  
        }
    }

    ul{
        width: 35%;
        margin: 20px 2% 0 0;
    }

    ul > li{
        list-style: none;
        display: inline;
        margin-left: 36px;
        
        .icon{
            &:hover{
                color: #d00000;
            }
        }    
    }
@media (min-width: 400px) and (max-width: 900px) {
    .nav{
        display: flex;
        flex-direction: column;
        text-align: center;
        .bloc-top-part{
            display: flex;
            align-items: center;
            width: 100%;
            .imgLogoBlack{
                width: 30%;
                margin-left: 5%;
            }
            .search{
                position: relative;
                width: 50%;
            }
        }
        ul{
        width: 100%;
        margin: auto;
        }
        ul > li{
            margin: auto;
            margin-left: 20px;

            font-size: 2em;
            font-weight: 700;
        }
    }
}
@media (max-width: 400px) {
    .nav{
        display: flex;
        flex-direction: column;
        text-align: center;
        .bloc-top-part{
            display: flex;
            width: 100%;
            .imgLogoBlack{
                width:70%;
                margin: auto;
            }
            .search{
                display: none;
            }
        }
        ul{
        width: 100%;
        margin: auto;
        }
        ul > li{
            margin: auto;
            margin-left: 20px;

            font-size: 2em;
            font-weight: 700;
        }
    }
}
</style>