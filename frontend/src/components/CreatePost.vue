<template>
  <div class="createPost">

      <div class="blocImg">
        <img class="imgProfile" src="@/assets/profile-user.png" alt="icon du profile"> 
      </div>

      <form enctype="multipart/form-data" @submit.prevent="onSubmitPost" name="postData">
        <div class="contenu">
                <textarea v-model="contenu" name="story" rows="5" cols="50" placeholder='Text...'>
                
                </textarea>
                <input 
                type="file" 
                ref="file" 
                name="file"
                @change="onSelectFile" 
                >
                <h5>{{ message }}</h5>
                <div class="chooseFile">
                    <span class="icon-search-link"><font-awesome-icon  icon="link" /></span>
                    <span class="icon-search-heart"><font-awesome-icon  icon="heart" /></span>
                </div>
        </div>
        <div class="btnPublier">
            <button  type="submit">Publier</button>
        </div>
      </form>
      <!--<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>-->
  </div>
</template>


<script>
import ServicePosts from '@/service/ServicePosts.js'

export default {
    nom: 'CreatePost',

    data () {
        return {
            postData:{
                date_publication:'',
                contenu: '',
                fileURL: ''
            },

            message: ''
            
        }
    },

    methods: {
        onSelectFile () {
            this.postData.fileURL = this.$refs.file.files[0];
        },

      async onSubmitPost () {
            const formData = new FormData();
            formData.append('file', this.postData.fileURL);
            formData.append('contenu', this.postData.contenu);

            try {
                await ServicePosts.postOne(formData)
                this.message = 'formData Uploaded !!!'
                
            } catch (error) {
                console.log(error);
                this.message = 'Something get wrong with formData'
            }
        }
    }
}
</script>

<style lang='scss'>
    .createToPost {
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