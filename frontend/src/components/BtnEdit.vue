<template>
  <div class="BtnEdit">
    <span v-if=" isAdmin || isUser "  @click="toggleVisible" class="icon-dots"><font-awesome-icon  :icon="['fas', 'ellipsis-h']" /></span>
    <DisplayOption v-if="isVisible"
    @delete-post="deletePost(post.id_post)" />

  </div>
</template>

<script>
//import ServicePosts from '@/service/ServicePosts'

import DisplayOption from '@/components/DisplayOption.vue'

export default {
    nom: 'BtnEdit',

    components:{
        DisplayOption
    },
    props:[ 'post', 'isAdmin', 'isUser', ],

    data(){
        return{
            isVisible: false,
        }
    },

    methods:{
        toggleVisible(){
             if(this.isVisible == true){
                this.isVisible = false
            } else {
                this.isVisible = true
            }
        },

        async deletePost(id_post){
            this.$store.dispatch('deletePost', id_post)
            //await ServicePosts.deleteOnePost(id);
            
        },
    },
}
</script>

<style>

</style>