<template>
     <a-upload
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              :beforeUpload="beforeUpload"
              
              @change="handleChange"
            >
              <video v-if="imageUrl" :src="imageUrl" alt="avatar"  autoplay controls/>
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">上传视频</div>
              </div>
            </a-upload>
</template>

<script>
import httpApi from '../../api/http';
import axios from 'axios';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
 props:['courseId','type'],
  data() {
    return {   
      loading: false,
      imageUrl: "",
      file:{},
      curImgId:-1,
    };
  },
  methods: {
    handleChange(info) {
      this.file = info.file;
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      let formData = new FormData();
      formData.append("courseId",this.courseId);
      formData.append("type",this.type);
      formData.append("file",this.file);
      formData.append("curImgId",this.curImgId);

      axios.post(httpApi.uploadfileUrl,formData).then((result) => {
        let datas = result.data;
        this.curImgId = datas.id;
      });
    },
    beforeUpload(file){
      const isJpgOrPng =
        file.type === "video/mp4" || file.type === "video/avi";
      if (!isJpgOrPng) {
        this.$message.error("非视频文件!");
        return false;
      }
      

      getBase64(file, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      return false;
    }
  },
 
};
</script>

<style scoped>
.avatar-uploader > .ant-upload video {
  width: 200px;
  height: 160px;
  
}
.avatar-uploader > .ant-upload{
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>