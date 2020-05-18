<template>
  <div>
    <a-form
      id="form"
      :form="form"
      :label-col="{ span: 3 }"
      :wrapper-col="{ span: 12 }"
      @submit="addCategory"
    >
      <a-form-item label="分类名称">
        <a-col :span="12">
          <a-input v-decorator="['categoryName',{rules:[{required:true,message:'名称不能为空!'}]}]" />
        </a-col>
        <a-col :span="3" style="margin-left:15px;">
          <a-button type="primary" html-type="submit">添加</a-button>
        </a-col>
      </a-form-item>
    </a-form>

    <div>
      <a-table :columns="columns" :data-source="data" size="small" bordered>
        <span slot="action">
          <a>修改</a>
          <a-divider type="vertical" />
          <a>删除</a>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import httpApi from '../../api/http';
import axios from 'axios';

const columns = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
    align: "center"
  },
  {
    title: "类别名称",
    dataIndex: "categoryName",
    key: "categoryName",
    align: "center",
    width:'40%',
  },
  {
    title: "添加时间",
    dataIndex: "createTime",
    key: "createTime",
    align: "center"
  },
  {
    title: "修改时间",
    dataIndex: "updateTime",
    key: "updateTime",
    align: "center"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];
// const data = [
//   {
//     key: "1",
//     id: 1,
//     categoryName: "自然文化"
//   },
//   {
//     key: "2",
//     id: 2,
//     categoryName: "数学"
//   }
// ];
export default {
  data() {
    return {
      columns,
      data:[],
    };
  },
  created() {
    this.form = this.$form.createForm(this);
    this.getCategorys();
  },
  methods: {
    addCategory() {
      this.form.validateFields((error, params) => {
        if (!error) {
          console.log(params.categoryName);
          axios.post(httpApi.addCategoryUrl,params).then((result) => {
              console.log(result.data);
              let datas = result.data;
              if (datas.status == "2000") {
                this.$message.error(datas.msg);
              } else if (datas.status == "2001") {
                this.$message.success(datas.msg);
              }
          }).catch((err) => {
              console.log(err)
          });      
        }
      });
    },
    getCategorys(categoryId){
        axios.post(httpApi.getCategoryListUrl,{id:categoryId}).then((result) => {
            console.log(result.data);
            this.data = result.data;

        }).catch((err) => {
            console.log(err)
        });
    }
  }
};
</script>