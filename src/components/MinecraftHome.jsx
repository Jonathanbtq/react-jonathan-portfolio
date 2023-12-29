import { useEffect, useState } from 'react';
import mc from '../content/minecraftProjectMaps'

export default function MinecraftHome(){

    const [imgSize, setImgSize] = useState(0);

    function carousel(){
        const img = document.querySelector('.idx_card_mc_slider');
        const widthBox = img.getBoundingClientRect();
        const imgSize = widthBox.width;
        setImgSize(imgSize)
    }

    function handleClickCrl(){
        const carousel = document.querySelector('.carousel_idx')
        const btnleft = document.getElementById('left')
        const btnright = document.getElementById('right')
        btnleft.addEventListener('click', () => {
            carousel.scrollLeft -= imgSize
        })
        btnright.addEventListener('click', () => {
            carousel.scrollLeft += imgSize
        })
    }

    useEffect(() => (
        carousel()
    ), [])

    return (
        <>
            <div className="idx_mc_carousel">
                <div className="idx_carousel_h">
                    <p className="idx_tres_t_g">
                        B. Création de cartes Minecraft
                    </p>
                </div>
                
                <div className="carousel_idx_ctn">
                    <i id="left" className="left fa-solid fa-angle-left" onClick={() => {handleClickCrl()}}></i>
                    <ul className="carousel_idx">
                        {mc.map((img, index) => (
                            <li key={index} className="idx_card_mc_slider">
                                <div className="img_div_mc_card">
                                    <img src={img.img} alt=""/>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <i id="right" className="right fa-solid fa-angle-right" onClick={() => {handleClickCrl()}}></i>
                </div>
                <div className="idx_tres_ctn">
                    <div className="idx_tres_frt">
                        <div className="idx_tres_p_gch">
                            <p>
                                Spécialiser dans l'architecture et le terraforming, j'ai travaillé sur différents
                                projets Minecraft International.
                            </p>
                        </div>
                        <span className="idx_tres_span"><a href="">En savoir plus...</a></span>
                    </div>
                </div>
            </div>
        </>
    )
}