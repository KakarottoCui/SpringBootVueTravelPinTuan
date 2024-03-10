<template>
	<nav class="list_article list list-x item-tb">
		<div style="padding: 10px;">
			
			<el-form ref="form"  :rules="rules"  :model="form" label-width="80px">
			  <el-form-item  label="拼团标题" prop="title">
			    <el-input placeholder="输入拼团帖标题" v-model="form.title"></el-input>
			  </el-form-item>
			  <el-form-item label="拼团简介" prop="content">
			    <el-input placeholder="输入拼团详情介绍"  type="textarea" v-model="form.content"></el-input>
			  </el-form-item>
			  <el-form-item  label="目的地"  prop="target">
			    <el-input placeholder="输入拼团目的地" v-model="form.target"></el-input>
			  </el-form-item>
			  <el-form-item label="人数"  prop="num">
			    <el-input placeholder="输入拼团人数" type="number" v-model.number="form.num"></el-input>
			  </el-form-item>
			  <el-form-item label="预算"  prop="cost">
			    <el-input placeholder="输入拼团人均预算" type="number" v-model.number="form.cost"></el-input>
			  </el-form-item>
			  <el-form-item label="出发日期" prop="begin_time">
			      <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择出发日期" v-model="form.begin_time" style="width: 100%;"></el-date-picker>
			      
			    </el-form-item>
				<el-form-item label="返回日期" prop="end_time">
				   
				      <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择返回日期" v-model="form.end_time" style="width: 100%;"></el-date-picker>
				    
				  </el-form-item>
				<el-form-item label="行程信息"  prop="travel_path">
				  <el-input  placeholder="输入拼团行程信息" type="textarea" v-model="form.travel_path"></el-input>
				</el-form-item>
				<el-form-item label="住宿酒店"  prop="hotel">
				  <el-input placeholder="输入拼团酒店信息" v-model="form.hotel"></el-input>
				</el-form-item>
				<el-form-item label="说明">
				  <div style="color: gray ;"> 拼团出发当天未达到人数，视为拼团失败，取消拼团</div>
				</el-form-item>
				<el-form-item>
				    <el-button @click="subInfo('form')" type="primary" >提交</el-button>
				</el-form-item>
			</el-form>	
			
			
			
		</div>
		
	</nav>
</template>

<script>
	export default {
		props: {
			obj: {
				type: Object,
				default: function() {
					return {
						title:"",
						content:"",
						cost:null,
						num:null,
						hotel:"",
						travel_path:"",
						target:"",
						begin_time:"",
						end_time:"",
						creater:"",
						state:0
					};
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
		data() {
		    return {
				
		        form:{
					title:"",
					content:"",
					cost:null,
					num:null,
					hotel:"",
					travel_path:"",
					target:"",
					begin_time:"",
					end_time:"",
					creater:"",
					state:0
				},
				rules: {
				  title: [
					{ required: true, message: '请输入标题', trigger: 'blur' },
					{ min: 3, message: '最少3个字符', trigger: 'blur' }
				  ],
				  content: [
						{ required: true, message: '请输入简介', trigger: 'blur' },
						{ max: 500, message: '最多500个字符', trigger: 'blur' }
				  ],
				  cost: [
						{ required: true, message: '请输入预算', trigger: 'blur' }
				  ],
				  num:[
						{ required: true, message: '请输入人数', trigger: 'blur' }
				  ],
				  hotel:[
						{ required: true, message: '请输入酒店', trigger: 'blur' }
				  ],
				  travel_path:[
						{ required: true, message: '请输入行程', trigger: 'blur' }
				  ],
				  target:[
						{ required: true, message: '请输入目的地', trigger: 'blur' }
				  ],
				  begin_time:[
						{ required: true, message: '请输入出发时间', trigger: 'blur' }
				  ],
				  end_time:[
						{ required: true, message: '请输入返回时间', trigger: 'blur' }
				  ]
				}
			}
		},
		methods: {
			subInfo:function(formName){
				let _this = this;
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					_this.setFormData(_this.form);
				  } else {
					console.log('error submit!!');
					return false;
				  }
				});
			},
			setFormData(data){
				data.creater = this.$store.state.user.user_id;
				this.$emit('subInfo', data);
				
			}
		},
		mounted() {
		    setTimeout(() => {
		        this.form = this.obj;
		    }, 1000);
		}
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
