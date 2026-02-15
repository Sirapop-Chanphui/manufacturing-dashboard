import { Link, useNavigate} from "react-router-dom";
import { useEffect } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import { useAuth } from "../../context/authentication";
import { useLoginForm } from "./useLoginForm";
import { showAuthErrorToast } from "./showAuthErrorToast";
import { mapBackendErrors } from "@/utils/mapBackendErrors";
import { isMobile } from "@/utils/device";

function Login() {
    const { login, state } = useAuth();
    const navigate = useNavigate();
    const { values, errors, setErrors, handleChange, handleSubmit } = useLoginForm();

    const onSubmit = async (formValues) => {
        try {
            await login(formValues);
            const role = state.user?.data?.role;
            console.log(state)

            if (!isMobile() && role === "admin") {
                navigate("/login/admin/article-management");
            } else {
                navigate("/");
            }
        } catch (error) {
            const mapped = mapBackendErrors(error);
            if (mapped.form && !mapped.email && !mapped.password) {
                setErrors({ email: mapped.form, password: mapped.form });
            } else {
                setErrors(mapped);
            }
            showAuthErrorToast(error);
        }
    };

    useEffect(() => {
        if (state.user && !state.getUserLoading) {
            if (!isMobile() && state.user.role === "admin") {
                navigate("/login/admin/article-management");
            } else {
                navigate("/");
            }
        }
    }, [state.user, state.getUserLoading, navigate]);


    return (
        <main className="min-h-screen bg-neutral-100 px-4 pt-[88px] 2xl:pt-[140px]">
            <section className="flex flex-col items-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex w-full flex-col gap-[24px] rounded-[16px] bg-neutral-200 px-[16px] py-[40px] 2xl:w-[798px] 2xl:gap-[40px] 2xl:px-[120px] 2xl:py-[60px]"
                >
                    <header>
                        <h1 className="text-headline-2 caret-transparent text-center">
                            Login
                        </h1>
                    </header>


                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        value={values.email}
                        placeholder="Email"
                        error={errors.email}
                        onChange={handleChange}
                        hideErrorMessage
                    />

                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        error={errors.password}
                        value={values.password}
                        onChange={handleChange}
                        hideErrorMessage
                    />

                    <Button
                        type="submit"
                        buttonStyle="primary"
                        buttonText={state.loading ? "Logging in..." : "Login"}
                        disabled={state.loading}
                        className="w-fit self-center"
                    />

                    <p className="text-body-1 caret-transparent text-center text-neutral-400">
                        Don't have any account?{" "}
                        <Link to="/signup" className="text-neutral-600 underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </section>
        </main>
    );
}

export default Login;
