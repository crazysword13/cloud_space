<template>
  <div class="login">
    <div class="main">
      <div class="logoContainer">
        <div class="logo"><img src="../assets/logo.png" alt="" /></div>
        <div class="name">小邮盘</div>
      </div>
      
      <!-- <div
        class="mainBox"
        :class="activeName == 'first' || 'second'? '' : 'mainBoxRegistered'"
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
          <el-tab-pane label="密码登录" name="first">
            <div class="loginInput">
              <el-form ref="form" :model="login" label-width="80px">
                <el-form-item>
                  <el-input
                    v-model="login.email"
                    placeholder="请输入用户邮箱"
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
                  <el-button type="primary" @click="onSubmit_password">密码登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>

          <el-tab-pane label="邮箱登录" name="second">
            <div class="loginInput">
              <el-form ref="form" :model="login" label-width="80px">
                <el-form-item>
                  <el-input
                    v-model="login.email"
                    placeholder="请输入用户邮箱"
                  ></el-input>
                </el-form-item>

                <el-form-item class="codeContainer">
                  <el-input
                    v-model="login.a_code"
                    placeholder="请输入验证码"
                  ></el-input>
                  <div class="codeButtonContainer">
                    <el-button
                      size="mini"
                      class="getcode"
                      v-if="!isCountDownShow"
                      @click="getCode_login"
                      >获取验证码</el-button
                    >
                    <div class="countDown" v-else>{{ countDownSecond }} s</div>
                  </div>
                </el-form-item>

                <el-form-item>
                  <!-- <el-button type="primary" @click="onSubmit">登录</el-button> -->
                  <el-button type="primary" @click="onSubmit_email">邮箱登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>

          <el-tab-pane label="注册" name="third">
            <!-- <div class="registeredInput"> -->
            <div class="registeredInput">
              <el-form ref="form" :model="registered" label-width="80px">
                <el-form-item>
                  <el-input
                    v-model="registered.email"
                    placeholder="请输入邮箱"
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


                <el-form-item class="codeContainer">
                  <el-input
                    v-model="registered.a_code"
                    placeholder="请输入验证码"
                  ></el-input>
                  <div class="codeButtonContainer">
                    <el-button
                      size="mini"
                      class="getcode"
                      v-if="!isCountDownShow"
                      @click="getCode_register"
                      >获取验证码</el-button
                    >
                    <div class="countDown" v-else>{{ countDownSecond }} s</div>
                  </div>
                </el-form-item>


                <el-form-item>
                  <el-button type="primary" @click="clickRegistered"
                    >注册</el-button>
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
import { LoginIn, SignIn, RegEmail, LogEmail, LoginByEmail } from "../network/request.js";

// 倒计时名称
let timer;

export default {
  name: "Login",
  data() {
    return {
      login: {
        email: '',
        password: '',
        a_code:'',
      },
      registered: {
        email: "",
        password: "",
        a_code:"",
      },
      activeName: "first",

      // 倒计时秒数
      countDownSecond: 120,
      // 是否显示秒数
      isCountDownShow: false,
    };
  },
  methods: {
    //登录跳转测试（前端测试用）
    testlogin(){
      this.$router.push("/");
    },

    //   点击密码登录的回调
    async onSubmit_password() {
      let res = await LoginIn({
        email: this.login.email,
        password: this.login.password
      });
      console.log(res);
      if (res.status == 200 && res.data.msg == 'ok') {
        // 登陆成功

        this.$store.commit("SET_CurrentListId", res.data.data.user.root_id);
        // 将用户信息保存至vuex
        let user = JSON.stringify(res.data.data.user)
        this.$store.commit("SET_userInfo", user);

        // 将返回的用户信息保存至localstorage中
        window.localStorage.setItem(
          "userInfo",
          user,
        );

        // 将token存入vuex
        this.$store.commit("SET_Token", res.data.data.token);
        // 将token存入本地
        window.localStorage.setItem("token", res.data.data.token);

        //   跳转至主界面
        console.log(111)
        this.$router.push("/");
      } else if (res.status == 200 && res.data.msg != 'ok') {
        this.$message.warning("登录失败,账号或密码错误!");
      }
    },

    //   点击邮箱登录的回调
    async onSubmit_email() {
      let res = await LoginByEmail({
        email: this.login.email,
        a_code: this.login.a_code
      });
      console.log(res);
      if (res.status == 200 && res.data.msg == 'ok') {
        // 登陆成功

        // 将用户信息保存至vuex
        let user = JSON.stringify(res.data.data.user)
        this.$store.commit("SET_userInfo", user);

        // 将返回的用户信息保存至localstorage中
        window.localStorage.setItem(
          "userInfo",
          user,
        );

        // 将token存入vuex
        this.$store.commit("SET_Token", res.data.data.token);
        // 将token存入本地
        // window.localStorage.setItem("token", res.data.data.token);

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

    // 发送邮件，获取注册验证码
    async getCode_register() {
      this.isCountDownShow = true;
      RegEmail({
        email: this.registered.email,
      });
      this.startCountDown();
      
    },

    // 发送邮件，获取登录验证码
    async getCode_login() {
      this.isCountDownShow = true;
      LogEmail({
        email: this.login.email,
      });
      this.startCountDown();
      
    },

    // 倒计时
    startCountDown() {
      timer = setInterval(() => {
        this.countDownSecond--;
        if (this.countDownSecond == 0) {
          clearInterval(timer);
          this.isCountDownShow = false;
        }
      }, 1000);
    },

    // 点击注册的回调
    async clickRegistered() {
      let res = await SignIn({
        email: this.registered.email,
        password: this.registered.password,
        a_code: this.registered.a_code,
      });
      console.log(res);
      // 如果注册成功，清空所有数据并跳转至登录界面，自动填写手机号码
      if (res.data.msg == 'ok') {
        this.$message.success("注册成功!");
        this.login = this.registered;
        this.activeName = "first";
        this.registered = {
          email: "",
          password: "",
          a_code:"",
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

