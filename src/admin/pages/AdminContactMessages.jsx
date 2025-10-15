import React, { useState, useEffect } from 'react';
import AdminPageContainer from '../components/AdminPageContainer';
import apiClient from '../../api/apiClient';
import { formatDateTime } from '../../utils/helper';

const statusStyles = {
    NEW: 'bg-blue-100 text-blue-800',
    READ: 'bg-gray-100 text-gray-800',
    ARCHIVED: 'bg-green-100 text-green-800',
};

export default function AdminContactMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (statusFilter !== 'All') {
                    params.append('status', statusFilter);
                }
                const response = await apiClient.get('/api/admin/contact', { params });
                setMessages(response.data.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load messages.');
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, [statusFilter]);

    const handleStatusUpdate = async (messageId, newStatus) => {
        try {
            await apiClient.patch(`/api/admin/contact/${messageId}/status`, null, { params: { newStatus } });
            setMessages(prevMessages =>
                prevMessages.map(msg =>
                    msg.id === messageId ? { ...msg, status: newStatus } : msg
                )
            );
        } catch (err) {
            alert('Failed to update status.');
        }
    };

    return (
        <AdminPageContainer>
            <h1 className="text-3xl font-bold text-primary mb-6">Contact Messages</h1>
            <select onChange={(e) => setStatusFilter(e.target.value)} className="p-2 border rounded-lg mb-6">
                <option value="All">All</option>
                <option value="NEW">New</option>
                <option value="READ">Read</option>
                <option value="ARCHIVED">Archived</option>
            </select>

            {loading && <p>Loading messages...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="space-y-4">
                {messages.map(msg => (
                    <div key={msg.id} className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold">{msg.name} <span className="font-normal text-gray-500">&lt;{msg.email}&gt;</span></p>
                                <p className="text-xs text-gray-400">{formatDateTime(msg.receivedAt)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[msg.status]}`}>{msg.status}</span>
                                {msg.status === 'NEW' && (
                                    <button onClick={() => handleStatusUpdate(msg.id, 'READ')} className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">Mark as Read</button>
                                )}
                                {msg.status === 'READ' && (
                                    <>
                                        <button onClick={() => handleStatusUpdate(msg.id, 'ARCHIVED')} className="bg-green-200 px-2 py-1 rounded hover:bg-green-300">Archive</button>
                                        <button onClick={() => handleStatusUpdate(msg.id, 'NEW')} className="bg-blue-200 px-2 py-1 rounded hover:bg-blue-300">Mark as Unread</button>
                                    </>
                                )}
                                {msg.status === 'ARCHIVED' && (
                                    <button onClick={() => handleStatusUpdate(msg.id, 'READ')} className="bg-yellow-200 px-2 py-1 rounded hover:bg-yellow-300">Unarchive</button>
                                )}
                            </div>
                        </div>
                        <p className="mt-4 text-gray-700">{msg.message}</p>
                    </div>
                ))}
                {messages.length === 0 && !loading && <p>No messages found.</p>}
            </div>
        </AdminPageContainer>
    );
}