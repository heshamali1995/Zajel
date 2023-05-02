import { useState } from "react";
import "./form.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// Components
import { getAccessToken } from "../../services/auth.services";
import { AiOutlineEye } from "react-icons/ai";
// Images
import MainLogo from "../../assets/images/form/logo.png";
import Email from "../../assets/images/form/mail.png";
import Password from "../../assets/images/form/password-icon.png";
import ShowPass from "../../assets/images/form/showpass.png";

const FormComponent = () => {
  const [togglePass, setTogglePass] = useState("password");
  const [dots, setDots] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // Toggle Password Dots
  const handleDots = (e) => {
    return e.target.value === "" ? setDots(true) : setDots(false);
  };

  // Toggle Show and Hide Password
  const showPassword = (e) => {
    setTogglePass("text");
  };
  const hidePassword = (e) => {
    setTogglePass("password");
  };

  // On Submit Function
  const onSubmit = (data) => {
    const { email, password } = data;
    getAccessToken(email, password).then((resp) => {
      if (resp) {
        navigate("/", { replace: true });
      }
    });
  };
  return (
    <section className="form-section flex flex-col items-center bg-main-bg">
      {/* Logo Section */}
      <div className="logo">
        <img src={MainLogo} alt="logo" />
      </div>
      {/* Form Section */}
      <div className="form w-full flex flex-col items-center">
        <div className="form-container bg-white p-6 sm:p-10">
          <h2 className="text-secondary mb-4 font-normal text-center">
            مرحبا بعودتك{" "}
          </h2>
          <h3 className="font-normal mb-10 sm:mb-16 text-center">
            تسجيل الدخول لزاجل
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <label className="font-normal text-secondary">
              البريد الالكتروني
            </label>
            <div
              className={`email flex items-center gap-2 mt-2 p-4 rounded-xl mb-4 ${
                errors.email?.type ? "error" : ""
              }`}
            >
              <img src={Email} alt="email-icon" />
              <input
                type="email"
                name="email"
                placeholder="Exmpil@gmail.com"
                className="font-normal text-primary outline-none w-full"
                {...register("email", {
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
              />
            </div>
            {errors.email?.type === "required" ? (
              <p className="validation font-normal mb-8 px-4">
                Email is Required
              </p>
            ) : (
              ""
            )}
            {errors.email?.type === "pattern" ? (
              <p className="validation font-normal mb-8 px-4">
                Email's pattern isn't correct
              </p>
            ) : (
              ""
            )}
            {/* Password */}
            <label className="font-normal text-secondary">كلمة السر</label>
            <div
              className={`password flex items-center mt-2 gap-2 p-4 rounded-xl mb-5 ${
                errors?.password?.type ? "error" : ""
              }`}
            >
              <img src={Password} alt="password-icon" />
              <input
                type={togglePass}
                name="password"
                onInput={handleDots}
                className={`pass-input font-normal text-primary outline-none w-full ${
                  dots ? "show" : ""
                }`}
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
              />
              <div className="toggle-pass">
                {togglePass === "password" ? (
                  <img
                    src={ShowPass}
                    alt="showPass"
                    className="cursor-pointer"
                    onClick={showPassword}
                  />
                ) : (
                  <AiOutlineEye
                    className="cursor-pointer"
                    onClick={hidePassword}
                  />
                )}
              </div>
            </div>
            {errors.password?.type === "required" ? (
              <p className="validation font-normal mb-8 px-4">
                Password is Required
              </p>
            ) : (
              ""
            )}
            {errors.password?.type === "minLength" ? (
              <p className="validation font-normal mb-8 px-4">
                Password Minimum Length is 6
              </p>
            ) : (
              ""
            )}
            <div className="checkbox flex items-center mb-16">
              <input type="checkbox" className="ml-3" />
              <label className="font-normal text-secondary">تذكرنى</label>
            </div>
            <button className="main-btn bg-button text-white cursor-pointer">
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormComponent;
