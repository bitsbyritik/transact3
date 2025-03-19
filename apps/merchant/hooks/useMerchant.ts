import { getMerchant } from "@/actions/getMerchant"
import useSWR from "swr";

const fetchMerchant = async() => {
    const res = await getMerchant();
    return res;
}

export const useMerchant = () => {
    const {data, error, isLoading} = useSWR("merchant", fetchMerchant);

    return {
        merchant: data?.merchant,
        isLoading,
        error
    };
}