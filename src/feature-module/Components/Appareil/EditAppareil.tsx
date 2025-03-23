import { Link, useParams } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import DefaultEditor from "react-simple-wysiwyg";
import axios from "axios";
import { DatePicker } from "antd";
import { useState, useEffect } from "react";
import moment from "moment";

const EditAppareil = (props: { appareil_id: any; }) => {
  /*const { id } = useParams<{ id: string }>(); */// Get the appareil ID from the URL
  const [galleryItems, setGalleryItems] = useState<string[]>([]);
  const [values, setValue] = useState<string>("");
  const [appareilName, setAppareilName] = useState<string>("");
  const [makeDate, setMakeDate] = useState<string>("");
  const id=props.appareil_id;
  // Fetch existing appareil data
  useEffect(() => {
    const fetchAppareil = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/appareil/getbyid/${id}`);
        const data = response.data;
        setAppareilName(data.nom);
        setMakeDate(data.date_de_creation);
        setValue(data.description);
        setGalleryItems(data.photo ? [data.photo] : []);
      } catch (error) {
        console.error("Error fetching appareil data:", error);
      }
    };

    fetchAppareil();
  }, [id]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppareilName(e.target.value);
  };

  const handleDateChange = (date: any, dateString: string | string[]) => {
    if (typeof dateString === "string") {
      setMakeDate(dateString);
    } else if (Array.isArray(dateString) && dateString.length > 0) {
      setMakeDate(dateString[0]);
    }
  };
  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
        const newGalleryItems: string[] = [];
        const readers: FileReader[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    newGalleryItems.push(event.target.result as string);

                    // Check if all files have been read
                    if (newGalleryItems.length === files.length) {
                        setGalleryItems((prevItems) => [...prevItems, ...newGalleryItems]);
                    }
                }
            };

            reader.readAsDataURL(file); // Convert file to data URL
            readers.push(reader); // Keep track of readers
        }
    }
};

  const removeGalleryItem = (index: number) => {
    setGalleryItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom', appareilName);
    formData.append('date_de_creation', makeDate);
    formData.append('description', values);

    if (galleryItems.length > 0) {
        const file = await fetch(galleryItems[0]).then((res) => res.blob());
        formData.append('photo', file, `${appareilName}.jpg`); // Save the image as 'appareilName.jpg'
    }

    try {
        const response = await axios.put(`http://127.0.0.1:3000/appareil/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("Appareil updated successfully:", response.data);
        alert("Appareil updated successfully!");
    } catch (error) {
        console.error("Error updating appareil:", error);
        alert("Failed to update appareil. Please try again.");
    }
};

  return (
    <form onSubmit={handleSubmit} data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true">
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
                <label className="form-label">Appareil Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={appareilName}
                  onChange={handleNameChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Make date</label>
                <div className="input-icon-end position-relative">
                  <DatePicker
                    className="form-control datetimepicker"
                    placeholder="dd/mm/yyyy"
                    onChange={handleDateChange}
                    value={makeDate ? moment(makeDate, 'YYYY-MM-DD') : null}
                    required
                  />
                  <span className="input-icon-addon">
                    <i className="isax isax-calendar" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
            <p className="mb-0">Upload Feature Image First, Image size should below 5MB</p>
            <input
              type="file"
              accept="image/*" // Allow only image files
              multiple // Allow multiple file selection
              onChange={handlePhoto}
            />
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

      <div className="card shadow-none" id="description">
        <div className="card-header">
          <h5 className="fs-18">Description</h5>
        </div>
        <div className="card-body text-editor">
          <DefaultEditor value={values} onChange={(e) => setValue(e.target.value)} />
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-center">
        <button type="button" className="btn btn-light me-2" onClick={() => {
          setAppareilName("");
          setMakeDate("");
          setValue("");
          setGalleryItems([]);
        }}>
          Reset
        </button>
        <button type="submit" className="btn btn-primary">
          Update Appareil
        </button>
      </div>
    </form>
  );
};

export default EditAppareil;