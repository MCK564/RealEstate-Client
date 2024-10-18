import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { IndexPage } from "./pages/IndexPage";
import { RealEstateDetailPage } from "./pages/RealEstateDetailPage";
import { LoginPage } from "./pages/auths/LoginPage";
import { RegisterPage } from "./pages/auths/RegisterPage";
import { NewPostPage } from "./pages/posts/NewPostPage";
import { AdminLayout } from "./layouts/AdminLayout";
import { AdminUser } from "./pages/admin/User";
import { AdminBuilding } from "./pages/admin/Building";
import { Communication } from "./pages/admin/Communication";
import PageForbidden from "./pages/page403/ForbiddenPage";
import PageNotFound from "./pages/page404/pageNotFound";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ProfilePage } from "./pages/profile";
import { FavoritePage } from "./pages/favorite";
import { OwnerPostPage } from "./pages/owner_post";
import { PaymentHistory } from "./pages/payments-history/PaymentHistory";

const role = localStorage.getItem("role");
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<IndexPage />} />
            <Route path="/realEstate/:id" element={<RealEstateDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/new-post" element={<NewPostPage />} />
            <Route path="type/:slugUrl" element={<IndexPage />} />
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/favorite" element={<FavoritePage/>}/>
            <Route path="/owner_post" element={<OwnerPostPage/>} />
            <Route path="/payment-history" element={<PaymentHistory/>}/>
          </Route>
          {role === "ROLE_ADMIN" ? (
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUser />} />
              <Route path="buildings" element={<AdminBuilding />} />
              <Route path="communications" element={<Communication />} />
            </Route>
          ) : (
            <Route path="/admin/*" element={<PageForbidden />} />
          )}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
