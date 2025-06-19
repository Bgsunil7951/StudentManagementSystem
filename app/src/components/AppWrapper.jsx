import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { axiosInstance } from '../utils';

const AppWrapper = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setVisible(false); // Hide on scroll down
    } else {
      setVisible(true); // Show on scroll up
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axiosInstance.get("/user/secure/profile");
    if (response.data) {
      const { user } = response.data;
      sessionStorage.setItem("profile", JSON.stringify(user));
    }
    return response.data;
  };

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

  return (
    <section className="w-full max-w-[1800px] mx-auto">
      <header
        className={`fixed top-0 left-0 w-full z-[9999] bg-white transition-transform duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Navbar />
      </header>
      <section className="mt-[100px] w-full">
        <Outlet />
      </section>
    </section>
  );
};

export default AppWrapper;
