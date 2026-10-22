import axios from 'axios'

//API 서버의 기본 URL 지정
// VITE_API_URL- Render가 제공하는 API 주소
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
})

export default api; 