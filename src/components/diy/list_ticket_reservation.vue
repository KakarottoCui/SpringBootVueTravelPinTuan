<template>
	<div class="diy_home diy_list diy_ticket_reservation" id="diy_ticket_reservation_list">
		<!-- 列表 -->
		<div class="diy_view_list list list-x" v-if="show">
			<router-link class="diy_card goods diy_list_box_wrap" v-for="(o, i) in list" :key="i"
				:to="'/ticket_reservation/details?ticket_reservation_id=' + o['ticket_reservation_id']">
				<!-- 图片 -->
				<div class="diy_list_img_box" v-if="imgList.length" >
					<div class="diy_row" v-for="(item,index) in imgList" :key="item+index" v-show="$check_field('get',item.name,'/ticket_reservation/details') && +item.is_img_list">
						<div class="diy_title diy_list_img_title">
							<span>{{item.title}}:</span>
						</div>
						<div class="diy_field diy_img">
							<img :src="$fullUrl(o[item.name])" style="width:100%;height:100%" />
						</div>
					</div>
				</div>
				<!-- 内容 -->
				<div class="diy_list_item_box">
					<div class="diy_list_item_content" v-for="(item,index) in showItemList" :key="item+index">
						<div class="diy_row" :class="{[item.name]:true}" v-if="$check_field('get',item.name,'/ticket_reservation/details') && +item.is_img_list">
							<div class="diy_title">
								<span>{{item.title}}:</span>
							</div>
							<div class="diy_field diy_text">
								<span v-if="item.type == 'UID'" v-text="get_user_name(o[item.name])"></span>
								<span v-else-if="item.type == '日期'" v-text="$toTime(o[item.name],'yyyy-MM-dd')"></span>
								<span v-else-if="item.type == '时间'" v-text="$toTime(o[item.name],'hh:mm:ss')"></span>
								<span v-else-if="item.type == '日长'" v-text="$toTime(o[item.name],'yyyy-MM-dd hh:mm:ss')"></span>
								<span v-else v-text="o[item.name]"></span>
							</div>
						</div>
					</div>
				</div>
			</router-link>
		</div>
		<!-- 表格 -->
		<div class="diy_view_table" v-else>
			<table class="diy_table">
				<tr class="diy_row">
					<th class="diy_title" v-if="$check_field('get','attraction_number')">景点编号
					</th>
					<th class="diy_title" v-if="$check_field('get','name_of_scenic_spot')">景点名称
					</th>
					<th class="diy_title" v-if="$check_field('get','business_hours')">营业时间
					</th>
					<th class="diy_title" v-if="$check_field('get','scenic_spot_address')">景点地址
					</th>
					<th class="diy_title" v-if="$check_field('get','ticket_price')">门票价格
					</th>
					<th class="diy_title" v-if="$check_field('get','scheduled_number')">预定数
					</th>
					<th class="diy_title" v-if="$check_field('get','user')">用户
					</th>
					<th class="diy_title" v-if="$check_field('get','scheduled_time')">预定时间
					</th>
					<th class="diy_title" v-if="$check_field('get','total_cost')">合计费用
					</th>
					<th class="diy_title" v-if="$check_field('get','order_status')">订单状态
					</th>
				</tr>
				<tr class="diy_row" v-for="(o,i) in list" :key="o+i">
					<td class="diy_field diy_text" v-if="$check_field('get','attraction_number')">
						<span>
							{{ o["attraction_number"] }}
						</span>
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','name_of_scenic_spot')">
						<span>
							{{ o["name_of_scenic_spot"] }}
						</span>
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','business_hours')">
						<span>
							{{ o["business_hours"] }}
						</span>
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','scenic_spot_address')">
						<span>
							{{ o["scenic_spot_address"] }}
						</span>
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','ticket_price')">
						<span>
							{{ o["ticket_price"] }}
						</span>
					</td>
					<td class="diy_field diy_number" v-if="$check_field('get','scheduled_number')">
						<span>
							{{ o["scheduled_number"] }}
						</span>
					</td>
					<td class="diy_field diy_uid" v-if="$check_field('get','user')">
						<span>
							{{ get_user_name(o['user']) }}
						</span>
					</td>
					<td class="diy_field diy_date" v-if="$check_field('get','scheduled_time')">
						<span>
							{{ $toTime(o["scheduled_time"] ,"yyyy-MM-dd") }}
						</span>
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','total_cost')">
						<span>
							{{ o["total_cost"] }}
						</span>
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','order_status')">
						<span>
							{{ o["order_status"] }}
						</span>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return [];
				},
			},
			show: {
				type: Boolean,
				default: function(){
					return true;
				}
			}
		},
		data() {
			return {
						imgList: [
						],
						itemList: [
								{
									title: "景点编号",
									name: "attraction_number",
									type: "文本",
									is_img_list: "0"
								},
								{
									title: "景点名称",
									name: "name_of_scenic_spot",
									type: "文本",
									is_img_list: "0"
								},
								{
									title: "营业时间",
									name: "business_hours",
									type: "文本",
									is_img_list: "0"
								},
								{
									title: "景点地址",
									name: "scenic_spot_address",
									type: "文本",
									is_img_list: "0"
								},
								{
									title: "门票价格",
									name: "ticket_price",
									type: "文本",
									is_img_list: "0"
								},
								{
									title: "预定数",
									name: "scheduled_number",
									type: "数字",
									is_img_list: "0"
								},
								{
									title: "用户",
									name: "user",
									type: "UID",
									is_img_list: "0"
								},
								{
									title: "预定时间",
									name: "scheduled_time",
									type: "日期",
									is_img_list: "0"
								},
								{
									title: "合计费用",
									name: "total_cost",
									type: "文本",
									is_img_list: "0"
								},
								{
									title: "订单状态",
									name: "order_status",
									type: "下拉",
									is_img_list: "0"
								},
						],
						richList: [
						],
				// 用户列表
				list_user_user: [],
			};
		},
		methods: {
			/**
			 * 获取普通用户用户列表
			 */
			async get_list_user_user() {
				var json = await this.$get("~/api/user/get_list?user_group=普通用户");
				if(json.result && json.result.list){
					this.list_user_user = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_name(id){
				var obj = this.list_user_user.getObj({"user_id":id});
				var ret = "";
				if(obj){
					ret = obj.nickname+"-"+obj.username;
					// if(obj.nickname){
					// 	ret = obj.nickname;
					// }
					// else{
					// 	ret = obj.username;
					// }
				}
				return ret;
			},
		},
		created() {
			this.get_list_user_user();
		},
		computed:{
			showItemList(){
				let arr = [];
				let _type = ["视频","音频","文件"];
				this.itemList.forEach(item => {
					if(_type.indexOf(item.type) === -1 && !!+item.is_img_list){
						arr.push(item)
					}
				})
				return arr.slice(0,4);
			}
		}
	};
</script>

<style scoped>
	.media {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-basis: 75%;
		min-height: 10rem;
	}

	.goods {
		display: flex;
		width: calc(25% - 1rem);
		margin: 0.5rem;
		padding: 0.5rem;
		flex-direction: column;
		justify-content: space-between;
		background-color: white;
		border-radius: 0.5rem;
	}

	.goods:hover {
		border: 0.2rem solid #909399;
		box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.15);
	}

	.goods:hover img {
		filter: blur(1px);
	}

	.price {
		font-size: 1rem;
		margin-right: 3px;
	}

	.price_ago {
		text-decoration: line-through;
		font-size: 0.5rem;
		color: #999;

	}

	.title {
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 700;
		padding: .25rem;
	}

	.icon_cart {
		color: #FF5722;
		float: right;
	}

	@media (max-width: 992px) {

		.goods {
			width: calc(33% - 1rem);
			;
		}

	}

	@media (max-width: 768px) {

		.goods {
			width: calc(50% - 1rem);
			;
		}

	}
</style>

