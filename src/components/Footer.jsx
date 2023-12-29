import { useEffect, useState } from 'react'
import gandalf from '../assets/img/gandalf.png'

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
                {isVisible && (
                    <button class="gandalf_lien" href="#" alt="Gandalf" onClick={scrollToTop}>
                        <img src={gandalf} alt="" />
                        <p>Haut de page !</p>
                    </button>
                )}
                <div class="foot_bot">
                    <citation auteur="Jonathan botquin" date="28/01/2022" class="footer_citation">
                        C'est en mangeant que l'on trouve l'envie de manger
                    </citation><br />

                    <p>Copyright Jonathan Botquin - Tous droits réservés</p>
                    <a class="obfusc" href="mailto:botquin.jonathan@yahoo.fr">Me contacter !</a>
                </div>
            </footer>
        </>
    )
}