import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { PostPage } from "../pages/PostPage";
import { ErrorPage } from "../pages/ErrorPage";
import { LoginPage } from "../pages/LoginPage";
import { Admin } from "../pages/AdminPage/Admin";
import{ RecuperarSenha } from "../pages/ForgetPassword/RecuperarSenha";
export const RouteMain = () => {
    return(
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/post/:id" element={<PostPage/>}/>
            <Route path="*" element={<ErrorPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/forget_password" element={<RecuperarSenha/>}/>
            <Route path="/admin" element={<Admin/>}/>

        </Routes>
    );
};