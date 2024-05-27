import Header from "../../components/Header";

export default function User() {
  return (
    <>
      <div className="fixed-nav sticky-footer bg-dark" id="page-top">
        <Header />
        <div className="content-wrapper">
          <div className="container-fluid">
            <h1>
              Users
            </h1>
          </div>
        </div>
      </div>
    </>
  )
}
