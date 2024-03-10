<template>
  <div class="page_search">
	<div class="warp">
	  <div class="container">
		<div class="row">
		  <div class="col-12">
			<div class="card_result_search">
			  <div class="title">搜索结果</div>
				<!-- 文章搜索结果 -->
			  <list_result_search
				:list="result_article"
				title="旅游资讯"
				source_table="article"
			  ></list_result_search>
				<!-- 论坛搜索结果 -->
			  <list_result_search
				:list="result_forum"
				title="留言板"
				source_table="forum"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/scenic_spot_information/list', 'get')"
				:list="result_scenic_spot_information_name_of_scenic_spot"
				title="景点信息景点名称"
				source_table="scenic_spot_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/scenic_spot_information/list', 'get')"
				:list="result_scenic_spot_information_region"
				title="景点信息地区"
				source_table="scenic_spot_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/ticket_reservation/list', 'get')"
				:list="result_ticket_reservation_scheduled_time"
				title="门票预定预定时间"
				source_table="ticket_reservation"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/ticket_reservation/list', 'get')"
				:list="result_ticket_reservation_order_status"
				title="门票预定订单状态"
				source_table="ticket_reservation"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/hotel_information/list', 'get')"
				:list="result_hotel_information_hotel_name"
				title="酒店信息酒店名称"
				source_table="hotel_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/hotel_information/list', 'get')"
				:list="result_hotel_information_hotel_star"
				title="酒店信息酒店星级"
				source_table="hotel_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/hotel_reservation/list', 'get')"
				:list="result_hotel_reservation_scheduled_time"
				title="酒店预定预定时间"
				source_table="hotel_reservation"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/hotel_reservation/list', 'get')"
				:list="result_hotel_reservation_order_status"
				title="酒店预定订单状态"
				source_table="hotel_reservation"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/weather_information/list', 'get')"
				:list="result_weather_information_region"
				title="天气信息地区"
				source_table="weather_information"
			  ></list_result_search>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </div>
</template>

<script>
import mixin from "../../mixins/page.js";
import list_result_search from "../../components/diy/list_result_search.vue";

export default {
  mixins: [mixin],
  data() {
	return {
	  "query": {
		word: "",
	  },
	  "result_article": [],
	  "result_forum": [],
			"result_scenic_spot_information_name_of_scenic_spot":[],
			"result_scenic_spot_information_region":[],
			"result_ticket_reservation_scheduled_time":[],
			"result_ticket_reservation_order_status":[],
			"result_hotel_information_hotel_name":[],
			"result_hotel_information_hotel_star":[],
			"result_hotel_reservation_scheduled_time":[],
			"result_hotel_reservation_order_status":[],
			"result_weather_information_region":[],
	};
  },
  methods: {
	/**
	 * 获取文章
	 */
	get_article() {
	  this.$get("~/api/article/get_list?like=0", { page: 1, size: 10, title: this.query.word }, (json) => {
		if (json.result) {
		  this.result_article = json.result.list;
		}
	  });
	},
	/**
	 * 获取留言板
	 */
	get_forum() {
	  this.$get("~/api/forum/get_list?like=0", { page: 1, size: 10, title: this.query.word }, (json) => {
		if (json.result) {
		  this.result_forum = json.result.list;
		}
	  });
	},
	/**
	 * 获取name_of_scenic_spot
	 */
	get_scenic_spot_information_name_of_scenic_spot(){
		this.$get("~/api/scenic_spot_information/get_list?like=0", { page: 1, size: 10, "name_of_scenic_spot": this.query.word }, (json) => {
		  if (json.result) {
			var result_scenic_spot_information_name_of_scenic_spot = json.result.list;
			result_scenic_spot_information_name_of_scenic_spot.map(o => o.title = o['name_of_scenic_spot'])
	  			this.result_scenic_spot_information_name_of_scenic_spot = result_scenic_spot_information_name_of_scenic_spot
		 	}
		});
	},
	/**
	 * 获取region
	 */
	get_scenic_spot_information_region(){
		this.$get("~/api/scenic_spot_information/get_list?like=0", { page: 1, size: 10, "region": this.query.word }, (json) => {
		  if (json.result) {
			var result_scenic_spot_information_region = json.result.list;
			result_scenic_spot_information_region.map(o => o.title = o['region'])
	  			this.result_scenic_spot_information_region = result_scenic_spot_information_region
		 	}
		});
	},
	/**
	 * 获取scheduled_time
	 */
	get_ticket_reservation_scheduled_time(){
		this.$get("~/api/ticket_reservation/get_list?like=0", { page: 1, size: 10, "scheduled_time": this.query.word }, (json) => {
		  if (json.result) {
			var result_ticket_reservation_scheduled_time = json.result.list;
			result_ticket_reservation_scheduled_time.map(o => o.title = o['scheduled_time'])
	  			this.result_ticket_reservation_scheduled_time = result_ticket_reservation_scheduled_time
		 	}
		});
	},
	/**
	 * 获取order_status
	 */
	get_ticket_reservation_order_status(){
		this.$get("~/api/ticket_reservation/get_list?like=0", { page: 1, size: 10, "order_status": this.query.word }, (json) => {
		  if (json.result) {
			var result_ticket_reservation_order_status = json.result.list;
			result_ticket_reservation_order_status.map(o => o.title = o['order_status'])
	  			this.result_ticket_reservation_order_status = result_ticket_reservation_order_status
		 	}
		});
	},
	/**
	 * 获取hotel_name
	 */
	get_hotel_information_hotel_name(){
		this.$get("~/api/hotel_information/get_list?like=0", { page: 1, size: 10, "hotel_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_hotel_information_hotel_name = json.result.list;
			result_hotel_information_hotel_name.map(o => o.title = o['hotel_name'])
	  			this.result_hotel_information_hotel_name = result_hotel_information_hotel_name
		 	}
		});
	},
	/**
	 * 获取hotel_star
	 */
	get_hotel_information_hotel_star(){
		this.$get("~/api/hotel_information/get_list?like=0", { page: 1, size: 10, "hotel_star": this.query.word }, (json) => {
		  if (json.result) {
			var result_hotel_information_hotel_star = json.result.list;
			result_hotel_information_hotel_star.map(o => o.title = o['hotel_star'])
	  			this.result_hotel_information_hotel_star = result_hotel_information_hotel_star
		 	}
		});
	},
	/**
	 * 获取scheduled_time
	 */
	get_hotel_reservation_scheduled_time(){
		this.$get("~/api/hotel_reservation/get_list?like=0", { page: 1, size: 10, "scheduled_time": this.query.word }, (json) => {
		  if (json.result) {
			var result_hotel_reservation_scheduled_time = json.result.list;
			result_hotel_reservation_scheduled_time.map(o => o.title = o['scheduled_time'])
	  			this.result_hotel_reservation_scheduled_time = result_hotel_reservation_scheduled_time
		 	}
		});
	},
	/**
	 * 获取order_status
	 */
	get_hotel_reservation_order_status(){
		this.$get("~/api/hotel_reservation/get_list?like=0", { page: 1, size: 10, "order_status": this.query.word }, (json) => {
		  if (json.result) {
			var result_hotel_reservation_order_status = json.result.list;
			result_hotel_reservation_order_status.map(o => o.title = o['order_status'])
	  			this.result_hotel_reservation_order_status = result_hotel_reservation_order_status
		 	}
		});
	},
	/**
	 * 获取region
	 */
	get_weather_information_region(){
		this.$get("~/api/weather_information/get_list?like=0", { page: 1, size: 10, "region": this.query.word }, (json) => {
		  if (json.result) {
			var result_weather_information_region = json.result.list;
			result_weather_information_region.map(o => o.title = o['region'])
	  			this.result_weather_information_region = result_weather_information_region
		 	}
		});
	},

  },
  components: { list_result_search },
	created(){
    this.query.word = this.$route.query.word || "";
  },
  mounted() {
	this.get_article();
	this.get_forum();
		this.get_scenic_spot_information_name_of_scenic_spot();
		this.get_scenic_spot_information_region();
		this.get_ticket_reservation_scheduled_time();
		this.get_ticket_reservation_order_status();
		this.get_hotel_information_hotel_name();
		this.get_hotel_information_hotel_star();
		this.get_hotel_reservation_scheduled_time();
		this.get_hotel_reservation_order_status();
		this.get_weather_information_region();
  },
  watch: {
	$route() {
	  $.push(this.query, this.$route.query);
	  this.get_article();
	  this.get_forum();
	  this.get_scenic_spot_information_name_of_scenic_spot();
	  this.get_scenic_spot_information_region();
	  this.get_ticket_reservation_scheduled_time();
	  this.get_ticket_reservation_order_status();
	  this.get_hotel_information_hotel_name();
	  this.get_hotel_information_hotel_star();
	  this.get_hotel_reservation_scheduled_time();
	  this.get_hotel_reservation_order_status();
	  this.get_weather_information_region();
	},
  },
};
</script>

<style scoped>
.card_search {
  text-align: center;
}
.card_result_search>.title {
  text-align: center;
  padding: 10px 0;
}
</style>
