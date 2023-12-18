import { Children } from "react";
import { Link } from "react-router-dom";
// interface DefaultLayoutProps{
//     children:React.ReactNode
// }

export default function DefaultLayout({children}){
    return (
        <>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </ul>
          </nav>
        </header>
  
        <main>{children}</main>
      </>
    )
}