<template>
    
    <div class="postBloc" >
        <div class="post-header">
            <div class="header-left">
                <img class="user-image"  :src="post.imageURL" alt="photo de profile">
                <p>{{ post.username }}</p>
                <p class="publishedDate">{{ moment(post.date_publication).fromNow() }}</p>  
            </div>
                

            <BtnEdit
                :post="post"
                :isAdmin="userStatus == 'admin'"
                :isUser="userID == post.id_user"
            />


        </div>

        <div class="post-content">
            {{ post.contenu }} <br/>
            <img v-if="post.fileURL" class="imgContenu" :src="post.fileURL" alt="image envoyé par l'utilisateur">
        </div>

        <div class="post-footer">
            <span class="icon-comment"><font-awesome-icon @click="displayComments(post)" :icon="['fas', 'comment-dots']" /></span>
            <span class="icon-heart" :class="[isLiked ? 'changeColor' : '']" @click="onLikePost()"><font-awesome-icon  icon="heart" /><p v-if="post.likes">{{post.likes}}</p></span>
        </div> 
        
        <CommentsList v-if="this.commentsAreVisible" 
            :post="post.id" 
            :user="user"
        />
            
    </div>

</template>

<script>

import ServicePosts from '@/service/ServicePosts'

import CommentsList from '@/components/CommentsList.vue'
import BtnEdit from '@/components/BtnEdit'


export default {
    components: {
        CommentsList,
        BtnEdit,

    },
    props:['post', 'user'],
    data () {
        return {
            userStatus: localStorage.getItem('userStatus'),
            userID: localStorage.getItem('userID'),
            commentsAreVisible: false,
            isLiked: false,
        }
    },
    async created (){
        this.LikeStatus(this.post);     
    },


    methods: {
        displayComments(){
            if(this.commentsAreVisible == true){
                this.commentsAreVisible = false
            } else {
                this.commentsAreVisible = true
            }
        },

        LikeStatus(post){
                const postInfosObj = {
                    "id_user" : this.userID
                }

                const getLikesStatut =  ServicePosts.likesStatusInfo(post.id, postInfosObj);
               
                getLikesStatut.then((response) => {
                    if(response.data && response.data.length > 0){
                    this.isLiked = true;
                    }  
                });
           
        },

       async onLikePost(){
           const userId = JSON.parse(localStorage.getItem('userID'));
            
            if(!this.isLiked){

                if(this.post.likes === (null || NaN)){
                    this.post.likes = 1;
                    this.post.isLiked = true;

                    const post = {"likes" : this.post.likes,
                        "id_user" : userId};

                    await ServicePosts.likePost(this.post.id, post);

                }else{
                    this.post.likes += 1;
                    this.isLiked = true;
                    const post = {"likes" : this.post.likes,
                        "id_user" : userId};
                    await ServicePosts.likePost(this.post.id, post)
                }
                   

            } else {
                this.post.likes -= 1;
                
                const post = {"likes" : this.post.likes,
                        "id_user" : userId};
                await ServicePosts.dislikePost(this.post.id, post)
                
                this.isLiked = false;
            }
            
        },  
    },
   
}
</script>

<style lang="scss" >
    .postBloc{
        margin-top: 13px;
        border: 2px solid #E57373;
        border-radius: 13px;

        .post-header{
            display: flex;
            justify-content: space-between;
            margin: 10px 30px 0 10px;
            
            .header-left{
                display: flex;
                width: 50%;
                justify-content: space-between;
                .user-image{
                    width: 40px;
                    height: 40px;
                    margin-right: 5%;
                    border-radius:100%;
                } 
                .publishedDate{
                    padding-top: 4px;
                    font-size: 0.7em;
                    font-weight: 300;
                }
            }
            
            .icon-dots{
                cursor: pointer;
            }
            
            .displayNone{
                display: none;
            }
            
            
        }
        .post-content{
            margin: 10px 28px 0 10%;

            .imgContenu{
                width: 80%;
                margin-top: 30px;
            }
        }
        .post-footer{
            margin: 10px 28px 10px ;

            .icon-heart{
                cursor: pointer;
                
                p{
                    display: inline;
                    margin-left: 5px;
                }
            }
            .changeColor{
                color:crimson;
            }
            .icon-comment{
                margin:0 25px 0 7%;
                cursor: pointer;
                p{
                    display: inline;
                    margin: 0 15px 0 5px;
                }
            }
        }
    }
@media (max-width:900px){
    .postBloc{
        
        .post-header{

            .header-left{
                
                width: 70%;
 
                .publishedDate{
                    font-size: 0.7em;
                    font-weight: 300;
                }
            }
        }
    }      
}
@media (max-width: 400px){
    .postBloc{
        margin-top: 13px;
        border: 2px solid #E57373;
        border-radius: 13px;
        font-size: 0.7em;

        .post-header{

            position: relative;
            
        }
        .post-content{
            margin: 10px 28px 0 10%;

            .imgContenu{
                width: 100%;
                margin-top: 30px;
            }
        }
    }
    
}
</style>