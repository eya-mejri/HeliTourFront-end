import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { all_routes } from '../../../router/all_routes';
import Breadcrumb from '../../../../core/common/Breadcrumb/breadcrumb';
import DefaultEditor from 'react-simple-wysiwyg';
import axios from 'axios';
import { message } from 'antd';

const EditCircuit = () => {
    const routes = all_routes;
    const { id } = useParams();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Tours',
            active: false,
            link: routes.agentListing,
        },
        {
            label: 'Edit Tour',
            active: true,
        },
    ];

    // States
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState('');
    const [disponibilite, setDisponibilite] = useState('true');
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // Load circuit data
    useEffect(() => {
        const fetchCircuit = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://127.0.0.1:3000/circuit/getbyid/${id}`);
                const circuitData = response.data;
                
                setNom(circuitData.Nom);
                setDescription(circuitData.Description);
                setPrix(circuitData.Prix.toString());
                setDisponibilite(circuitData.Disponibilite.toString());
                
                if (circuitData.photos?.length > 0) {
                    setExistingImages(circuitData.photos.map((photo: string) => 
                        `http://localhost:3000/assets/img/circuits/${photo}`
                    ));
                }
            } catch (error) {
                console.error('Error fetching circuit:', error);
                message.error('Failed to load circuit data');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCircuit();
    }, [id]);

    // Handlers
    const handleNomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNom(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handlePrixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^[0-9\b]+$/.test(value)) {
            setPrix(value);
        }
    };

    const handleDisponibiliteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDisponibilite(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const filesArray = Array.from(e.target.files);
            setNewImages(prev => [...prev, ...filesArray]);
            
            const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file));
            setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
        }
    };

    const removeExistingImage = (index: number) => {
        const imageUrl = existingImages[index];
        const imageName = imageUrl.split('/').pop();
        
        if (imageName) {
            setImagesToDelete(prev => [...prev, imageName]);
        }
        setExistingImages(existingImages.filter((_, i) => i !== index));
    };

    const removeNewImage = (index: number) => {
        URL.revokeObjectURL(previewUrls[index]);
        
        const newFiles = [...newImages];
        newFiles.splice(index, 1);
        setNewImages(newFiles);
        
        const newPreviews = [...previewUrls];
        newPreviews.splice(index, 1);
        setPreviewUrls(newPreviews);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('_id', id || '');
            formData.append('Nom', nom);
            formData.append('Description', description);
            formData.append('Prix', prix);
            formData.append('Disponibilite', disponibilite);

            // Add new images
            newImages.forEach(file => {
                formData.append('photos', file);
            });

            // Add images to delete
            imagesToDelete.forEach(imageName => {
                formData.append('photosToDelete', imageName);
            });

            const response = await axios.put(
                'http://127.0.0.1:3000/circuit/putCircuit',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Update state with new image URLs
            if (response.data.photos) {
                setExistingImages(response.data.photos.map((photo: string) => 
                    `http://localhost:3000/assets/img/circuits/${photo}`
                ));
                setNewImages([]);
                previewUrls.forEach(url => URL.revokeObjectURL(url));
                setPreviewUrls([]);
                setImagesToDelete([]);
            }

            console.log('Circuit updated successfully!');
        } catch (error) {
            console.error('Error updating circuit:', error);
            message.error('Failed to update circuit');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        window.location.reload();
    };

    return (
        <div>
            <Breadcrumb title="Edit Tour" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-03" backgroundImage="http://localhost:3000/assets/img/bgTourList.webp" />
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 theiaStickySidebar">
                            <div className="card border-0 mb-4 mb-lg-0 theiaStickySidebar">
                                <div className="card-body">
                                    <div>
                                        <h5 className="mb-3">Edit Tour</h5>
                                        <ul className="add-tab-list" id="list-example">
                                            <li><a href="#basic_info" className="active">Basic Info</a></li>
                                            <li><a href="#description">Description</a></li>
                                            <li><a href="#gallery">Gallery</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <form onSubmit={handleSubmit}>
                                <div className="card shadow-none" id="basic_info">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h6 className="fs-18">Basic Info</h6>
                                        </div>
                                    </div>
                                    <div className="card-body pb-1">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={nom}
                                                        onChange={handleNomChange}
                                                        required
                                                        disabled={loading}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Price</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={prix}
                                                        onChange={handlePrixChange}
                                                        required
                                                        disabled={loading}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Availability</label>
                                                    <select
                                                        className="form-control"
                                                        value={disponibilite}
                                                        onChange={handleDisponibiliteChange}
                                                        required
                                                        disabled={loading}
                                                    >
                                                        <option value="true">Available</option>
                                                        <option value="false">Unavailable</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card shadow-none" id="description">
                                    <div className="card-header">
                                        <h5 className="fs-18">Description</h5>
                                    </div>
                                    <div className="card-body text-editor">
                                        <textarea
                                        className="form-control"
                                        rows={5}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter a description..."
                                        />
                                    </div>
                                </div>

                                <div className="card shadow-none" id="gallery">
                                    <div className="card-header">
                                        <h5 className="fs-18">Gallery</h5>
                                    </div>
                                    <div className="card-body">
                                        <div 
                                            className="file-upload drag-file w-100 d-flex align-items-center justify-content-center flex-column mb-2"
                                            onClick={triggerFileInput}
                                            style={{ cursor: 'pointer', opacity: loading ? 0.7 : 1 }}
                                        >
                                            <span className="upload-img d-block mb-2">
                                                <i className="isax isax-document-upload fs-24" />
                                            </span>
                                            <h6 className="mb-1">Upload Tour Images</h6>
                                            <p className="mb-0">Image size should below 5MB</p>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                multiple
                                                style={{ display: 'none' }}
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="d-flex align-items-center flex-wrap">
                                            {existingImages.map((img, index) => (
                                                <div key={`existing-${index}`} className="gallery-upload-img me-2 mb-2 position-relative">
                                                    <img
                                                        src={img}
                                                        alt={`Existing ${index}`}
                                                        style={{ 
                                                            width: '50px', 
                                                            height: '50px', 
                                                            objectFit: 'cover',
                                                            opacity: loading ? 0.7 : 1
                                                        }}
                                                    />
                                                    {!loading && (
                                                        <span
                                                            className="trash-icon d-flex align-items-center justify-content-center text-danger gallery-trash position-absolute"
                                                            style={{ 
                                                                top: '5px', 
                                                                right: '5px', 
                                                                width: '20px', 
                                                                height: '20px', 
                                                                background: 'white', 
                                                                borderRadius: '50%'
                                                            }}
                                                            onClick={() => removeExistingImage(index)}
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                            {previewUrls.map((url, index) => (
                                                <div key={`new-${index}`} className="gallery-upload-img me-2 mb-2 position-relative">
                                                    <img
                                                        src={url}
                                                        alt={`New ${index}`}
                                                        style={{ 
                                                            width: '50px', 
                                                            height: '50px', 
                                                            objectFit: 'cover',
                                                            opacity: loading ? 0.7 : 1
                                                        }}
                                                    />
                                                    {!loading && (
                                                        <span
                                                            className="trash-icon d-flex align-items-center justify-content-center text-danger gallery-trash position-absolute"
                                                            style={{ 
                                                                top: '5px', 
                                                                right: '5px', 
                                                                width: '20px', 
                                                                height: '20px', 
                                                                background: 'white', 
                                                                borderRadius: '50%'
                                                            }}
                                                            onClick={() => removeNewImage(index)}
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center justify-content-center mt-4">
                                    <button 
                                        type="button" 
                                        className="btn btn-light me-2"
                                        onClick={handleReset}
                                        disabled={loading}
                                    >
                                        Reset
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Saving...
                                            </>
                                        ) : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCircuit;