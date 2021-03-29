<template>
  <div class="createPost">

    <div class="blocImg">
        <img class="imgProfile" :src="userData.imageURL" alt="icon du profile"> 
    </div>

    <div class="bloc-create">
        <form enctype="multipart/form-data" @submit.prevent="onSubmitPost">
            <div class="contenu">
                <textarea v-model="postData.contenu"   rows="5" cols="50" placeholder='Text...'></textarea>
            </div>  
            <div id="previewFile">
                <img v-if="showImage" id="imagePreview" class="image-preview" src="" alt="pré-visualisation du fichier" />
            </div>
            <div class="footer">
                <button
                    aria-label="Intégrer un fichier"
                    class="btn-file"
                    @click="chooseFile"
                    type="button"
                >
                    <font-awesome-icon class="icon-trash" icon="images" />
                </button>
                <input 
    
                    class="inputFile"
                    type="file" 
                    ref="file" 
                    name="multimedia"
                    @change="onSelectFile" 
                >
                <div class="btnPublier">
                    <button  type="submit">Publier</button>
                </div>
            </div>                 
        </form>
    </div>

      
      <!--<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>-->
  </div>
</template>


<script>


export default {
    nom: 'CreatePost',

    data () {
        return {
            postData:{
                date_publication:'',
                contenu: '',
                fileURL: null,
                input: null,
            
            },
            userData: JSON.parse(localStorage.getItem('userData')),

            message: '',
            showImage: false
        }
    },

    methods: {
        onSelectFile (event) {
            this.postData.fileURL = event.target.files[0];
            
            const file =event.target.files[0];
            if(file){
                const reader = new FileReader();
                reader.addEventListener('load', function (){
                    let imagePreview = document.getElementById('imagePreview'); 
                    imagePreview.setAttribute("src", this.result);
                
                });
                reader.readAsDataURL(file)
                this.showImage = true;
            } else {
                this.showImage = false;
            }
            
        },
        chooseFile () {
            this.$refs.file.click()
        },
        previewFile(){
            
        },

      async onSubmitPost () {
            const userId = localStorage.getItem('userID');
            const formData = new FormData();
         
            formData.append('contenu', this.postData.contenu);
            formData.append('userId', userId);
            formData.append('multimedia', this.postData.fileURL);
            /*for(let fd of formData.entries()){
                console.log(fd[0] + ' , ' + fd[1])
            }*/
            try {
                this.$store.dispatch('createPosts', formData)
                
            } catch (error) {
                console.log(error);
                this.message = 'Something get wrong with formData'
            }
        }
    }
}
</script>

<style lang='scss'>
    .createPost {
        display: flex;
        
        border-radius: 13px;
        border: 2px solid black;
        
    }

    .blocImg{

        width: 10%;
        margin: 10px 0 0 10px;
        .imgProfile{
            width: 100%; 
            margin: 0px;
        }
    }
    .bloc-create{
        width: 80%;
    }
    
    .contenu{
        width:85%;
        height: 90%;
        font-size: 15px;

        textarea{
            width: 100%;
            height: 70%;

            margin: 10px 0 0 15px;
            border: none;
        }
    
    }
        .image-preview{
        width: 100%;
    }

    .footer{
        display: flex;
        justify-content: space-between;

        
       .btn-file{
            background-color: white;
            border:none;

        }
        .inputFile {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
        } 

        .btnPublier{

        width: 25%;
        display: flex;
        align-items: flex-end;

        button {

            width: 80%;

            margin: 0 0 10px 10%;
            padding: 10px 15px 10px 15px;

            background: linear-gradient(270deg, rgb(229, 115, 115) 30%, rgba(229, 115, 115, 0.3));
            border-radius: 10px;
            border: none;
        }
    }
    

    }
    
</style>