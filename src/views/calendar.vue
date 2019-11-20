<template>
  <div class='demo-app'>
    <div class='demo-app-top'>
      <button @click="toggleWeekends">toggle weekends</button>
      <button @click="gotoPast">go to a date in the past</button>
      (also, click a date/time to add an event)
    </div>
    <FullCalendar
      class='demo-app-calendar'
      ref="fullCalendar"
      defaultView="resourceTimelineTenDay"
      :header="{
        left: 'today prev,next',
        center: 'title',
        right: 'resourceTimelineDay,resourceTimelineTenDay,resourceTimelineWeek,resourceTimelineMonth'
      }"
      locale="zh-cn"
      firstDay="1"
      minTime="09:00:00"
      maxTime="22:00:00"
      resourceLabelText= '资源'
      :plugins="calendarPlugins"
      :aspectRatio="1.3"
      :editable="true"
      :nowIndicator="true"
      :resources="resources"
      :events="events"
      :views="viewsList"
      @eventClick="handleEventClick"
      />
  </div>
</template>

<script>
import FullCalendar from '@/components/@fullcalendar/vue'
import dayGridPlugin from '@/components/@fullcalendar/daygrid'
import timeGridPlugin from '@/components/@fullcalendar/timegrid'
import interactionPlugin from '@/components/@fullcalendar/interaction'
import resourceTimelinePlugin from '@/components/@fullcalendar/resource-timeline';
export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data: function() {
    return {
      calendarPlugins: [ // plugins must be defined in the JS
        interactionPlugin,
        resourceTimelinePlugin
      ],
      viewsList:{
        resourceTimelineDay: {
          buttonText: ':15 slots',
          slotDuration: '00:15'
        },
        resourceTimelineTenDay: {
          type: 'resourceTimeline',
          duration: { days: 10 },
          buttonText: '10 days'
        }
      },
      calendarWeekends: true,
      editable: true,
      droppable: true,
      selectable: true,
      resources: '/api/calendar/resources.json',
      events: '/api/calendar/events.json'

    }
  },
  methods: {
    toggleWeekends() {
      this.calendarWeekends = !this.calendarWeekends // update a property
    },
    gotoPast() {
      let calendarApi = this.$refs.fullCalendar.getApi() // from the ref="..."
      calendarApi.gotoDate('2020-01-01') // call a method on the Calendar object
    },
    handleDateClick(arg) {
      if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
        this.calendarEvents.push({ // add new event data
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay
        })
      }
    },
    handleEventClick(info){
      console.log('info---->',info)
      console.log('Event: ' + info.event.title);
      console.log('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      console.log('View: ' + info.view.type);
    },
    handleEventDrop(info){
      console.log(info)
      // alert(info.event.title + " was dropped on " + info.event.start.toISOString());

      if (!confirm("Are you sure about this change?")) {
        info.revert();
      }
    },
    handleSelect(info) {
        // if(!confirm ('selected ' + info.startStr + ' to ' + info.endStr)){
          
        // };
        this.calendarEvents.push({title: info.startStr+'Event Now', start: info.startStr,end: info.endStr})
    },
    // handleEventResize(info){
    //   alert(info.event.title + " end is now " + info.event.end.toISOString());

    // if (!confirm("is this okay?")) {
    //   info.revert();
    // }
    // }
    eventLimitClick(info){
      console.log('info----->',info)
      
    }
  }
}
</script>

<style lang='scss'>
// you must include each plugins' css
// paths prefixed with ~ signify node_modules
@import '../components/@fullcalendar/core/main.css';
@import '../components/@fullcalendar/timeline/main.css';
@import '../components/@fullcalendar/resource-timeline/main.css';
.demo-app {
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}
.demo-app-top {
  margin: 0 0 3em;
}
.demo-app-calendar {
  margin: 0 auto;
  max-width: 900px;
}
</style>