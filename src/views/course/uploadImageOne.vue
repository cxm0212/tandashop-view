<template>
  <span>{{courseId}} ####{{curImgId}}
    <a-upload
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :showUploadList="false"
      :beforeUpload="beforeUpload"
      @change="handleChange"
    >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">上传图片</div>
      </div>
    </a-upload>
  </span>
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
      uploadUrl: httpApi.uploadfileUrl,
      file:null,
      curImgId:-1,
    };
  },
  methods: {
    handleChange(info) {
      this.file = info.file;
      console.log("修改文件--------------")
      console.log(this.file)
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
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("非图片文件!");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("图片大小应小于2MB!");
        return false;
      }
      // return isJpgOrPng && isLt2M;

        
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
.avatar-uploader > .ant-upload{
  width: 128px;
  height: 128px;
}
.avatar-uploader > .ant-upload img {
  width: 86px;
  height: 86px;
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