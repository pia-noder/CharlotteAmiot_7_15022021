<template>
  <div>
    <div  v-for="comment in comments" :key="comment.comments_id">
    <Comment :comment="comment" :post="post" />
    </div>

    <button
      v-if="count.count > 1"
      @click="getAllComments(post)"
    >
      <span v-if="count.count > 1">Afficher {{ count.count - 1 }} autres commentaires</span>
      <span v-else>Afficher {{ count.count - 1 }} autre commentaire</span>
    </button>

    <CreateComments :post="post" />
  </div>
</template>

<script>

import CreateComments from '@/components/CreateComments'
import ServiceComments from '@/service/ServiceComments'
import Comment from '@/components/Comment'


export default {
name: 'CommentsList',
  components: {
    CreateComments,
    Comment,
  },
  props:['post', 'comments', 'count'],

  data () {
        return {
            postIncommentsList:this.post,
            
            
            allCommentsDisplayed: false,
        }
    },

  methods:{
    
    async getAllComments(id_post){
      let response = await ServiceComments.getAllComments(id_post);
      console.log(response)
      this.comments = response.data;
    }
  }
}

</script>

<style>

</style>