import React from 'react'
import { all_routes } from '../../router/all_routes';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import { Link } from 'react-router-dom';

const Gallery = () => {
    const routes = all_routes
    const [open, setOpen] = React.useState(false);
        //Breadcrumb Data
        const breadcrumbs = [
          {
              label: 'Gallery',
              link: routes.home1,
              active: false,
          },
          {
              label: 'Pages',
              active: false,
          },
          {
              label: 'Gallery',
              active: true,
          },
      ];
  return (
    <>
    <Breadcrumb
        title="Cruise"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-01"
    />
    <div className="content">
        <div className="container">
                <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[
                { src: "/assets/img/gallery/gallery-01.jpg" },
                { src: "/assets/img/gallery/gallery-02.jpg" },
                { src: "/assets/img/gallery/gallery-03.jpg" },
                { src: "/assets/img/gallery/gallery-04.jpg" },
                { src: "/assets/img/gallery/gallery-05.jpg" },
                { src: "/assets/img/gallery/gallery-06.jpg" },
                { src: "/assets/img/gallery/gallery-07.jpg" },
                { src: "/assets/img/gallery/gallery-08.jpg" },
                { src: "/assets/img/gallery/gallery-09.jpg" },
                { src: "/assets/img/gallery/gallery-10.jpg" },
                { src: "/assets/img/gallery/gallery-11.jpg" },
                { src: "/assets/img/gallery/gallery-12.jpg" },
                { src: "/assets/img/gallery/gallery-13.jpg" },
                { src: "/assets/img/gallery/gallery-14.jpg" },
                { src: "/assets/img/gallery/gallery-15.jpg" },
                { src: "/assets/img/gallery/gallery-16.jpg" },
                ]}
            />
            {/* Gallery Details */}
            <div className="row row-gap-4">
                <div className="col-lg-3">
                    <div className="gallery-card">
                        <div className="gallery-body">
                            <div className="img-wrap">
                                <ImageWithBasePath src="assets/img/gallery/gallery-01.jpg" alt="img" />
                                <div className="img-overlay-1">
                                    <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} to="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="gallery-card">
                        <div className="gallery-body">
                            <div className="img-wrap">
                                <ImageWithBasePath src="assets/img/gallery/gallery-02.jpg" alt="img" />
                                <div className="img-overlay-1">
                                    <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} to="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="gallery-card">
                        <div className="gallery-body">
                            <div className="img-wrap">
                                <ImageWithBasePath src="assets/img/gallery/gallery-03.jpg" alt="img" />
                                <div className="img-overlay-1">
                                    <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} to="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="gallery-card">
                        <div className="gallery-body">
                            <div className="img-wrap">
                                <ImageWithBasePath src="assets/img/gallery/gallery-04.jpg" alt="img" />
                                <div className="img-overlay-1">
                                    <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} to="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="gallery-card">
                        <div className="gallery-body">
                            <div className="img-wrap">
                                <ImageWithBasePath src="assets/img/gallery/gallery-05.jpg" alt="img" />
                                <div className="img-overlay-1">
                                    <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} to="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="gallery-card">
                        <div className="gallery-body">
                            <div className="img-wrap">
                                <ImageWithBasePath src="assets/img/gallery/gallery-06.jpg" alt="img" />
                                <div className="img-overlay-1">
                                    <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} to="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="gallery-card">
                        <div className="gallery-body">
                            <div className="img-wrap">
                                <ImageWithBasePath src="assets/img/gallery/gallery-07.jpg" alt="img" />
                                <div className="img-overlay-1">
                                    <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} to="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="gallery-card">
                        <div className="gallery-body">
                            <div className="img-wrap">
                                <ImageWithBasePath src="assets/img/gallery/gallery-08.jpg" alt="img" />
                                <div className="img-overlay-1">
                                    <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} to="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="gallery-card">
                        <div className="gallery-body">
                            <div className="img-wrap">
                                <ImageWithBasePath src="assets/img/gallery/gallery-09.jpg" alt="img" />
                                <div className="img-overlay-1">
                                    <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} to="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="gallery-card">
                        <div className="gallery-body">
                            <div className="img-wrap">
                                <ImageWithBasePath src="assets/img/gallery/gallery-10.jpg" alt="img" />
                                <div className="img-overlay-1">
                                    <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} to="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="gallery-card">
                        <div className="gallery-body">
                            <div className="img-wrap">
                                <ImageWithBasePath src="assets/img/gallery/gallery-11.jpg" alt="img" />
                                <div className="img-overlay-1">
                                    <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} to="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="gallery-card">
                        <div className="gallery-body">
                            <div className="img-wrap">
                                <ImageWithBasePath src="assets/img/gallery/gallery-12.jpg" alt="img" />
                                <div className="img-overlay-1">
                                    <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} to="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="gallery-card">
                        <div className="gallery-body">
                            <div className="img-wrap">
                                <ImageWithBasePath src="assets/img/gallery/gallery-13.jpg" alt="img" />
                                <div className="img-overlay-1">
                                    <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} to="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="gallery-card">
                        <div className="gallery-body">
                            <div className="img-wrap">
                                <ImageWithBasePath src="assets/img/gallery/gallery-14.jpg" alt="img" />
                                <div className="img-overlay-1">
                                    <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} to="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="gallery-card">
                        <div className="gallery-body">
                            <div className="img-wrap">
                                <ImageWithBasePath src="assets/img/gallery/gallery-15.jpg" alt="img" />
                                <div className="img-overlay-1">
                                    <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} to="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="gallery-card">
                        <div className="gallery-body">
                            <div className="img-wrap">
                                <ImageWithBasePath src="assets/img/gallery/gallery-16.jpg" alt="img" />
                                <div className="img-overlay-1">
                                    <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} to="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Gallery Details */}

        </div>
    </div>
    </>
  )
}

export default Gallery