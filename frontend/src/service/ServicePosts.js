
import API from '@/service/APIClient';


export default {

    getAllPosts (infos) {
       
        return API().get('posts', infos )
    },

    getOnePost (id) {
        
        return API().get('posts/:id', id)
    },

    createOnePost (data) {
        return API().post('posts', data )
    },

    deleteOnePost(id){
        return API().delete('posts/:id', { data: { id_post: id } })
    },
    getUserPosts(userId){
        return API().get('auth/'+ userId )             
    }
}
