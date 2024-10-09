import { SWRResponse } from 'swr';

export interface ApiError extends Error {
    info?: any;
    status?: number;
}

export type UseApiBaseReturn<T> = SWRResponse<T, Error> & {
    isLoading: boolean;
};