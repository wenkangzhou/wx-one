import api from '../../../api/api.js'
import util from '../../../utils/util.js'

Page({
    data: {
        essay: {},
        audioBtn: {
            text: '收听',
            imgPath: '../../../image/audio_play.png'
        }
    },
    onLoad: function(options) {
        api.getEssayById({
            query: {
                id: options.id
            },
            success: (res) => {
                if (res.data.res === 0) {
                    let essay = res.data.data
                    essay.hp_content = util.filterContent(essay.hp_content)
                    essay.hp_makettime = util.formatMakettime(essay.hp_makettime)
                    this.setData({
                        essay
                    })
                }
            }
        })
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: '短篇'
        })
    },
    togglePlay: function(e) {
        var audio = this.data.essay.audio
        var audioBtn = this.data.audioBtn

        if (audioBtn.text === '收听') {
            audioBtn = {
                text: '暂停',
                imgPath: '../../../image/audio_pause.png'
            }
            this.playAudio(audio)
        } else {
            audioBtn = {
                text: '收听',
                imgPath: '../../../image/audio_play.png'
            }
            this.pauseAudio()
        }

        this.setData({
            audioBtn
        })
    },
    playAudio: function(audio) {
        var title = this.data.essay.hp_title
        wx.playBackgroundAudio({
            dataUrl: audio,
            title: title
        })
    },
    pauseAudio: function() {
        wx.pauseBackgroundAudio()
    }
})