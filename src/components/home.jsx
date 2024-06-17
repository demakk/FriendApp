
import { Link } from "react-router-dom";
import '../styles/home-page-styles.css';


function Home() {
    return (
        <div className="home-page">
            <div className="centered-container">
                <div className="content-container">
                    <div className="nav-links">
                        <div className="nav-link">
                            <Link to="/login" className="link"><p>Login</p></Link>
                            <Link to="/account" className="link"><p>Go to my account</p></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;