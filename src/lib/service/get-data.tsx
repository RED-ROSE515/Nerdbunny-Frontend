import useSWR from 'swr';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetcher = async <T,>(url: string): Promise<T> => {
  const user = localStorage.getItem('user');
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  if (user) {
    const userData = JSON.parse(user) as { token: string };
    headers['Authorization'] = `Token ${userData.token}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json() as Promise<T>;
};

export default function useGetData<T = any>(url: string) {
  return useSWR<T>(url && `${API_BASE_URL}/${url}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
}
