import { useState } from 'react';
import Header from '../../components/Header';

function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);
  };

  return (
    <>
      <div className="fixed-nav sticky-footer bg-dark" id="page-top">
        <Header />
        <div className="content-wrapper">
          <div className="container">
            <div className="main-body">
              <h2>Account Info</h2>
              <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          src={selectedImage ? URL.createObjectURL(selectedImage) : "https://bootdey.com/img/Content/avatar/avatar7.png"}
                          alt="Profile"
                          className="rounded-circle"
                          width="150"
                        />
                        <div className="mt-3">
                          <h4>Husney Mobarok</h4>
                          <p className="text-secondary mb-1">Edit Picture</p>
                          <input
                            type="file"
                            id="profilePicture"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                          />
                          <label htmlFor="profilePicture" className="btn btn-outline-primary">Choose Picture</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          Husney Mobarok
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Phone number</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          +919800589324
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Email</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          husneymobarok827@gmail.com
                        </div>
                      </div>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
