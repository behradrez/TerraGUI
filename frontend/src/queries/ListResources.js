import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../constants/axiosInstance";

const ListResources = () => {
    return useQuery({
        queryKey: ["listResources"],
        queryFn: () => axiosInstance.get("resource/list")
    });
}

export default ListResources;