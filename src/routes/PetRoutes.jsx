import React from 'react'
import { Route } from 'react-router-dom'
import AdminPets from '../admin/pages/AdminPets'
import AddPet from '../admin/pages/AddPet'
import EditPet from '../admin/pages/EditPet'
import ViewPet from '../admin/pages/ViewPet'
import VisitRequests from '../admin/pages/VisitRequests'

const petRoutes = (
    <>
        <Route path="pets" element={<AdminPets />} />
        <Route path="pets/new" element={<AddPet />} />
        <Route path="pets/edit/:id" element={<EditPet />} />
        <Route path="pets/view/:id" element={<ViewPet />} />
        <Route path="visit-requests" element={<VisitRequests />} />
    </>
);

export default petRoutes;