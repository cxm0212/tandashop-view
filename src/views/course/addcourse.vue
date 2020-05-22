<template>
  <a-form-model id="form" v-bind="formItemLayout" :model="form" :rules="rules" ref="courseForm">
   <a-row :gutter="8">
  <a-col class="gutter-row" :xs="12" :sm="12" :md="10" :lg="6" :xl="6">
        <div class="gutter-box">
          <a-form-model-item label="课程编号" >
            {{courseId}}
          </a-form-model-item>
        </div>
      </a-col>
   </a-row>
    <a-row :gutter="8">
      <a-col class="gutter-row" :xs="12" :sm="12" :md="10" :lg="6" :xl="6">
        <div class="gutter-box">
          <a-form-model-item label="课程类别" has-feedback prop="categoryId">
            <a-select :options="categortoptions" v-model="form.categoryId" placeholder="选择课程分类！" >
              <!-- <a-select-option :value="1">自然文学</a-select-option>
              <a-select-option :value="2">科技</a-select-option> -->
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
      <a-col class="gutter-row" :span="24" style="text-align:center">
        <div class="gutter-box">
          <a-form-model-item>
            <a-button type="primary" @click="submitForm">保存</a-button>
          </a-form-model-item>
        </div>
      </a-col>
    </a-row>
     <a-divider />
    <a-row v-if="courseId>0">
    <a-row :gutter="8">
      <a-col class="gutter-row" :span="20">
        <div class="gutter-box">
          <a-form-model-item label="课程缩略图">
            <UploadImageOne ref="img0" :courseId="courseId" type="img_0"/>
          </a-form-model-item>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col class="gutter-row" :span="24">
        <div class="gutter-box">
          <a-form-model-item label="课程轮播图">
            <LoopImages ref="img1" :courseId="courseId" type="img_1"/>
          </a-form-model-item>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col class="gutter-row" :span="8">
        <div class="gutter-box">
          <a-form-model-item label="课程详情图">
            <UploadImageOne ref="img2" :courseId="courseId" type="img_2"/>
          </a-form-model-item>
        </div>
      </a-col>

      <a-col class="gutter-row" :span="8">
        <div class="gutter-box">
          <a-form-model-item label="课程大纲图">
            <UploadImageOne ref="img3" :courseId="courseId" type="img_3"/>
          </a-form-model-item>
        </div>
      </a-col>

      <a-col class="gutter-row" :span="8">
        <div class="gutter-box">
          <a-form-model-item label="课程须知图">
            <UploadImageOne ref="img4" :courseId="courseId" type="img_4"/>
          </a-form-model-item>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col class="gutter-row" :span="8">
        <div class="gutter-box">
          <a-form-model-item label="课程试看视频">
            <UploadVideo ref="img5" :courseId="courseId" type="img_5"/>
          </a-form-model-item>
        </div>
      </a-col>

      <a-col class="gutter-row" :span="8">
        <div class="gutter-box">
          <a-form-model-item label="课程完整视频">
            <UploadVideo ref="img6" :courseId="courseId" type="img_6"/>
          </a-form-model-item>
        </div>
      </a-col>
    </a-row>
    </a-row>
  </a-form-model>
</template>

<script>
import UploadImageOne from "./uploadImageOne";
import UploadVideo from "./uploadVideo";
import LoopImages from "./courseLoopImages";
import axios from "axios";
import httpApi from "../../api/http";

export default {
  name: "addCourse",
  components: {
    LoopImages,
    UploadImageOne,
    UploadVideo
  },
  props:['courseId'],
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
        isline: "1",
        price: "",
        ishot: "1",
        minAge: "",
        maxAge: "",
        isgroup: "0",
        groupPrice: "0.1",
        groupNum: "2"
      },
      rules: {
        categoryId: [{ required: true, message: "课程分类不能为空!" }],
        title: [{ required: true, message: "课程标题为空！" }],
        desc: [{ required: true, message: "课程描述为空！" }],
        price: [{ required: true, message: "价格为空！" }]
      },
      categortoptions:[],
    };
  },
  methods: {  
    submitForm() {
      this.$refs.courseForm.validate(validate => {
        if (!validate) {
          return;
        }
        let params = this.form;
        params["id"] = this.courseId;
        axios
          .post(httpApi.addCourseUrl, params)
          .then(result => {
            // console.log(result.data);
            let datas = result.data;
            this.$message.success(datas.message);
            if (datas.code == 2001) {
              this.courseId = datas.data.id;
            }
          })
          .catch(err => {
            console.log(err);
          });
        return;
      });
    },
    async getFileList(){
      // console.log(this.courseId)
      if(this.courseId<=0 || this.courseId=="" || this.courseId==null){
        return
      }
      await axios.post(httpApi.getFileListUrl,{'courseId':this.courseId}).then((result) => {
        let datas = result.data;
        // console.log(datas)
        if(datas[0]!=null){
          this.$refs.img0.imageUrl = datas[0].url;
          this.$refs.img0.curImgId = datas[0].id;
        }
        datas[1].forEach(item => {
          this.$refs.img1.fileUidRealId[item.uid]=item.id;
        });
        this.$refs.img1.fileList = datas[1];
        if(datas[2]!=null){
          this.$refs.img2.imageUrl = datas[2].url;
          this.$refs.img2.curImgId = datas[2].id;
        }
        if(datas[3]!=null){
          this.$refs.img3.imageUrl = datas[3].url;
          this.$refs.img3.curImgId = datas[3].id;
        }
        if(datas[4]!=null){
          this.$refs.img4.imageUrl = datas[4].url;
          this.$refs.img4.curImgId = datas[4].id;
        }
        if(datas[5]!=null){
          this.$refs.img5.imageUrl = datas[5].url;
          this.$refs.img5.curImgId = datas[5].id;
        }
        if(datas[6]!=null){
          this.$refs.img6.imageUrl = datas[6].url;
          this.$refs.img6.curImgId = datas[6].id;
        }
      });
    },
    getCourseByid(){
      if(this.courseId<=0 || this.courseId=="" || this.courseId==null){
        return
      }
       axios.post(httpApi.getCourseListUrl,{'courseId':this.courseId,type:'update'}).then((result) => {
        let datas = result.data;
        this.form = datas.data[0];
        this.form.ishot = Number(this.form.ishot);
        this.form.isline = Number(this.form.isline);
        this.form.isgroup = Number(this.form.isgroup);
      });
    },
    getCategorys(){
        axios.post(httpApi.getCategoryListUrl,{}).then((result) => {
            // console.log(result.data);
            
            let arr = result.data.data;
            arr.forEach((item) => {
              let option={};
              option['value'] = item.id;
              option['title'] = item.categoryName;
              this.categortoptions[this.categortoptions .length] = option
            })
          // console.log(this.categortoptions)
        }).catch((err) => {
            console.log(err)
        });
    }
  },
  mounted() {
    // 等待整个视图都渲染完毕再加载
    this.$nextTick(function () {
      this.getFileList();
      this.getCategorys();
      this.getCourseByid();
    })
},
 
  // computed:{
  //   courseId:function(){
        // this.$refs.img1.courseId = this.courseId;
        // this.$refs.imgList.courseId = this.courseId;
        // this.$refs.img2.courseId = this.courseId;
        // this.$refs.img3.courseId = this.courseId;
        // this.$refs.img4.courseId = this.courseId;
        // this.$refs.video1.courseId = this.courseId;
        // this.$refs.video2.courseId = this.courseId;
  //   }

  // }
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