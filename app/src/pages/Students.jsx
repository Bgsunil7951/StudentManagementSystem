import { ImagePlus, Search, Eye, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils";
import toast from "react-hot-toast";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await axiosInstance.get("/student/secure/getAll");
      setStudents(res.data.students);
      setAllStudents(res.data.students); 
    } catch (err) {
      toast.error("Failed to load students.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudentClick = () => {
    navigate("/student/add");
  };

  const handleSearchClick = () => {
    const trimmed = searchText.trim();
    if (trimmed === "") {
      setStudents(allStudents); 
    } else {
      const filtered = allStudents.filter((student) =>
        student.id.toString().includes(trimmed)
      );
      setStudents(filtered);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/student/secure/delete/${id}`);
      toast.success("Student deleted.");
      fetchStudents();
    } catch (err) {
      toast.error("Failed to delete student.");
    }
  };

  const handleView = (id) => {
    navigate(`/student/view/${id}`);
  };

  const handleUpdate = (id) => {
    navigate(`/student/update/${id}`);
  };

  return (
    <section className="w-full min-h-screen p-2 font-outfit max-w-[1200px] mx-auto">
      <article className="flex w-full justify-end items-center">
        <button
          className="px-2 py-1 rounded-md bg-orange-600 text-white text-[0.8rem] flex justify-center items-center gap-2 cursor-pointer"
          onClick={handleAddStudentClick}
        >
          Add Student <ImagePlus size={14} />
        </button>
      </article>

      {/* Search */}
      <article className="w-full mt-5 p-2 shadow-md rounded-2xl flex justify-start items-center">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
          type="text"
          className="flex-1 placeholder:text-[0.8rem] text-[0.9rem]"
          placeholder="Search Students by Id"
        />
        <span
          onClick={handleSearchClick}
          className="p-1 bg-orange-600 text-white rounded-2xl cursor-pointer"
        >
          <Search size={13} />
        </span>
      </article>

      <article className="mt-6 overflow-x-auto shadow-md rounded-2xl">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="px-4 py-3">S. Id</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student.id} className="hover:bg-orange-50 transition-all">
                  <td className="px-4 py-2">{student.id}</td>
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.email}</td>
                  <td className="px-4 py-2">{student.course}</td>
                  <td className="px-4 py-2 flex flex-wrap justify-center items-center gap-2">
                    <button
                      onClick={() => handleView(student.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                    >
                      <Eye size={14} /> View
                    </button>

                    <button
                      onClick={() => handleUpdate(student.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                    >
                      <Pencil size={14} /> Update
                    </button>

                    <button
                      onClick={() => handleDelete(student.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-slate-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </section>
  );
};

export default Students;
