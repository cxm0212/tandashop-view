<template>
  <div class="clearfix">
    <a-upload
      list-type="picture-card"
      :file-list="fileList"
      @preview="handlePreview"
      :beforeUpload="beforeUpload"
      @change="handleChange"
      :remove="removeImg"
    >
      <div v-if="fileList.length < 58">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
import $ from 'jquery';
import httpApi from '../../api/http';
import axios from 'axios';

const fileUidRealId={};

function getBase64(img) {
  
    const reader = new FileReader();
    // reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  props:['courseId','type'],
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      fileUidRealId,
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({file,fileList}) {
      this.fileList = fileList;
      let formData = new FormData();
      formData.append("courseId",this.courseId);
      formData.append("type",this.type);
      formData.append("curImgId",-1);
      formData.append("file",file);
      // console.log(file);
      
      axios.post(httpApi.uploadfileUrl,formData).then((result) => {
        let datas = result.data;
        fileUidRealId[file.uid]= datas.id;
      });

    },
    async removeImg(file){
      let curImgId = fileUidRealId[file.uid];
      console.log(curImgId+"----移除图片---");
      console.log(file);
      let formData = new FormData();
      formData.append("courseId",this.courseId);
      formData.append("curImgId",curImgId);
      await axios.post(httpApi.removeFileUrl,formData);
      this.fileList.splice($.inArray(file,this.fileList),1)
      return false;
    },
   
    beforeUpload() {
      return false;
    }
  },
  
};
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>