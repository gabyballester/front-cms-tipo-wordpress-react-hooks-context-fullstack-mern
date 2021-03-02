import "./PresentationCourses.scss";
import AcademyLogo from "../../../../assets/img/png/academy-logo.png";

export default function PresentationCourses() {
  return (
    <div className="presentation-courses">
    <img src={AcademyLogo} alt="Cursos de programación" />
    <p>
        En esta plataforma vas a encontrar los mejores cursos online de
        desarrollo web en Español. Unete a nosotros y empieza tu camino como
        Desarrodor Web o Desarrollador de CMS. Sinceramente.
      </p>
      <p>¡¡¡Échales un vistazo y aprovecha las ofertas!!!</p>
    </div>
  )
}
