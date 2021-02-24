<template>
  <div class="displayToPost">
      <div class="blocImg">
        <img class="imgProfile" src="@/assets/profile-user.png" alt="icon du profile"> 
      </div>
      
      <div class="contenu">
            <textarea id="story" name="story" rows="5" cols="50" placeholder='Text...'>
               
            </textarea>
            <div class="chooseFile">
                <span class="icon-search-images"><font-awesome-icon  icon="images" /></span>
                <span class="icon-search-video"><font-awesome-icon  icon="video" /></span>
                <span class="icon-search-link"><font-awesome-icon  icon="link" /></span>
                <span class="icon-search-heart"><font-awesome-icon  icon="heart" /></span>

            </div>
      </div>
      <div class="btnPublier">
        <DisplayOption></DisplayOption>
        <button @click="postPublication()">Publier</button>
      </div>
      <!--<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>-->
  </div>
  
</template>

<script>
import DisplayOption from '@/components/DisplayOption.vue'

export default {
    nom: 'DisplayToPost',
    components: {
        DisplayOption,
    },
    methods: {
        postPublication() {
            fetch('http://localhost:3000')
            .then(response => console.log(response))
            .catch(error => console.log(error))
        }
    }
}
</script>

<style lang='scss'>
    .displayToPost {
        border: 2px solid black;
        display: flex;
        height: 165px;
    }

    .blocImg{

        width: 15%;
        margin: 10px 0 0 10px;
        .imgProfile{
            width: 40%; 
            margin: 0px;
        }
    }
    
    .contenu{
        width:60%;
        height: 100%;

        font-size: 15px;

        textarea{
            width: 100%;
            height: 70%;

            margin-top: 20px;
            border: none;
        }
        .chooseFile{
            display: flex;
            width: 50%;
            .icon-search-link {
                margin-bottom: 20px;
            }
            .icon-search-images,.icon-search-video, .icon-search-heart, .icon-search-link{
                margin-left: 40px;
                cursor: pointer;
                
            }

            .icon-search-link{
                margin-left: 40px;
            }
           
        }
    }
    .btnPublier{

        width: 25%;
        display: flex;
        align-items: flex-end;

        button {

            width: 80%;

            margin: 0 0 10px 10%;
            padding: 10px 15px 10px 15px;

            border-radius: 13px;
            background: none;
           

            
            
        }

    }
    
</style>