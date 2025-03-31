import { PaperP } from "@containers";
import { href } from "@jeff-aporta/theme-manager";

export default Footer;

function Footer({ updateThemeName, getThemeName }) {
  return (
    <PaperP elevation={0} className="content-container d-end min-h-200px footer">
      <div className="d-end-wrap gap-10px">
        <span>Equipamiento táctico de alta calidad con años de experiencia.</span>
        <strong style={{ color: "var(--bright-military-green)" }}>
          &copy; {new Date().getFullYear()} Army
        </strong>
      </div>
    </PaperP>
  );
}
