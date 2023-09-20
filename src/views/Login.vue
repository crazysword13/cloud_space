<template>
  <div class="login">
    <div class="main">
      <div class="logoContainer">
        <div class="logo"><img src="../assets/logo.png" alt="" /></div>
        <div class="name">小邮盘</div>
      </div>
      
      <!-- <div
        class="mainBox"
        :class="activeName == 'first' ? '' : 'mainBoxRegistered'"
      > -->
      <div
        class="mainBox"
        :class="activeName == 'first' ? '' : 'first'"
      >
        <el-tabs
          v-model="activeName"
          type="card"
          @tab-click="handleClick"
          stretch
        >
          <el-tab-pane label="登录" name="first">
            <div class="loginInput">
              <el-form ref="form" :model="login" label-width="80px">
                <el-form-item>
                  <el-input
                    v-model="login.username"
                    placeholder="请输入用户昵称"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input
                    v-model="login.password"
                    type="password"
                    show-password
                    placeholder="请输入密码"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button type="primary" @click="onSubmit">登录</el-button> -->
                  <el-button type="primary" @click="testlogin">登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>

          <el-tab-pane label="注册" name="second">
            <!-- <div class="registeredInput"> -->
            <div class="loginInput">
              <el-form ref="form" :model="login" label-width="80px">
                <el-form-item>
                  <el-input
                    v-model="registered.username"
                    placeholder="请输入昵称"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input
                    v-model="registered.password"
                    placeholder="请输入密码"
                    type="password"
                    show-password
                  ></el-input>
                </el-form-item>
                
                <el-form-item>
                  <el-button type="primary" @click="clickRegistered"
                    >注册</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>

        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginIn, SignIn } from "../network/request.js";

export default {
  name: "Login",
  data() {
    return {
      login: {
        username: '',
        password: '',
      },
      registered: {
        username: "",
        password: "",
      },
      activeName: "first",
    };
  },
  methods: {
    //登录跳转测试（前端测试用）
    testlogin(){
      this.$router.push("/");
    },

    //   点击登录的回调
    async onSubmit() {
      let res = await LoginIn({
        username: this.login.username,
        password: this.login.password
      });
      console.log(res);
      if (res.status == 200 && res.data.msg == 'ok') {
        // 登陆成功
        // 将用户信息保存至vuex
        let user = JSON.stringify(res.data.data.user)
        this.$store.commit("userInfo", user);

        // 将返回的用户信息保存至localstorage中
        window.localStorage.setItem(
          "userInfo",
          user,
        );

        // 将token存入本地
        window.localStorage.setItem("token", res.data.data.token);

        //   跳转至主界面
        console.log(111)
        this.$router.push("/");
      } else if (res.status == 200 && res.data.msg != 'ok') {
        this.$message.warning("登录失败,账号或密码错误!");
      }
    },

    handleClick(e) {
      console.log(e.name);
    },

    // 获取验证码
    async getCode() {
      this.isCountDownShow = true;
      let res = await this.$request(
        `/edumsm/msm/send/${this.registered.mobile}`
      );
      console.log(res);
      if (res.data.success) {
        this.startCountDown();
      }
    },

    // 点击注册的回调
    async clickRegistered() {
      let res = await SignIn({
        username: this.registered.username,
        password: this.registered.password,
      });
      console.log(res);
      // 如果注册成功，清空所有数据并跳转至登录界面，自动填写手机号码
      if (res.data.msg == 'ok') {
        this.$message.success("注册成功!");
        this.login = this.registered;
        this.activeName = "first";
        this.registered = {
          username: "",
          password: "",
        };
      } else {
        this.$message.error("注册失败,请稍后重试!");
      }
    },
  },
};
</script>

<style scoped>
.login {
  background-color: #ecefff;
  height: 100vh;
}

.logoContainer {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: center;
}

.logo {
  width: 50px;
}

.logo img {
  width: 100%;
}

.name {
  color: #25262b;
  font-size: 20px;
  letter-spacing: 4px;
  font-weight: bold;
  margin-left: 7px;
}

.main {
  width: 350px;
  height: 400px;
  position: absolute;
  right: 10vw;
  top: 15vh;
}

.mainBox {
  width: 350px;
  background-color: #fff;
  height: 330px;
  border-radius: 10px;
  overflow: hidden;
}

.mainBoxRegistered {
  height: 430px;
}

.el-form /deep/ .el-form-item__content {
  margin: 0 !important;
  padding: 0 20px;
}

.el-input /deep/ input {
  border-radius: 10px;
}

.loginInput {
  margin-top: 20px;
}

.el-tabs /deep/ .is-active,
.el-tabs /deep/ div:hover {
  color: #595bb3;
}

.el-tabs /deep/ .is-active {
  background-color: #fff;
}

.el-tabs /deep/ .el-tabs__item {
  border: none !important;
  font-size: 18px;
  height: 50px;
  line-height: 50px;
}

.el-tabs /deep/ .el-tabs__nav {
  border: none;
}

.el-tabs /deep/ .el-tabs__nav-scroll {
  background-color: #f5f5f6;
}

.el-input /deep/ .el-input__inner {
  height: 48px;
  font-size: 15px;
}

.el-button {
  width: 100%;
  background-color: #6c6dbb;
  border: none;
  border-radius: 10px;
  margin-top: 10px;
  height: 45px;
  font-size: 15px;
}

.el-button:hover {
  background-color: #595bb3;
}

.codeContainer {
  position: relative;
}

.codeButtonContainer {
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
}

.getcode {
  background-color: #6c6dbb;
  color: white;
  height: 35px;
  margin: 0;
}

.countDown {
  color: rgb(141, 141, 141);
}
</style>

