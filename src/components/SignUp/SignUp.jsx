import InputField from "../common/InputField";
import { useSignUpForm } from "./useSignUpForm";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authentication";
import { mapBackendErrors } from "@/utils/mapBackendErrors";


function SignUpForm() {
    const { values, errors, setErrors, handleChange, handleSubmit } = useSignUpForm();
    const { register, state } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await register(data);
            navigate("/signup/success");
        } catch (error) {
            setErrors(mapBackendErrors(error));
        }
    };


    return (
        <div className="min-h-screen flex flex-col items-center pt-[88px] 2xl:pt-[140px]  bg-neutral-100 px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full 2xl:w-[798px] bg-neutral-200 rounded-[16px] py-[40px] 2xl:py-[60px] 2xl:px-[120px] px-[16px] gap-[24px] 2xl:gap-[28px]"
            >
                <h1 className="text-headline-2 text-center caret-transparent">
                    Sign up
                </h1>

                <InputField
                    label="Name"
                    name="name"
                    placeholder="Full name"
                    value={values.name}
                    error={errors.name}
                    onChange={handleChange}
                />

                <InputField
                    label="Username"
                    name="username"
                    placeholder="Username"
                    value={values.username}
                    error={errors.username}
                    onChange={handleChange}
                />

                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={values.email}
                    error={errors.email}
                    onChange={handleChange}
                />

                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    error={errors.password}
                    onChange={handleChange}
                />

                <Button
                    type="submit"
                    buttonStyle="primary"
                    buttonText={state.loading ? "Signing up..." : "Sign up"}
                    disabled={state.loading}
                    className="w-fit self-center"
                />


                <p className="text-body-1 text-center text-neutral-400">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="underline text-neutral-600"
                    >
                        Log in
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default SignUpForm;
