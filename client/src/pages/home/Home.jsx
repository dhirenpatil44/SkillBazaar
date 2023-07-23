import Featured from "../../components/featured/Featured"
import Slide from "../../components/slide/Slide"
import TrustedBy from "../../components/trustedBy/TrustedBy"
import "./Home.scss"
import { cards, projects } from "../../data"
import CatCard from "../../components/catCard/CatCard"
import VideoBanner from "../../components/videoBanner/VideoBanner"
import ImgBanner from "../../components/imgBanner/ImgBanner"
import ProjectCard from "../../components/projectCard/ProjectCard"
import Most from "../../components/most/Most"

const Home = () => {
  return (
    <div className="home">
      <Featured/>
      <TrustedBy/>
      <Most/>

      <Slide slidesToShow={5}>
        {cards.map(card=>(
          <CatCard key={card.id} item={card}/>
        ))}
      </Slide>

      <VideoBanner/>
      <ImgBanner/>

      <Slide slidesToShow={4}>
        {projects.map(card=>(
          <ProjectCard key={card.id} item={card}/>
        ))}
      </Slide>
    </div>
  )
}

export default Home