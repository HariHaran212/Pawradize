import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// User Pages
import Home from "./user/pages/Home";
import FindFriendPage from "./user/pages/FindFriendPage";
import ShopPage from "./user/pages/ShopPage";
import PetCareResources from "./user/pages/PetCareResources";
import About from "./user/pages/About";
import Contact from "./user/pages/Contact";
import UserProfile from "./user/pages/UserProfile";
import Cart from "./user/pages/Cart";
import AuthPage from "./user/pages/AuthPage";
import ForgotPassword from "./user/pages/ForgotPassword";
import ProductDetailPage from "./user/pages/ProductDetailPage";
import PetDetailPage from "./user/pages/PetDetailPage";
import CheckoutPage from "./user/pages/CheckoutPage";
import SettingsPage from "./user/pages/SettingsPage";
import FavoritesPage from "./user/pages/FavouritesPage";
import OrdersPage from "./user/pages/OrdersPage";
import WelcomeHomeForm from "./user/pages/WelcomeHomeFrom";
import FullGuidePage from "./user/pages/FullGuidePage";
import HealthPage from "./user/pages/HealthPage";
import EventsPage from "./user/pages/EventsPage";
import GroomingPage from "./user/pages/GroomingPage";
import UnauthorizedPage from "./user/pages/UnauthorizedPage";
import OrderDetailPage from "./user/pages/OrderDetailsPage";
import OrderHistoryPage from "./user/pages/OrderHistoryPage";
import OrderConfirmationPage from "./user/pages/OrderConfirmationPage";
import MyAdoptionRequests from "./user/pages/MyAdoptionRequests";
import NotFound from "./user/pages/NotFound";

// Admin Pages
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminNotFound from "./admin/pages/AdminNotFound";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminSettings from "./admin/pages/AdminSettings";
import AdminProfile from "./admin/pages/AdminProfile";
import AdminGuideEditor from "./admin/pages/AdminGuideEditor";
import AdminContentPage from "./admin/pages/AdminContentPage";
import AdminContactMessages from "./admin/pages/AdminContactMessages";

import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler";
import PublicRoute from "./components/PublicRoute";

import AdoptionCoordinatorDashboard from "./adoption-coordinator/pages/AdoptionCoordinatorDashboard";
import StoreManagerDashboard from "./store-manager/pages/StoreManagerDashboard";
import AdoptionCoordinatorLayout from "./layouts/AdoptionCoordinatorLayout";
import RoleBasedRoute from "./components/RoleBasedRoute";
import StoreManagerLayout from "./layouts/StoreManagerLayout";
import petRoutes from "./routes/PetRoutes";
import productRoutes from "./routes/ProductRoutes";

function App() {
  return (
    <Routes>
      {/* ===== SUPER ADMIN ROUTES ===== */}
      {/* <Route path="/admin" element={<AdminLayout />}>
        <Route element={<AdminRoute />}> */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route element={<RoleBasedRoute allowedRoles={['SUPER_ADMIN', 'USER']} />}>
            <Route index element={<AdminDashboard />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="settings" element={<AdminSettings />} />
            { petRoutes }
            { productRoutes }
            <Route path="content" element={<AdminContentPage />} />
            <Route path="guides/:slug" element={<FullGuidePage />} />
            <Route path="guides/new" element={<AdminGuideEditor />} />
            <Route path="guides/edit/:id" element={<AdminGuideEditor />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="messages" element={<AdminContactMessages />} />
            <Route path="*" element={<AdminNotFound />} />
        </Route>
      </Route>

      {/* ===== STORE MANAGER ROUTES ===== */}
      <Route path="/manager" element={<StoreManagerLayout />}>
        <Route element={<RoleBasedRoute allowedRoles={['STORE_MANAGER']} />}>
          <Route index element={<StoreManagerDashboard />} />
          { productRoutes }
          <Route path="profile" element={<UserProfile />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>


      {/* ===== ADOPTION COORDINATOR ROUTES ===== */}
      <Route path="/adoption" element={<AdoptionCoordinatorLayout />}>
        <Route element={<RoleBasedRoute allowedRoles={['ADOPTION_COORDINATOR']} />}>
          <Route index element={<AdoptionCoordinatorDashboard />} />
          { petRoutes }
          <Route path="profile" element={<UserProfile />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      
      {/* ===== USER ROUTES ===== */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        
        <Route element={<PublicRoute />}>
          <Route path="login" element={<AuthPage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="find-a-friend" element={<FindFriendPage />} />
        <Route path="pet/:id" element={<PetDetailPage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="pet-care-resources" element={<PetCareResources />} />
        <Route path="guides/:slug" element={<FullGuidePage />} />
        <Route path="about" element={<About />} />
        <Route path="grooming" element={<GroomingPage />} />
        <Route path="health" element={<HealthPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="contact" element={<Contact />} />

        {/* Protected routes for logged-in users */}
        {/* <Route element={<ProtectedRoute />}> */}
        <Route element={<RoleBasedRoute allowedRoles={['USER']} />}>
          <Route path="account" element={<UserProfile />} />
          <Route path="pet/welcome-home/:id" element={<WelcomeHomeForm />} />
          <Route path="/my-requests" element={<MyAdoptionRequests />} /> 
          {/* <Route path="favorites" element={<FavoritesPage />} /> */}
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<CheckoutPage />} />
          {/* <Route path="orders" element={<OrdersPage />} /> */}
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/orders/:orderId" element={<OrderDetailPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="unauthorized" element={<UnauthorizedPage />} />
      </Route>

      {/* Catch-all Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// Note: You must also wrap your App component in <BrowserRouter> in your main.jsx or index.js
// Example for main.jsx:
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

export default App;