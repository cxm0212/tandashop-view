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
          <a-table :columns="columns" :data-source="data">
            <a slot="name" slot-scope="text">{{ text }}</a>
          </a-table>
        </p>
        <p v-else-if="noTitleKey === 'addcourse'">
          <AddCourse></AddCourse> 
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

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: 80
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address 1",
    ellipsis: true
  },
  {
    title: "Long Column Long Column Long Column",
    dataIndex: "address",
    key: "address 2",
    ellipsis: true
  },
  {
    title: "Long Column Long Column",
    dataIndex: "address",
    key: "address 3",
    ellipsis: true
  },
  {
    title: "Long Column",
    dataIndex: "address",
    key: "address 4",
    ellipsis: true
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 2 Lake Park, London No. 2 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];

export default {
  components:{
    AddCourse,
    CourseCategory,
  },
  data() {
    return {
      data,
      columns,

      noTitleKey: "addcourse",
      tabListNoTitle: [
        {
          key: "courselist",
          tab: "所有课程"
        },
        {
          key: "addcourse",
          tab: "添加课程"
        },
        {
          key: "coursecategory",
          tab: "课程类别"
        }
      ]
    };
  },
  methods: {
    onTabChange(key, type) {
      this[type] = key;
    }
  }
};
</script>