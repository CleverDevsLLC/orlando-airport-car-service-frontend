"use client"
import React, { useEffect } from 'react'
import { PlusCircleIcon } from 'lucide-react'
import { useRouter } from "next/navigation";
import AllCompaniesComponent from '@/Components/Admin/AllCompanies/AllCompanies';
import Navbar from '@/Components/Common/Navbar/Navbar';

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("limo-token") : null;
    if (!token) {
      router.push("/admin/login");
    }
    const acc_status = typeof window !== 'undefined' ? localStorage.getItem("acc_status") : null;
    if (acc_status !== "admin") {
      router.push("/admin/login");
    }
  }, [router]);

  const handleClick = () => {
    router.push("/admin/addcompany")
  }
  return (
    <div>
      <Navbar/>
      <div className='p-4 flex justify-end'>
        <button onClick={handleClick} className='flex justify-center items-center bg-black text-white w-[200px] h-[45px] rounded-[10px] gap-2'><PlusCircleIcon/> Add New Company</button>
      </div>
      <AllCompaniesComponent/>
    </div>
  )
}
