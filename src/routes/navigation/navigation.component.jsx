import { Fragment } from "react";
import {Outlet, Link } from "react-router-dom";
import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import "./navigation.styles.scss";


//The toplevel component (a thing that always is present)
const Navigation = () => {
    return(
        //Fragment is used for parts which dont have to be rendered. Here Fragment only is used to wrapp all
        //the others inside. Only the navigationbar and the things in the Outlet have to be rendered
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <CrwnLogo className="logo"/>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>
                <Link className="nav-link" to="/signIn">
                    SIGN IN
                </Link>
            </div>
        </div>
        {/* The route children a shown where you have the Outlet component. */}
        <Outlet/>
      </Fragment>
    );
  };

  export default Navigation;