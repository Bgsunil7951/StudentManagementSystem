import { ErrorMessage, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { axiosInstance, getErrorMessage } from "../utils";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StudentSchema } from "../formikValidation";

const UpdateStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null); 

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axiosInstance.get(`/student/secure/get/${id}`);
        // console.log(res);
        const { name, email, course } = res.data.students;
        setInitialValues({ name, email, course });
      } catch (error) {
        toast.error("Failed to load student");
      }
    };

    fetchStudent();
  }, [id]);
  
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
  }
 const { data, isError, error } = useQuery({
     queryKey: ["profile"],
     queryFn: fetchUserData,
     enabled: !!localStorage.getItem("token"), 
     retry: false,
   });
 
   useEffect(() => {
     if (!localStorage.getItem("token") || isError) {
       navigate("/signin");
     }
   }, [isError, navigate]);

  const updateStudent = async (val) => {
    const response = await axiosInstance.put(`/student/secure/update/${id}`, val);
    return response.data;
  };

  const updateMutation = useMutation({
    mutationFn: updateStudent,
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
    onSuccess: () => {
      toast.success("Student updated successfully");
      navigate("/students");
    },
  });

  if (!initialValues) {
    return (
      <section className="w-full h-screen flex justify-center items-center">
        <p className="text-gray-500 text-sm">Loading student data...</p>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[1200px] mx-auto p-2 font-outfit">
      <article className="flex justify-start items-center">
        <Link
          to={-1}
          className="text-[0.6rem] bg-orange-600 text-white p-1 rounded-2xl cursor-pointer"
        >
          Go Back
        </Link>
      </article>

      <h1 className="text-3xl mt-4">Update Student</h1>

      <article className="w-full flex justify-center h-[60vh] items-center">
        <article className="p-3 w-full max-w-[350px] shadow-xl rounded-2xl">
          <h1 className="text-orange-600 font-semibold text-3xl text-center my-5">
            Update Student
          </h1>

          <Formik
            enableReinitialize
            validationSchema={StudentSchema}
            initialValues={initialValues}
            onSubmit={(val) => {
              updateMutation.mutate(val);
            }}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="w-full border border-slate-100 rounded-2xl p-2 mt-2 placeholder:text-[0.8rem]"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-[0.6rem] ps-2"
                />

                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  className="w-full border border-slate-100 rounded-2xl p-2 mt-2 placeholder:text-[0.8rem]"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-[0.6rem] ps-2"
                />

                <select
                  name="course"
                  value={values.course}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border border-slate-100 rounded-2xl p-2 mt-2 text-sm"
                >
                  <option value="">Select a Course</option>
                  <option value="Java FullStack">Java FullStack</option>
                  <option value="Python FullStack">Python FullStack</option>
                  <option value="MERN Stack">MERN Stack</option>
                </select>
                <ErrorMessage
                  name="course"
                  component="p"
                  className="text-red-500 text-[0.6rem] ps-2"
                />

                <div className="mt-9 flex justify-center items-center">
                  <button
                    type="submit"
                    className="bg-orange-600 text-white p-3 rounded-2xl w-[90%] cursor-pointer flex justify-center items-center"
                  >
                    Update Student
                    {updateMutation.isLoading && <Loader />}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </article>
      </article>
    </section>
  );
};

export default UpdateStudent;
