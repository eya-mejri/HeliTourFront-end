import React, { useState } from 'react'
import { all_routes } from '../../../router/all_routes';
import Breadcrumb from '../../../../core/common/Breadcrumb/breadcrumb';



import dayjs from 'dayjs';
import AddFaq from '../../../../core/common/modal/addFaq';
import DeleteModal from '../../../../core/common/modal/deleteModal';
import EditFaq from '../../../../core/common/modal/editFaq';
import EditVol from '../../../Components/Vol/EditVol';
import { useParams } from 'react-router-dom';

const EditTour = () => {
        const routes = all_routes

        const { id } = useParams<{ id: string }>();
        //Breadcrumb Data
        const breadcrumbs = [
            {
                label: 'Vol Details',
                link: routes.home1,
                active: false,
            },
            {
                label: 'Edit Vols',
                active: true,
            },
            
        ];
        const [values, setValue] = React.useState();
        
            function onChange(e: any) {
                setValue(e.target.value);
            }
        
            const [highlights, setHighlights] = useState<string[]>([]);
        
            const addHighlight = () => {
                setHighlights([...highlights, ""]); // Add an empty highlight
            };
        
            const removeHighlight = (index: number) => {
                setHighlights(highlights.filter((_, i) => i !== index)); // Remove the highlight by index
            };
        
            const updateHighlight = (index: number, value: string) => {
                const updatedHighlights = [...highlights];
                updatedHighlights[index] = value; // Update the value of a highlight
                setHighlights(updatedHighlights);
            };
        
            const [galleryItems, setGalleryItems] = useState<string[]>([
                "assets/img/uploads/upload-01.jpg",
                "assets/img/uploads/upload-02.jpg",
                "assets/img/uploads/upload-03.jpg",
                "assets/img/uploads/upload-04.jpg",
                "assets/img/uploads/upload-05.jpg",
            ]);
            const removeGalleryItem = (index: number) => {
                setGalleryItems(galleryItems.filter((_, i) => i !== index)); // Remove item by index
            };
        
  return (
   
            <>
                <Breadcrumb
                title="Add Vol"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-02"
            />

            {/* Page Wrapper */}
            <div className="content">
            <div className="container">
            <div className="row">

                {/* Sidebar */}
                <div className="col-lg-3 ">
                    <div className="card border-0 mb-4 mb-lg-0 theiaStickySidebar">
                        <div className="card-body">
                            <div>
                                <h5 className="mb-3">Add Vol</h5>
                                <ul id="list-example" className="add-tab-list">
                                    <li><a href="#Duree" >Duree</a></li>
                                    <li><a href="#date_depart">Date de départ</a></li>
                                    <li><a href="#Places_disponibles">Places disponibles</a></li>
                                    <li><a href="#Statut">Statut</a></li>
                                    <li><a href="#Circuit">Circuit</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Sidebar */}

                {/* Add Tour */}
                <div className="col-lg-9">
                <EditVol vol_id={id}/>
                </div>
                {/* /Add Tour */}

            </div>
            </div>
            </div>
            {/* /Page Wrapper */}

            <AddFaq />
            <EditFaq />
            <DeleteModal />

            {/* Add Itenary */}
            <div className="modal fade" id="add_itenary">
            <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Add New Itenary</h5>
                    <button data-bs-dismiss="modal" aria-label="close" className="btn-close"></button>
                </div>
                <form >
                    <div className="modal-body">
                        <div>
                            <label className="form-label">Itenary</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="d-flex align-items-center justify-content-end m-0">
                            <button type="button" data-bs-dismiss="modal" className="btn btn-sm btn-light me-2">Cancel</button>
                            <button type="button" data-bs-dismiss="modal" className="btn btn-sm btn-primary">Add Itenary</button>
                        </div>
                    </div>
                </form>
            </div>
            </div>
            </div>
            {/* Add Itenary */}

            {/* Edit Itenary */}
            <div className="modal fade" id="edit_itenary">
            <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Edit Itenary</h5>
                    <button data-bs-dismiss="modal" aria-label="close" className="btn-close"></button>
                </div>
                <form >
                    <div className="modal-body">
                        <div>
                            <label className="form-label">Itenary</label>
                            <input type="text" className="form-control" defaultValue="Day 1, Kickoff in Los Angeles"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="d-flex align-items-center justify-content-end m-0">
                            <button type="button" data-bs-dismiss="modal" className="btn btn-sm btn-light me-2">Cancel</button>
                            <button type="button" data-bs-dismiss="modal" className="btn btn-sm btn-primary">Save Itenary</button>
                        </div>
                    </div>
                </form>
            </div>
            </div>
            </div>
            {/* /Edit Itenary */}  


            </>
  )
}

export default EditTour