
const formatMakettime = (dateString) => {
    return (new Date(dateString)).toString().split(' ', 4).slice(1, 4).join(' ')
}

const filterContent = (string) => string.replace(/[\r\n]/g, "").replace(/<.*?>/g, "\n")

module.exports = {
    formatMakettime,
    filterContent
}