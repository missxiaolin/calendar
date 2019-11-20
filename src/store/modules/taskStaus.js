/**
 * @see: 用户信息
 */
const userBasic = {
  state: {
    memberStatus: false,
    taskStatus: false
  },
  mutations: {
    SET_MEMBER_STATUS: (state, view) => {
      state.memberStatus = view;
    },
    SET_TASK_STATUS: (state, view) => {
      state.taskStatus = view;
    }
  }
  //   actions: {
  //     /**
  //      * @method:
  //      */
  //     setUserBasic({ commit }, view) {
  //       commit("SET_USER_INFO", view);
  //     },
  //     /**
  //      * @method:
  //      */
  //     getUserBasic({ commit, state }) {
  //       return new Promise(resolve => {
  //         resolve();
  //       });
  //     }
  //   }
};

export default userBasic;
