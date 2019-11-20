import store from "@/store";
console.log("---------缓存------------");
window.addEventListener(
  "storage",
  function(e) {
    console.log(e);
    if (e.newValue === null) return false;
    if (e.key == "member") {
      store.commit("SET_MEMBER_STATUS", true);
    }
    if (e.key == "task") {
      store.commit("SET_TASK_STATUS", true);
    }
  },
  false
);
