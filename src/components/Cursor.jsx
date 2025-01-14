import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

const Cursor = () => {

    const size = 40;

    const circle = useRef();

    const mouse = useRef({
        x: 0,
        y: 0
    })

    const delayMouse = useRef({
        x: 0,
        y: 0
    })

    const manageMouseMove = (e) => {
        const { clientX, clientY } = e;
        mouse.current = {
            x: clientX,
            y: clientY
        }
    }

    const lerp = (x, y, a) => x * (1 - a) + y * a

    const moveCircle = (x, y) => {
        gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50, })
    }

    const animate = () => {
        const { x, y } = delayMouse.current;

        delayMouse.current = {
            x: lerp(x, mouse.current.x, 0.075),
            y: lerp(y, mouse.current.y, 0.075)
        }

        moveCircle(delayMouse.current.x, delayMouse.current.y)
        window.requestAnimationFrame(animate);
    }

    useEffect(() => {
        animate();
        window.addEventListener('mousemove', manageMouseMove)
        return () => window.removeEventListener('mousemove', manageMouseMove)
    }, [])

    return (
        <>
            <div ref={circle} className='cursor fixed top-0 left-0 border-2 border-[#1F1F1F] rounded-full' style={{ height: size, width: size, }}></div>
        </>
    )
}

export default Cursor