const regionUrl = "http://127.0.0.1:8000";
const httpApi = {
    loginUrl:regionUrl+'/login/',
    getCodeUrl:regionUrl+'/login/getcode',
    addCategoryUrl:regionUrl+'/category/addcategory',
    getCategoryListUrl:regionUrl+'/category/getcategorys',
    updateCategoryUrl:regionUrl+'/category/updatecategory',
    addCourseUrl:regionUrl+'/course/addcourse',
    getCourseListUrl:regionUrl+'/course/getcourselist',
    uploadfileUrl:regionUrl+'/file/uploadfile',
    removeFileUrl:regionUrl+'/file/removefile',
    getFileListUrl:regionUrl+'/file/getfilelist',
    deleteCourseUrl:regionUrl+'/course/deletecourse',
    deleteCategoryUrl:regionUrl+'/category/deletecategory',
    baseUrl:{
        apiUrl: process.env.VUE_APP_URL,
        webSocketUrl: process.env.VUE_APP_SOCKET_URL
    }
}

export default httpApi