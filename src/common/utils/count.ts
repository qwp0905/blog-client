export const computeCount = (num: number): string => {
  if (num < Math.pow(1000, 1)) {
    return `${num}`
  } else if (num < Math.pow(1000, 2)) {
    return `${(Math.round(num / (Math.pow(1000, 1) / 10)) / 10).toFixed(1)}K`
  } else if (num < Math.pow(1000, 3)) {
    return `${(Math.round(num / (Math.pow(1000, 2) / 10)) / 10).toFixed(1)}M`
  } else if (num < Math.pow(1000, 4)) {
    return `${(Math.round(num / (Math.pow(1000, 3) / 10)) / 10).toFixed(1)}B`
  } else {
    return `${(Math.round(num / (Math.pow(1000, 4) / 10)) / 10).toFixed(1)}T`
  }
}
