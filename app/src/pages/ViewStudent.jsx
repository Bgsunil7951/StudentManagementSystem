import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { axiosInstance, getErrorMessage } from "../utils";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const ViewStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchStudent = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const res = await axiosInstance.get(`/student/secure/get/${id}`);
    return res.data.students;
  };

  const {
    data: student,
    isLoading,
    isError,
    error,
  } = useQuery(["student", id], fetchStudent, {
    retry: false,
  });

  useEffect(() => {
    if (!localStorage.getItem("token") || isError) {
      toast.error(getErrorMessage(error));
      navigate("/signin");
    }
  }, [isError, error, navigate]);

  if (isLoading) return <Loader />;

  return (
    <section className="w-full max-w-[600px] mx-auto p-4 font-outfit">
      <Link
        to={-1}
        className="text-[0.7rem] bg-orange-600 text-white px-2 py-1 rounded-2xl"
      >
        ⬅ Go Back
      </Link>

      <div className="mt-4 p-5 shadow-xl rounded-2xl border border-slate-100">
        <h2 className="text-2xl font-semibold text-orange-600 mb-3">
          Student Details
        </h2>
         <p className="text-sm mt-1">
          <strong>Student Id:</strong> {student?.id}
        </p>
        <p className="text-sm">
          <strong>Student Name:</strong> {student?.name}
        </p>
        <p className="text-sm mt-1">
          <strong>Email:</strong> {student?.email}
        </p>
        <p className="text-sm mt-1">
          <strong>Course:</strong> {student?.course}
        </p>
      </div>
    </section>
  );
};

export default ViewStudent;
