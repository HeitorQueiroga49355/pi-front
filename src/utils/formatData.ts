export function formatDataToBrasil(IsoDate: string) {
  const date = new Date(IsoDate)
  const formattedDate =
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
  return formattedDate
}
