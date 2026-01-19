import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Websection";
import { CircleAlert } from "lucide-react";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col caret-transparent">
            <div className="flex flex-1 flex-col justify-center items-center gap-[30px] mt-[80px]">
                <CircleAlert className="w-24 h-24" />
                <h2 className="text-headline-3">Page Not Found</h2>

                <Link to="/">
                    <Button
                        buttonText="Go To Homepage"
                        buttonStyle="primary"
                        onClick={() => navigate("/")}
                    />
                </Link>
            </div>

            {/* FOOTER */}
            <Footer />
        </div>
    );
};

export default NotFound;
