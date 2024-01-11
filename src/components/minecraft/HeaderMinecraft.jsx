import skinimg from '../../assets/img/minecraft/skinmc.png'
import twitter from '../../assets/img/twitter.png'
import instagram from '../../assets/img/instagram.png'
import discord from '../../assets/img/discord.png'

import mcproject from '../../content/minecraftProjectMaps.js'

console.log(mcproject)

export default function HeaderMinecraft(){
    return (
        <div className="mc_ctn">
            <div className="mc_header_div">
                <div className="mc_header_lft">
                    <h1>Je suis Jonathanbtq, Constructeur Minecraft depuis 2014</h1>
                    <p>Passionné de minecraft depuis 2012, je n'ai jamais arrêté.Vous retrouverez ici quelques-un de mes projets de construction !</p>
                    <div className="mc_header_btn">
                        <img src={twitter} alt="logo twitter" />
                        <img src={instagram} alt="Logo intagram" />
                        <img src={discord} alt="Logo Discord" />
                    </div>
                </div>
                <div className="mc_header_rgt">
                    <img src={skinimg} alt="" />
                </div>
            </div>
            <div className="mc_mdl_div">
                {mcproject.map((map, index) => (<div className="mc_mdl_card">
                        <div className="mc_mdl_card_img">
                            <img src={map.img} alt="" />
                        </div>
                        <div className="mc_mdl_crd_content">
                            <h2>{map.name}</h2>
                            <p>{map.description}</p>
                            <div className="mc_crd_detail">
                                <div className="mc_crd_dtl">
                                    <h3>Temps :</h3>
                                    <p>{map.array_options[0].time}</p>
                                </div>
                                <div className="mc_crd_dtl">
                                    <h3>Thème :</h3>
                                    <p>{map.array_options[0].theme}</p>
                                </div>
                                <div className="mc_crd_dtl">
                                    <h3>Taille :</h3>
                                    <p>{map.array_options[0].size}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}