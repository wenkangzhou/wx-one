import api from '../../api/api.js'
import util from '../../utils/util.js'

Page({
    data: {
        musics: [],
        current: 0,
        playId: -1
    },
    onLoad: function() {
        api.getMusicIdList({
            success: (res) => {
                if (res.data.res === 0) {
                    let idList = res.data.data
                    this.getMusics(idList)
                }
            }
        })
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: '音乐'
        })
    },
    getMusics: function(idList) {
        let musics = this.data.musics

        if (idList.length > 0) {
            api.getMusicDetailById({
                query: {
                    id: idList.shift()
                },
                success: (res) => {
                    if (res.data.res === 0) {
                        let music = res.data.data
                        music.playImg = '../../../image/music_play.png'
                        music.contentType = 'story'
                        music.story = util.filterContent(music.story)
                        music.maketime = util.formatMakettime(music.maketime)
                        musics.push(music)
                    }
                    this.getMusics(idList)
                }
            })
        } else {
            this.setData({
                musics
            })
        }
    },
    handleChange: function(e) {
        let current = e.detail.current
        let length = this.data.musics.length

        if (current === length && false) {
            this.setData({
                current: length
            })
            wx.navigateTo({
                url: '../history/history?page=music',
                success: () => {
                    this.setData({
                        current: length - 1
                    })
                }
            })
        }
    },
    togglePlay: function(e) {
        let musics = this.data.musics
        let playId = this.data.playId
        let musicId = e.target.dataset.id
        let music = musics.find((music) => music.id === musicId)
        musics = musics.map((music) => {
            music.playImg = '../../../image/music_play.png'
            return music
        })

        if (playId !== musicId) {
            playId = musicId
            music.playImg = '../../../image/music_pause.png'
            this.playMusic(music)
        } else {
            playId = -1
            music.playImg = '../../../image/music_play.png'
            this.pauseMusic()
        }

        this.setData({
            musics,
            playId
        })
    },
    playMusic: function(music) {
        wx.playBackgroundAudio({
            dataUrl: music.music_id,
            title: music.title
        })
    },
    pauseMusic: function() {
        wx.pauseBackgroundAudio()
    }
})