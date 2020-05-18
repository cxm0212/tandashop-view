<template>
  <a-upload
    name="avatar"
    list-type="picture-card"
    class="avatar-uploader"
    :showUploadList="false"
    :action="uploadUrl"
    :beforeUpload="beforeUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">上传图片</div>
    </div>
  </a-upload>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  data() {
    return {
      loading: false,
      imageUrl: "",
      uploadUrl: "",
      file:{},
    };
  },
  methods: {
    // handleChange(info) {
    //   if (info.file.status === "uploading") {
    //     this.loading = true;
    //     return;
    //   }
    //   if (info.file.status === "done") {
    //     // Get this url from response in real world.
    //     getBase64(info.file.originFileObj, imageUrl => {
    //       this.imageUrl = imageUrl;
    //       this.loading = false;
    //     });
    //   }
    // },
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

        this.file = file;
      getBase64(file, imageUrl => {
        this.imageUrl = imageUrl;
        this.loading = false;
      });
      return false;
    }
  }
};
</script>

<style scoped>
.avatar-uploader > .ant-upload,
.avatar-uploader > .ant-upload img {
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