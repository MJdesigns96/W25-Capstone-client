import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

export default function Layout(){
    // let local = {...localStorage};
    // console.log(local);
    return (
        <>
            <Banner />
            <Header />

            <Outlet />
            <Footer />
        </>
    )
}