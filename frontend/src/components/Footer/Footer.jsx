import "./Footer.css"
import githubLogo from "../../assets/github.png"
import linkedinLogo from "../../assets/linkedin.png"
import portfolioLogo from "../../assets/portfolio.png"

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-contact">
        <p>Breaktime Deli</p>
        <p>932 Thomas S. Boyland St, Brooklyn, NY 11212</p>
        <p>(347) 529-0862</p>
      </div>
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