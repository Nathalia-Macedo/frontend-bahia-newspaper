import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { PostPage } from "../pages/PostPage";
import { ErrorPage } from "../pages/ErrorPage";
import { LoginPage } from "../pages/LoginPage";
import { Admin } from "../pages/AdminPage/Admin";
export const RouteMain = () => {
    return(
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/post/:id" element={<PostPage/>}/>
            <Route path="*" element={<ErrorPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
<<<<<<< HEAD
            <Route path="/admin" element={<Admin/>}/>

=======
>>>>>>> 152d0f679b37a15f7da0dcddf078f41fb09b0e67
        </Routes>
    );
};