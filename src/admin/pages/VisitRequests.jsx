import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';

const sampleVisitRequests = [
    { id: 'VR-001', userName: 'Anjali M.', userContact: 'anjali@example.com', petName: 'Buddy', petType: 'Dog', requestedDate: '2025-10-05', status: 'Pending' },
    { id: 'VR-002', userName: 'Rohan S.', userContact: 'rohan@example.com', petName: 'Nala', petType: 'Cat', requestedDate: '2025-10-04', status: 'Approved' },
    { id: 'VR-003', userName: 'Vikram P.', userContact: 'vikram@example.com', petName: 'Buddy', petType: 'Dog', requestedDate: '2025-09-30', status: 'Completed' },
    { id: 'VR-004', userName: 'Sneha G.', userContact: 'sneha@example.com', petName: 'Pip', petType: 'Rabbit', requestedDate: '2025-09-28', status: 'Declined' },
];

const statusStyles = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Approved: 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
    Declined: 'bg-red-100 text-red-800',
};

export default function VisitRequests() {
    const [requests, setRequests] = useState(sampleVisitRequests);
    const [filteredRequests, setFilteredRequests] = useState(sampleVisitRequests);
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        if (statusFilter === 'All') {
            setFilteredRequests(requests);
        } else {
            setFilteredRequests(requests.filter(req => req.status === statusFilter));
        }
    }, [statusFilter, requests]);

    const handleStatusUpdate = (requestId, newStatus) => {
        setRequests(requests.map(req => req.id === requestId ? { ...req, status: newStatus } : req));
    };

    return (
        <AdminPageContainer>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-primary mb-6">Pet Visit Requests</h1>

                <div className="mb-6">
                    <select 
                        className="w-full sm:w-auto p-2 border border-accent rounded-lg"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option>All</option>
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Completed</option>
                        <option>Declined</option>
                    </select>
                </div>
                
                <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-ivory text-text-dark">
                            <tr>
                                <th className="p-4">User</th>
                                <th className="p-4">Pet</th>
                                <th className="p-4">Requested Date</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.map(req => (
                                <tr key={req.id} className="border-b border-accent hover:bg-ivory/50">
                                    <td className="p-4">
                                        <p className="font-medium text-text-dark">{req.userName}</p>
                                        <p className="text-xs text-text-medium">{req.userContact}</p>
                                    </td>
                                    <td className="p-4 font-medium">{req.petName} ({req.petType})</td>
                                    <td className="p-4">{req.requestedDate}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[req.status]}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {req.status === 'Pending' && (
                                            <div className="flex gap-2">
                                                <button onClick={() => handleStatusUpdate(req.id, 'Approved')} className="text-green-500 hover:text-green-700 p-1" title="Approve"><BsCheckCircle size={16} /></button>
                                                <button onClick={() => handleStatusUpdate(req.id, 'Declined')} className="text-red-500 hover:text-red-700 p-1" title="Decline"><BsXCircle size={16} /></button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminPageContainer>
    );
}