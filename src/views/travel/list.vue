<template>
    <div class="page_article" id="article_list">
        <div class="warp">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-12">
                        <div class="card_article h-100 mb">
                            <div class="article_list_title">
                                <span class="title">{{$page_title("/travel/list") || "拼团列表"}}</span>
                                <!-- 搜索栏 -->
                                <!-- <div class="search_box">
                                    <b-form-input
                                            size="sm"
                                            class="mr-sm-2"
                                            placeholder="局部搜索"
                                            v-model.trim="search_val"
                                            @keyup.enter="submit_search"
                                    />
                                    <b-button size="sm" @click="submit_search"
                                    >
                                        <b-icon icon="search"/>
                                    </b-button>
                                </div> -->
                            </div>
                            <div class="filter_block">
                                <!-- 筛选 -->
                                <div class="bar_filter">
                                    <b-dropdown :text="title" variant="outline-dark" left>
                                        <b-dropdown-item
                                                v-for="(o, i) in ['全部','拼团中','拼团成功','拼团失败']"
                                                :key="i"
                                                @click="filter_article(i)"
                                        >
                                            {{ o }}
                                        </b-dropdown-item>
                                    </b-dropdown>
                                </div>
								<div style="margin:0 15px;" v-if="$store.state.user.user_id">
									<el-button @click="showItem=true" type="success">发布拼团</el-button>
								</div>
								<div v-if="$store.state.user.user_id">
									<el-button @click="showMyItem=true" type="primary">我参与的</el-button>
								</div>
								<div style="margin:0 15px;" v-if="$store.state.user.user_id">
									<el-button @click="getMyGroupInfo()" type="primary">我发起的</el-button>
								</div>
								
                                <!-- /筛选 -->
                                <!-- 排序 -->
                               <!-- <div
                                        class="bar_sort"
                                        :class="{ active: query.orderby == '`hits` desc' }"
                                >
                                    <b-dropdown text="排序" variant="outline-dark" left>
                                        <b-dropdown-item
                                                v-for="(o, i) in sort_list"
                                                :key="i"
                                                @click="sort_goods(o)"
                                        >
                                            {{ o.name }}
                                        </b-dropdown-item>
                                    </b-dropdown>
                                </div> -->
                                <!-- /排序 -->
                            </div>
                            <!-- 文章列表 -->
                            <list_travel :list="list" />
                            <!-- 分页器 -->
                            <div class="col overflow-auto flex_cc">
                                <b-pagination
                                    v-model="query.page"
                                    :total-rows="count"
                                    :per-page="query.size"
                                    @change="goToPage"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- <div class="col-12 col-md-3">
                        <div class="card_article_hot">
                            <div class="hot_title">
                                {{$page_title("/article/list")+"热门列表" || "文章热门列表"}}
                            </div>
                            <list_article_hot :list="list_hot"/>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
		
		<el-dialog title="拼团维护" :visible.sync="showItem">
		  <div>
			  <list_travel_edit :obj="selObj" @subInfo="subInfo"> </list_travel_edit>
		  </div>
		</el-dialog>
		
		<el-dialog title="我的参团" :visible.sync="showMyItem">
		  <el-table :data="myItem">
		    <el-table-column property="id" label="明细ID" width="120"></el-table-column>
		    <el-table-column property="title" label="拼团名"></el-table-column>
		    <el-table-column
		          label="操作"
		          width="100">
		          <template slot-scope="scope">
					  
					  <router-link :to="'/travel/details?id='+scope.row.group_fk" class="more">
					      <span>详情</span>
					  </router-link>
		          </template>
		        </el-table-column>
		  </el-table>
		</el-dialog>
		
		<el-dialog title="我的拼团" :visible.sync="showMyGroup">
		  <el-table :stripe="true" :data="myGroup" class="el-table__body">
		    <el-table-column prop="id" label="ID" width="100">
		    </el-table-column>
		    <el-table-column prop="title" label="拼团标题" width="150">
		      <template slot-scope="scope">
		        <div class="text-ellipsis-2 text-bold" >{{scope.row.title}}</div>
		      </template>
		    </el-table-column>
		    
		    <el-table-column prop="state" label="状态" width="100">
		      <template slot-scope="scope">
		        <div class="text-ellipsis-2 text-bold" >{{stateNameArr[scope.row.state]}}</div>
		      </template>
		    </el-table-column>
		    
		    <el-table-column prop="title" label="拼团简介" width="200">
		      <template slot-scope="scope">
		        <div class="text-ellipsis-2 text-bold" >{{scope.row.content}}</div>
		      </template>
		    </el-table-column>
		    <el-table-column prop="target" label="目的地" width="100">
		    </el-table-column>
		    <el-table-column prop="num" label="参与人数" width="100">
		    </el-table-column>
		    <el-table-column prop="cost" label="预算" width="100">
		    </el-table-column>
		    <el-table-column prop="travel_path" label="行程" width="200">
		      <template slot-scope="scope">
		        <div class="text-ellipsis-2 text-bold" >{{scope.row.travel_path}}</div>
		      </template>
		    </el-table-column>
		    <el-table-column prop="hotel" label="酒店" width="150">
		    </el-table-column>
		    <el-table-column prop="begin_time" label="出发时间" width="150">
		      <template slot-scope="scope">
		        <div class="text-ellipsis-2">{{$toTime(scope.row["begin_time"],"yyyy-MM-dd")}}</div>
		      </template>
		    </el-table-column>
		    <el-table-column prop="end_time" label="返回时间" width="100">
		      <template slot-scope="scope">
		        <div class="text-ellipsis-2">{{$toTime(scope.row["end_time"],"yyyy-MM-dd")}}</div>
		      </template>
		    </el-table-column>
		    <el-table-column prop="creater" label="创建人ID" width="100">
		      <template slot-scope="scope">
		        <div class="text-ellipsis-2">{{scope.row.user.user_id||""}}</div>
		      </template>
		    </el-table-column>
		    <el-table-column prop="" label="创建人昵称" width="120">
		      <template slot-scope="scope">
		        <div class="text-ellipsis-2">{{scope.row.user.nickname}}</div>
		      </template>
		    </el-table-column>
		    <el-table-column prop="" label="参与情况" width="100">
		      <template slot-scope="scope">
		        <div class="text-ellipsis-2">{{scope.row.item_list.length+'/'+scope.row.num}}</div>
		      </template>
		    </el-table-column>
		    
		    <el-table-column width="120" label="操作" fixed="right">
		      <template slot-scope="scope">
		        <el-button @click="editView(scope.row)" type="text" size="small">编辑</el-button>
		        <el-button @click="delData(scope.row)" type="text" class="text-red" size="small">删除</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		</el-dialog>
		
    </div>
</template>

<script>
    import list_article from "@/components/diy/list_article.vue";
	import list_travel from "@/components/diy/list_travel.vue";
	import list_travel_edit from "@/components/diy/list_travel_edit.vue";
    import list_article_hot from "@/components/diy/list_article_hot.vue";
    import mixin from "@/mixins/page.js";

    export default {
        mixins: [mixin],
        components: {
            list_article,
			list_travel,
            list_article_hot,
			list_travel_edit
        },
        data() {
            return {
				url_add:"~/api/group_travel_main/add_group_travel",
                url_get_list: "~/api/group_travel_main/get_group_list?",
                list: [],
                query: {
                    page: 1,
                    size: 8,
					valid_flag:1
                },
                list_hot: [],
                count_pages: 1,
                list_article_type: [],
                title: "",
				selObj:{},
                sort_list: [
                    {
                        name: "更新时间从高到低",
                        value: "create_time desc",
                    },
                    {
                        name: "更新时间从低到高",
                        value: "create_time asc",
                    },
                ],
                search_val: "",
				showItem:false,
				showMyItem:false,
				myItem:[],
				myGroup:[],
				showMyGroup:false,
				stateNameArr:['拼团中','已结束','已取消']
            };
        },
        methods: {
			editView(row){
				selObj
			},
			getMyGroupInfo(){
				this.showMyGroup = true;
				this.$get(
				    "~/api/group_travel_main/get_group_list?",
				    {
				        page: 1,
				        size: 80,
				        orderby: "create_time desc",
						valid_flag:1,
						creater:this.$store.state.user.user_id
				    },
				    (res) => {
				        if (res.result) {
				            this.myGroup = res.result.list;
				        }
				    }
				);
			},
			getMyGroup:function(){
				let body = {
					valid_flag:1,
					user_fk:this.$store.state.user.user_id
				};
				this.$post("~/api/group_travel_item/get_group_item_list?", body, (res) => {
					if (res.list) {
						this.myItem = res.list;
					}else{
						this.$toast("数据获取异常");
					}
				})
			},
			editView(row){
				row.begin_time = new Date(row.begin_time).toLocaleDateString().replace(/\//g,"-");
				row.end_time = new Date(row.end_time).toLocaleDateString().replace(/\//g,"-");
				this.selObj=row;
				this.showItem=true;
			},
			subInfo(data){
			  let _this = this;
			  let body = data;
			  this.$post(data.id ? "~/api/group_travel_main/edit_group_travel?":"~/api/group_travel_main/add_group_travel?", body, (res) => {
				if (res.result==1) {
					_this.$toast("提交成功");
					_this.get_hot_article();
					_this.getMyGroupInfo();
					_this.showItem = false;
					_this.selObj = {};
				}else{
					_this.$toast("提交异常");
				}
			  })
			},
			delData(row) {
			  this.editData({
				  validFlag:0,
				  id:row.id
			  });
			},
			editData(data){
					  let _this = this;
					  let body = data;
					  this.$post("~/api/group_travel_main/edit_group_travel?", body, (res) => {
					  	if (res.result==1) {
					  		_this.$toast("删除成功");
							_this.get_hot_article();
							_this.getMyGroupInfo();
					  	}else{
					  		_this.$toast("删除异常");
					  	}
					  })
			},
			// subInfo:function(data){
			// 	let _this = this;
			// 	this.add_main(data,function(res){
			// 		_this.get_hot_article();
			// 		_this.showItem = false;
			// 	});
			// },
            /**
             * 请求文章列表后
             * @param {Object} json 响应对象
             */
            get_list_after(json) {
            },
            /**
             * 重新获取全部商品
             */
            get_all_list() {
                this.query = {
                    page: 1,
                    size: 10,
                };
                this.get_list();
            },

            /**
             *  搜索
             * */
            submit_search() {
                this.$router.push({
                    path: "/search/details",
                    query: {
                        word: this.search_val,
                        search_key: "title",
                        search_type: "article",
                        search_title: "文章",
                    },
                });
            },
            /**
             * 获取热门文章
             */
            get_hot_article() {
                this.$get(
                    "~/api/group_travel_main/get_group_list?",
                    {
                        page: 1,
                        size: 8,
                        orderby: "create_time desc",
						valid_flag:1
                    },
                    (res) => {
                        if (res.result) {
                            this.list = res.result.list;
                        }
                    }
                );
            },
            /**
             * 获取文章类型
             */
            get_article_type() {
                this.$get(
                    "~/api/group_travel_main/get_group_list?",
                    {
                        page: 1,
                        size: 0,
                    },
                    (res) => {
                        if (res.result) {
                            console.log(res.result)
                            this.list_article_type.push("全部");
                            res.result.list.map((o) => this.list_article_type.push(o.name));
                        }
                    }
                );
            },
            /**
             * 商品筛选选择
             */
            filter_article(i) {
                if (i == 0) {
                    this.query.state = null;
                } else {
                    this.query.state = i-1;
                }
                this.search();
            },
            /**
             * 排序
             */
            sort_goods(o) {
                this.query.orderby = o.value;
                this.search();
            },
            goToPage(v){
              this.query.page = v;
              this.goToNew(v)
            }
        },
        mounted() {
            this.title = "筛选";
            this.get_hot_article();
			let _this = this;
			setTimeout(function(){
				_this.getMyGroup();
			},1000)
			
            //this.get_article_type();
        },
    };
</script>

<style scoped>

    .article_list_title {
      margin: 0 0.5rem;
      background-color: #d2d2d2;
      color: white;
      display: flex;
      height: 4rem;
      align-items: center;
      justify-content: space-between;
      border-radius: 0.5rem;
    }

    .title {
      font-size: 1.5rem;
      font-weight: bold;
      padding-left: 1rem;
    }

    .search_box {
      width: 12rem;
      display: flex;
      height: 4rem;
      justify-content: center;
      align-items: center;
      padding-right: 1rem;
    }

    .flex_cc {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card_article_hot{
        color: white;
        background-color: var(--color_primary);
        margin: 0.5rem;
        border-radius: 0.5rem;
    }

    .hot_title {
        height: 4rem;
        font-size: 1.2rem;
        font-weight: bold;
        align-items: center;
        justify-content: center;
        display: flex;
        margin-bottom: 1rem;
    }

    [class*="card_"] {
        padding: 0.5rem;
    }

    .article_list h4 {
        font-size: 20px;
    }

    .article_list {
        padding-left: 1px;
    }

    .container {
        min-height: 800px;
    }

    .list_hot h4 {
        font-size: 20px;
    }

    .filter_block {
      margin: 1rem 0.5rem 0.5rem 0.5rem;
      display: flex;
      flex-direction: row;
      justify-content: start;
    }

    .bar_filter {
        display: flex;
        align-items: center;
    }

    li {
        list-style: none;
    }

    .bar_sort {
        margin-left: 5px;
    }


</style>
