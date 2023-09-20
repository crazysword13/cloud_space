import axios from "axios"
axios.defaults.baseURL = "http://10.122.194.184:8082"


//登录接口
export function LoginIn(params) {
	return axios.post("/login", params)
}

//注册接口
export function SignIn(params) {
	return axios.post("/register", params)
}

//请求当前目录的文件
export function PersonalList(params) {
	return axios.post("/personalList", params)
}
