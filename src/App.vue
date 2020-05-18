<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script>

import zhCN from 'ant-design-vue/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

export default {
  name: "App",
  components: {},
  data() {
    return {
      zhCN,
      local:zhCN
    };
  }
};
</script>

<style>
</style>
