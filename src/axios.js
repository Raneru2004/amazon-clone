import axios from 'axios'

const instance = axios.create({
    // THE API (cloud formation) URL
    baseURL: 'https://us-central1-twitter-clone-38c00.cloudfunctions.net/api'
    // 'http://127.0.0.1:5001/twitter-clone-38c00/us-central1/api'

})

export default instance