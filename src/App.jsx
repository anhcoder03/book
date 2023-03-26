import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingPage from "./components/common/LoadingPage";
import { AuthProvider } from "./context/auth-context";
const HomePage = React.lazy(() => import("./pages/HomePage"));
const ProductPage = React.lazy(() => import("./pages/ProductPage"));
const ProductDetailPage = React.lazy(() => import("./pages/ProductDetailPage"));
const AddCategory = React.lazy(() => import("./modules/category/AddCategory"));
const CategoryManage = React.lazy(() =>
  import("./modules/category/CategoryManage")
);
const UpdateCategory = React.lazy(() =>
  import("./modules/category/UpdateCategory")
);
const ManageComment = React.lazy(() =>
  import("./modules/comment/ManageComment")
);
const DashboardLayout = React.lazy(() =>
  import("./modules/dashboard/DashboardLayout")
);
const AddProduct = React.lazy(() => import("./modules/product/AddProduct"));
const ProductManage = React.lazy(() =>
  import("./modules/product/ProductManage")
);
const UpdateProduct = React.lazy(() =>
  import("./modules/product/UpdateProduct")
);
const UpdateUserManage = React.lazy(() =>
  import("./modules/user/UpdateUserManage")
);
const UserManage = React.lazy(() => import("./modules/user/UserManage"));
const DashboardPage = React.lazy(() => import("./pages/admin/DashboardPage"));
const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));
const SignInPage = React.lazy(() => import("./pages/SignInPage"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));
const UserProfile = React.lazy(() => import("./pages/UserProfile"));

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="/product" element={<ProductPage></ProductPage>}></Route>
          <Route path="/profile" element={<UserProfile></UserProfile>}></Route>
          <Route
            path="/product-detail/:slug"
            element={<ProductDetailPage></ProductDetailPage>}
          ></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
          </Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
          </Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/manage/update_user/:id"
              element={<UpdateUserManage></UpdateUserManage>}
            ></Route>
          </Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
          </Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/manage/update_category/:id"
              element={<UpdateCategory></UpdateCategory>}
            ></Route>
          </Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/manage/create_category"
              element={<AddCategory></AddCategory>}
            ></Route>
          </Route>

          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/manage/comment"
              element={<ManageComment></ManageComment>}
            ></Route>
          </Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/manage/product"
              element={<ProductManage></ProductManage>}
            ></Route>
          </Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/manage/create_product"
              element={<AddProduct></AddProduct>}
            ></Route>
          </Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/manage/update_product/:id"
              element={<UpdateProduct></UpdateProduct>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
