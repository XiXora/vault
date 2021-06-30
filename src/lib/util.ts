export const formatDuration = duration => {
  const seconds = (duration|0) % 60
  const minutes = (duration / 60) |0

  return (minutes ? minutes + 'm' : '') + (seconds ? seconds.toString().padStart(2, '0') + 's' : '')
}
