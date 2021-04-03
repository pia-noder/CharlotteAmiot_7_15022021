<template>
  <div class="createPost">

    <div class="blocImg">
        <img class="user-image" :src="user[0].imageURL" alt="icon du profile"> 
    </div>

    <div class="bloc-create">
        <form enctype="multipart/form-data" @submit.prevent="onSubmitPost">
            <div class="contenu">
                <textarea v-model="postData.contenu"   rows="5" cols="50" placeholder='Text...'></textarea>
            </div>  
            <div id="previewFile">
                <img v-if="showImage" id="imagePreview" class="image-preview" src="" alt="pré-visualisation du fichier" />
            </div>
            <p v-if="message" class="">{{message}}</p>
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
    async beforeCreate() {
        this.$store.dispatch('loadUser', this.$route.params.userId );
    },

    data () {
        return {
            postData:{
                date_publication:'',
                contenu: '',
                fileURL: null,
            
            },
            message: '',
            showImage: false
        }
    },
    computed: {
        user() {
          return this.$store.state.user;
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

      async onSubmitPost () {
            const userId = localStorage.getItem('userID');
            if(this.postData.contenu || this.postData.fileURL){
                const formData = new FormData();
            
                formData.append('contenu', this.postData.contenu);
                formData.append('userId', userId);
                formData.append('multimedia', this.postData.fileURL);
                /*for(let fd of formData.entries()){
                    console.log(fd[0] + ' , ' + fd[1])
                }*/
                if(formData)
                try {
                    this.$store.dispatch('createPosts', formData)
                    this.$emit('close-modal');
                    this.postData.contenu = '';
                    this.postData.fileURL = '';
                    let imagePreview = document.getElementById('imagePreview'); 
                    imagePreview.setAttribute("src", '');
                    this.showImage = false;
                   
                    
                } catch (error) {
                    console.log(error);
                    this.message = 'Il y a un problème avec formData'
                }
            } else {
                alert('Veuillez rentrer des informations avant de publier un poste');
               
                     
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

        width: 15%;
        
        margin: 10px 0 0 10px;
        .user-image{
            width: 40px; 
            height: 40px;
            border-radius: 100%;
        }
    }
    .bloc-create{
        width: 100%;
        form{
            width: 100%;
        }
    }
    
    .contenu{
        width:85%;
        font-size: 15px;

        textarea{
            width: 100%;

            margin: 10px 0 0 0;
            border: none;
        }
    
    }
        .image-preview{
        width: 50%;
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

        width: 35%;
        display: flex;
        align-items: flex-end;

        button {

            width: 80%;

            margin: 0 0 10px 10%;
            padding: 10px 15px 10px 15px;

            background: linear-gradient(270deg, rgb(229, 115, 115) 30%, rgba(229, 115, 115, 0.3));
            border-radius: 10px;
            border: none;

            cursor: pointer;
        }
    }
}
@media (max-width:900px){
    .main{
        .bloc-post {
          width: 100%;
        }
        .footer{

            .btnPublier{

            width: 35%;
            display: flex;
            align-items: flex-end;

                button {

                    width: 70%;

                    margin: 0 0 10px 10%;
                    padding: 10px 15px 10px 15px;

                    background: linear-gradient(270deg, rgb(229, 115, 115) 30%, rgba(229, 115, 115, 0.3));
                    border-radius: 10px;
                    border: none;

                    cursor: pointer;
                }
            }
        }       
    }
}
@media (max-width: 450px){
    .footer{

        .btnPublier{

        width: 45%;
        display: flex;
        align-items: flex-end;

        button {

            width: 80%;

            margin: 0 0 10px 10%;
            padding: 10px 15px 10px 15px;

            background: linear-gradient(270deg, rgb(229, 115, 115) 30%, rgba(229, 115, 115, 0.3));
            border-radius: 10px;
            border: none;

            cursor: pointer;
        }
    }
    }
}
</style>