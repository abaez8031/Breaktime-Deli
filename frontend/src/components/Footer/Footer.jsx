import "./Footer.css"
import githubLogo from "../../assets/github.png"
import linkedinLogo from "../../assets/linkedin.png"
import portfolioLogo from "../../assets/portfolio.png"

const Footer = () => {
  return (
    <div className="footer-container">
      <p>&copy; Breaktime Deli 2024 by Ariel Baez</p>
      <div className="footer-links">
        <a href="https://arielbaez.netlify.app/" target="_blank" rel="noopener noreferrer"><img src={portfolioLogo} alt="portfolio"/></a>
        <a href="https://github.com/abaez8031" target="_blank" rel="noopener noreferrer"><img src={githubLogo} alt="github"/></a>
        <a href="https://www.linkedin.com/in/ariel-baez-36853b26a/" target="_blank" rel="noopener noreferrer"><img src={linkedinLogo} alt="linkedin"/></a>
      </div>
    </div>
  )
}

export default Footer;