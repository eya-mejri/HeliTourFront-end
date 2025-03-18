import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CountryOption, DateFormat, FlightName, SeatType } from '../../core/common/selectOption/json/selectOption'
import CustomSelect from '../../core/common/commonSelect'
import { DatePicker, DatePickerProps, TimePicker } from 'antd'
import Breadcrumb from '../../core/common/Breadcrumb/breadcrumb'
import { all_routes } from '../router/all_routes'
import ImageWithBasePath from '../../core/common/imageWithBasePath'
import AddFaq from '../../core/common/modal/addFaq'
import EditFaq from '../../core/common/modal/editFaq'
import DeleteModal from '../../core/common/modal/deleteModal'
import DefaultEditor from "react-simple-wysiwyg";
import AddAppareil from '../Components/addAppareil'

const AddFlight = () => {

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
      label: 'Add Appareil',
      active: false,
      link: routes.home1
    },

    {
      label: 'Add Appareil',
      active: true,
    },
  ];

  const [values, setValue] = React.useState();
  function onChange(e: any) {
    setValue(e.target.value);
  }

  return (
    <>
      <Breadcrumb title="Add Appareil" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-05" />
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
                  Add New Flight
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
                  Add New Cabin
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
                        <h5 className="mb-3">Add Appareil</h5>
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
                  <AddAppareil/>
                </div>
              </div>
            </div>
            {/* /Add New Flight */}
            {/* Add New Cabin 
            <div className="tab-pane fade" id="add_cabin" role="tabpanel">
              <div className="row">
                <div className="col-lg-3 ">
                  <div className="card border-0 mb-4 mb-lg-0 theiaStickySidebar">
                    <div className="card-body">
                      <div>
                        <h5 className="mb-3">Add Cabin</h5>
                        <ul className="add-tab-list">
                          <li>
                            <Link to="#basic_info_2" className="active">
                              Basic Info
                            </Link>
                          </li>
                          <li>
                            <Link to="#description_2">Description</Link>
                          </li>
                          <li>
                            <Link to="#specification">Specifications</Link>
                          </li>
                          <li>
                            <Link to="#popular_amenities_2">Amenities</Link>
                          </li>
                          <li>
                            <Link to="#gallery_2">Gallery</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <form>
                    <div className="card shadow-none" id="basic_info_2">
                      <div className="card-header">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="fs-18">Basic Info</h5>
                        </div>
                      </div>
                      <div className="card-body pb-1">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">Cabin Name</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Flight Name</label>
                              <CustomSelect
                                options={FlightName}
                                className="select d-flex"
                                placeholder="Select"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Flight Number</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card shadow-none" id="description_2">
                      <div className="card-header">
                        <h5 className="fs-18">Description</h5>
                      </div>
                      <div className="card-body text-editor">
                        <DefaultEditor value={values} onChange={onChange} />
                      </div>
                    </div>
                    <div className="card shadow-none" id="specification">
                      <div className="card-header">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="fs-18">Specifications</h5>
                        </div>
                      </div>
                      <div className="card-body pb-1">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Maximum Occupancy</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Cabin Size</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Seat Type</label>
                              <CustomSelect
                                options={SeatType}
                                className="select d-flex"
                                placeholder="Select"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Price Per Night</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card shadow-none" id="popular_amenities_2">
                      <div className="card-header">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="fs-18">Amenities</h5>
                        </div>
                      </div>
                      <div className="card-body pb-2">
                        <div className="row gy-2">
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fs-16 mb-2">Seating Comfort</h6>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-1"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-1"
                              >
                                Adjustable headrests
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-2"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-2"
                              >
                                Extra legroom seats
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-3"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-3"
                              >
                                Privacy dividers
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-4"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-4"
                              >
                                Reclining seats
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fs-16 mb-2">Entertainment</h6>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-7"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-7"
                              >
                                Music and radio channels
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-8"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-8"
                              >
                                Noise-canceling headphones
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-9"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-9"
                              >
                                Personal seatback screens
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-11"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-11"
                              >
                                Video games
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fs-16 mb-2">Connectivity</h6>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-13"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-13"
                              >
                                In-flight Wi-Fi
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-14"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-14"
                              >
                                Charging ports
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-15"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-15"
                              >
                                Power outlets for laptops
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-16"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-16"
                              >
                                Bluetooth headphone pairing
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fs-16 mb-2">Dining</h6>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-18"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-18"
                              >
                                Beverages
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-19"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-19"
                              >
                                Snacks and refreshments
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-20"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-20"
                              >
                                Complimentary meals
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fs-16 mb-2">Bedding &amp; Comfort</h6>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-23"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-23"
                              >
                                Pillows and blankets
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-24"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-24"
                              >
                                Sleep masks
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-25"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-25"
                              >
                                Earplugs
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <h6 className="fs-16 mb-2">Accessibility Features</h6>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-28"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-28"
                              >
                                Wheelchair access
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-29"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-29"
                              >
                                Braille seat numbers
                              </label>
                            </div>
                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                              <input
                                className="form-check-input ms-0 mt-0"
                                type="checkbox"
                                id="service-30"
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="service-30"
                              >
                                Accessible restrooms
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card shadow-none" id="gallery_2">
                      <div className="card-header">
                        <h5 className="fs-18">Gallery</h5>
                      </div>
                      <div className="card-body">
                        <div className="file-upload drag-file w-100 d-flex align-items-center justify-content-center flex-column mb-2">
                          <span className="upload-img d-block mb-2">
                            <i className="isax isax-document-upload fs-24" />
                          </span>
                          <h6 className="mb-1">Upload Gallery Images</h6>
                          <p className="mb-0">
                            Upload Feature Image First, Image size should below 5MB
                          </p>
                          <input type="file" accept="video/image" />
                        </div>
                        <div className="d-flex align-items-center">
                          {galleryItems.map((src, index) => (
                            <Link to="#" key={index} className="gallery-upload-img me-2">
                              <ImageWithBasePath src={src} alt={`Gallery Item ${index + 1}`} />
                              <span
                                className="trash-icon d-flex align-items-center justify-content-center text-danger gallery-trash"
                                onClick={() => removeGalleryItem(index)}
                              >
                                <i className="isax isax-trash" />
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <button type="button" className="btn btn-light me-2">
                        Reset
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Add New Room
                      </button>
                    </div>
                  </form>
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

export default AddFlight