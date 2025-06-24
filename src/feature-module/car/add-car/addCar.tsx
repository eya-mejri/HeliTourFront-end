import React, { useState, useRef } from 'react';
import axios from 'axios';
import { all_routes } from '../../router/all_routes';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import DefaultEditor from "react-simple-wysiwyg";

const  AddCar = () => {
    const routes = all_routes;
    const breadcrumbs = [
        {
            label: 'Add Destination',
            active: false,
            link: routes.home1
        },
        {
            label: 'Add Destination',
            active: true,
        },
    ];

    const [defaultDate] = useState(dayjs());
    const [villeData, setVilleData] = useState({ 
        Nom: "", 
        Description: "" 
    });
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onChange = (e: any) => {
        const newDescription = e.target.value;
        setVilleData((prev) => ({
            ...prev,
            Description: newDescription,
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVilleData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const filesArray = Array.from(e.target.files);
            setSelectedFiles(prev => [...prev, ...filesArray]);
            
            // Create preview URLs
            const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file));
            setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
        }
    };

    const removeImage = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!villeData.Nom || !villeData.Description) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const formData = new FormData();
        formData.append('Nom', villeData.Nom);
        formData.append('Description', villeData.Description);
        
        // Append each file to the form data
        selectedFiles.forEach(file => {
            formData.append('photos', file);
        });

        try {
            const response = await axios.post('http://127.0.0.1:3000/ville/addVille', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Réponse du serveur:', response.data);
            alert(response.data.message);

            // Reset form
            setVilleData({ Nom: "", Description: "" });
            setSelectedFiles([]);
            setPreviewUrls([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la ville:', error);
            alert("Erreur lors de l'ajout de la ville");
        }
    };

    return (
        <div>
            <Breadcrumb title="Add Destination" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-03" backgroundImage="http://localhost:3000/assets/img/bgTourList.webp"/>
            <div className="content">
                <div className="container">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="col-lg-3 ">
                            <div className="card border-0 mb-4 mb-lg-0 theiaStickySidebar">
                                <div className="card-body">
                                    <div>
                                        <h5 className="mb-3">Add Destination</h5>
                                        <ul className="add-tab-list" id='list-example'>
                                            <li><a href="#basic_info" className="active">Basic Info</a></li>
                                            <li><a href="#description">Description</a></li>
                                            <li><a href="#gallery">Gallery</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Sidebar */}

                        {/* Add Ville */}
                        <div className="col-lg-9">
                            <form onSubmit={handleSubmit} data-bs-spy="scroll" data-bs-target="#list-example-3" data-bs-smooth-scroll="true">
                                {/* Basic Info */}
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
                                                    <label className="form-label">Destination Name</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        name="Nom" 
                                                        value={villeData.Nom} 
                                                        onChange={handleInputChange} 
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Basic Info */}

                                {/* Description */}
                                <div className="card shadow-none" id="description">
                                    <div className="card-header">
                                        <h5 className="fs-18">Description</h5>
                                    </div>
                                    <div className="card-body">
                                        <textarea
                                        className="form-control"
                                        rows={5}
                                        value={villeData.Description}
                                        onChange={(e) =>
                                            setVilleData((prev) => ({
                                            ...prev,
                                            Description: e.target.value,
                                            }))
                                        }
                                        placeholder="Enter a description..."
                                        />
                                    </div>
                                    </div>
                                {/* /Description */}
                                
                                {/* Gallery */}
                                <div className="card shadow-none" id="gallery">
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
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                multiple
                                                onChange={handleFileChange}
                                                ref={fileInputRef}
                                            />
                                        </div>
                                        <div className="d-flex align-items-center flex-wrap">
                                            {previewUrls.map((url, index) => (
                                                <div key={index} className="gallery-upload-img me-2 mb-2">
                                                    <img 
                                                        src={url} 
                                                        alt={`Preview ${index + 1}`} 
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                    />
                                                    <span
                                                        className="trash-icon d-flex align-items-center justify-content-center text-danger gallery-trash"
                                                        onClick={() => removeImage(index)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <i className="isax isax-trash" />
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* /Gallery */}
                                
                                <div className="d-flex align-items-center justify-content-center mt-4">
                                    <button type="button" className="btn btn-light me-2" onClick={() => {
                                        setVilleData({ Nom: "", Description: "" });
                                        setSelectedFiles([]);
                                        setPreviewUrls([]);
                                        if (fileInputRef.current) {
                                            fileInputRef.current.value = '';
                                        }
                                    }}>
                                        Reset
                                    </button>
                                    <button type="submit" className="btn btn-primary">Add New Ville</button>
                                </div>
                            </form>
                        </div>
                        {/* /Add Ville */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default  AddCar;