import { useState } from "react";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../common/InputField";
import Button from "../common/Button";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // mock api result
        const isLoginSuccess = false;

        if (!isLoginSuccess) {
            setHasError(true);
            toast.custom((t) => (
                <div className="hidden 2xl:flex w-[700px] items-start gap-[12px] rounded-[8px] bg-brand-red p-4 shadow-lg relative">


                    <div className="flex flex-col gap-1">
                        <p className="text-headline-4 text-white">
                            Your password is incorrect or this email doesn't exist
                        </p>
                        <p className="text-body-2 text-white">
                            Please try another password or email
                        </p>
                    </div>
                    <button
                        onClick={() => toast.dismiss(t)}
                        className="absolute top-4 right-6 text-white opacity-80 hover:opacity-100"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>
            ), {
                duration: 5000, 
            });

            return;
        }

        setHasError(false);
        navigate("/signup/success");
    };

    return (
        <div className="min-h-screen flex flex-col items-center pt-[88px] 2xl:pt-[140px] bg-neutral-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full 2xl:w-[798px] bg-neutral-200 rounded-[16px] py-[40px] 2xl:py-[60px] 2xl:px-[120px] px-[16px] gap-[24px] 2xl:gap-[40px]"
            >
                <h1 className="text-headline-2 text-center caret-transparent">Login</h1>

                <InputField
                    label="Email"
                    value={email}
                    placeholder="Email"
                    error={hasError}
                    onChange={(e) => { setEmail(e.target.value); }}
                />

                <InputField
                    label="Password"
                    type="password"
                    placeholder="Password"
                    error={hasError}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); }}
                />

                <Button
                    type="submit"
                    buttonStyle="primary"
                    buttonText="Login"
                    className="w-fit self-center"
                />

                <p className="text-body-1 text-center text-neutral-400 caret-transparent">
                    Don't have any account?{" "}
                    <Link to="/signup" className="underline text-neutral-600">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
