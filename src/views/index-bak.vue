<template>
  <div>
    <full-calendar 
    :events="monthData" 
    class="test-fc" 
    :first-day="1"
    locale="fr"
    lang="zh"
    @changeMonth="changeMonth"   
    @eventClick="eventClick"      
    @dayClick="dayClick"         
    @moreClick="moreClick"></full-calendar>    
  </div>
</template>
<script>
import FullCalendar from '@/components/fullcalendar/fullCalendar.vue'
export default {
  data() {
      return {
        monthData: [
           {
              title : '王少林 - eeeeeeeee',  // 事件内容
              start : '2019-11-11', // 事件开始时间
              end : '2019-11-15',   // 事件结束时间
              cssClass: 'red'       // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
            },
            {
              title : 'sssss',
              start : '2019-11-25',
              end : '2019-11-30',
              cssClass: 'blue'  
            },
            {
              title : 'dddddddd',
              start : '2019-11-09',
              end : '2019-11-30',
              cssClass: 'blue'  
            },
            {
              title : 'cccccc',
              start : '2019-11-20',
              end : '2019-11-30',
              cssClass: 'red'  
            },
            {
              title : 'aaaaaa',
              start : '2019-11-01',
              end : '2019-11-30',
              cssClass: 'red'  
            },
            {
              title : 'bbbbbb',
              start : '2019-11-05',
              end : '2019-1-10',
              cssClass: 'blue'
            }
        ]
      }
  },
  methods: {
     // 选择月份
      changeMonth (start, end, current) {
        console.log('1111-------->',start, end, current)
      //  console.log('changeMonth', start.format(), end.format(), current.format())
      },
      // 点击事件
      eventClick (event, jsEvent, pos) {
        console.log('eventClick', event, jsEvent, pos)
      },
      // 点击当天
      dayClick (day, jsEvent) {
         console.log('dayClick', day, jsEvent)
      },
      // 查看更多
      moreClick (day, events, jsEvent) {
        console.log('moreCLick', day, events, jsEvent)
      },
  },
  components: {
      'full-calendar': FullCalendar
  },
}
</script>
<style>
.full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.red {
  background: red;
}
.full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.blue {
  background: blue;
}
</style>