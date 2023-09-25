import axios from "axios"
axios.defaults.baseURL = "http://10.122.194.184:8082"

//toolBar.vue中还有 upload和 download这两处的url,需要改
//已经不用改了，处理好了


// axios.defaults.baseURL = "http://localhost:8082"

// import vuexIndex from '@/store/index.js'



// 配置拦截器
// 请求拦截器
// 添加请求拦截器
// axios.interceptors.request.use(function (config) {
// 		// 在发送请求之前做些什么
// 		// 判断是否存在token,如果存在将每个页面header添加token
// 		// let token = localStorage.getItem("token")
// 		let token = vuexIndex.state.token
// 		// let IsLogin = vuexIndex.state.IsLogin
// 		console.log(token)
// 		if (token) {
// 			console.log(token)
// 			config.headers.Authorization = token;
// 		}
// 		return config
// 	}
	
// )

//密码登录接口
export function LoginIn(params) {
	return axios.post("/login", params)
}

//邮箱登录接口
export function LoginByEmail(params) {
	return axios.post("/loginByEmail", params)
}

//注册接口
export function SignIn(params) {
	return axios.post("/register", params)
}

//请求当前文件的文件
export function SubPersonalList(params) {
	return axios.post("/subPersonalList", params)
}


//请求当前文件夹的上层结构，即回退
export function ParentPersonalList(params) {
	return axios.post("/parentPersonalList", params)
}

//发送邮箱，获取注册验证码
export function RegEmail(params) {
	return axios.post("/regEmail", params)
}

//发送邮箱，获取登录验证码
export function LogEmail(params) {
	return axios.post("/logEmail", params)
}

//上传资源之个人仓库
export function PersonalSave(params) {
	return axios.post("/personalSave", params)
}


// //上传资源至课程仓库courseSave
// export function CourseSave(params) {
// 	return axios.post("/courseSave", params)
// }

//上传资源至课程仓库courseSave
//分享空间，新建文件夹
export function CourseSave(params) {
	return axios.post("/courseSave", params)
}


//删除私人仓库资源/personalDel
export function PersonalDel(params) {
	return axios.post("/personalDel", params)
}

//删除课程仓库资源 /courseDel
export function CourseDel(params) {
	return axios.post("/courseDel", params)
}

//下载资源/download
export function Download(params) {
	return axios.post("/download", params, {responseType: 'blob'})
}

//上级课程仓库列表 parentCourseList
export function ParentCourseList(params) {
	return axios.post("/parentCourseList",params)
}

//下级课程仓库列表 subCourseList
export function SubCourseList(params) {
	return axios.post("/subCourseList",params)
}
