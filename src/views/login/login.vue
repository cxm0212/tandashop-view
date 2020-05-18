<template>
  <a-layout class>
    <a-layout-content>
      <div class="form-header">
        <img src="../../assets/logo.png" />
        <label>后台管理</label>
      </div>
      <a-form  :form="form"  id="form-login" class="login-form center" @submit="handleSubmit"> 
        <a-form-item>
          <a-input 
            placeholder="登录名" 
            v-decorator="[
            'loginName',
            { rules: [{ required: true, message: 'Please input your username!' }] },
            ]"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input type="password"  placeholder="密码" name="loginPassword" v-decorator="[
          'loginPassword',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]">
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
            <a-input class="codeinput" placeholder="请输入验证码" name="codeInputValue" v-decorator="[
          'codeInputValue',
          { rules: [{ required: true, message: '验证码不能为空!'}] },
        ]">
            </a-input>
            <img :src="codeUrl" class="code">
        </a-form-item>
        <a-form-item>
          <a class="login-form-forgot" href>Forgot password</a>
          <a-button type="primary" html-type="submit" class="login-form-button">登陆</a-button>
        </a-form-item>
      </a-form>
    </a-layout-content>
    <a-layout-footer>公众号课程管理</a-layout-footer>
  </a-layout>
</template>

<script>
import axios from 'axios';
import httpApi from '../../api/http.js';
export default {
  name: "Login",
  data() {
    return {
        codeUrl:'../../assets/logo.png',
        codeText:'',
        
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
    
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
            if(this.codeText.toLowerCase()!==values.codeInputValue.toLowerCase()){
                this.$message.error('验证码错误!');
                this.getcode();
                return;
            }
            values.codeText = this.codeText;
            console.log('Received values of form: ', values);
            axios.post(httpApi.loginUrl,values).then((result) => {
                console.log(result)
                let datas = result.data;
                if(datas.status===1000){
                    this.$message.error(datas.msg);
                    this.getcode();
                    return;
                }
                this.$router.push({name:'home'})
            }).catch((err) => {
                console.log("登陆异常 : "+err)
            });
        }
      });
    },
    getcode(){
        axios.get(httpApi.getCodeUrl).then((result) => {
            this.codeUrl = result.data.code;
            this.codeText = result.data.codeText;
        }).catch((err) => {
            console.log(err)
        });
    }
  },
  mounted(){
      this.getcode();
      this.form.setFieldsValue({loginName:"admin",loginPassword:"admin"})
  },
}
</script>

<style scoped>
.center {
  text-align: center;
}
.ant-layout {
  font-family: Arial, "PingFang SC", "Microsoft YaHei";
}
.ant-layout-content {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login-bg.jpg") no-repeat fixed;
  background-size: cover;
  padding: 13% 34% 12% 34%;
}
.form-header label {
  font-size: 20px;
  font-weight: 600;
}
.form-header img {
  width: 30px;
  height: 30px;
}
.login-form {
  max-width: 400px;
  width: 400px;
  background: #ffffff;
  border: #e8e8ee solid 1px;
  border-radius: 4px;
  padding: 30px;
}
.login-form-forgot {
  float: right;
}
.login-form-button {
  width: 100%;
}
.login-form .codeinput{
    width:150px;
    float: left;
}
.login-form .code{
    width: 150px;
    height: 50px;
}
</style>