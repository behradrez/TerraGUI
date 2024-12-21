import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../constants/axiosInstance";

const usePostGenerateFile = (data) => {
    return useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post("generate",data);            
            return response.data;
        },
        onSuccess: (res) => {
            const url = window.URL.createObjectURL(new Blob([res]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download','generatedTerraform.tf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        }
    })
}
export default usePostGenerateFile;