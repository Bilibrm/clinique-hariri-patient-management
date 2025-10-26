import { Patient, MedicalService, MedicalRecord, PatientCreate, ApiResponse, PaginatedApiResponse } from '../types';
import axios from 'axios';
import apiClient from './api';
import { API_BASE_URL, DOCTOR_ID } from './config';

const csrfAxios = axios.create({
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json'
    }
});

// Add response interceptor to handle errors
csrfAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

async function ensureCsrfToken(): Promise<void> {
    if (typeof window === 'undefined') {
        return;
    }
    
    try {
        const apiUrl = new URL(API_BASE_URL);
        const domain = apiUrl.origin;
        
        // For cross-origin requests, we might need to handle this differently
        await csrfAxios.get(`${domain}/sanctum/csrf-cookie`, {
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
            }
        });
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw error;
    }
}



export const getPatients = async (params: { page?: number; per_page?: number; search?: string } = {}): Promise<{ data: Patient[], meta: any }> => {
    try {
        const response = await apiClient.get<PaginatedApiResponse<Patient>>('/patients', { 
            params: {
                page: params.page || 1,
                per_page: params.per_page || 10,
                search: params.search || '',
                paginate: true,
                doctor_id: DOCTOR_ID
            }
        });
        return {
            data: response.data.data,
            meta: response.data.meta
        };
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
};

export const getPatientById = async (id: string | number): Promise<Patient> => {
    try {
        const response = await apiClient.get<ApiResponse<Patient>>(`/patients/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching patient with ID ${id}:`, error);
        throw error;
    }
};

export const addPatient = async (patientData: PatientCreate): Promise<Patient> => {
    try {
        await ensureCsrfToken();

        // Try different possible cookie names for CSRF token
        const cookieArray = document.cookie.split(';').map(cookie => cookie.trim());
        let token = null;
        
        for (const cookie of cookieArray) {
            if (cookie.startsWith('XSRF-TOKEN=')) {
                token = decodeURIComponent(cookie.split('=')[1]);
                break;
            } else if (cookie.startsWith('X-XSRF-TOKEN=')) {
                token = decodeURIComponent(cookie.split('=')[1]);
                break;
            } else if (cookie.toLowerCase().startsWith('xsrf-token=')) {
                token = decodeURIComponent(cookie.split('=')[1]);
                break;
            }
        }

        if (!token) {
            throw new Error('CSRF token not found in cookies');
        }

        // If there's an image file, convert to FormData
        if (patientData.avatar && typeof patientData.avatar === 'string' && patientData.avatar.startsWith('data:')) {
            const formData = new FormData();
            
            // Convert base64 image to blob
            const response = await fetch(patientData.avatar);
            const blob = await response.blob();
            formData.append('avatar', blob, 'avatar.jpg');
            
            // Add other patient data to FormData
            Object.entries(patientData).forEach(([key, value]) => {
                if (key !== 'avatar' && value !== null && value !== undefined) {
                    formData.append(key, value.toString());
                }
            });
            
            const apiResponse = await csrfAxios.post<ApiResponse<Patient>>('/patients', formData, { headers: { 'Content-Type': 'multipart/form-data', 'X-XSRF-TOKEN': token } });
            return apiResponse.data.data;
        } else {
            // Send data as JSON if no image
            const apiResponse = await csrfAxios.post<ApiResponse<Patient>>('/patients', patientData, { headers: { 'X-XSRF-TOKEN': token } });
            return apiResponse.data.data;
        }
    } catch (error: any) {
        console.error('Error adding patient:', error);
        throw error;
    }
};

export const updatePatient = async (id: string | number, patientData: Partial<PatientCreate>): Promise<Patient> => {
    try {
        await ensureCsrfToken();

        // Try different possible cookie names for CSRF token
        const cookieArray = document.cookie.split(';').map(cookie => cookie.trim());
        let token = null;
        
        for (const cookie of cookieArray) {
            if (cookie.startsWith('XSRF-TOKEN=')) {
                token = decodeURIComponent(cookie.split('=')[1]);
                break;
            } else if (cookie.startsWith('X-XSRF-TOKEN=')) {
                token = decodeURIComponent(cookie.split('=')[1]);
                break;
            } else if (cookie.toLowerCase().startsWith('xsrf-token=')) {
                token = decodeURIComponent(cookie.split('=')[1]);
                break;
            }
        }

        if (!token) {
            throw new Error('CSRF token not found in cookies');
        }

        // Same image handling logic as addPatient
        if (patientData.avatar && typeof patientData.avatar === 'string' && patientData.avatar.startsWith('data:')) {
            const formData = new FormData();
            
            const response = await fetch(patientData.avatar);
            const blob = await response.blob();
            formData.append('avatar', blob, 'avatar.jpg');
            
            Object.entries(patientData).forEach(([key, value]) => {
                if (key !== 'avatar' && value !== null && value !== undefined) {
                    formData.append(key, value.toString());
                }
            });
            
            // Laravel requires _method field for FormData PUT requests
            formData.append('_method', 'PUT');
            
            const apiResponse = await csrfAxios.post<ApiResponse<Patient>>(`/patients/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data', 'X-XSRF-TOKEN': token } });
            return apiResponse.data.data;
        } else {
            const apiResponse = await csrfAxios.put<ApiResponse<Patient>>(`/patients/${id}`, patientData, { headers: { 'X-XSRF-TOKEN': token } });
            return apiResponse.data.data;
        }
    } catch (error: any) {
        console.error(`Error updating patient with ID ${id}:`, error);
        throw error;
    }
};

export const deletePatient = async (id: string | number): Promise<boolean> => {
    try {
        await ensureCsrfToken();

        // Try different possible cookie names for CSRF token
        const cookieArray = document.cookie.split(';').map(cookie => cookie.trim());
        let token = null;
        
        for (const cookie of cookieArray) {
            if (cookie.startsWith('XSRF-TOKEN=')) {
                token = decodeURIComponent(cookie.split('=')[1]);
                break;
            } else if (cookie.startsWith('X-XSRF-TOKEN=')) {
                token = decodeURIComponent(cookie.split('=')[1]);
                break;
            } else if (cookie.toLowerCase().startsWith('xsrf-token=')) {
                token = decodeURIComponent(cookie.split('=')[1]);
                break;
            }
        }

        if (!token) {
            throw new Error('CSRF token not found in cookies');
        }

        await csrfAxios.delete(`/patients/${id}`, {
            headers: {
                'X-XSRF-TOKEN': token,
            },
        });

        return true;
    } catch (error: any) {
        console.error(`Error deleting patient with ID ${id}:`, error);
        throw error;
    }
};

export const getMedicalServicesForPatient = async (patientId: string): Promise<MedicalService[]> => {
    try {
        const response = await apiClient.get<ApiResponse<MedicalService[]>>(`/patients/${patientId}/medical-services`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching medical services for patient ${patientId}:`, error);
        return [];
    }
};

export const getMedicalRecordsForPatient = async (patientId: string): Promise<MedicalRecord[]> => {
    try {
        const response = await apiClient.get<ApiResponse<MedicalRecord[]>>(`/patients/${patientId}/medical-records`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching medical records for patient ${patientId}:`, error);
        return [];
    }
};
