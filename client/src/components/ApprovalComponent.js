import React, { useState } from 'react'
import swal from 'sweetalert'
const ApprovalComponent = ({ headers, data }) => {
    const [isApproved, setIsApproved] = useState(false);
    const user = localStorage.getItem('user-token')
    const approveWarden = async () => {
        swal("Authenticated Successfully", "", "success");
        setIsApproved(true);
        await fetch("http://localhost:8800/admin/approval", {
            method: 'POST',
            body: JSON.stringify({
                id: data.id,
                uname: data.email,
                pwd: data.password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {

                return response.json()
            })
            .catch(error => {
                window.alert(error);
                return;
            })
    }
    const approveStudent = async () => {
        swal("Authenticated Successfully", "", "success");
        setIsApproved(true);
        await fetch("http://localhost:8800/warden/approval/" + localStorage.getItem('id'), {
            method: 'POST',
            body: JSON.stringify({
                id: data.id,
                uname: data.email,
                pwd: data.password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                return response.json()
            })
            .catch(error => {
                window.alert(error);
                return;
            })
    }
    const denyWarden = async () => {
        swal("Request Denied", "", "warning")
        setIsApproved(true);
        await fetch("http://localhost:8800/admin/deny", {
            method: 'POST',
            body: JSON.stringify({
                id: data.id,
                uname: data.email,
                pwd: data.password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {

                return response.json()
            })
            .catch(error => {
                window.alert(error);
                return;
            })

    }
    const denyStudent = async () => {
        swal("Request Denied", "", "warning")
        setIsApproved(true);
        await fetch("http://localhost:8800/warden/deny", {
            method: 'POST',
            body: JSON.stringify({
                id: data.id,
                uname: data.email,
                pwd: data.password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {

                return response.json()
            })
            .catch(error => {
                window.alert(error);
                return;
            })


    }

    return (
        <>
            {!isApproved && <div className="flex flex-col col-span-3 p-5 bg-gray-100 rounded-lg shadow mx-3 approval"style={{border:"1px solid gray"}}>
                {headers.map((header, index) => (
                    <div key={index} className="flex items-center justify-between mb-4 mr-6" >
                        <div className="font-semibold text-gray-800 px-6">{header.label} :</div>
                        <div className="font-normal text-gray-600">{header.value(data)}</div>
                    </div>
                )
                )}
                <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={user === 'adminadmin' ? approveWarden : approveStudent} >Approve</button>
                <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={user === 'adminadmin' ? denyWarden : denyStudent} >Deny Request</button>
            </div>}
        </>
    )
}

export default ApprovalComponent
