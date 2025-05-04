import React from 'react'
import { Link } from 'react-router-dom'

const SIDEBARLIST = [
    // {
    //     title: 'Dashboard',
    //     link: '#',
    //     icon: 'fs-4 bi-house',
    //     isExtendable: false,
    // },
    {
        title: 'Machine',
        link: '',
        icon: 'fs-4 bi-archive',
        isExtendable: true,
        child: [
            {
                title: 'Add Machine',
                link: '/dashboard/add-machine'
            },
            {
                title: 'View Machine',
                link: '/dashboard/view-machine'
            }
        ]
    },
    {
        title: 'Driver',
        link: '',
        icon: 'fs-4 bi-car-front',
        isExtendable: true,
        child: [
            {
                title: 'Add Driver',
                link: '/dashboard/add-driver'
            },
            {
                title: 'View Drivers',
                link: '/dashboard/view-driver'
            }
        ]
    },
    {
        title: 'Requests',
        link: '',
        icon: 'fs-4 bi-chat-left-quote-fill',
        isExtendable: true,
        child: [
            {
                title: 'View Request',
                link: '/dashboard/view-request'
            }
        ]
    },
    {
        title: 'Settings',
        link: '',
        icon: 'fs-4 bi-gear-fill',
        isExtendable: true,
        child: [
            {
                title: 'Whatapp Settings',
                link: '/dashboard/whatsapp-settings'
            },
            {
                title: 'Notification Settings',
                link: '/dashboard/notification-settings'
            }
        ]
    },
]

export default function Sidebar() {
    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">GarBage Collect</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">

                    {
                        SIDEBARLIST.map((dt, index) => {
                            if (dt.isExtendable) {
                                return (
                                    <li>
                                        <a href={`#submenu${index}`} data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                            <i className={dt.icon}></i> <span className="ms-1 d-none d-sm-inline">{dt.title}</span> <i class="bi bi-caret-down-fill"></i> </a>
                                        <ul className="collapse nav flex-column ms-1" id={`submenu${index}`} data-bs-parent="#menu">
                                            {
                                                dt.child.map((ch) => {
                                                    return (
                                                        <li className="w-100 ps-2">
                                                            <Link to={ch.link} className="nav-link px-0 text-white"><i class="bi bi-caret-right-fill"></i> <span className="d-none d-sm-inline">{ch.title}</span> </Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </li>
                                )
                            } else {
                                return (
                                    <li className="nav-item">
                                        <a href={dt.link} className="nav-link align-middle text-white px-0">
                                            <i className={dt.icon}></i> <span className="ms-1 d-none d-sm-inline">{dt.title}</span>
                                        </a>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
                <hr />
            </div>
        </div>
    )
}
