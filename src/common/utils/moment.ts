export const calculateDate = (date: Date): string => {
  const distinct = +new Date() - +new Date(date)

  if (distinct < 1000) {
    return `방금 전`
  } else if (distinct < 60 * 1000) {
    return `${Math.floor(distinct / 1000)}초 전`
  } else if (distinct < 60 * 60 * 1000) {
    return `${Math.floor(distinct / (60 * 1000))}분 전`
  } else if (distinct < 24 * 60 * 60 * 1000) {
    return `${Math.floor(distinct / (60 * 60 * 1000))}시간 전`
  } else if (distinct < 12 * 24 * 60 * 60 * 1000) {
    return `${Math.floor(distinct / (24 * 60 * 60 * 1000))}일 전`
  } else if (distinct < 365 * 24 * 60 * 60 * 1000) {
    return `${Math.floor(distinct / (12 * 24 * 60 * 60 * 1000))}달 전`
  } else {
    return `${Math.floor(distinct / (365 * 24 * 60 * 60 * 1000))}년 전`
  }
}
