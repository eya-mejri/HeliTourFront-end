import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

const AdminCard = (props: {
    class2: any;
    class: any; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; value: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined 
}) => {
    return(
        <div className="col-xl-3 col-sm-6 d-flex">
                  <div className="card shadow-none flex-fill">
                    <div className="card-body text-center">
                      <span className={`avatar avatar rounded-circle ${props.class2}  mb-2 `}>
                        <i className={`isax ${props.class} fs-24`} />
                      </span>
                      <p className="mb-1">{props.title}</p>
                      <h5 className="mb-2">{props.value}</h5>
                      <p className="d-flex align-items-center justify-content-center fs-14">
                        <i className="isax isax-arrow-up-15 me-1 text-success" />
                        20% From Last Month{" "}
                      </p>
                    </div>
                  </div>
                </div>
    )
}

export default AdminCard 
