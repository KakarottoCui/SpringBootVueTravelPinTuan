<template>
    <div class="div_article">
		<div>
			<div class="title">{{ obj.title }}</div>
			<div class="description" style="text-align: left;">{{ obj.content }}</div>
		</div>
		<div><span>目的地：</span>{{obj.target}}</div>
		<div style="display: flex;align-items: center;"><span>人数：</span>{{obj.item_list.length+'/'+obj.num}}
		
		<el-button @click="showItem=true;" style="margin-left: 30px;" type="primary" size="mini" plain>人员明细</el-button>
		
		</div>
		<div><span>行程：</span>{{obj.travel_path}}</div>
		<div><span>预算：</span>{{obj.cost}}</div>
		<div><span>酒店：</span>{{obj.hotel}}</div>
		
		<div><span>出发时间：</span>{{ $toTime( obj.begin_time,"yyyy-MM-dd hh:mm") }}
		</div>
		<div><span>返回时间：</span>{{ $toTime( obj.end_time,"yyyy-MM-dd hh:mm") }}
		</div>
		<div><span>状态：</span>{{ obj.state == 0?'拼团中':(obj.state == 1 ? '拼团结束':'拼团失败') }}</div>
		<div style="display: flex;">
			<div v-if="$store.state.user.user_id" @click="joinGroup"><el-button >{{joinFlag?'已报名':'报名'}}</el-button></div>
			<div v-else><el-button >报名前请登录</el-button></div>
			<div v-if="joinFlag" @click="quit"><el-button type="danger">退出</el-button></div>
		</div>
		
		<el-dialog title="参团人员明细" :visible.sync="showItem">
		  <el-table :data="obj.item_list">
		    <el-table-column property="user_fk" label="人员ID" width="150"></el-table-column>
		    <el-table-column property="user_name" label="昵称" width="200"></el-table-column>
		    <el-table-column property="contact" label="联系方式"></el-table-column>
		  </el-table>
		</el-dialog>
		
    </div>
</template>

<script>
    export default {
        props: {
            obj: {
                type: Object,
                default: function () {
                    return {};
                },
            },
            vm: {
                type: Object,
                default: function () {
                    return {
                        img: "img",
                        tag: "tag",
                        url: "url",
                        title: "title",
                        source: "source",
                        description: "description",
                        content: "content",
                        create_time: "create_time",
                        hits: "hits",
                        praise_len: "praise_len",
                    };
                },
            },
        },
        data() {
            return {
                // 是否已点赞
                check_praised: false,
                // 是否已收藏
                check_collected: false,
				showItem:false,
				joinFlag:false,
				userItem:""
            };
        },
        methods: {
			quit(){
				let body = this.userItem;
				body.validFlag = 0;
				this.$post("~/api/group_travel_item/edit_group_travel_item?", body, (res) => {
				    if (res.result == 1) {
						this.$toast("取消成功");
						this.joinFlag = false;
						window.location.reload();
					}else{
						this.$toast(res.message);
					}
				})
			},
			joinGroup(){
				
				if(this.joinFlag){
					this.$toast("你已经报名了");
				}else if(this.obj.num <= this.obj.item_list.length){
					this.$toast("人数已满");
				}else{
					let body = {
						userFk : this.$store.state.user.user_id,
						groupFk : this.obj.id,
						title: this.obj.title,
						creater : this.$store.state.user.user_id
					}
					this.$post("~/api/group_travel_item/add_group_travel_item?", body, (res) => {
					    if (res.result == 1) {
							this.$toast("添加成功");
							this.joinFlag = true;
							window.location.reload();
						}else{
							this.$toast(res.message);
						}
					})
				}
				
			},
            /**
             * 获取点赞
             */
            get_praise() {
                var user_id = this.$store.state.user.user_id;
                console.log(this.obj.article_id)
                this.$get("~/api/praise/count?", {
                    source_table: "article",
                    source_field: "article_id",
                    source_id: this.obj.article_id,
                    user_id
                }, (res) => {
                    if (res.result || res.result === 0) {
                        console.log("sadsfasf"+JSON.stringify(res))
                        this.check_praised = res.result ? true : false;
                        console.log("点赞状态：" ,this.check_praised);
                    }
                    else if (res.error){
                        this.$toast(res.error.message);
                        console.error(res.error);
                    }
                })
            },
            /**
             * 添加点赞
             */
            add_praise() {
                var body = {
                    source_table: "article",
                    source_field: "article_id",
                    source_id: this.obj.article_id,
                    user_id: this.$store.state.user.user_id,
                };
                var _this = this;
                _this.obj.praise_len = parseInt(_this.obj.praise_len)
                if (!this.check_praised) {
                    this.check_praised = true;
                    this.$post("~/api/praise/add?", body, (res) => {
                        if (res.result) {
                            _this.obj.praise_len += 1;
                            var praise_len = _this.obj.praise_len;
                            this.$post('~/api/article/set?article_id=' + _this.obj["article_id"], {
                                praise_len
                            }, (res) => {
                                if(res.result){
                                    console.log("添加点赞数状态：" ,res.result);
                                }
                                else if(res.error){
                                    console.error(res.error);
                                }
                            });
                            this.$toast("点赞成功");
                        }
                        else if (res.error) {
                            this.$toast(res.error.message);
                            console.error(res.error);
                        }
                    });
                } else {
                    this.check_praised = false;
                    this.$get("~/api/praise/del", body, (res) => {
                        if(res.result){
                            _this.obj.praise_len -= 1;
                            var praise_len = _this.obj.praise_len;
                            this.$post('~/api/article/set?article_id=' + _this.obj["article_id"], {
                                praise_len
                            }, (res) => {
                                if(res.result){
                                    console.log("取消点赞数状态：" ,res.result);
                                }
                                else if(res.error){
                                    console.error(res.error);
                                }
                            });
                            this.$toast("取消点赞");
                        }
                        else if (res.error){
                            this.$toast(res.error.message);
                            console.error(res.error);
                        }
                    });
                }
            },
            /**
             * 添加收藏
             */
            add_collect() {
                var {title, img, article_id} = this.obj;
                var body = {
                    title,
                    img,
                    source_table: "article",
                    source_field: "article_id",
                    source_id: article_id,
                    user_id: this.$store.state.user.user_id,
                };
                if (!this.check_collected) {
                    this.check_collected = true;
                    this.$post("~/api/collect/add?", body, (res) => {
                        this.$toast("收藏成功");
                    });
                } else {
                    this.check_collected = false;
                    this.$get("~/api/collect/del",
                        {
                            user_id: this.$store.state.user.user_id,
                            source_id: article_id,
                        }, (res) => {
                            this.$toast("取消收藏");
                        });
                }
            },
            check_collect() {
                var user_id = this.$store.state.user.user_id;
                var article_id = this.obj.article_id;
                this.$get('~/api/collect/count?', {
                    user_id,
                    source_table: "article",
                    source_field: "article_id",
                    source_id: article_id
                }, (res) => {
                    this.check_collected = res.result
                });
            },
            checkItem() {
                var user_id = this.$store.state.user.user_id;
				let _this = this;
				this.obj.item_list.map(function(obj,index){
					if(obj.user_fk == user_id){
						_this.joinFlag = true;
						_this.userItem = obj;
					}
				})
            }
        },
        mounted() {
			let _this = this;
            setTimeout(() => {
                // this.check_collect();
                // this.get_praise();
				_this.checkItem()
            }, 1000);
        }
    };
</script>

<style scoped>
    .ellipsis_1 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
    }

    div {
        user-select: none;
    }

    .div_article {
        padding: 1.5rem 1rem;
    }

    .aside {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        margin: 0 0.625rem 0.625rem 0;
        font-size: 0.875rem;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        color: rgba(0, 0, 0, 0.3);
    }

    .aside_row {
        height: 2rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    aside_2 {
        display: flex;
        flex-direction: column;
    }

    .source {
        color: #576b95;
        margin: 0 0.2rem;
    }

    .tag {
        display: flex;
        align-items: center;
        padding: 0 0.25rem;
        font-size: 0.75rem;
        border-radius: 0.125rem;
        background: rgba(0, 0, 0, 0.05);
        color: rgba(0, 0, 0, 0.3);
    }


    .title {
        font-size: 1.35rem;
        line-height: 1.4;
        margin-bottom: 1rem;
        font-weight: 400;
    }

    .time {
        position: relative;
        top: 0.125rem;
    }

    .description {
        margin-bottom: 1rem;
        color: #292828;
    }

    .div_article .see {
        margin-left: 1rem;
    }

    .div_article .time {
        color: #999;
    }

    .btns_interact {
        height: 4rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .btns_interact button {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 576px) {
        >>>.content img{
          width: 100%;
          height: 100%;
        }
    }
	div{
		padding: 10px;
	}
	span{
		font-weight: bold;
	}
</style>
