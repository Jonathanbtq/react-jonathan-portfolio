import { useState } from "react"

export function MobileGame() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    function onOver(index) {
        setHoveredIndex(index)
    }

    return (
        <>
            <div className="idx_deux_ctn">
                <div className="idx_deux_div">

                    <div className="idx_deux">
                        <div className="idx_deux_dx">
                            <article className="idx_deux_art">
                                {[
                                    "https://jonathanbotquin.fr/images/jellygame/jelly_game.jpg",
                                    "https://jonathanbotquin.fr/images/jellygame/Jelly_main.jpg",
                                    "https://jonathanbotquin.fr/images/jellygame/jelly_shop.jpg"
                                ].map((url, index) => (
                                    <div
                                        key={index}
                                        className={`idx_deux_img ${hoveredIndex === index
                                            ? "overGameDiv"
                                            : index === 1
                                                ? "overGameDivMiddle"
                                                : ""
                                            }`}
                                        onMouseEnter={() => onOver(index)}
                                        onMouseLeave={() => onOver(null)}
                                    >
                                        <img src={url} alt="" class="idx_deux_img_i" />
                                    </div>
                                ))}
                            </article>
                        </div>
                        <div className="idx_deux_ctn_frt">
                            <div className="idx_deux_frt">
                                <h2 className="idx_deux_h">Jeu mobile !</h2>
                                <p className="idx_deux_t_g">
                                    A. Jeu mobile 2D (platforme)
                                </p>
                                <div className="idx_deux_p_gch">
                                    <p>Jelly est un jeu mobile concu en C# via l'application
                                        Unity, j'ai commencé son developpement en 2020.</p>
                                    <p>Dans ce projet j'ai été aidé d'une graphiste s'occupant des dessins et animations
                                        (crédit instagram: Lilalys).</p>
                                    <p>C'est un jeu de platforme entièrement en 2D avec possibilité d'achat de cosmétiques,
                                        un Best score et un système de pièces in-game. </p>
                                </div>
                                <span className="idx_deux_span">Date de sortie prévue pour 2024.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}