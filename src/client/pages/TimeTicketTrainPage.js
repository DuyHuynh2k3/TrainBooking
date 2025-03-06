import React from 'react'
import Header  from '../components/Header'

export default function TimeTicketTrainPage() {
  return (
    <div className="d-flex flex-column" style={{ backgroundColor: "#f7f7f7" }}>
    <Header />
    <main className="mt-4">
      <div className="container-fluid mt-2">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow">
              <div className="card-header text-primary">
                <h5 className="m-0 d-flex align-items-center" style={{ gap: "5px" }}>
                Điểm in vé tầu và tra cứu vé tầu điện tử
                </h5>
              </div>
              <div className="card-body p-2">
              <p className="p-2">
              Vui lòng chọn các thao tác bên dưới.
              </p>
              <a href="your-page-url.html" class="btn btn-warning text-white" 
              style={{width:"100%",fontSize:"20px",fontWeight:"bold"}}
              >Giờ tàu - Giá vé</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  )
}
