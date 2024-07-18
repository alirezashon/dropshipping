import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './index.module.css'
import Link from 'next/link'
import { Category } from '@/Interfaces'

interface Props {
  data: Category[]
}

const CircularLinks: React.FC<Props> = ({ data }) => {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(true) // State to control scrolling
  const [scrollDirection, setScrollDirection] = useState<
    'forward' | 'backward'
  >('forward')

  useEffect(() => {
    const marquee = marqueeRef.current

    let scrollInterval: NodeJS.Timeout | null = null

    const startScrolling = () => {
      if (marquee) {
        scrollInterval = setInterval(() => {
          if (scrollDirection === 'forward') {
            marquee.scrollLeft += 1
            if (marquee.scrollLeft >= marquee.scrollWidth) {
              setScrollDirection('backward')
            }
          } else {
            marquee.scrollLeft -= 1
            if (marquee.scrollLeft <= 0) {
              setScrollDirection('forward')
            }
          }
        }, 0.00001) 
      }
    }

    if (isScrolling) {
      startScrolling()
    }

    return () => {
      if (scrollInterval) clearInterval(scrollInterval)
    }
  }, [isScrolling, scrollDirection])

  // Pause scrolling when mouse enters the marquee area
  const handleMouseEnter = () => {
    setIsScrolling(false)
  }

  // Resume scrolling when mouse leaves the marquee area
  const handleMouseLeave = () => {
    setIsScrolling(true)
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.marquee}
        ref={marqueeRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {data?.map((item, index) => (
          <Link
            key={index}
            href={`/Store/#${item.name}`}
            className={styles.name}
          >
            <Image
              src={`${item.src}`}
              alt={item.name}
              className={styles.image}
              width={99}
              height={99}
            />
            <h6>{item.name}</h6>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CircularLinks
