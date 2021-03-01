//DCréation d'une nouvelle instance d'axios
//Configuration de l'URL de l'API du serveur = connecteur au backend

import axios from 'axios';

export default () => {
    return axios.create({
        baseURL: `http://localhost:3000/`,
    });
};