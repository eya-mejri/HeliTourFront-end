import React, { useState } from 'react'
import { all_routes } from '../../../router/all_routes';
import Breadcrumb from '../../../../core/common/Breadcrumb/breadcrumb';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../../../core/common/imageWithBasePath';
import Sidebar from '../../sidebar/sidebar';
import { GetProps, Input } from 'antd';
import AdminTable from '../../../Components/Admin/AdminTable';

type OTPProps = GetProps<typeof Input.OTP>;

const AgentAccountSettings = () => {

  const onChange: OTPProps['onChange'] = (text) => {
    console.log('onChange:', text);
  };

  const onInput: OTPProps['onInput'] = (value) => {
    console.log('onInput:', value);
  };

  const sharedProps: OTPProps = {
    onChange,
    onInput,
  };

  const routes = all_routes;
  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'Settings',
      active: false,
      link: routes.home1
    },
    {
      label: 'Settings',
      active: true,
    },
  ];
  const [token, setTokens] = useState<any>();

  const [isSelected, setIsSelected] = useState(false);
  const [isSelected2, setIsSelected2] = useState(false);
  const [isSelected3, setIsSelected3] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };
  const handleClick2 = () => {
    setIsSelected2(!isSelected2);
  };
  const handleClick3 = () => {
    setIsSelected3(!isSelected3);
  };

  return (
    <div>
      <Breadcrumb title="Settings" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />
      <>
        {/* Page Wrapper */}
        <div className="content">
          <div className="container">
            <div className="row">
              {/* Sidebar */}
              <div className="col-xl-3 col-lg-4">
                <Sidebar />
              </div>
              {/* /Sidebar */}
              {/* Profile Settings */}
              <div className="col-xl-9 col-lg-8">
                <div className="card settings mb-0">
                  <div className="card-header">
                    <h6>Settings</h6>
                  </div>
                  <div className="card-body">
                    <div className="settings-link d-flex align-items-center flex-wrap">
                      <Link to={routes.Profile} >
                          <i className="isax isax-user-octagon me-2" />
                          Profile
                      </Link>
                      <Link to={routes.agentSettings} >
                      <i className="fa-solid fa-pen-to-square me-2 "></i>
                        Edit Profile
                      </Link>
                      <Link to={routes.AddAdmin} className="ps-3">
                          <i className="isax isax-user-octagon me-2" />
                          Add Admin 
                      </Link>
                      <Link to={routes.agentAccountSettings} className="active ps-3">
                        <i className="isax isax-wallet-money me-2" />
                        Admins listing
                      </Link>
                     { /*<Link to={routes.agentSecuritySettings}>
                        <i className="isax isax-shield-tick me-2" />
                        Security
                      </Link>
                      <Link to={routes.agentPlanSettings}>
                        <i className="isax isax-star me-2" />
                        Plans &amp; Billing
                      </Link>*/}
                    </div>
                    <AdminTable numPage={10}/>
                  </div>
                </div>
              </div>
              {/* /Profile Settings */}
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}
      </>


    </div>
  )
}

export default AgentAccountSettings
