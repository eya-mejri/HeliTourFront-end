import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { DatePicker, DatePickerProps, TimePicker } from 'antd'


import DefaultEditor from "react-simple-wysiwyg";
import { all_routes } from '../../router/all_routes';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import AddAppareil from './addAppareil';
import AddFaq from '../../../core/common/modal/addFaq';
import EditFaq from '../../../core/common/modal/editFaq';
import DeleteModal from '../../../core/common/modal/deleteModal';



const Addappareil = () => {

  const getModalContainer = () => {
    const modalElement = document.getElementById("modal_datepicker");
    return modalElement ? modalElement : document.body; // Fallback to document.body if modalElement is null
  };
  const getModalContainer2 = () => {
    const modalElement = document.getElementById("modal_datepicker");
    return modalElement ? modalElement : document.body; // Fallback to document.body if modalElement is null
  };


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

  const routes = all_routes;


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


  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'Add Device',
      active: false,
      link: routes.home5
    },

    {
      label: 'Add Device',
      active: true,
    },
  ];

  const [values, setValue] = React.useState();
  function onChange(e: any) {
    setValue(e.target.value);
  }

  return (
    <>
      <Breadcrumb title="Add Device" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-05" backgroundImage="http://localhost:3000/assets/img/bgTourList.webp"/>
      <div className="content">
        <div className="container">
          <div className="place-nav">
            <ul className="nav" role="tablist">
              <li>
                <Link
                  to="#"
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#add_flight"
                  aria-selected="true"
                  role="tab"
                >
                  Add Device
                </Link>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            {/* Add New appareil */}
            <div
              className="tab-pane fade active show"
              id="add_flight"
              role="tabpanel"
            >
              <div className="row">
                {/* Sidebar */}
                <div className="col-lg-3 ">
                  <div className="card border-0 mb-4 mb-lg-0 theiaStickySidebar">
                    <div className="card-body">
                      <div>
                        <h5 className="mb-3">Add Device</h5>
                        <ul className="add-tab-list">
                          <li>
                            <a href="#basic_info" className="active" id='list-example'> Basic Info </a>
                          </li>
                          <li>
                            <a href="#gallery">Gallery</a>
                          </li>
                          <li>
                            <a href="#description">Description</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Sidebar */}
                <div className="col-lg-9">
                  <AddAppareil/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddFaq />
      <EditFaq />
      <DeleteModal />
    </>



  )
}

export default Addappareil;