
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import cookie from 'js-cookie';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Login = () => {

    const { state } = useLocation();
    const { email, password } = state || {};
    console.log("data :", email, password);

    const nevigate = useNavigate();
    var user = {
        userEmail: email || "",
        userPassword: password || ""
    };

    const loginSchema = yup.object().shape({
        userEmail: yup.string().email("Please Enter Valid Email.").required("Please enter your email"),
        userPassword: yup.string().min(5, "Minimum 5 Charecter Required")
            .matches(/[a-z]/, 'At least one lowercase letter is required')
            .matches(/[A-Z]/, 'At least one uppercase letter is required')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'At least one symbol is required').required("Please enter your Password"),
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: user,
        validationSchema: loginSchema,
        onSubmit: async (values, action) => {

            const userToBackend = {
                email: values.userEmail,
                password: values.userPassword
            }
            console.log(userToBackend);

            console.log(process.env.REACT_APP_BACKEND_API)
            const url = `${process.env.REACT_APP_BACKEND_API}/users/login`;
            console.log("URL : ", url);

            await axios.post(url, userToBackend).then((response) => {
                cookie.set('token', response.data.token);
                console.log(response.data.isAdmin);
                if (response.data.isAdmin) {
                    nevigate("/adminPanel")
                } else {
                    nevigate("/doVote");
                }
            }
            ).catch((error) => {
                console.log("Error: ", error.message);
                cookie.remove('token');
                let errorMessage = error.response ? error.data.message || 'An unexpected error occurred.' : 'An unexpected error occurred.';
                nevigate("/error", { state: { data: errorMessage } });
            })

        }

    });

    return (
        <>
            <div className='justify-content-center align-items-center '>
                <div className='container w-50 h-100 mt-5 p-2 justify-content-center align-items-center text-center bg-body-secondary'>
                    <h1> LogIn </h1>

                    <form onSubmit={handleSubmit} method='POST' className='row justify-content-center mt-5'>

                        <input type='text' className='col-12 form-control w-50 p-2 m-2' id="userEmail" name="userEmail" placeholder="Enter Email..." onChange={handleChange} onBlur={handleBlur} value={values.userEmail} />

                        <br />
                        {errors.userEmail && touched.userEmail ? (<p className='text-danger form-error' >{errors.userEmail}
                        </p>) : null
                        }

                        <input type='password' className='form-control w-50 p-2 m-2' id="userPassword" name="userPassword" placeholder="Enter Password..." onChange={handleChange} onBlur={handleBlur} value={values.userPassword} />

                        {errors.userPassword && touched.userPassword ? (<p className='text-danger'>{errors.userPassword}
                        </p>) : null
                        }

                        <input type="submit" className='w-50 m-3 p-2 bg-primary fw-bold' value="LOGIN" />

                    </form>

                    <button className='btn btn-info'><Link to='/register'> Register  </Link></button>
                </div>
            </div >
        </>
    )
}

export default Login