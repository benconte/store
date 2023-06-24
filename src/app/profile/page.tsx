import getCurrentUser from "@/actions/getCurrentUser"
import Profile from "@/components/profile/Profile"

async function page() {
    const user = await getCurrentUser()
    return (
        <div className="h-full pb-10">
            <Profile user={user} />
        </div>
    )
}

export default page