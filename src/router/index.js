import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/index.vue'
import login from '../views/account/login.vue';

Vue.use(VueRouter)

const routes = [
	// 主页ss
	{
		path: '/',
		name: 'index',
		component: index
	},
	// 登录
	{
		path: '/account/login',
		name: 'login',
		component: login
	},
	// 忘记密码
	{
		path: '/account/forgot',
		name: 'forgot',
		component: () => import('../views/account/forgot.vue')
	},
	// 注册账号
	{
		path: '/account/register',
		name: 'register',
		component: () => import('../views/account/register.vue')
	},
	// 媒体图片
	{
		path: '/media/image',
		name: 'media_image',
		component: () => import('../views/media/image.vue')
	},
	// 音乐
	{
		path: '/media/music',
		name: 'media_music',
		component: () => import('../views/media/music.vue')
	},
	// 媒体视频
	{
		path: '/media/video',
		name: 'media_video',
		component: () => import('../views/media/video.vue')
	},
	// 文章路由
	{
		path: '/article/list',
		name: 'article_list',
		component: () => import('../views/article/list.vue')
	},
	{
		path: '/article/details',
		name: 'article_details',
		component: () => import('../views/article/details.vue')
	},
	// 拼团路由
	{
		path: '/travel/list',
		name: 'travel_list',
		component: () => import('../views/travel/list.vue')
	},
	{
		path: '/travel/details',
		name: 'travel_details',
		component: () => import('../views/travel/details.vue')
	},
	// 浏览网站
	// 收藏路由
	{
		path: '/user/collect',
		name: 'collect_list',
		component: () => import('../views/user/collect.vue')
	},
	// 论坛路由
	{
		path: '/forum/list',
		name: 'forum_list',
		component: () => import('../views/forum/list.vue')
	},

	{
		path: '/forum/details',
		name: 'forum_details',
		component: () => import('../views/forum/details.vue')
	},

	{
		path: '/forum/view',
		name: 'forum_view',
		component: () => import('../views/forum/view.vue')
	},
	// 公告路由
	{
		path: '/notice/list',
		name: 'notice_list',
		component: () => import('../views/notice/list.vue')
	},
	{
		path: '/notice/details',
		name: 'notice_details',
		component: () => import('../views/notice/details.vue')
	},
	//景点信息列表路由
	{
		path: '/scenic_spot_information/list',
		name: '/scenic_spot_information_list',
		component: () => import('../views/scenic_spot_information/list.vue')
	},
	//景点信息详情路由
	{
		path: '/scenic_spot_information/details',
		name: '/scenic_spot_information_details',
		component: () => import('../views/scenic_spot_information/details.vue')
	},
	//门票预定添加路由
	{
		path: '/ticket_reservation/edit',
		name: '/ticket_reservation_edit',
		component: () => import('../views/ticket_reservation/edit.vue')
	},
	//酒店信息列表路由
	{
		path: '/hotel_information/list',
		name: '/hotel_information_list',
		component: () => import('../views/hotel_information/list.vue')
	},
	//酒店信息详情路由
	{
		path: '/hotel_information/details',
		name: '/hotel_information_details',
		component: () => import('../views/hotel_information/details.vue')
	},
	//酒店预定添加路由
	{
		path: '/hotel_reservation/edit',
		name: '/hotel_reservation_edit',
		component: () => import('../views/hotel_reservation/edit.vue')
	},
	//天气信息列表路由
	{
		path: '/weather_information/list',
		name: '/weather_information_list',
		component: () => import('../views/weather_information/list.vue')
	},
	//天气信息详情路由
	{
		path: '/weather_information/details',
		name: '/weather_information_details',
		component: () => import('../views/weather_information/details.vue')
	},

	// 用户路由
	{
		path: '/user/index',
		name: 'user_index',
		component: () => import('../views/user/index.vue')
	},
	// 基本信息
	{
		path: '/user/info',
		name: 'user_info',
		component: () => import('../views/user/info.vue')
	},
	// 找回密码
	{
		path: '/user/password',
		name: 'user_password',
		component: () => import('../views/user/password.vue')
	},

	// 搜索
	{
		path: '/search',
		name: 'search',
		component: () => import('../views/search/index.vue')
	},
	// 局部搜索
	{
		path: '/search/details',
		name: 'search_details',
		component: () => import('../views/search/details.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.afterEach((to, from, next) => {
	let title = "旅游网站-home";
	document.title = title;
	document.logo = "旅游网站"
})

export default router
