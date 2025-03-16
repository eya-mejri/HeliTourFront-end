import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"
import { Link } from "react-router-dom"
import { all_routes } from "../router/all_routes";

const AddCard = (props: { lien: any; class: any; number: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => {
    const routes = all_routes;
    const rout=props.lien;
    return(
        <div className="col">
                  <div className={`card ${props.class} border-0 shadow-none`}>
                    <div className="card-body">
                      <h6 className="mb-1">{props.number}</h6>
                      <Link
                        to={props.lien}
                        className="fs-14 fw-medium link-default text-decoration-underline"
                      >
                        Add New {props.title}
                      </Link>
                    </div>
                  </div>
                </div>
    )
}

export default AddCard 
