import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import cookie from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Register = () => {

    const nevigate = useNavigate();
    var user = {
        name: "",
        email: "",
        password: "",
        phone: ""
    };

    const registerSchema = yup.object().shape({
        email: yup.string().email("Please Enter Valid Email.").required("Please enter your email"),
        password: yup.string().min(5, "Minimum 5 Charecter Required")
            .matches(/[a-z]/, 'At least one lowercase letter is required')
            .matches(/[A-Z]/, 'At least one uppercase letter is required')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'At least one symbol is required').required("Please enter your Password"),
        phone: yup.string()
            .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
            .required('Mobile number is required'),
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: user,

        validationSchema: registerSchema,
        onSubmit: async (values, action) => {

            const userToBackend = {
                name: values.name,
                email: values.email,
                password: values.password,
                phone: values.phone
            }
            console.log(userToBackend);

            console.log(process.env.REACT_APP_BACKEND_API)
            const url = `${process.env.REACT_APP_BACKEND_API}/users/register`;
            console.log("URL : ", url);

            await axios.post(url, userToBackend).then((response) => {
                cookie.set('token', response.data.token);
                console.log(response.data.isAdmin);
                nevigate('/', { state: { email: values.email, password: values.password } });
            }
            ).catch((error) => {
                console.log("Error: ", error.message);
                Cookies.remove('token');

                let errorMessage = error.response ? error.response.data.message || 'An unexpected error occurred.' : 'An unexpected error occurred.';

                nevigate("/error", { state: { data: errorMessage } });
            })

        }

    });


    return (
        <>
            <div className='justify-content-center align-items-center '>
                <div className='container w-50 h-100 mt-5 p-2 justify-content-center align-items-center text-center bg-body-secondary'>
                    <h1> Register </h1>

                    <form onSubmit={handleSubmit} method='POST' className='row justify-content-center mt-5'>

                        <input type='text' className='col-12 form-control w-50 p-2 m-2' id="name" name="name" placeholder="Enter Name..." onChange={handleChange} onBlur={handleBlur} value={values.name} />

                        <br />
                        {errors.name && touched.name ? (<p className='text-danger form-error' >{errors.name}
                        </p>) : null
                        }

                        <input type='text' className='col-12 form-control w-50 p-2 m-2' id="email" name="email" placeholder="Enter Email..." onChange={handleChange} onBlur={handleBlur} value={values.email} />

                        <br />
                        {errors.email && touched.email ? (<p className='text-danger form-error' >{errors.email}
                        </p>) : null
                        }

                        <input type='password' className='form-control w-50 p-2 m-2' id="password" name="password" placeholder="Enter Password..." onChange={handleChange} onBlur={handleBlur} value={values.password} />
                        <br />
                        {errors.password && touched.password ? (<p className='text-danger'>{errors.password}
                        </p>) : null
                        }

                        <input type='text' className='form-control w-50 p-2 m-2' id="phone" name="phone" placeholder="Enter Phone Number..." onChange={handleChange} onBlur={handleBlur} value={values.phone} />
                        <br />
                        {errors.phone && touched.phone ? (<p className='text-danger'>{errors.phone}
                        </p>) : null
                        }

                        <input type="submit" className='w-50 m-3 p-2 bg-primary fw-bold btn btn-light ' value="Submit" />

                    </form>

                    <button className='btn btn-secondary '><Link to='/login' className='text-capitalize text-danger fw-bold p-3 m-2 '> Login  </Link></button>
                </div>
            </div >
        </>
    );
}

export default Register