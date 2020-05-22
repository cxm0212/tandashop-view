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
        <template v-for="col in ['categoryName']" :slot="col" slot-scope="text, record">
          <div :key="col">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <template v-else>{{ text }}</template>
          </div>
        </template>
        <template slot="action" slot-scope="text, record">
          <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => save(record.key)">保存</a>
              <a-divider type="vertical" />
                <a @click="cancel(record.key)">取消</a>
              <!-- <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
              </a-popconfirm> -->
            </span>
            <span v-else>
              <a :disabled="editingKey !== ''" @click="() => edit(record.key)">修改</a>
              <a-divider type="vertical" />
              <a-popconfirm
                title="确定删除"
                @confirm="() => onDeleteRow(record)"
              >
                <a href="javascript:;">删除</a>
              </a-popconfirm>
            </span>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import httpApi from "../../api/http";
import axios from "axios";

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
    width: "40%",
    scopedSlots: { customRender: "categoryName" }
  },
  // {
  //   title: "状态",
  //   dataIndex: "state",
  //   key: "state",
  //   align: "center",
  //   scopedSlots: { customRender: "state" }
  // },
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

export default {
  data() {
    return {
      columns,
      data: [],
      editingKey: ""
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
          // console.log(params.categoryName);
          axios
            .post(httpApi.addCategoryUrl, params)
            .then(result => {
              console.log(result.data);
              let datas = result.data;
              if (datas.code == "2000") {
                this.$message.error(datas.message);
              } else if (datas.code == "2001") {
                this.$message.success(datas.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
        return;
      });
    },
    getCategorys(categoryId) {
      axios
        .post(httpApi.getCategoryListUrl, { id: categoryId })
        .then(result => {
          console.log(result.data);
          this.data = result.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onDeleteRow(record){
      axios.post(httpApi.deleteCategoryUrl,{id:record.id}).then((result) => {
        this.$message.success(result.data.message);
        this.getCategorys();
      }).catch((err) => {
        console.log(err)
      });
    },
    // 表格操作
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      console.log(target);
      // if (target) {
      //   delete target.editable;
      //   this.data = newData;
      // }
      this.editingKey = "";
      axios.post(httpApi.updateCategoryUrl,target).then((result) => {
          let datas = result.data;
          console.log(datas)
          if(datas.code==2002){
            delete target.editable;
            this.data = newData;
            this.$message.success(datas.message);
          }
      });
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = "";
      if (target) {
        delete target.editable;
        this.data = newData;
      }
    }
  }
};
</script>