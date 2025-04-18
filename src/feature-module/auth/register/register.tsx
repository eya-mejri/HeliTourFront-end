import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import { all_routes } from '../../router/all_routes';
import axios from 'axios';

type PasswordField = "password" | "confirmPassword";

const Register = () => {
  const routes = all_routes;
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    Nom: '',
    Prenom: '',
    Email: '',
    Num_Telephone: '',
    MDP: '',
    confirmPassword: '',
    RoleNom: 'Client', // Default to Client
    AdresseData: {
      Pays: '',
      Ville: '',
      Code_Postal: '',
      Adresse_Locale: ''
    }
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const togglePasswordVisibility = (field: PasswordField) => {
    setPasswordVisibility(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('AdresseData.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        AdresseData: {
          ...prev.AdresseData,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, RoleNom: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (formData.MDP !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the terms of service');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:3000/utilisateur/register', {
        Nom: formData.Nom,
        Prenom: formData.Prenom,
        Email: formData.Email,
        Num_Telephone: formData.Num_Telephone,
        MDP: formData.MDP,
        RoleNom: formData.RoleNom,
        AdresseData: formData.AdresseData
      });

      if (response.status === 201) {
        navigate(routes.login); // Redirect to login after successful registration
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Registration failed');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
      <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
        <div className="col-xxl-4 col-lg-6 col-md-6 col-11 mx-auto">
          <div className="p-4 text-center">
            <ImageWithBasePath
              src="assets/img/logo-dark.svg"
              alt="logo"
              className="img-fluid"
            />
          </div>
          <div className="card authentication-card">
            <div className="card-header">
              <div className="text-center">
                <h5 className="mb-1">Sign Up</h5>
                <p>Create your DreamsTour Account</p>
              </div>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <div className="input-icon">
                    <span className="input-icon-addon">
                      <i className="isax isax-user" />
                    </span>
                    <input
                      type="text"
                      name="Prenom"
                      className="form-control form-control-lg"
                      placeholder="Enter First Name"
                      value={formData.Prenom}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <div className="input-icon">
                    <span className="input-icon-addon">
                      <i className="isax isax-user" />
                    </span>
                    <input
                      type="text"
                      name="Nom"
                      className="form-control form-control-lg"
                      placeholder="Enter Last Name"
                      value={formData.Nom}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <div className="input-icon">
                    <span className="input-icon-addon">
                      <i className="isax isax-message" />
                    </span>
                    <input
                      type="email"
                      name="Email"
                      className="form-control form-control-lg"
                      placeholder="Enter Email"
                      value={formData.Email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <div className="input-icon">
                    <span className="input-icon-addon">
                      <i className="isax isax-call" />
                    </span>
                    <input
                      type="tel"
                      name="Num_Telephone"
                      className="form-control form-control-lg"
                      placeholder="Enter Phone Number"
                      value={formData.Num_Telephone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Account Type</label>
                  <select
                    className="form-select form-control-lg"
                    value={formData.RoleNom}
                    onChange={handleRoleChange}
                    required
                  >
                    <option value="Client">Client</option>
                    <option value="Agence">Agency</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    name="AdresseData.Pays"
                    className="form-control form-control-lg"
                    placeholder="Enter Country"
                    value={formData.AdresseData.Pays}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    name="AdresseData.Ville"
                    className="form-control form-control-lg"
                    placeholder="Enter City"
                    value={formData.AdresseData.Ville}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Postal Code</label>
                  <input
                    type="text"
                    name="AdresseData.Code_Postal"
                    className="form-control form-control-lg"
                    placeholder="Enter Postal Code"
                    value={formData.AdresseData.Code_Postal}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    name="AdresseData.Adresse_Locale"
                    className="form-control form-control-lg"
                    placeholder="Enter Address"
                    value={formData.AdresseData.Adresse_Locale}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-icon">
                    <span className="input-icon-addon">
                      <i className="isax isax-lock" />
                    </span>
                    <input
                      type={passwordVisibility.password ? "text" : "password"}
                      name="MDP"
                      className="pass-input form-control"
                      placeholder="Enter Password"
                      value={formData.MDP}
                      onChange={handleChange}
                      required
                    />
                    <span
                      className={`isax toggle-passwords ${passwordVisibility.password ? "isax-eye" : "isax-eye-slash"}`}
                      onClick={() => togglePasswordVisibility("password")}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <div className="input-icon">
                    <span className="input-icon-addon">
                      <i className="isax isax-lock" />
                    </span>
                    <input
                      type={passwordVisibility.confirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      className="pass-input form-control"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <span
                      className={`isax toggle-passwords ${passwordVisibility.confirmPassword ? "isax-eye" : "isax-eye-slash"}`}
                      onClick={() => togglePasswordVisibility("confirmPassword")}
                    />
                  </div>
                </div>
                <div className="mt-3 mb-3">
                  <div className="d-flex">
                    <div className="form-check d-flex align-items-center mb-2">
                      <input
                        className="form-check-input mt-0"
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        id="agree"
                        required
                      />
                      <label className="form-check-label ms-2 text-gray-9 fs-14" htmlFor="agree">
                        I agree with the&nbsp;
                        <Link to={routes.termsConditions} className="link-primary fw-medium">
                          Terms Of Service.
                        </Link>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-xl btn-primary d-flex align-items-center justify-content-center w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                        Registering...
                      </>
                    ) : (
                      <>
                        Register
                        <i className="isax isax-arrow-right-3 ms-2" />
                      </>
                    )}
                  </button>
                </div>
                <div className="login-or mb-3">
                  <span className="span-or">Or</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <button
                    type="button"
                    className="btn btn-light flex-fill d-flex align-items-center justify-content-center me-2"
                  >
                    <ImageWithBasePath
                      src="assets/img/icons/google-icon.svg"
                      className="me-2"
                      alt="Google"
                    />
                    Google
                  </button>
                  <button
                    type="button"
                    className="btn btn-light flex-fill d-flex align-items-center justify-content-center"
                  >
                    <ImageWithBasePath
                      src="assets/img/icons/fb-icon.svg"
                      className="me-2"
                      alt="Facebook"
                    />
                    Facebook
                  </button>
                </div>
                <div className="d-flex justify-content-center">
                  <p className="fs-14">
                    Already have an account?{" "}
                    <Link to={all_routes.login} className="link-primary fw-medium">
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;