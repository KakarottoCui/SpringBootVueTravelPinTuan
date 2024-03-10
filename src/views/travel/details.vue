<template>
    <div class="page_article">
        <div class="warp">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-lg-9 col-md-12">
                        <div class="card">
                            <!-- 文章详情 -->
                            <div class="article_detail">
                                <div_travel :obj="obj"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-3">
                          <!-- 热门文章推荐 -->
                          <!-- <div class="list_hot">
                              <div class="hot_title">
                                  热门文章推荐
                              </div>
                              <list_article_hot :list="list_hot"/>
                          </div> -->
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import mixin from "@/mixins/page.js";
    import bar_title from "@/components/diy/bar_title.vue";
    import div_travel from "@/components/diy/div_travel.vue";
    import list_article_hot from "@/components/diy/list_article_hot.vue";
    import list_comment from "@/components/diy/list_comment.vue";
    import form_editor from "@/components/diy/form_editor.vue";

    export default {
        mixins: [mixin],
        components: {
            list_comment,
            div_travel,
            list_article_hot,
            bar_title,
            form_editor,
        },
        data() {
            return {
                url_get_obj: "~/api/group_travel_main/get_group_obj?",
                field: "id",
                obj: {},
                query: {
                    id: 0,
                },
                list_hot: [],
                list_comment: [],
                form_comment: {
                    source_table: "article",
                    source_field: "article_id",
                    source_id: 0,
                    reply_to_id: 0,
                },
                count_pages: 1, // 页面数
                seted_count_pages: true, // 是否设置过
            };
        },
        methods: {
            /**
             * 获取评论后
             * @param {Object} json 响应对象
             */
            get_obj_after(json) {
                this.form_comment.source_id = this.query.article_id;
            },
            /**
             * 获取热门文章
             */
            get_hot_article() {
                this.$get(
                    "~/api/group_travel_main/get_list",
                    {
                        page: 1,
                        size: 10,
						valid_flag:1
                    },
                    (res) => {
                        if (res.result) {
                            this.list_hot = res.result.list;
                        }
                    }
                );
            },
            /**
             * 获取评论
             * @param { Object } obj 文章对象
             * @param { Number } page 分页数
             * @param { Number } size 评论显示条数
             */
            get_comment(obj,page = 1, size = 5) {
                this.$get(
                    "~/api/comment/get_list?",
                    {
                        source_table: "article",
                        source_field: "article_id",
                        source_id: this.obj.article_id,
                        page,
                        size,
                        reply_to_id: "0",
                        orderby: "create_time desc",
                    },
                    (json) => {
                        if (json.result) {
                            var list_comment = json.result.list;
                            list_comment.map((o) => {
                                o.list_reply = [];
                            });
                            this.add_reply(list_comment).then((list) => {
                                this.list_comment = list;
                            });
                            // 分页器
                            // if (this.seted_count_pages) {
                            //   this.seted_count_pages = false;
                            //   this.count_pages = Math.ceil(json.result.count / size);
                            // }
                            this.count_pages = Math.ceil(json.result.count / size) || 1
                        }
                    }
                );
            },

            /**
             * @param { Array } list 评论列表
             * 添加回复到评论列表
             */
            add_reply(list) {
                return new Promise((resolve) => {
                    for (let idx = 0; idx < list.length; idx++) {
                        const obj = list[idx];
                        this.$get(
                            "~/api/comment/get_list?",
                            {
                                source_table: "article",
                                source_field: "article_id",
                                source_id: obj.article_id,
                                orderby: "create_time desc",
                                reply_to_id: obj.comment_id,
                            },
                            (res) => {
                                if (res.result) {
                                    obj.list_reply = res.result.list;
                                }
                            }
                        );
                    }
                    resolve(list);
                });
            },

            /**
             * 更新评论
             */
            update_comment() {
                this.get_comment(this.obj);
            },
            /**
             * 分页器
             * @param { Number } page_num 分页数
             * @return { Object } 查询对象
             */
            link_gen(page_num) {
                return {
                    query: this.query,
                };
            },
            /**
             *加载下一页
             */
            change_page(page_num) {
                this.get_comment(this.obj, page_num);
                this.form_comment.reply_to_id = 0;
            },
            /**
             * 获取对象之后
             * @param {Object} json 结果对象
             */
            get_obj_after(json) {
              let obj = json.result.obj;
              this.add_hits(obj)
              this.get_comment(obj);
              this.form_comment.source_id = obj.article_id;
            },
            /**
             * 添加访问量
             */
            add_hits(obj) {
              this.$post('~/api/article/set?article_id=' + obj.article_id, {
                hits: parseInt(obj.hits) + 1
              }, res => {
                obj.hits =parseInt(obj.hits)+ 1
                console.log(res);
              })
            }
        },
        computed: {
            respondent() {
                var reply_to_id = this.form_comment.reply_to_id;
                var respondent = "";
                this.list_comment.map((o) => {
                    if (o.comment_id === reply_to_id) {
                        respondent = o.nickname;
                    }
                });
                return respondent;
            },
        },
        mounted() {
            this.get_hot_article();
        },
    };
</script>

<style scoped>

    .card {
        border-radius: 0.5rem;
    }

    .list_hot {
      color: white;
      background-color: var(--color_primary);
      margin: 0.5rem;
      padding: 1rem;
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

    .form_editor {
        padding: 10px;
    }

    .comment_box {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
