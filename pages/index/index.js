import api from '../../api/api.js'
import util from '../../utils/util.js'

Page({
    data: {
        vols: [],
        current: 0
    },
    onLoad: function() {
        api.getVolIdList({
            success: (res) => {
                if (res.data.res === 0) {
                    let idList = res.data.data
                    this.getVols(idList)
                }
            }
        })
    },
    getVols: function(idList) {
        let vols = this.data.vols

        if (idList.length > 0) {
            api.getVolById({
                query: {
                    id: idList.shift()
                },
                success: (res) => {
                    if (res.data.res === 0) {
                        let vol = res.data.data
                        vol.hp_makettime = util.formatMakettime(vol.hp_makettime)
                        vols.push(vol)
                    }
                    this.getVols(idList)
                }
            })
        } else {
            this.setData({
                vols
            })
        }
    },
    handleChange: function(e) {
        let current = e.detail.current
        let volsLength = this.data.vols.length
        //TODO:如需最后一项跳转，需要在模板添加一个空白项<swiper-item></swiper-item>
        //TODO:现在强制false，关闭口子
        if (current === volsLength && false)  {
            this.setData({
                current: volsLength
            })
            wx.navigateTo({
                url: '../history/history?page=index',
                success: () => {
                    this.setData({
                        current: volsLength - 1
                    })
                }
            })
        }
    }
})