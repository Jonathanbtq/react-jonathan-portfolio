import Footer from "../components/Footer";
import ReseauxFooter from "../components/ReseauxFooter";
import HeaderMinecraft from "../components/minecraft/HeaderMinecraft";
import ScrollToTopButton from "../components/ScrollToTopButton";

import '../styles/minecraft/MinecraftHeader.css'

function Minecraft(){
    return (
        <>
            <HeaderMinecraft />
            <ReseauxFooter />
            <Footer />
            
            <ScrollToTopButton />
        </>
    )
}

export default Minecraft;