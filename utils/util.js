
const formatMakettime = (dateString) => {
    return (new Date(dateString)).toString().split(' ', 4).slice(1, 4).join(' ')
}

module.exports = {
    formatMakettime
}