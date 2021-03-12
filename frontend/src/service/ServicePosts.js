
import API from '@/service/APIClient';


export default {

    getAllPosts (infos) {
       
        return API().get('posts', infos )
    },

    getOnePost (id) {
        
        return API().get('posts/:id', id)
    },

    postOnePost (data) {
        return API().post('posts', data )
    },

    deleteOnePost(id){
        return API().delete('posts/:id', id)
    },
}
