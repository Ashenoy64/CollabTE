'use client'
import UserDashBoard from "@/components/UserDashboard"


/*
    Function loads the UI for the route /dashboard
*/
export default function Page()
{
    return(
        <div className="w-full h-screen">
            <UserDashBoard/>
        </div>
    )
}