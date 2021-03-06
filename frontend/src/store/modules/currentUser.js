/**
 * Created by chengfj on 2017/10/17.
 */

import projectApi from '~/api/projectApi.js'

const CURRENT_JUSER_STORAGE_KEY = 'CURRENT_JUSER_STORAGE_KEY'
const APP_CONFIG_STORAGE_KEY = 'APP_CONFIG_STORAGE_KEY'

const state = {
    currentUser: JSON.parse(localStorage.getItem(CURRENT_JUSER_STORAGE_KEY)),
    noticeInfo: {
        activityProblemTotal: 0,
        myTaskProblemTotal: 0,
    },
    appConfig: JSON.parse(localStorage.getItem(APP_CONFIG_STORAGE_KEY)),
}

const mutations = {
    SET_CURRENT_USER(state, currentUser) {
        state.currentUser = currentUser
        localStorage.setItem(CURRENT_JUSER_STORAGE_KEY, JSON.stringify(currentUser))
    },
    DEL_CURRENT_USER(state) {
        state.currentUser = null
        localStorage.removeItem(CURRENT_JUSER_STORAGE_KEY)
    },
    UPDATE_NOTICE(state, projectID) {
        projectApi.projectNotice(projectID).then(res => {
            if (res.data.data) {
                state.noticeInfo.activityProblemTotal = res.data.data.activityProblemTotal
                state.noticeInfo.myTaskProblemTotal = res.data.data.myTaskProblemTotal
            }
        })
    },
    SET_APP_CONFIG(state, configData) {
        state.appConfig = configData
        localStorage.setItem(APP_CONFIG_STORAGE_KEY, JSON.stringify(configData))
    },
}

const getters = {
    userID: (state) => {
        if (state.currentUser) {
            return state.currentUser.userID
        } else {
            return null
        }
    },
    userName: (state) => {
        if (state.currentUser) {
            return state.currentUser.userName
        } else {
            return null
        }
    },
    userRole: (state) => {
        if (state.currentUser) {
            return state.currentUser.role
        } else {
            return null
        }
    },
    activityProblemTotal: (state) => {
        if (state.noticeInfo) {
            return state.noticeInfo.activityProblemTotal
        } else {
            return 0
        }
    },
    myTaskProblemTotal: (state) => {
        if (state.noticeInfo) {
            return state.noticeInfo.myTaskProblemTotal
        } else {
            return 0
        }
    },
    openRegister: (state) => {
        if (state.appConfig) {
            return state.appConfig.openRegister
        } else {
            return false
        }
    }
}

export default {
    state: state,
    mutations: mutations,
    getters: getters,
}
