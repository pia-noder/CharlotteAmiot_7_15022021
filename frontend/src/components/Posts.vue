<template>
    
        <div class="postBloc" >
            <div class="post-header">
                <img class="user-image" :src="post.imageURL" alt="photo de profile">
                <p>{{ post.username }}</p>
                <p>{{ post.date_publication }}</p>

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
                <span class="icon-comment"><font-awesome-icon @click="displayComments(post)" :icon="['fas', 'comment-dots']" /><p>{{ }}</p></span>
                <span class="icon-heart" :class="[isLiked ? 'changeColor' : '']" @click="onLikePost(index)"><font-awesome-icon  icon="heart" /><p v-if="post.likes">{{post.likes}}</p></span>
            </div> 
            <CommentsList v-if="post.commentsAreVisible" 
            :post="post.id_post" 
            :comments="post.comment"
            />
            
        </div>

</template>

<script>

import CommentsList from '@/components/CommentsList.vue'
import ServicePosts from '@/service/ServicePosts'
//import ServiceComments from '@/service/ServiceComments'
import BtnEdit from '@/components/BtnEdit'


export default {
    components: {
        CommentsList,
        BtnEdit,

    },
    props:['post'],
    data () {
        return {
            //posts: [],
            userStatus: localStorage.getItem('userStatus'),
            userID: localStorage.getItem('userID'),
            isLiked: false,
        }
    },
    async created (){
        await this.LikeStatus(this.post);
        
        //await this.getOneOfAllComments(this.$vnode.index);
    },
 

    methods: {

        async LikeStatus(post){
            const userData = JSON.parse(localStorage.getItem('userData'));

            //Récupérer isLiked pour pouvoir le modifier
            
                    
                const postInfosObj = {
                    "id_user" : userData.id
                }

                const getLikesStatut =  ServicePosts.likesStatusInfo(post.id_post, postInfosObj);
               
                getLikesStatut.then((response) => {
                     console.log(response)
                    if(response.data && response.data.length > 0){
                    this.isLiked = true;
                    }  
                });
           
        },

        /*async getOneOfAllComments() {
            
            this.posts.forEach( post => {
                const getFistComment = ServiceComments.getOneOfAllComments(post.id_post);

                getFistComment.then((response) => {
                    
                    post.comment = response.data[0];
                    post.count = response.data[1][0]
                })
            })
        },*/

       async onLikePost(index){
           const userData = JSON.parse(localStorage.getItem('userData'));
            
            if(!this.isLiked){

                if(this.posts[index].likes === (null || NaN)){
                    this.posts[index].likes = 1;
                    this.posts[index].isLiked = true;

                    const post = {"likes" : this.posts[index].likes,
                        "id_user" : userData.id};

                    await ServicePosts.likePost(this.posts[index].id_post, post)

                }else{
                     this.posts[index].likes += 1;
                    this.posts[index].isLiked = true;
                    const post = {"likes" : this.posts[index].likes,
                        "id_user" : userData.id};
                    await ServicePosts.likePost(this.posts[index].id_post, post)
                }
                   

            } else {
                this.posts[index].likes = this.posts.likes -= 1;
                if(isNaN(this.posts[index].likes)){
                    this.posts[index].likes = 0
                    const post = {"likes" : this.posts[index].likes,
                        "id_user" : userData.id};
                    await ServicePosts.dislikePost(this.posts[index].id_post, post)
                }
                this.posts[index].isLiked = false;
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
            margin: 19px 30px 0 19px;
            position: relative;
            .user-image{
                width: 5%;
                margin-right: 5%
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
                width: 100%;
            }
        }
        .post-footer{
            margin: 10px 28px 22px ;

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
</style>