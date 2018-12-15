import axios from 'axios'
const baseUrl = '/api/login'

const login = async (props) => {
    const response = await axios.post(baseUrl, props)
    return response.data
}

export default {login}