<template>
  <div class="layui-card" id="app">

    <el-container class="margin-t">
      <el-header class="main-view" height="10vh">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="拼团名称">
           <el-input placeholder="输入拼团帖标题" v-model="title"></el-input>
           
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
		  <el-form-item>
		    <el-button type="success" @click="showItem=true;">新增</el-button>
		  </el-form-item>
        </el-form>

      </el-header>
      <el-main class="main-view" style="min-height: 87vh;">

        <el-table :stripe="true" :data="tableData" class="el-table__body">
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

      </el-main>
    </el-container>
	
	<el-dialog title="拼团维护" :visible.sync="showItem">
	  <div>
		  <list_travel_edit :obj="selObj" @subInfo="subInfo"> </list_travel_edit>
	  </div>
	</el-dialog>
	
  </div>
</template>

<script>
	
	import list_travel_edit from "@/components/diy/list_travel_edit.vue";
  export default {
    name: 'travelManager',
	components: {
		list_travel_edit
	},
    data: function() {
      return {
		showItem:false,
        title: "",
        user: '',
        show: false,
        dataView: {},
        tableData: [],
        userInfo: {},
        selObj: {},
        selName: "",
        setBtn: false,
        picPath: "",
		allPark:[],
        stateNameArr:['拼团中','已结束','已取消'],
        stateColorNameArr:['red','blue','green']
      };
    },
    mounted() {

    },
    created() {
      this.getTable();
    },
    methods: {
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
		  		_this.getTable();
				_this.showItem = false;
		  	}else{
		  		_this.$toast("提交异常");
		  	}
		  })
	  },		
      onSubmit(){
        this.getTable();
      },
      delData(row) {
        this.dataView = row;
        this.dataView["validFlag"] = 0;
        this.editData();
      },
	  editData(){
		  let _this = this;
		  let body = {
			  valid_flag:0,
			  id:this.dataView.id
		  }
		  this.$post("~/api/group_travel_main/edit_group_travel?", body, (res) => {
		  	if (res.result==1) {
		  		_this.$toast("删除成功");
				_this.getTable();
		  	}else{
		  		_this.$toast("删除异常");
		  	}
		  })
	  },
      getTable() {
		let _this = this;
		let body = {
			valid_flag:1,
			page:1,
			size:1000,
			orderby:" create_time desc ",
			title:this.title
		};
		this.$get("~/api/group_travel_main/get_group_list?", body, (res) => {
			if (res.result) {
				this.tableData = res.result.list;
			}else{
				this.$toast("数据获取异常");
			}
		})
      },
	  countTime(row){
	    let begin = new Date(row.beginTime).getTime();
	    let end = row.endTime ? new Date(row.endTime).getTime() : new Date().getTime();
	  	let diff = end - begin;
	  	return (diff/(1000*60)).toFixed(2);
	  }
    }
  }
</script>

<style>
	.el-form-item__label{
		min-width: 90px !important;
	}
</style>
