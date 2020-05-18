<template>
     <a-upload
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              
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
     
    };
  },
  methods: {
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
 
  }
};
</script>

<style scoped>
.avatar-uploader > .ant-upload video {
  width: 300px;
  height: 260px;
  
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