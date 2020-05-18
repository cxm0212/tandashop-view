<template>
  <a-form-model id="form" v-bind="formItemLayout" :model="form" :rules="rules" ref="courseForm">
    <a-row :gutter="8">
      <a-col class="gutter-row" :xs="12" :sm="12" :md="10" :lg="6" :xl="6">
        <div class="gutter-box">
          <a-form-model-item label="课程类别" has-feedback prop="categoryId">
            <a-select v-model="form.categoryId" placeholder="选择课程分类！">
              <a-select-option value="1">自然文学</a-select-option>
              <a-select-option value="2">科技</a-select-option>
            </a-select>
          </a-form-model-item>
        </div>
      </a-col>
      <a-col class="gutter-row" :xs="12" :sm="12" :md="10" :lg="6" :xl="6">
        <div class="gutter-box">
          <a-form-model-item label="课程标题" prop="title">
            <a-input v-model="form.title" />
          </a-form-model-item>
        </div>
      </a-col>
      <a-col class="gutter-row" :xs="12" :sm="12" :md="10" :lg="6" :xl="6">
        <div class="gutter-box">
          <a-form-model-item label="课程描述" prop="desc">
            <a-textarea :auto-size="{ minRows: 1, maxRows: 5 }" v-model="form.desc" />
          </a-form-model-item>
        </div>
      </a-col>
      <a-col class="gutter-row" :xs="12" :sm="12" :md="10" :lg="6" :xl="6">
        <div class="gutter-box">
          <a-form-model-item label="是否上架">
            <a-radio-group name="isline" v-model="form.isline">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col class="gutter-row" :xs="12" :sm="12" :md="10" :lg="8" :xl="6">
        <div class="gutter-box">
          <a-form-model-item label="原价" prop="price">
            <a-input-number
              :min="0.01"
              :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              v-model="form.price"
            />
          </a-form-model-item>
        </div>
      </a-col>
      <a-col class="gutter-row" :xs="12" :sm="12" :md="10" :lg="8" :xl="6">
        <div class="gutter-box">
          <a-form-model-item label="是否上推荐">
            <a-radio-group name="ishot" v-model="form.ishot">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </div>
      </a-col>
      <a-col class="gutter-row" :xs="12" :sm="12" :md="10" :lg="8" :xl="6">
        <div class="gutter-box">
          <a-form-model-item label="适用最小年龄">
            <a-input-number :min="0" v-model="form.minAge" />
          </a-form-model-item>
        </div>
      </a-col>
      <a-col class="gutter-row" :xs="12" :sm="12" :md="10" :lg="8" :xl="6">
        <div class="gutter-box">
          <a-form-model-item label="适用最大年龄">
            <a-input-number :min="1" v-model="form.maxAge" />
          </a-form-model-item>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col class="gutter-row" :xs="12" :sm="12" :md="10" :lg="6" :xl="6">
        <div class="gutter-box">
          <a-form-model-item label="是否拼团">
            <a-radio-group name="isgroup" v-model="form.isgroup">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </div>
      </a-col>

      <a-col class="gutter-row" :xs="12" :sm="12" :md="10" :lg="6" :xl="6" v-if="form.isgroup===1">
        <div class="gutter-box">
          <a-form-model-item label="拼团价格">
            <a-input-number :min="0.01" v-model="form.groupPrice" />
          </a-form-model-item>
        </div>
      </a-col>
      <a-col class="gutter-row" :xs="12" :sm="12" :md="10" :lg="6" :xl="6" v-if="form.isgroup===1">
        <div class="gutter-box">
          <a-form-model-item label="拼团人数">
            <a-input-number :min="2" v-model="form.groupNum" />
          </a-form-model-item>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col class="gutter-row" :span="20">
        <div class="gutter-box">
          <a-form-model-item label="课程缩略图">
            <UploadImageOne ref="img1"/>
          </a-form-model-item>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col class="gutter-row" :span="24">
        <div class="gutter-box">
          <a-form-model-item label="课程轮播图">
            <LoopImages ref="imgList"/>
          </a-form-model-item>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col class="gutter-row" :span="8">
        <div class="gutter-box">
          <a-form-model-item label="课程详情图">
            <UploadImageOne />
          </a-form-model-item>
        </div>
      </a-col>

      <a-col class="gutter-row" :span="8">
        <div class="gutter-box">
          <a-form-model-item label="课程大纲图">
            <UploadImageOne />
          </a-form-model-item>
        </div>
      </a-col>

      <a-col class="gutter-row" :span="8">
        <div class="gutter-box">
          <a-form-model-item label="课程须知图">
            <UploadImageOne />
            
          </a-form-model-item>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col class="gutter-row" :span="8">
        <div class="gutter-box">
          <a-form-model-item label="课程试看视频">
            <UploadVideo />
          </a-form-model-item>
        </div>
      </a-col>

      <a-col class="gutter-row" :span="8">
        <div class="gutter-box">
          <a-form-model-item label="课程完整视频">
            <UploadVideo />
          </a-form-model-item>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col class="gutter-row" :span="24" style="text-align:center">
        <div class="gutter-box">
          <a-form-model-item>
            <a-button type="primary" @click="submitForm">保存</a-button>
          </a-form-model-item>
        </div>
      </a-col>
    </a-row>
  </a-form-model>
</template>

<script>
import UploadImageOne from "./uploadImageOne";
import UploadVideo from "./uploadVideo";
import LoopImages from "./courseLoopImages";
import axios from 'axios';

export default {
  name: "addCourse",
  components: {
    LoopImages,
    UploadImageOne,
    UploadVideo
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      form: {
        categoryId: "",
        title: "",
        desc: "",
        isline: 1,
        price: "",
        ishot: 1,
        minAge: "",
        maxAge: "",
        isgroup: 0,
        groupProce: "",
        groupNum: ""
      },
      rules: {
        categoryId: [{ required: true, message: "课程分类不能为空!" }],
        title: [{ required: true, message: "课程标题为空！" }],
        desc: [{ required: true, message: "课程描述为空！" }],
        price: [{ required: true, message: "价格为空！" }],
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.courseForm.validate(validate => {
        if(!validate){
          return;
        }        

        let img1 =this.$refs.img1.file;
        let imgList =this.$refs.imgList.fileList;
        
        this.form.imgList = imgList;
        this.form.img1 = img1;
        console.log(this.form)
        axios.post("",this.form).then((result) => {
          console.log(result.data)
          let datas = result.data;
          if(datas.status==2000){
            this.$message.success(datas.msg);
          }

        }).catch((err) => {
          console.log(err);
        });
        return;
      });
    }
  }
};
</script>

<style>
#form .dropbox {
  height: 180px;
  line-height: 1.5;
}
.ant-col .ant-col-6 {
  width: auto;
}
</style>