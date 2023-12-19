import mc from '../content/minecraftProjectMaps'

export default function MinecraftHome(){
    return (
        <>
            <div className="idx_mc_carousel">
                <div className="idx_carousel_h">
                    <p className="idx_tres_t_g">
                        B. Création de cartes Minecraft
                    </p>
                </div>
                
                <div className="carousel_idx_ctn">
                    <i id="left" className="left fa-solid fa-angle-left"></i>
                    <ul className="carousel_idx">
                        {mc.map((img, index) => (
                            <li key={index} className="idx_card_mc_slider">
                                <div className="img_div_mc_card">
                                    <img src={img.img} alt=""/>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <i id="right" className="right fa-solid fa-angle-right"></i>
                </div>
            </div>
            
            <div className="idx_tres_ctn">
                <div className="idx_tres_div">
                    <div className="idx_tres">
                        <div className="idx_tres_ctn_frt">
                            <div className="idx_tres_frt">
                                <div className="idx_tres_p_gch">
                                    <p>
                                        Spécialiser dans l'architecture et le terraforming, j'ai travaillé sur différents
                                        projets Minecraft International.
                                    </p>
                                </div>
                                <span className="idx_tres_span"><a href="minecraft.html">En savoir plus...</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}