<template>
	<div class="diy_edit page_hotel_reservation" id="hotel_reservation_edit">
		<div class='warp'>
			<div class='container'>
				<div class='row diy_edit_content_box'>
					<div v-if="$check_field('set','hotel_number') || $check_field('add','hotel_number') || $check_field('get','hotel_number')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>酒店编号:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_hotel_number" v-model="form['hotel_number']" placeholder="请输入酒店编号" v-if="(form['hotel_number'] && $check_field('set','hotel_number')) || (!form['hotel_number'] && $check_field('add','hotel_number'))"  :disabled="disabledObj['hotel_number_isDisabled']"/>
							<span v-else-if="$check_field('get','hotel_number')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','hotel_name') || $check_field('add','hotel_name') || $check_field('get','hotel_name')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>酒店名称:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_hotel_name" v-model="form['hotel_name']" placeholder="请输入酒店名称" v-if="(form['hotel_name'] && $check_field('set','hotel_name')) || (!form['hotel_name'] && $check_field('add','hotel_name'))"  :disabled="disabledObj['hotel_name_isDisabled']"/>
							<span v-else-if="$check_field('get','hotel_name')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','hotel_star') || $check_field('add','hotel_star') || $check_field('get','hotel_star')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>酒店星级:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_hotel_star" v-model="form['hotel_star']" placeholder="请输入酒店星级" v-if="(form['hotel_star'] && $check_field('set','hotel_star')) || (!form['hotel_star'] && $check_field('add','hotel_star'))"  :disabled="disabledObj['hotel_star_isDisabled']"/>
							<span v-else-if="$check_field('get','hotel_star')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','hotel_location') || $check_field('add','hotel_location') || $check_field('get','hotel_location')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>酒店位置:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_hotel_location" v-model="form['hotel_location']" placeholder="请输入酒店位置" v-if="(form['hotel_location'] && $check_field('set','hotel_location')) || (!form['hotel_location'] && $check_field('add','hotel_location'))"  :disabled="disabledObj['hotel_location_isDisabled']"/>
							<span v-else-if="$check_field('get','hotel_location')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','reservation_telephone') || $check_field('add','reservation_telephone') || $check_field('get','reservation_telephone')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>预定电话:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_reservation_telephone" v-model="form['reservation_telephone']" placeholder="请输入预定电话" v-if="(form['reservation_telephone'] && $check_field('set','reservation_telephone')) || (!form['reservation_telephone'] && $check_field('add','reservation_telephone'))"  :disabled="disabledObj['reservation_telephone_isDisabled']"/>
							<span v-else-if="$check_field('get','reservation_telephone')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','room_price') || $check_field('add','room_price') || $check_field('get','room_price')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>房间价格:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_room_price" v-model="form['room_price']" placeholder="请输入房间价格" v-if="(form['room_price'] && $check_field('set','room_price')) || (!form['room_price'] && $check_field('add','room_price'))"  :disabled="disabledObj['room_price_isDisabled']"/>
							<span v-else-if="$check_field('get','room_price')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','scheduled_number') || $check_field('add','scheduled_number') || $check_field('get','scheduled_number')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>预定数:
							</span>
						</div>
						<!-- 数字 -->
						<div class="diy_field diy_number">
							<input type="number" id="form_scheduled_number" v-model.number="form['scheduled_number']" placeholder="请输入预定数" v-if="(form['scheduled_number'] && $check_field('set','scheduled_number')) || (!form['scheduled_number'] && $check_field('add','scheduled_number'))" :disabled="disabledObj['scheduled_number_isDisabled']" />
							<span v-else-if="$check_field('get','scheduled_number')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','user') || $check_field('add','user') || $check_field('get','user')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>用户:
							</span>
						</div>
						<div class="diy_field diy_down">
							<select id="form_user" :disabled="disabledObj['user_isDisabled']" v-model="form['user']" v-if="(form['user'] && $check_field('set','user')) || (!form['user'] && $check_field('add','user'))" >
								<option v-for="o in list_user_user" :value="o['user_id']">
									{{o['nickname'] + '-' + o['username']}}
								</option>
							</select>
							<span v-else-if="$check_field('get','user')">{{ form['user'] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','scheduled_time') || $check_field('add','scheduled_time') || $check_field('get','scheduled_time')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>预定时间:
							</span>
						</div>
						<!-- 日期 -->
						<div class="diy_field diy_date">
							<input type="date" :disabled="disabledObj['scheduled_time_isDisabled']" id="form_scheduled_time" v-model="form['scheduled_time']" placeholder="请输入预定时间" v-if="(form['scheduled_time'] && $check_field('set','scheduled_time')) || (!form['scheduled_time'] && $check_field('add','scheduled_time'))" />
							<span v-else-if="$check_field('get','scheduled_time')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','total_cost') || $check_field('add','total_cost') || $check_field('get','total_cost')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>合计费用:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_total_cost" v-model="form['total_cost']" placeholder="请输入合计费用" v-if="(form['total_cost'] && $check_field('set','total_cost')) || (!form['total_cost'] && $check_field('add','total_cost'))"  @focus="set_total_cost()" :disabled="disabledObj['total_cost_isDisabled']"/>
							<span v-else-if="$check_field('get','total_cost')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','order_status') || $check_field('add','order_status') || $check_field('get','order_status')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>订单状态:
							</span>
						</div>
						<!-- 选项 -->
						<div class="diy_field diy_down">
							<select id="form_order_status" v-model="form['order_status']" v-if="(form['order_status'] && $check_field('set','order_status')) || (!form['order_status'] && $check_field('add','order_status'))" >
								<option v-for="o in list_order_status" :value="o">
									{{o}}
								</option>
							</select>
							<span v-else-if="$check_field('get','order_status')">{{ form['order_status'] }}</span>
						</div>
					</div>
				</div>
				<div class="diy_edit_submit_box row">
					<div class="col-12">
						<div class="btn_box">
							<button class="btn_submit" @click="submit()">提交</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import mixin from "@/mixins/page.js";
	export default {
		mixins: [mixin],
		components: {},
		data() {
			return {
				url_get_obj: "~/api/hotel_reservation/get_obj?",
				url_add: "~/api/hotel_reservation/add?",
				url_set: "~/api/hotel_reservation/set?",

				// 登录权限
				oauth: {
					"signIn": true,
					"user_group": []
				},

				// 查询条件
				query: {
					"hotel_number": "",
					"hotel_name": "",
					"hotel_star": "",
					"hotel_location": "",
					"reservation_telephone": "",
					"room_price": "",
					"scheduled_number": 0,
					"user": 0,
					"scheduled_time": "",
					"total_cost": "",
					"order_status": "",
					"hotel_reservation_id": 0,
				},

				obj: {
					"hotel_number":'', // 酒店编号
					"hotel_name":'', // 酒店名称
					"hotel_star":'', // 酒店星级
					"hotel_location":'', // 酒店位置
					"reservation_telephone":'', // 预定电话
					"room_price":'', // 房间价格
					"scheduled_number":0, // 预定数
					"user": 0, // 用户
					"scheduled_time": new Date().getTime(),
					"total_cost":'', // 合计费用
					"order_status":'', // 订单状态
					"hotel_reservation_id": 0,
				},

				// 表单字段
				form: {
					"hotel_number":'', // 酒店编号
					"hotel_name":'', // 酒店名称
					"hotel_star":'', // 酒店星级
					"hotel_location":'', // 酒店位置
					"reservation_telephone":'', // 预定电话
					"room_price":'', // 房间价格
					"scheduled_number":0, // 预定数
					"user": 0, // 用户
					"scheduled_time": new Date().getTime(),
					"total_cost":'', // 合计费用
					"order_status":'', // 订单状态
					"hotel_reservation_id": 0,
				},
				disabledObj:{
					"hotel_number_isDisabled": false,
					"hotel_name_isDisabled": false,
					"hotel_star_isDisabled": false,
					"hotel_location_isDisabled": false,
					"reservation_telephone_isDisabled": false,
					"room_price_isDisabled": false,
					"user_isDisabled": false,
					"scheduled_time_isDisabled": false,
					"total_cost_isDisabled": false,
					"order_status_isDisabled": false,
				},
				// 用户列表
				list_user_user: [],
				//订单状态选项列表
				list_order_status: ['已预留','已完成'],

				// ID字段
				field: "hotel_reservation_id",
			}
		},
		methods: {
			/**
			 * 获取普通用户用户列表
			 */
			async get_list_user_user() {
				// if(this.user_group !== "管理员" && this.form["user"] === 0) {
				//     this.form["user"] = this.user.user_id;
				// }
				var json = await this.$get("~/api/user/get_list?user_group=普通用户");
				if(json.result && json.result.list){
					this.list_user_user = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			async get_user_session_user(){
				var _this = this;
				var json = await this.$get("~/api/user_group/get_obj?name=普通用户");
				if(json.result && json.result.obj){
					var source_table = json.result.obj.source_table;
					var user_id = _this.$store.state.user.user_id;
					if (user_id){
						var url = "~/api/"+source_table+"/get_obj?"
						this.$get(url, {"user_id":_this.$store.state.user.user_id}, function(res) {
							if (res.result && res.result.obj) {
								var arr = []
								for (let key in res.result.obj) {
									arr.push(key)
								}
								var arrForm = []
								for (let key in _this.form) {
									arrForm.push(key)
								}
								_this.form["user"] = user_id
								_this.disabledObj['user' + '_isDisabled'] = true
								for (var i=0;i<arr.length;i++){
                  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
                    for (var j = 0; j < arrForm.length; j++) {
                      if (arr[i] === arrForm[j]) {
                        if (arr[i] !== "user") {
                          _this.form[arrForm[j]] = res.result.obj[arr[i]]
                          _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                          break;
                        }
                      }
                    }
                  }
								}
							}
						});
					}
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			set_total_cost(){
				this.form.total_cost =this.form.room_price * this.form.scheduled_number
			},

			/**
			 * 修改文件
			 * @param { Object } files 上传文件对象
			 * @param { String } str 表单的属性名
			 */
			change_file(files, str) {
				var form = new FormData();
				form.append("file", files[0]);
				this.$post("~/api/hotel_reservation/upload?", form, (res) => {
					if (res.result) {
						this.form[str] = res.result.url;
					} else if (res.error) {
						this.$toast(res.error.message);
					}
				});
			},

			/**
			 * 获取对象后获取缓存表单
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_before(param){
				var form = $.db.get("form");
				// if (form) {
        //   delete(form.examine_state)
        //   delete(form.examine_reply)
        //   this.obj = $.push(this.obj ,form);
				// 	this.form = $.push(this.form ,form);
				// }
				// var arr = []
				// for (let key in form) {
				// 	arr.push(key)
				// }
				// for (var i=0;i<arr.length;i++){
				// 	this.disabledObj[arr[i] + '_isDisabled'] = true
				// }
        if (form) {
          var arr = []
          for (let key in form) {
            arr.push(key)
          }
          var arrForm = []
          for (let key in this.form) {
            arrForm.push(key)
          }
          for (var i=0;i<arr.length;i++){
            if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
              for (var j = 0; j < arrForm.length; j++) {
                if (arrForm[j] === arr[i]) {
                  this.form[arrForm[j]] = form[arr[i]]
                  this.obj[arrForm[j]] = form[arr[i]]
                  this.disabledObj[arrForm[j] + '_isDisabled'] = true
                  break;
                }
              }
            }
          }
        }
        if (JSON.stringify(this.form["scheduled_time"]).indexOf("-")===-1) {
          this.form["scheduled_time"] = this.$toTime(parseInt(this.form["scheduled_time"]), "yyyy-MM-dd")
        }

        $.db.del("form");
				return param;
			},

			/**
			 * 获取对象后获取缓存表单
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json ,func){
				// var form = $.db.get("form");
				// var obj = Object.assign({} ,form ,this.obj);
				// if (obj) {
        //   delete(obj.examine_state)
        //   delete(obj.examine_reply)
				// 	this.obj = $.push(this.obj ,obj);
				// }
				// if (form) {
        //   delete(form.examine_state)
        //   delete(form.examine_reply)
				// 	this.form = $.push(this.form ,form);
				// }
				if(func){
					func(json);
				}
			},

		},
		created() {
			this.get_user_session_user();
			this.get_list_user_user();
		},
	}
</script>

<style>
</style>
