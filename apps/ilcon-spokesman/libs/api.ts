const BASEURL = process.env.NEXT_PUBLIC_BASEURL_URL || "https://admin.spokesmancom.org/api";


export interface ApiResponse<T = any> {
  message: string
  success: boolean
  data?: T
}

async function apiRequest<T>(
  url: string,
  payload?: Record<string, any>
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload ? JSON.stringify(payload) : undefined,
    });

    const data = await res.json();
    return data;
  } catch {
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
}
export const registerForEvent = (payload:any) =>
  apiRequest(`${BASEURL}/ilcon-attendees`, payload)

export const checkEmail = (email:string) =>
  apiRequest<{exists:boolean}>(`${BASEURL}/ilcon-attendees/check-email`, {email})