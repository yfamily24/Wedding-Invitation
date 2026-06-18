import { useEffect, useState } from 'react'

const calc = (target) => {
  let diff = target - Date.now()
  if (diff < 0) diff = 0
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

/** Live countdown to an ISO date string. */
export function useCountdown(isoDate) {
  const target = new Date(isoDate).getTime()
  const [time, setTime] = useState(() => calc(target))

  useEffect(() => {
    const id = setInterval(() => setTime(calc(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return time
}
