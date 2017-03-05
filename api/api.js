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
const getVolsByMonth = (params) => wxRequest(params, host + '/api/hp/bymonth/' + params.query.month)
const getVolDetailById = (params) => wxRequest(params, host + '/api/hp/detail/' + params.query.id)

module.exports = {
    getVolById,
    getVolIdList,
    getVolsByMonth,
    getVolDetailById
}