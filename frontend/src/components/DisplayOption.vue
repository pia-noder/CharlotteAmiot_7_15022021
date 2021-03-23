<template>
  <div class="displayOption">
      <div class="deleteOption" @click="deletePost(post)">
            <font-awesome-icon class="icon-trash" icon="trash-alt" />
            <p>Supprimer</p>
      </div>
      <div class="modifyOption" >
            <font-awesome-icon class="icon-exchange" icon="exchange-alt" />
            <p>Modifier</p>
      </div>
  </div>
</template>

<script>
//import ServicePosts from '@/service/ServicePosts'

export default {
    name: 'DisplayOption',
    props:  ['post'],
    
    methods:{
       deletePost(id_post){
           console.log('au niveau du displayOption');
           console.log(id_post);
            this.$emit('delete-post', id_post)
             
        },
        
    },
}
</script>

<style lang="scss" scoped>

    .displayOption{

        padding: 5px;
        box-shadow: 1px 2px 13px 5px rgba(0,0,0,0.45);

        .deleteOption, .modifyOption {
        display: flex;
        padding: 3px;
            &:hover{
                background-color:#caf0f8;
                cursor: pointer;
            }

            p{
                margin-left: 10px;
            }
        }
    }
    
</style>