import React from 'react'

function Dashboard() {
    const data = [
        {
            name: 'Earnings (Monthly)',
            price: '40,000',
            icon: 'fas fa-calendar fa-2x text-gray-300',
            color: "card border-left-info shadow h-100 py-2"

        },
        {
            name: 'Earnings (Annual)',
            price: '215,000',
            icon: 'fas fa-dollar-sign fa-2x text-gray-300',
            color: "card border-left-primary shadow h-100 py-2"

        },
        {
            name: 'Tasks',
            price: '50%',
            icon: 'fas fa-clipboard-list  fa-2x text-gray-300',
            color: "card border-left-success shadow h-100 py-2",
            // process:" class: "progress-bar bg-info"  role: "progressbar",
            // style:{{
            //     "width": "50%", "aria-valuenow": "50", "aria-valuemin": "0",
            //     "aria-valuemax": "100"}}"


        },
        {
            name: 'Pending Requests',
            price: '18',
            icon: 'fas fa-comments fa-2x text-gray-300',
            color: "card border-left-warning shadow h-100 py-2"

        }
    ]
    return (
        <>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
            </div>
            <div class="row">
                {
                    data.map((obj) => {
                        return <div class="col-xl-3 col-md-6 mb-4">
                            <div class={obj.color}>
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                {obj.name}</div>
                                            {obj.name === "Tasks" ? <div class="row no-gutters align-items-center">
                                                <div class="col-auto">
                                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                                                </div>
                                                <div class="col">
                                                    <div class="progress progress-sm mr-2">
                                                        <div class="progress-bar bg-info" role="progressbar"
                                                            style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0"
                                                            aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div> : <div class="h5 mb-0 font-weight-bold text-gray-800">${obj.price}</div>}

                                        </div>
                                        <div class="col-auto">
                                            <i class={obj.icon}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }

            </div>
        </>
    )
}

export default Dashboard