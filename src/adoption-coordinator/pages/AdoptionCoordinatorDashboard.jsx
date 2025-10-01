import React from 'react';
import AdoptionCoordinatorLayout from '../../layouts/AdoptionCoordinatorLayout';
import { FaPaw, FaCalendarCheck, FaHome } from 'react-icons/fa';
import AdminPageContainer from '../../admin/components/AdminPageContainer';

const StatCard = ({ icon, title, value }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-4">
            <div className="bg-ivory text-primary p-3 rounded-full">{icon}</div>
            <div>
                <p className="text-sm text-text-medium">{title}</p>
                <p className="text-2xl font-bold text-text-dark">{value}</p>
            </div>
        </div>
    </div>
);

export default function AdoptionCoordinatorDashboard() {
  return (
    <AdminPageContainer>
      <h1 className="text-3xl font-bold text-primary mb-6">Adoption Coordinator Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={<FaPaw size={22}/>} title="Pets Available" value="28" />
        <StatCard icon={<FaCalendarCheck size={22}/>} title="Pending Visit Requests" value="5" />
        <StatCard icon={<FaHome size={22}/>} title="Adoptions This Month" value="12" />
      </div>
       <div className="mt-8 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-text-dark">Recent Visit Requests</h2>
        <p className="mt-4 text-text-medium">A list of the 5 most recent visit requests would be displayed here.</p>
      </div>
    </AdminPageContainer>
  );
}