import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserData } from "../../services/authService";
import { UserProfile, StudentProfile, CompanyProfile } from "../../types/profileTypes";
import GuestNavbar from "../../components/molecules/GuestNavbar/GuestNavbar";

type Profile = UserProfile & (StudentProfile | CompanyProfile);

const ProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [userProfile, setUserProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const userId = parseInt(id, 10);
            fetchUserData(userId)
                .then((data) => {
                    setUserProfile(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userProfile) {
        return <div>No user data available</div>;
    }

    return (
        <div className="flex flex-col h-screen bg-background_secondary ">
            <GuestNavbar />
            <div className="flex flex-col items-center justify-center flex-grow text-black">
                <h1 className="text-4xl mb-8">Profile Page</h1>
                {userProfile.role === "student" ? (
                    <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl mb-4">Student Profile</h2>
                        <p className="text-base mb-4">Name: {(userProfile as StudentProfile).full_name}</p>
                        <p className="text-base mb-4">Email: {userProfile.email}</p>
                        <p className="text-base mb-4">Phone Number: {(userProfile as StudentProfile).phone_number}</p>
                        <p className="text-base mb-4">Age: {(userProfile as StudentProfile).age}</p>
                        <p className="text-base mb-4">Location: {(userProfile as StudentProfile).location}</p>
                        <p className="text-base mb-4">Study Institution: {(userProfile as StudentProfile).study_institution}</p>
                        <p className="text-base mb-4">Study Degree: {(userProfile as StudentProfile).study_degree}</p>
                        <p className="text-base mb-4">Expected Graduation Date: {(userProfile as StudentProfile).expected_graduation_date}</p>
                        <p className="text-base mb-4">High School: {(userProfile as StudentProfile).high_school}</p>
                        <p className="text-base mb-4">Hard Skills: {(userProfile as StudentProfile).hard_skills}</p>
                        <p className="text-base mb-4">Soft Skills: {(userProfile as StudentProfile).soft_skills}</p>
                        <p className="text-base mb-4">Personal Projects: {(userProfile as StudentProfile).personal_projects}</p>
                        <p className="text-base mb-4">Achievements: {(userProfile as StudentProfile).achievements}</p>
                        <p className="text-base mb-4">Extracurricular Activities: {(userProfile as StudentProfile).extracurricular_activities}</p>
                        <p className="text-base mb-4">Languages: {(userProfile as StudentProfile).languages}</p>
                        <p className="text-base mb-4">Career Objectives: {(userProfile as StudentProfile).career_objectives}</p>
                    </div>
                ) : (
                    <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl mb-4">Company Profile</h2>
                        <p className="text-base mb-4">Name: {(userProfile as CompanyProfile).name}</p>
                        <p className="text-base mb-4">Email: {userProfile.email}</p>
                        <p className="text-base mb-4">Description: {(userProfile as CompanyProfile).description}</p>
                        <p className="text-base mb-4">Field: {(userProfile as CompanyProfile).field}</p>
                        <p className="text-base mb-4">Location: {(userProfile as CompanyProfile).location}</p>
                        <p className="text-base mb-4">Website: {(userProfile as CompanyProfile).website}</p>
                        <p className="text-base mb-4">Is Active: {(userProfile as CompanyProfile).is_active ? "Yes" : "No"}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;