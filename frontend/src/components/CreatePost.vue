<template>
  <div class="createPost">

      <div class="blocImg">
        <img class="imgProfile" :src="userData.imageURL" alt="icon du profile"> 
      </div>

      <form enctype="multipart/form-data" @submit.prevent="onSubmitPost">
        <div class="contenu">
                <textarea v-model="postData.contenu"   rows="5" cols="50" placeholder='Text...'></textarea>
                
                
                <input 
                class="inputFile"
                type="file" 
                id="file"
                ref="file" 
                name="multimedia"
                @change="onSelectFile" 
                >
                <label for="file">Choisir un fichier</label>
                <h5>{{ message }}</h5>
                
        </div>
        <div class="btnPublier">
            <button  type="submit">Publier</button>
        </div>
      </form>
      <!--<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>-->
  </div>
</template>


<script>
//import ServicePosts from '@/service/ServicePosts.js'

export default {
    nom: 'CreatePost',

    data () {
        return {
            postData:{
                date_publication:'',
                contenu: '',
                fileURL: null
            },
            userData: JSON.parse(localStorage.getItem('userData')),

            message: ''
            
        }
    },

    methods: {
        onSelectFile (event) {
            this.postData.fileURL = event.target.files[0];
        },

      async onSubmitPost () {
            const userId = localStorage.getItem('userID');
            //console.log(this.postData.fileURL);
            const formData = new FormData();
         
            formData.append('contenu', this.postData.contenu);
            formData.append('userId', userId);
            formData.append('multimedia', this.postData.fileURL);
            /*for(let fd of formData.entries()){
                console.log(fd[0] + ' , ' + fd[1])
            }*/
            try {
                this.$store.dispatch('createPosts', formData)
                /*await ServicePosts.createOnePost(formData)
                this.message = 'formData Uploaded !!!'
                this.$emit('rerenderComponent')*/
                
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
        .inputFile {
            width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
        }
        .inputFile + label {
    font-size: 1.25em;
    font-weight: 700;
    color: white;
    background-color: rgb(229, 115, 115);
    display: inline-block;
    cursor: pointer;
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