<template>
	<nav class="list_article list list-x item-tb">
		<!-- 文章详情 -->
		<router-link class="article_warp" v-for="(o, i) in list" :key="i"
			:to="'/travel/details?id='+[o.id]">
			<div class="article">
				<div class="doc">
					<div class="title ellipsis_1" style="min-height: 2.8rem;text-align: left;">
						<span class="red-tag">拼团游</span> {{ o.title }}
					</div>
					<div class=" ellipsis_2 content" style="min-height: 2.8rem">
						{{ o.content }}
					</div>
					<div class="interact desc" style="display: flex;justify-content: space-between;">
						<span class="praise">
							目的地
							<!-- <b-icon icon="hand-thumbs-up"/>
							{{ o[vm.praise_len] }} -->
						</span>
						<span class="see ellipsis_1" style="color: black;">
							{{ o.target }}
						</span>
					</div>
					<div class="interact desc" style="display: flex;justify-content: space-between;">
						<span class="praise">
							
							{{ o.state == 0?'拼团中':(o.state == 1 ? '拼团结束':'拼团失败') }}
						</span>
						<span class="see">
							<b-icon icon="people-fill"/><span style="margin:0 0 0 5px;color: gray;">{{o.item_list.length+'/'+o.num}}</span>
							<!-- {{ o[vm.hits] }} -->
						</span>
					</div>
					<div style="display: flex;align-items: center; flex-direction: row;justify-content: space-between;">
						<div>
							<div class="time">{{ $toTime(o.begin_time,"yyyy-MM-dd")+'出发' }}</div>
						</div>
						<div class="blue-tag" style="height: 28px;padding: 3px 5px;">我要拼</div>
					</div>
					<!-- <div v-if="showManager == 1 && ($store.state.user.user_id ==  o.creater || $store.state.user.user_group == '管理员') " style="display: flex;align-items: center; flex-direction: row;justify-content: space-between;border-top: 1px solid lightgray;padding: 5px;margin-top: 5px;">
						<div @click="edit" class="blue-tag" style="height: 28px;padding: 3px 5px;">修改</div>
						<div @click="del"class="red-tag" style="height: 28px;padding: 3px 5px;">删除</div>
					</div> -->
					
				</div>
			</div>
		</router-link>
	</nav>
</template>

<script>
	export default {
		props: {
			showManager:{
				type:Number,
				default: function() {
					return 1;
				},
			},
			list: {
				type: Array,
				default: function() {
					return [];
				},
			},
			vm: {
				type: Object,
				default: function() {
					return {
						img: "img",
						article_id: "article_id",
						title: "title",
						description: "description",
						title: "title",
						create_time: "create_time",
						content: "content",
						praise_len: "praise_len",
						hits: "hits",
					};
				},
			},
		},
		mounted:function(){
			
		},
		methods: {
			// edit:function(type){
			// 	if()
			// 	data.creater = this.$store.state.user.user_id;
			// 	this.$emit('subInfo', data);
			// }
		},
	};
</script>

<style scoped>
	.content{
		color: #909399 !important;
	}
	.article_warp {
		display: flex;
		width: calc(25% - 1rem);
		margin: 0.5rem;
		flex-direction: column;
		justify-content: space-between;
		background-color: white;
		border-radius: 0.5rem;
	}

	.article_warp:hover {
		border: 0.2rem solid #909399;
		box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.15);
	}

	.article_warp:hover img {
		filter: blur(1px);
	}

	.article {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.ellipsis_1 {
		overflow:hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow:ellipsis;
	}
	
	.ellipsis_2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	@media (max-width: 992px) {

		.article_warp {
			width: calc(33% - 1rem);;
		}

	}

	@media (max-width: 768px) {

		.article_warp {
			width: calc(50% - 1rem);;
		}

	}
	
	.red-tag{
		height: 10px;
		font-size: 15px; 
		border-radius: 5px;
		background-color: #F56C6C;
		padding: 3px;
		color: white;
	}
	
	.blue-tag{
		height: 10px;
		font-size: 15px; 
		border-radius: 5px;
		background-color: #66b1ff;
		padding: 3px;
		color: white;
	}

</style>
