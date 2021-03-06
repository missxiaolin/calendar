import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
Vue.config.productionTip = false;

import Prototype from "@/assets/js/globalPrototype";
Vue.use(Prototype);

import "@/module/directive.js";

import {
  Pagination, //分页
  Dialog, //对话框
  Autocomplete,
  Dropdown, //下拉菜单
  DropdownMenu,
  DropdownItem,
  Menu, //导航菜单
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input, //input
  InputNumber, //计数器
  Radio, //单选框
  RadioGroup,
  RadioButton,
  Checkbox, //多选框
  CheckboxButton,
  CheckboxGroup,
  Switch, //开关
  Select, //select 选择器
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table, //表格
  TableColumn,
  DatePicker, //日期选择器
  TimeSelect,
  TimePicker,
  Popover, //弹出框
  Tooltip, //文字提示
  // Breadcrumb,          // 面包屑
  // BreadcrumbItem,
  Form, //表单
  FormItem,
  Tabs,
  TabPane,
  Tag, //标签
  Tree, //树形控件
  // Alert,               //警告
  // Slider,              //滑块
  Icon, //图标
  // Row,                 //layout 布局
  // Col,
  Upload,
  Progress, //进度条
  // Badge,                  //标记
  // Card,                //卡片
  Rate, //评分
  // Steps,                 //步骤条
  // Step,
  // Carousel,               //走马灯
  // CarouselItem,
  // Collapse,
  // CollapseItem,
  Cascader, //级联选择器
  CascaderPanel,
  ColorPicker, //颜色选择器
  Container, //布局容器
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification,
  Image
} from "element-ui";

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
// Vue.use(Breadcrumb)
// Vue.use(BreadcrumbItem)
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
// Vue.use(Alert)
// Vue.use(Slider)
Vue.use(Icon);
// Vue.use(Row)
// Vue.use(Col)
Vue.use(Upload);
Vue.use(Progress);
// Vue.use(Badge)
// Vue.use(Card)
Vue.use(Rate);
// Vue.use(Steps)
// Vue.use(Step)
// Vue.use(Carousel)
// Vue.use(CarouselItem)
// Vue.use(Collapse)
// Vue.use(CollapseItem)
Vue.use(Cascader);
Vue.use(CascaderPanel);
Vue.use(ColorPicker);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Image);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

/**
 * @module : storage Notice 通过监听window对象的”storage”事件，使其他窗口获取到本窗口发出的【重新登录】指示
 */
import "@/assets/js/storageNotice";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
