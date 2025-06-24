import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { all_routes } from '../../router/all_routes';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import { DatePicker, message } from 'antd';
import dayjs from 'dayjs';
import AddFaq from '../../../core/common/modal/addFaq';
import EditFaq from '../../../core/common/modal/editFaq';
import DeleteModal from '../../../core/common/modal/deleteModal';
import DefaultEditor from 'react-simple-wysiwyg';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import axios from 'axios';

const AddCircuit = () => {
    const routes = all_routes;
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Add Tour',
            active: false,
            link: routes.home1,
        },
        {
            label: 'Add Tour',
            active: true,
        },
    ];

    const [defaultDate] = useState(dayjs());
    const [values, setValue] = useState<string>('');
    const [nom, setNom] = useState<string>('');
    const [disponibilite, setDisponibilite] = useState<string>('');
    const [prix, setPrix] = useState<string>('');
    const [villeNom, setVilleNom] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [villes, setVilles] = useState<{ _id: string; Nom: string }[]>([]);


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    const handleNomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNom(e.target.value);
    };

    const handleDisponibiliteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisponibilite(e.target.value);
    };

    const handlePrixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrix(e.target.value);
    };

    const handleVilleNomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVilleNom(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
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
        const newFiles = [...selectedFiles];
        const newPreviews = [...previewUrls];
        
        newFiles.splice(index, 1);
        newPreviews.splice(index, 1);
        
        setSelectedFiles(newFiles);
        setPreviewUrls(newPreviews);
    };

    const handleReset = () => {
        setNom('');
        setDisponibilite('');
        setPrix('');
        setVilleNom('');
        setDescription('');
        setValue('');
        setSelectedFiles([]);
        setPreviewUrls([]);
        
        // Revoke object URLs to avoid memory leaks
        previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
   

    useEffect(() => {
      const fetchVilles = async () => {
        try {
          const response = await axios.get('http://localhost:3000/ville/getall');
          if (Array.isArray(response.data)) {
            setVilles(response.data);
          }
        } catch (error) {
          console.error('Error fetching villes:', error);
        }
      };
    
      fetchVilles();
    }, []);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submit button clicked");
    
        try {
            // Get ville ID
            console.log("Récupération de l'ID de la ville pour :", villeNom);
            const villeResponse = await axios.get(`http://localhost:3000/ville/getByName/${villeNom}`);
            console.log("Réponse du serveur :", villeResponse.data);
            const villeId = villeResponse.data._id;
            console.log("ID de la ville récupéré :", villeId);
    
            // Prepare form data
            const formData = new FormData();
            formData.append('Nom', nom);
            formData.append('Description', description);
            formData.append('Prix', prix);
            formData.append('Disponibilite', disponibilite);
            formData.append('villeId', villeId);
            
            // Append each file
            selectedFiles.forEach(file => {
                formData.append('photos', file);
            });
    
            console.log("Données du circuit à envoyer :", {
                Nom: nom,
                Description: description,
                Prix: prix,
                Disponibilite: disponibilite,
                villeId: villeId,
                photosCount: selectedFiles.length
            });
    
            const response = await axios.post('http://localhost:3000/circuit/addCircuit2', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log('Circuit ajouté avec succès:', response.data);
            message.success('Circuit ajouté avec succès!');
            handleReset();
        } catch (error) {
            console.error('Erreur:', error);
            message.error('Erreur lors de l\'ajout du circuit');
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div>
            <Breadcrumb title="Add Tour" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-01" backgroundImage="http://localhost:3000/assets/img/bgTourList.webp" />

            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    <div className="place-nav">
                        <ul className="nav" role="tablist">
                            <li>
                                <Link
                                    to="#"
                                    className="nav-link active"
                                    data-bs-toggle="tab"
                                    data-bs-target="#add_circuit"
                                    aria-selected="true"
                                    role="tab"
                                >
                                    Add New Tour
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content">
                        {/* Add Circuit */}
                        <div className="tab-pane fade active show" id="add_circuit" role="tabpanel">
                            <div className="row">
                                <div className="col-lg-3 theiaStickySidebar">
                                    <div className="card border-0 mb-4 mb-lg-0 theiaStickySidebar">
                                        <div className="card-body">
                                            <div>
                                                <h5 className="mb-3">Add Tour</h5>
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
                                    <form onSubmit={handleSubmit} data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true">
                                        {/* Basic Info */}
                                        <div className="card shadow-none" id="basic_info">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Tour Details</h5>
                                                </div>
                                            </div>
                                            <div className="card-body pb-1">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">Name</label>
                                                            <input type="text" className="form-control" value={nom} onChange={handleNomChange} required />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Disponibility</label>
                                                            <select className="form-control" value={disponibilite} onChange={(e) => setDisponibilite(e.target.value)} required>
                                                                <option value="">Select</option>
                                                                <option value="true">Available</option>
                                                                <option value="false">Not Available</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Price</label>
                                                            <input type="number" className="form-control" value={prix} onChange={handlePrixChange} required />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Destination</label>
                                                            <select
                                                            className="form-control"
                                                            value={villeNom}
                                                            onChange={(e) => setVilleNom(e.target.value)}
                                                            required
                                                            >
                                                            <option value="">Select Destination</option>
                                                            {villes.map((ville) => (
                                                                <option key={ville._id} value={ville.Nom}>
                                                                {ville.Nom}
                                                                </option>
                                                            ))}
                                                            </select>
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
                                        value={description}
                                        onChange={handleDescriptionChange
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
                                                <div 
                                                    className="file-upload drag-file w-100 d-flex align-items-center justify-content-center flex-column mb-2"
                                                    onClick={triggerFileInput}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <span className="upload-img d-block mb-2">
                                                        <i className="isax isax-document-upload fs-24" />
                                                    </span>
                                                    <h6 className="mb-1">Upload Gallery Images</h6>
                                                    <p className="mb-0">
                                                        Upload Feature Image First, Image size should below 5MB
                                                    </p>
                                                    <input 
                                                        type="file" 
                                                        ref={fileInputRef}
                                                        accept="image/*" 
                                                        onChange={handleFileChange}
                                                        multiple
                                                        style={{ display: 'none' }}
                                                    />
                                                </div>
                                                <div className="d-flex align-items-center flex-wrap">
                                                    {previewUrls.map((url, index) => (
                                                        <div key={index} className="gallery-upload-img me-2 mb-2 position-relative">
                                                            <img 
                                                                src={url} 
                                                                alt={`Preview ${index}`} 
                                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                            />
                                                            <span
                                                                className="trash-icon d-flex align-items-center justify-content-center text-danger gallery-trash position-absolute"
                                                                style={{ top: '5px', right: '5px', width: '20px', height: '20px', background: 'white', borderRadius: '50%' }}
                                                                onClick={() => removeImage(index)}
                                                            >
                                                                <i className="isax isax-trash" />
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Gallery */}

                                        {/* Buttons */}
                                        <div className="d-flex align-items-center justify-content-center mt-4">
                                            <button type="button" className="btn btn-light me-2" onClick={handleReset}>
                                                Reset
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                Add New Tour
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}

            <AddFaq />
            <EditFaq />
            <DeleteModal />
        </div>
    );
};

export default AddCircuit;