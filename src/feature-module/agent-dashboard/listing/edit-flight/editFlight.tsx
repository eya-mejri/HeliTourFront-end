import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DatePicker, DatePickerProps, TimePicker } from 'antd'
import DefaultEditor from "react-simple-wysiwyg";
import Breadcrumb from '../../../../core/common/Breadcrumb/breadcrumb';
import CustomSelect from '../../../../core/common/commonSelect';
import { CountryOption, DateFormat, FlightName, SeatType } from '../../../../core/common/selectOption/json/selectOption';
import { all_routes } from '../../../router/all_routes';
import ImageWithBasePath from '../../../../core/common/imageWithBasePath';
import AddFaq from '../../../../core/common/modal/addFaq';
import EditFaq from '../../../../core/common/modal/editFaq';
import DeleteModal from '../../../../core/common/modal/deleteModal';
import EditAppareil from '../../../Components/Appareil/EditAppareil';

const EditFlight = () => {
  const { id } = useParams<{ id: string }>(); 
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
      label: 'Edit Flight',
      active: false,
      link: routes.home1
    },

    {
      label: 'Edit Flight',
      active: true,
    },
  ];

  const [values, setValue] = React.useState();
  function onChange(e: any) {
    setValue(e.target.value);
  }

  return (
    <>
      <Breadcrumb title="Edit Appareil" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-05" />
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
                  Edit Appareil
                </Link>
              </li>
              {/*<li>
                <Link
                  to="#"
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#add_cabin"
                  aria-selected="false"
                  role="tab"
                  tabIndex={-1}
                >
                  Edit New Cabin
                </Link>
              </li>*/}
            </ul>
          </div>
          <div className="tab-content">
            {/* Add New Flight */}
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
                        <h5 className="mb-3">Adit Appareil</h5>
                        <ul className="add-tab-list">
                          <li>
                            <a href="#basic_info" className="active" id='list-example'> Basic Info </a>
                          </li>
                          {/*<li>
                            <a href="#specifications">Specifications</a>
                          </li>
                          <li>
                            <a href="#departure">Arrival &amp;Departure</a>
                          </li>
                          <li>
                            <a href="#location">Locations</a>
                          </li>
                          <li>
                            <a href="#additional_service">Additional Service</a>
                          </li>
                          <li>
                            <a href="#amenties">Amenities</a>
                          </li>
                          <li>
                            <a href="#faq">FAQ</a>
                          </li>*/}
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
                <EditAppareil appareil_id={id}/>
                </div>
              </div>
            </div>
            {/* /Add New Cabin */}
          </div>
        </div>
      </div>
      <AddFaq />
      <EditFaq />
      <DeleteModal />
    </>



  )
}

export default EditFlight