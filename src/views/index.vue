<template>
  <div class="calendar-content flex">
    <div class="calendar-left">
      <template  v-for="item in memberList">
        <div class="left-title" :key="item.name">平台前端组</div>
        <div class="member-list" :key="item.name+'1'">
          <ul>
            <li v-for="child in item.children" :key="child.name">
              <eb-checkbox v-model="child.isCheck" :color="child.color">{{child.name}}</eb-checkbox>
            </li>
          </ul>
        </div>
      </template>
      <div class="operating-content" v-if="editable">
        <p>
          <el-button size="mini" type="warning" @click="handleShowGroup">新增小组</el-button>
        </p>
        <p>
          <el-button size="mini" type="warning" @click="handleShowMember">新增人员</el-button>
        </p>
        <p>
          <el-button size="mini" type="primary" @click="handleDownJson('task',calendarEventLists)">下载任务</el-button>
        </p>
        <p>
          <el-button size="mini" type="success" @click="handleDownJson('member',memberList)">下载成员</el-button>
        </p>
      </div>
    </div>
    <FullCalendar
      class="demo-app-calendar flex-1"
      ref="fullCalendar"
      defaultView="dayGridMonth"
      :header="{
        left: 'prev,next,today',
        center: 'title',
        right: 'dayGridDay,dayGridWeek,dayGridMonth,listWeek'
      }"
      locale="zh-cn"
      minTime="09:00:00"
      maxTime="22:00:00"
      :firstDay="0"
      :plugins="calendarPlugins"
      :weekends="calendarWeekends"
      :events="calendarEvents"
      :editable="editable"
      :droppable="editable"
      :selectable="editable"
      :weekNumbers="true"
      :weekNumbersWithinDays="true"
      :buttonIcons="true"
      :eventLimit="eventLimit"
      @eventDrop="handleEventDrop"
      @select="handleSelect"
      @eventClick="handleEventClick"
      @eventLimitClick="eventLimitClick"
    />
    <el-dialog
      :title="eventsInfo.extendedProps.principal"
      width="500px"
      :visible.sync="eventsVisible"
    >
      <div class="task-content">
        <div class="form-row">
          <label class="form-label">负责人：</label>
          <div class="form-control">{{eventsInfo.extendedProps.principal}}</div>
        </div>
        <div class="form-row">
          <label class="form-label">需求名称：</label>
          <div class="form-control">{{eventsInfo.title}}</div>
        </div>
        <div class="form-row">
          <label class="form-label">需求状态：</label>
          <div class="form-control">{{eventsInfo.extendedProps.type}}</div>
        </div>
        <div class="form-row">
          <label class="form-label">开始时间：</label>
          <div class="form-control">{{formatDate(new Date(eventsInfo.start))}}</div>
        </div>
        <div class="form-row">
          <label class="form-label">结束时间：</label>
          <div class="form-control">{{formatDate(new Date(eventsInfo.end))}}</div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" v-if="editable">
          <el-button size="small" type="danger" @click="handleRemoveTask">删除</el-button>
          <el-button size="small" type="primary" @click="handleEditTask">编辑</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="taskInfo.heardTitle" width="500px" :visible.sync="taskVisible">
      <div class="task-content">
        <div class="form-row">
          <label class="form-label">负责人：</label>
          <div class="form-control">
            <el-cascader
            v-model="taskInfo.principal"
            size="small"
            :options="memberList"
            :props="{'label':'name','value':'name'}"></el-cascader>
          </div>
        </div>
        <div class="form-row">
          <label class="form-label">需求名称：</label>
          <div class="form-control">
            <el-input size="small" clearable placeholder="请输入需求名称" v-model="taskInfo.title"></el-input>
          </div>
        </div>
        <div class="form-row">
          <label class="form-label">需求类型：</label>
          <div class="form-control">
            <el-select v-model="taskInfo.type" size="small">
              <el-option
                v-for="item in taskTypeList"
                :key="item.key"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="form-row">
          <label class="form-label">需求周期</label>
          <div class="form-control">
            <el-date-picker
              v-model="taskInfo.times"
              type="daterange"
              size="small"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :editable="false"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" v-if="editable">
        <el-button size="small" @click="taskVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleAddTask">{{taskInfo.isEidt ? "编辑" : "新增"}}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="memberInfo.title" width="500px" :visible.sync="memberInfo.memberVisble">
      <div class="task-content">
        <div class="form-row">
          <label class="form-label">所属小组：</label>
          <div class="form-control">
            <el-select v-model="memberInfo.groupName" size="small" placeholder="请选择所属小组">
              <el-option
                v-for="item in memberList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="form-row">
          <label class="form-label">负责人：</label>
          <div class="form-control">
            <el-input size="small" clearable placeholder="请输入负责人姓名" v-model="memberInfo.query.name"></el-input>
          </div>
        </div>
        <div class="form-row">
          <label class="form-label">标示色彩：</label>
          <div class="form-control">
            <el-input size="small" clearable placeholder="请选择标示色彩" readonly v-model="memberInfo.query.color"></el-input> <i style="margin-left:10px"></i><el-color-picker v-model="memberInfo.query.color" size="small"></el-color-picker>
          </div>
        </div>
        <div class="form-row">
          <label class="form-label">任务展示：</label>
          <div class="form-control">
            <el-switch
              v-model="memberInfo.query.isCheck"
              active-text="展示任务"
              inactive-text="不展示任务">
            </el-switch>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="memberInfo.memberVisble = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleAddMember">{{memberInfo.isEidt ? "编辑" : "新增"}}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="groupInfo.title" width="500px" :visible.sync="groupInfo.visble">
      <div class="task-content">
        <div class="form-row">
          <label class="form-label">小组名称：</label>
          <div class="form-control">
            <el-input size="small" clearable placeholder="请输入小组名称" v-model="groupInfo.name"></el-input>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="groupInfo.visble = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleAddGroup">{{groupInfo.isEidt ? "编辑" : "新增"}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import FullCalendar from "@/components/@fullcalendar/vue";
import dayGridPlugin from "@/components/@fullcalendar/daygrid";
import timeGridPlugin from "@/components/@fullcalendar/timegrid";
import listPlugin from "@/components/@fullcalendar/list";
import interactionPlugin from "@/components/@fullcalendar/interaction";
import { saveAs } from "file-saver";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    "eb-checkbox": () => import("@/components/checkbox")
  },
  data: function() {
    return {
      calendarPlugins: [
        // plugins must be defined in the JS
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        interactionPlugin // needed for dateClick
      ],
      calendarWeekends: true,
      editable: false, //是否开启编辑模式
      // droppable: true, //是否开启拖拽模式
      // selectable: true, //
      eventLimit: false, //是否开启限制 默认3
      calendarEventLists: [],
      memberList: [],
      eventsVisible: false,
      eventsInfo: {
        extendedProps: {}
      },
      taskVisible: false,
      taskInfo: {
        heardTitle: "新增任务",
        principal: "",
        title: "",
        type: "",
        times: [],
        isEidt: false, //是否是编辑状态 
      },
      memberInfo: {
        title: '人员新增',
        memberVisble: false,
        isEidt: false, //是否是编辑状态 
        groupName:'',
        query: {
          name: '',
          color: '',
          isCheck: false,
        }
      },
      groupInfo: {
        visble: false,
        title: '新增小组',
        name: '',
        isEidt: false,     
      },
      taskTypeList: [
        {
          key: "develop",
          value: "开发"
        },
        {
          key: "debugging",
          value: "联调"
        },
        {
          key: "all",
          value: "开发+联调"
        },
        {
          key: "test",
          value: "提测"
        },
        {
          key: "online",
          value: "上线"
        },
      ]
    };
  },
  watch: {
    memberStatus(newValue, oldValue) {
      console.log("newValue---->", newValue);
      if (newValue) {
        let memberList = window.sessionStorage.getItem("member");
        console.log(memberList);
      }
    }
  },
  computed: {
    calendarEvents() {
      let list = this.calendarEventLists.map((item,index) => {
        let principalList = this.getNodeValue(this.memberList,item.principal,'name')
        //  this.memberList.filter(
        //   sitem => item.principal == sitem.name
        // );
        if (Object.keys(principalList).length) {
          item.isShow = principalList.isCheck;
          item.color = principalList.color;
        } else {
          item.isShow = true;
          // item.color = principalList[0].color;
        }
        return item;
      });
      console.log("this.calendarEventLists--->", list);
      return list;
    },
  },
  watch: {
    calendarEvents(newValue, oldValue) {
      setTimeout(() => {
        this.$refs.fullCalendar.$emit("refetchEvents");
      }, 600);
    }
  },
  mounted() {
    if(!sessionStorage.getItem('member')){
      this.init();
    }else{
      this.handleQueryMember();
      this.handleQueryTask();
    }
    //开启编辑权限
    this.editable = sessionStorage.getItem('edit')
  },
  methods: {
    init(){
      this.handleCreatJs("https://enmonster-web.oss-cn-shanghai.aliyuncs.com/calendar/member.js", 'member' ,()=>{
        // console.log()
        this.handleQueryMember();
      });
      this.handleCreatJs("https://enmonster-web.oss-cn-shanghai.aliyuncs.com/calendar/task.js","task",()=>{
        this.handleQueryTask();
      })
    },
    /**
     * 获取成员数据
     */
    handleQueryMember(){
      let members = JSON.parse(sessionStorage.getItem('member'));
      if(members)
      this.memberList = members;
    },
    /**
     * 获取任务数据
     */
    handleQueryTask(){
      let tasks = JSON.parse(sessionStorage.getItem('task'));
      if(tasks)
      this.calendarEventLists = tasks;
    },
    /**
     * 加载远程js
     * @param {url, jsId, callback}
     */
    handleCreatJs(url, jsId, callback) {
      let oldJs = window.parent.document.getElementById(jsId)
      //判断是否存在，如果存在先移除，再重新创建
      if (oldJs != null) {
        window.parent.document.getElementsByTagName('head')[0].removeChild(oldJs)
      }
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.setAttribute("id", jsId);
      document.getElementsByTagName('head')[0].appendChild(script);
      if (typeof callback != "undefined") {
        if (script.readyState) {
          script.onreadystatechange = function() {
            if (
              script.readyState == "loaded" ||
              script.readyState == "complete"
            ) {
              script.onreadystatechange = null;
              callback();
            }
          };
        } else {
          script.onload = function() {
            callback();
          };
        }
      }
    },
    /**
     * 递归获取tree数据模型node
     */
    getNodeValue(Data, ID,field) {
      let Deep, T, F;
      for (F = Data.length; F;) {
        T = Data[--F]
        if (ID === T[field]) return T
        if (T.children) {
          Deep = this.getNodeValue(T.children, ID,field)
          if (Deep) return Deep
        }
      }
    },
    /**
     * 点击日历日期
     */
    // handleDateClick(arg) {
    //   if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
    //     this.calendarEvents.push({
    //       // add new event data
    //       title: "New Event",
    //       start: arg.date,
    //       allDay: arg.allDay
    //     });
    //   }
    // },
    /**
     * 点击日历任务
     */
    handleEventClick(info) {
      console.log("info---->", info);
      this.eventsInfo = info.event;
      this.eventsVisible = true;
    },
    /**
     * 日历任务拖拽
     */
    handleEventDrop(info) {
      // console.log(info);
      if (!confirm("Are you sure about this change?")) {
        info.revert();
      }
    },
    /**
     * 重置任务信息
     */
    handleRestTaskInfo(){
      this.taskInfo = {
        heardTitle: "新增任务",
        principal: "",
        title: "",
        type: "",
        times: [],
        isEidt: false, //是否是编辑状态 
      }
    },
    /**
     * 选择日历日期 添加任务
     */
    handleSelect(info) {
      // console.log("info--->", info);
      this.handleRestTaskInfo();
      let endTime = new Date(
        new Date(info.endStr).getTime() - 24 * 60 * 60 * 1000
      );
      endTime = this.formatDate(endTime);
      this.taskInfo.times = [].concat([info.startStr, endTime]);
      this.taskVisible = true;
    },
    /**
     * 任务展示条数受限，点击更多
     */
    eventLimitClick(info) {
      console.log("info----->", info);
    },
    /**
     * 新增 / 编辑 任务
     */
    handleAddTask() {
      let principal = this.taskInfo.principal;
      if(!principal.length){
        this.$message.error('请选择负责人');
        return;
      }
      if(!this.taskInfo.title.length){
        this.$message.error('请输入需求名称');
        return;
      }
      if(!this.taskInfo.type.length){
        this.$message.error('请选择需求类型');
        return;
      }
      if(!this.taskInfo.times || !this.taskInfo.times.length){
        this.$message.error('请选择需求周期');
        return;
      }
      let newTask = {
          title: this.taskInfo.title,
          start: new Date(this.taskInfo.times[0]),
          end: new Date(this.taskInfo.times[1]),
          principal: principal[principal.length-1],
          type: this.taskInfo.type,
          id: this.nowDateTime().replace(/[-\s+(:)]/g, "")
        }
      console.log('newTask---->',newTask)
      if(this.taskInfo.isEidt){
        let nodeIndex = this.calendarEventLists.findIndex(item=> item.id == this.taskInfo.id);
        this.calendarEventLists.splice(nodeIndex,1,newTask)
      }else{
        this.calendarEventLists.push(newTask);
      }
      this.taskVisible = false;
      this.handleSessionStorage('task',this.calendarEventLists);
    },
    /**
     * 移除任务
     */
    handleRemoveTask(){
      this.eventsVisible = false;
      this.$confirm(`是否移除${this.eventsInfo.extendedProps.principal}的${this.eventsInfo.title}任务？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let nodeIndex = this.calendarEventLists.findIndex(item=> item.id == this.taskInfo.id);
        this.calendarEventLists.splice(nodeIndex,1)
        this.handleSessionStorage('task',this.calendarEventLists);
      }).catch(() => {
                
      });
      
    },
    
    /**
     * 编辑任务
     */
    handleEditTask(){
      console.log('this.eventsInfo---->',this.eventsInfo)
      this.taskInfo = {
        heardTitle: `编辑【${this.eventsInfo.extendedProps.principal}】任务`,
        principal: `${this.eventsInfo.extendedProps.principal}`,
        title: `${this.eventsInfo.title}`,
        type: `${this.eventsInfo.extendedProps.type}`,
        times: [this.formatDate(new Date(this.eventsInfo.start)),this.formatDate(new Date(this.eventsInfo.end))],
        id: `${this.eventsInfo.id}`,
        isEidt: true
      }
      this.eventsVisible = false;
      setTimeout(() => {
        this.taskVisible = true;
      }, 300);
    },
    /**
     * 新增小组
     */
    handleShowGroup(){
      this.groupInfo = {
        visble: true,
        title: '新增小组',
        name: '',
        isEidt: false,     
      }
    },
    /**
     * 加载小组
     */
    handleAddGroup(){
      if(!this.groupInfo.name.length){
        this.$message.error('请填写小组名称');
        return;
      }
      this.memberList.push({
        name: this.groupInfo.name,
        children: []
      })
      this.memberInfo.visble = false;
      this.handleSessionStorage('member',this.memberList)
    },
    /**
     * 人员新增
     */
    handleShowMember(){
      this.memberInfo =  {
        title: '人员新增',
        memberVisble: true,
        isEidt: false, //是否是编辑状态 
        groupName:'',
        query: {
          name: '',
          color: '',
          isCheck: false,
        }
      }
    },
    /**
     * 新增成员
     */
    handleAddMember(){
      console.log(this.memberInfo.query)
      if(!this.memberInfo.groupName.length){
        this.$message.error('请选择所属小组');
        return;
      }
      if(!this.memberInfo.query.name.length){
        this.$message.error('请填写负责人');
        return;
      }
      if(!this.memberInfo.query.color.length){
        this.$message.error('请选择负责人标示色');
        return;
      }
      let nodeIndex = this.memberList.findIndex(item=>item.name == this.memberInfo.groupName);
      let principal = {...this.memberInfo.query}
      this.memberList[nodeIndex].children.push(principal);
      this.memberInfo.memberVisble = false;
      this.handleSessionStorage('member',this.memberList)
    },
    /**
     * 设置任务存储
     */
    handleSessionStorage(name,data){
      sessionStorage.setItem(name,JSON.stringify(data));
    },
    /**
     * 下载数据
     */
    handleDownJson(fileName, data) {
      data = JSON.stringify(data);
      let content = `window.sessionStorage.setItem(${JSON.stringify(
        fileName
      )},${JSON.stringify(data)})`;
      let blob = new Blob([content], { type: "" });
      saveAs(blob, `${fileName}.js`);
    },
  }
};
</script>
<style lang="scss" scoped>
  .calendar-content {
    padding: 20px;
  }
  .calendar-left { width: 200px;
    .left-title{ line-height: 34px; font-weight: 700; font-size: 15px;}
    .member-list{ line-height: 28px;}
    .operating-content{ width: 100%; margin-top: 50px;
      p{ margin-top: 15px;}
    }
  }

  .task-content {
    width: 100%;
  }
  
</style>
<style lang='scss'>
// you must include each plugins' css
// paths prefixed with ~ signify node_modules
@import "../components/@fullcalendar/core/main.css";
@import "../components/@fullcalendar/daygrid/main.css";
@import "../components/@fullcalendar/timegrid/main.css";
</style>