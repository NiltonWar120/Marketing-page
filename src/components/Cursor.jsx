import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(cursor, {
        x: mouseX, y: mouseY,
        duration: 0.1,
        ease: 'power2.out'
      })
    }

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.1
      followerY += (mouseY - followerY) * 0.1
      gsap.set(follower, { x: followerX, y: followerY })
      requestAnimationFrame(animateFollower)
    }

    const onHoverIn = () => cursor.classList.add('is-hovering')
    const onHoverOut = () => cursor.classList.remove('is-hovering')

    document.addEventListener('mousemove', onMouseMove)
    const interactables = document.querySelectorAll('a, button, [data-hover]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onHoverIn)
      el.addEventListener('mouseleave', onHoverOut)
    })

    const raf = requestAnimationFrame(animateFollower)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  )
}
