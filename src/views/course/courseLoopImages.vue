<template>
  <div class="clearfix">
    <a-upload
      :action="uploadUrl"
      list-type="picture-card"
      :file-list="fileList"
      @preview="handlePreview"
      :beforeUpload="beforeUpload"
      @change="handleChange"
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
// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }
function getBase64(img) {
  // const reader = new FileReader();
  // reader.addEventListener("load", () => callback(reader.result));
  // reader.readAsDataURL(img);
    const reader = new FileReader();
    // reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      uploadUrl:'',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        
        {
          uid: '-5',
          name: 'image.png',
          status: 'error',
        },
      ],
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
    handleChange({ fileList }) {
      this.fileList = fileList;
      console.log(this.fileList)
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