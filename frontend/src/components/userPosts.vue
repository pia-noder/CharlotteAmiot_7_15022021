<template>
    <div class="userPostBloc">
        
        <div class="post-header">
            <img v-if="user[0].imageURL" class="user-image" :src="user[0].imageURL" alt="photo de profile">
            <p>{{ post.username }}</p>
            <p class="publishedDate">{{ moment(post.date_publication).fromNow() }}</p>
            <BtnEdit
                :post="post"
                :isAdmin="userStatus == 'Admin'"
                :isUser="userID == post.id_user"
            />
        </div>

        <div class="post-content">
            {{ post.contenu }} <br/>
            <img v-if="post.fileURL" class="imgContenu" :src="post.fileURL" alt="image envoyé par l'utilisateur">
        </div>

        <div class="post-footer">
            <span class="icon-comment"><font-awesome-icon @click="displayComments()" :icon="['fas', 'comment-dots']" /></span>
            <span class="icon-heart" :class="[isLiked ? 'changeColor' : '']" @click="onLikePost()"><font-awesome-icon  icon="heart" /><p v-if="post.likes">{{post.likes}}</p></span>
        </div> 
        <CommentsList v-if="this.commentsAreVisible" 
            :post="post.id" 
            :user="user"
        />

    </div>
</template>

<script>

//import ServicePosts from '@/service/ServicePosts'
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

    created (){
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

       async LikeStatus(post){

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

                    await ServicePosts.likePost(this.post.id, post)

                }else{
                    this.post.likes += 1;
                    this.isLiked = true;
                    const post = {"likes" : this.post.likes,
                        "id_user" : userId};
                    await ServicePosts.likePost(this.post.id, post);
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
    .userPostBloc{
        border: 2px solid #E57373;
        border-radius: 13px;

        .post-header{
            display: flex;
            justify-content: space-between;
            min-height: 20px;
            margin: 19px 30px 0 19px;

            .user-image{
                width: 40px;
                height: 40px;
                margin-right: 5%;
                border-radius: 100%;
            }

            .icon-dots{
                cursor: pointer;
            }
            
        }
        .post-content{
            margin: 10px 28px 0 10%;

            .imgContenu{
                width: 100%;
            }
        }
        .post-footer{
            margin: 10px 28px 22px 10%;

            .icon-heart{
                cursor: pointer;
                margin-left: 20px;
                
                p{
                    display: inline;
                    margin-left: 5px;
                }
            }
            .changeColor{
                color:crimson;
            }
        }
    }
@media (max-width: 400px){
    .userPostBloc{
        border: 2px solid #E57373;
        border-radius: 13px;

        .post-header{
            display: flex;
            justify-content: space-between;
            min-height: 20px;
            margin: 19px 30px 0 19px;

            .user-image{
                width: 20px;
                margin-right: 5%;
                border-radius: 100%;
            }
            .publishedDate{
                display:none;
            }
            .icon-dots{
                cursor: pointer;
            }
            
        }
}
}
</style>