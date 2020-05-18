<template>
  <a-layout id="layout">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :default-selected-keys="['course']"
          :default-open-keys="['sub2']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-menu-item key="1">
            <a-icon type="shopping-cart" />订单管理
          </a-menu-item>
          <a-menu-item key="course" @click="findCourse">
            <a-icon type="book" />课程管理
          </a-menu-item>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="appstore" />
              <span>Navigation Two</span>
            </span>
            <a-menu-item key="9">Option 9</a-menu-item>
            <a-menu-item key="10">Option 10</a-menu-item>
            <a-sub-menu key="sub3" title="Submenu">
              <a-menu-item key="11">Option 11</a-menu-item>
              <a-menu-item key="12">Option 12</a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
            <!-- 组件会在 `currentTabComponent` 改变时改变 -->
            <component v-bind:is="currentComponent"></component>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import CourseCopmonent from '../course/course';
export default {
  data() {
    return {
      collapsed: false,
      currentComponent:CourseCopmonent,
    };
  },
  methods:{
      findCourse(item, key, keyPath) {
          console.log(item,key,keyPath)
      }
  }
};
</script>

<style>
#layout {
  height: 100%;
  min-height: 800px;
}
#layout .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>