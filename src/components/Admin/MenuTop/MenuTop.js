import './MenuTop.scss';
import Logo from '../../../assets/img/png/logo.png'

export default function MenuTop(props) {

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className="menu-top__left-logo"
          src={Logo}
          alt="Página personal"
        />
        <button type="link"
          onClick={()=>console.log('clicado')}
        >Hola</button>
      </div>
    </div> 
);
}