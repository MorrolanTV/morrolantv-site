const Parser = {
  parseTime(minutes) {
    const displayHours = Math.floor(minutes / 60)
    const displayMinutes = minutes - displayHours * 60
    return displayHours
      ? `${Math.round(displayHours)}H ${Math.round(displayMinutes)}MIN`
      : `${Math.round(displayMinutes)}MIN`
  },
  parseValue(number) {
    if (!number) return '0'
    if (number / 1e3 < 1) return Math.round(number)
    if (number / 1e6 < 1) return Math.round((number / 1e4) * 100) / 10 + 'K'
    return Math.round((number / 1e6) * 100) / 100 + 'M'
  },
}

export default Parser
