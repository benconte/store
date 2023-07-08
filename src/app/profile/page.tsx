import getCurrentUser from "@/actions/getCurrentUser"
import Profile from "@/components/profile/Profile"
import { redirect } from "next/navigation"

async function page() {
    const user = await getCurrentUser()

    if (!user.id) {
        redirect("/auth?callbackUrl=profile")
    }
    return (
        <div className="h-full pb-10">
            <Profile user={user} />
        </div>
    )
}

export default page