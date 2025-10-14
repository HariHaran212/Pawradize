import React, { useState, useEffect } from 'react';
import PageContainer from '../../components/PageContainer';
import apiClient from '../../api/apiClient';
import { Link } from 'react-router-dom';

// Status styles for the badges
const statusStyles = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-green-100 text-green-800',
    DECLINED: 'bg-red-100 text-red-800',
};

export default function MyAdoptionRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                // Fetch requests from the new user-specific endpoint
                const response = await apiClient.get('/api/visit-requests/my-requests');
                setRequests(response.data.data);
            } catch (err) {
                setError(err?.response?.data?.message || 'Failed to load your requests. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    const handleCancelRequest = async (requestId) => {
        // Ask for confirmation before cancelling
        if (!window.confirm("Are you sure you want to cancel this request?")) {
            return;
        }

        try {
            const response = await apiClient.patch(`/api/visit-requests/${requestId}/cancel`);
            const cancelledRequest = response.data.data;

            // Update the state locally for an instant UI update
            setRequests(prevRequests => 
                prevRequests.map(req => 
                    req.id === requestId ? { ...req, status: cancelledRequest.status } : req
                )
            );
            alert("Your request has been successfully cancelled.");

        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to cancel request.";
            alert(errorMessage);
            console.error(err);
        }
    };

    if (loading) return <PageContainer><p className="text-center">Loading your requests...</p></PageContainer>;
    if (error) return <PageContainer><p className="text-center text-red-500">{error}</p></PageContainer>;

    return (
        <PageContainer>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-primary mb-6">My Adoption Requests</h1>
                
                {requests.length === 0 ? (
                    <div className="text-center bg-ivory p-8 rounded-lg">
                        <p className="text-text-medium mb-4">You haven't made any adoption requests yet.</p>
                        <Link to="/find-a-friend" className="text-secondary font-semibold hover:underline">
                            Find a Pet to Adopt
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {requests.map(req => (
                            <div key={req.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-lg text-text-dark">Application for {req.petName}</p>
                                    <p className="text-sm text-text-medium">
                                        Submitted on: {new Date(req.requestedDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[req.status]}`}>
                                        {req.status}
                                    </span>
                                    {/* --- CONDITIONALLY RENDER THE CANCEL BUTTON --- */}
                                    {['PENDING', 'APPROVED'].includes(req.status) && (
                                        <button 
                                            onClick={() => handleCancelRequest(req.id)}
                                            className="text-xs text-red-600 hover:underline font-semibold mx-2"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PageContainer>
    );
}