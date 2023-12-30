import { useEffect, useState } from 'react'
import gandalf from '../assets/img/gandalf.png'
import gif1 from '../assets/gif/gif1.gif'

export default function Footer(){

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 4400)
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };

    return (
        <>
            <footer>
                {/* {isVisible && (
                    <button className="gandalf_lien" href="#" alt="Gandalf" onClick={scrollToTop}>
                        <img src={gandalf} alt="" />
                        <p>Haut de page !</p>
                    </button>
                )} */}
                <div className="foot_bot">
                    <div auteur="Jonathan botquin" date="28/01/2022" className="footer_citation">
                        "01100001 01100010 01100011"
                    </div>

                    <p>Copyright Jonathan Botquin - Tous droits réservés</p>
                    <a className="obfusc" href="mailto:botquin.jonathan@yahoo.fr">Me contacter !</a>
                </div>
                <img src={gif1} alt="" />
            </footer>
        </>
    )
}