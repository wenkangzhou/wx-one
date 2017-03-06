const host = 'http://v3.wufazhuce.com:8000'
const wxRequest = (params, url) => {
    wx.showToast({
        title: '加载中',
        icon: 'loading'
    })
    wx.request({
        url: url,
        method: params.method || 'GET',
        data: params.data || {},
        header: {
            'Content-Type': 'application/json'
        },
        success: (res) => {
            params.success && params.success(res)
            wx.hideToast()
        },
        fail: (res) => {
            params.fail && params.fail(res)
        },
        complete: (res) => {
            params.complete && params.complete(res)
        }
    })
}

// Index
const getVolById = (params) => wxRequest(params, host + '/api/hp/detail/' + params.query.id)
const getVolIdList = (params) => wxRequest(params, host + '/api/hp/idlist/0')
// Reading
const getCarousel = (params) => wxRequest(params, host + '/api/reading/carousel')
const getLastArticles = (params) => wxRequest(params, host + '/api/reading/index')
const getEssayById = (params) => wxRequest(params, host + '/api/essay/' + params.query.id)
const getSerialById = (params) => wxRequest(params, host + '/api/serialcontent/' + params.query.id)
const getQuestionById = (params) => wxRequest(params, host + '/api/question/' + params.query.id)
// Music
const getMusicIdList = (params) => wxRequest(params, host + '/api/music/idlist/0')
const getMusicDetailById = (params) => wxRequest(params, host + '/api/music/detail/' + params.query.id)

module.exports = {
    getVolById,
    getVolIdList,
    getCarousel,
    getLastArticles,
    getEssayById,
    getSerialById,
    getQuestionById,
    getMusicIdList,
    getMusicDetailById
}