export const Date = (date?: Date | number) => {
  return Intl.DateTimeFormat('kr', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    hour12: false
  }).format(date)
}
