import React, {useState, useEffect} from "react";

import gandalf from '../assets/img/gandalfIcon.png'

const styles = {
    button_style:{
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '50%',
        width: '80px',
        height: '80px',
        position: 'fixed',
        background: 'none',
        bottom: '20px',
        right: '20px',
        border: 'none',
        cursor: 'pointer'
    },
    btn_img:{
        width: '80px',
        height: '80px',
        zIndex: '10,'
    },
    btn_p:{
        position: 'absolute',
        fontSize: '30px',
        zIndex: '11',
        margin: '0',
        bottom: '0',
        fontWeight: 'bold'
    }
}

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 450)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <>
            {isVisible && (
                <button className="scroll-to-top-button" style={styles.button_style} onClick={scrollToTop}>
                    <img src={gandalf} style={styles.btn_img} alt="" />
                    <p style={styles.btn_p}>TOP</p>
                </button>
            )}
        </>
    )
}

export default ScrollToTopButton