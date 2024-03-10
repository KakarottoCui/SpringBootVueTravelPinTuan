<template>
	<div>
		<b-form-group v-if="$check_register_field('add','attraction_number','/scenic_spot_information/view')" id="input-group-0" label="景点编号" label-for="input-0">
			<b-form-input id="input-0" v-model="form['attraction_number']" type="text" placeholder="景点编号" trim></b-form-input>
		</b-form-group>
		<b-form-group v-if="$check_register_field('add','name_of_scenic_spot','/scenic_spot_information/view')" id="input-group-1" label="景点名称" label-for="input-1">
			<b-form-input id="input-1" v-model="form['name_of_scenic_spot']" type="text" placeholder="景点名称" trim></b-form-input>
		</b-form-group>
		<div v-if="$check_register_field('add','scenic_spot_cover','/scenic_spot_information/view')">
			<div>景点封面</div>
			<div>
				<input type="file" @change="uploadFile($event.target.files,'scenic_spot_cover')" />
				<img v-if="form['scenic_spot_cover']" style="width: 50px;height: 50px;" :src="$fullUrl(form['scenic_spot_cover'])" />
			</div>
		</div>
		<b-form-group v-if="$check_register_field('add','business_hours','/scenic_spot_information/view')" id="input-group-3" label="营业时间" label-for="input-3">
			<b-form-input id="input-3" v-model="form['business_hours']" type="text" placeholder="营业时间" trim></b-form-input>
		</b-form-group>
		<b-form-group v-if="$check_register_field('add','scenic_spot_address','/scenic_spot_information/view')" id="input-group-4" label="景点地址" label-for="input-4">
			<b-form-input id="input-4" v-model="form['scenic_spot_address']" type="text" placeholder="景点地址" trim></b-form-input>
		</b-form-group>
		<b-form-group v-if="$check_register_field('add','region','/scenic_spot_information/view')" id="input-group-5" label="地区" label-for="input-5">
			<b-form-select id="input-5" v-model="form['region']" :options="list_region"></b-form-select>
		</b-form-group>
		<b-form-group v-if="$check_register_field('add','ticket_price','/scenic_spot_information/view')" id="input-group-6" label="门票价格" label-for="input-6">
			<b-form-input id="input-6" v-model="form['ticket_price']" type="text" placeholder="门票价格" trim></b-form-input>
		</b-form-group>
		<b-form-group v-if="$check_register_field('add','number_of_tickets','/scenic_spot_information/view')" id="input-group-7" label="门票数" label-for="input-7">
			<b-form-input id="input-7" v-model="form['number_of_tickets']" type="number" placeholder="门票数" trim></b-form-input>
		</b-form-group>
		<b-form-group v-if="$check_register_field('add','score','/scenic_spot_information/view')" id="input-group-8" label="评分" label-for="input-8">
			<b-form-input id="input-8" v-model="form['score']" type="number" placeholder="评分" trim></b-form-input>
		</b-form-group>
	</div>
</template>

<script>
	import mixin from "@/mixins/component.js";

	export default {
		mixins: [mixin],
		model: {
			prop: "form",
			event: "change"
		},
		props: {
			form: {
				type: Object,
				default: () => {
					return {

					}
				}
			}
		},
		data(){
			return {
				url_upload: "~/api/scenic_spot_information/upload?",
        //地区选项列表
        list_region: [],
			}
		},
		methods: {
			// 下拉数据列表转换
			getDropList(e){
				let resultArr = [];
				if(e){
					let arr = e.split(",");
					arr.forEach(item => {
						resultArr.push({
							value: item,
							text: item
						})
					});
				}
				return resultArr;
			},
      /**
       * 获取地区列表
       */
      async get_list_region() {
        let json = await this.$get("~/api/regional_management/get_list?");
        if(json.result && json.result.list){
          this.list_region = [];
          json.result.list.forEach(item => {
            this.list_region.push({
              value: item.region,
              text: item.region
            })
          });
        }
        else if(json.error){
          console.error(json.error);
        }
      },
			/**
			 * 上传图片
			 * @param {Object} file 文件对象
			 * @param {key} 保存键名
			 */
			uploadFile(file, key = "img") {
				var _this = this;
				var form = new FormData() // FormData 对象
				form.append('file', file[0]) // 文件对象
				this.$upload(this.url_upload, form, function(json) {
					if (json.result) {
						// _this.form[key] = json.result.url;
						_this.$delete(_this.form,key);
						_this.$set(_this.form,key,json.result.url);
						console.log(_this.form[key])
					} else {
						_this.$toast('上传失败！');
					}
				});
			},
		},
    created() {
      this.get_list_region();
    }
	}
</script>

<style>
</style>
