
import API from '@/service/APIClient';


export default {
    /*index (search) {
        return API().get('songs', {
            params: {
              search: search
            }
        });
    },*/

    getAllPosts (infos) {
       
        return API().get('posts', infos )
    },

    getOnePost (infos) {
        return API().get('posts/:id', infos)
    },

    postOne (data) {
        return API().post('posts', data)
    },
}
