import HeaderPropos from "../components/HeaderPropos";
import WebProjects from "../components/WebProjects";
import { MobileGame } from "../components/MobileGame";
import MinecraftHome from "../components/MinecraftHome";
import FormationProjects from "../components/FormationProjects";
import ReseauxFooter from "../components/ReseauxFooter";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { useGlobalVariables } from "../contexts/GlobalVariablesContext";
import axios from 'axios';

import '../styles/HeaderPropos.css'
import './main.css'
import '../styles/boutique/boutique.css'
import '../styles/WebProjects.css'
import '../styles/MobileGame.css'
import '../styles/MinecraftHome.css'
import '../styles/FormationProject.css'
import '../styles/ReseauxFooter.css'
import '../styles/Footer.css'
import { useEffect, useState } from "react";

function Home() {
    const globalVariables = useGlobalVariables();
    return (<>
        <HeaderPropos />
        <WebProjects />
        {globalVariables.mcmobile && globalVariables.mcmobile === "1" && 
            <MobileGame />
        }
        {globalVariables.mcmobile && globalVariables.diginamicdiv === "1" && 
            <FormationProjects />
        }
        {globalVariables.mcmobile && globalVariables.mcdiv === "1" && 
            <MinecraftHome />
        }
        <ReseauxFooter />
        <Footer />

        <ScrollToTopButton />
    </>)
}

export default Home;