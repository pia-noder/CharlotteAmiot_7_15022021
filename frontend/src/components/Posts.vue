<template>
    <panel title="Posts récemment publiés">
        <div class="postBloc" v-for="(post, index) in posts" :key="index" :class="{ active: index === activeItem}">
            <div class="post-header">
                <img class="user-image" :src="post.imageURL" alt="photo de profile">
                <p>{{ post.username }}</p>
                <p>{{ post.date_publication }}</p>
                <span @click="displayOptions(index)" class="icon-dots"><font-awesome-icon  :icon="['fas', 'ellipsis-h']" /></span>
                <DisplayOption class="displayOption" v-bind:class="{ displayNone: isActive }"></DisplayOption>
            </div>
            <div class="post-content">
                {{ post.contenu }} <br/>
                <img class="imgContenu" :src="post.fileURL" alt="image envoyé par l'utilisateur">
            </div>
            <div class="post-footer">
                <span class="icon-comment"><font-awesome-icon :icon="['fas', 'comment-dots']" /></span>
                <span class="icon-search-heart"><font-awesome-icon  icon="heart" /></span>
            </div> 
            
        </div>
    </panel>
</template>

<script>
import Panel from '@/components/PanelPost.vue'
import ServicePosts from '@/service/ServicePosts'
import DisplayOption from '@/components/DisplayOption'

export default {
    components: {
        Panel,
        DisplayOption

    },

    data () {
        return {
            posts: [],
        }
    },
    async created (){
        await this.prepareDynamicList()
    },
    /*async mounted () {
        const response = await ServicePosts.getAllPosts();
        console.log(response.data)
        this.posts = response.data
    },*/
    methods: {
        displayOptions(index){
          this.isActive = index
               /*if(this.isActive){
                    this.isActive = false
                } else{
                 this.isActive = true
            } */
           
        },
       async prepareDynamicList(){
    /**
     * Our list could be from an API call or anywhere,
     * For sake of brevity we've decided to declare it here.  
    **/
    let list = await ServicePosts.getAllPosts();
    console.log(list.data)
    list.data.forEach(element => {
      this.posts.push({...element, visible: false});
    });
  }
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
            .displayOption{
                position: absolute;
                right: -150px;
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
            margin: 10px 28px 22px 19px;
        }
    }
</style>