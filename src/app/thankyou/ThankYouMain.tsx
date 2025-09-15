"use client"
import Navbar from '@/Components/Common/Navbar/Navbar';
import { ThankYouComponent } from '@/Components/Reservations/ThankYou/ThankYou';
import { getLeadDetails } from '@/Services/GET';
import { initialFormData } from '@/Types';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function ThankYouPage() {

    const searchParams = useSearchParams();
    const [leadDetails, setLeadDetails] = useState(initialFormData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeadDetails = async () => {
            const id = searchParams.get("id");
            if (id) {
                try {
                    const response = await getLeadDetails(id);
                    setLeadDetails(response.data);
                } catch (error) {
                    console.error("Error fetching lead details:", error);
                }
            } else {
                console.error("No ID provided in search params");
            }
            setLoading(false);
        };

        fetchLeadDetails();
    }, [searchParams]);

    return (
        <div>
            <Navbar />
            {!loading ?
                <>
                    <div className='my-10'>
                        <ThankYouComponent formData={leadDetails}/>
                    </div>
                </> :
                <>
                    <div className="flex-grow flex items-center justify-center">
                        <h1 className="text-2xl font-semibold text-indigo-700">Loading...</h1>
                    </div>
                </>}
        </div>
    )
}
