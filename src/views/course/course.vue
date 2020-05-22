<template>
  <div>
    <div>
      <a-card
        style="width:100%"
        :tab-list="tabListNoTitle"
        :active-tab-key="noTitleKey"
        @tabChange="key => onTabChange(key, 'noTitleKey')"
      >
        <p v-if="noTitleKey === 'courselist'">
          <a-table :columns="columns" :data-source="data" size="middle" bordered @customRow="updateRow(record)">
            <span slot="action" slot-scope="record">
              <a @click="updateRow(record)">修改</a>
              <a-divider type="vertical" />
              <a-popconfirm
                title="确定删除"
                @confirm="() => onDeleteRow(record)"
              >
                <a href="javascript:;">下架</a>
              </a-popconfirm>
            </span>
          </a-table>
        </p>
        <p v-else-if="noTitleKey === 'addcourse'">
          <AddCourse ref="addcourse" :courseId="updateCourseId"/>
        </p>
        <p v-else-if="noTitleKey==='coursecategory'"> 
          <CourseCategory />
        </p>
      </a-card>
    </div>
  </div>
</template>
<script>
import AddCourse from './addcourse';
import CourseCategory from './courseCategory';
import httpApi from '../../api/http';
import axios from 'axios';


const columns = [
  {
    title: "课程编号",
    dataIndex: "id",
    key: "id",
    width:80,
  },
  {
    title: "课程类别",
    dataIndex: "categorydesc",
    key: "categorydesc",
  },
  {
    title: "课程标题",
    dataIndex: "title",
    key: "title",
    ellipsis: true
  },
  {
    title: "课程描述",
    dataIndex: "desc",
    key: "desc",
    ellipsis: true
  },
  {
    title: "原价",
    dataIndex: "price",
    key: "price"
  },
  {
    title: "是否上架",
    dataIndex: "isline",
    key: "isline"
  },
  {
    title: "是否上推荐",
    dataIndex: "ishot",
    key: "ishot"
  },
  {
    title: "适用最小年龄",
    dataIndex: "minAge",
    key: "minAge"
  },
  {
    title: "适用最大年龄",
    dataIndex: "maxAge",
    key: "maxAge"
  },
  {
    title: "团购价",
    dataIndex: "groupPrice",
    key: "groupPrice"
  },
  {
    title: "团购人数",
    dataIndex: "groupNum",
    key: "groupNum"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];


export default {
  components:{
    AddCourse,
    CourseCategory,
  },
  data() {
    return {
      data:[],
      columns,
      noTitleKey: "courselist",
      updateCourseId:null,
      tabListNoTitle: [
        {
          key: "courselist",
          tab: "所有课程"
        },
        {
          key: "addcourse",
          tab: "添加/修改课程"
        },
        {
          key: "coursecategory",
          tab: "课程类别"
        }
      ],

    };
  },
  methods: {
    onTabChange(key, type) {
      this[type] = key;
      this.updateCourseId = null;
    },
    getCourseList(){
      axios.post(httpApi.getCourseListUrl,{}).then((result) => {
        let datas = result.data;
        // console.log(datas)
        this.data = datas.data;

      }).catch((err) => {
        console.log(err)
      });

    },
    updateRow(record){
      // console.log(record);
      this.noTitleKey="addcourse";
      this.updateCourseId = record.id;
    },
    onDeleteRow(record){
      axios.post(httpApi.deleteCourseUrl,{id:record.id}).then((result) => {
        this.$message.success(result.data.message);
        this.getCourseList();
      }).catch((err) => {
        console.log(err)
      });
    }
  },
  created(){
    this.getCourseList();
  },
  
  
};
</script>

