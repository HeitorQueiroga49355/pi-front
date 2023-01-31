import { useEffect, useState } from 'react'

export default function useGetWidth() {
  const [width, setWidth] = useState(0)
  const updateDimensions = () => {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return width
}
