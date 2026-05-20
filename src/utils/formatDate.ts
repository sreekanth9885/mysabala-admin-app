export const formatDate=(dateString?:string | null)=>{
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString(
        "en-IN",
        {
            dateStyle: "medium",
            timeStyle: "short",
        }
    )
}