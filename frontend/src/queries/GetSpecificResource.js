import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../constants/axiosInstance";

const GetSpecificResource = (name) => {
    return useQuery(
        ['resource', name],
        () => axiosInstance.get("resource/get/" + name)
    );
}

export default GetSpecificResource;