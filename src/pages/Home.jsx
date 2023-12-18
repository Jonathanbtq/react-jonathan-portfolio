import HeaderPropos from "../components/HeaderPropos";
import WebProjects from "../components/WebProjects";
import { MobileGame } from "../components/MobileGame";
import MinecraftHome from "../components/MinecraftHome";

import '../components/HeaderPropos.css'
import './main.css'
import '../components/WebProjects.css'
import '../components/MobileGame.css'
import '../components/MinecraftHome.css'

function Home() {
    return (<>
        <HeaderPropos />
        <WebProjects />
        <MobileGame />
        <MinecraftHome />
    </>)
}

export default Home;