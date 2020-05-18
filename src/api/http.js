const regionUrl = "http://127.0.0.1:8000";
const httpApi = {
    loginUrl:regionUrl+'/login/',
    getCodeUrl:regionUrl+'/login/getcode',
    addCategoryUrl:regionUrl+'/course/addcategory',
    getCategoryListUrl:regionUrl+'/course/getcategorys',
    baseUrl:{
        apiUrl: process.env.VUE_APP_URL,
        webSocketUrl: process.env.VUE_APP_SOCKET_URL
    }
}

export default httpApi