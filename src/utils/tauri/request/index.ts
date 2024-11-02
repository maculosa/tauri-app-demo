import { fetch } from "@tauri-apps/plugin-http";

export interface RequestOptions {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  headers?: Record<string, string>;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// 定义请求控制器
const controller = new AbortController();

// 封装请求函数
export const request = async (opts: RequestOptions) => {

  const options: any = {
    method: opts.method,
    headers: {
      "Content-Type": "application/json",
      ...opts.headers,
    },
    signal: controller.signal
  };
  if (opts.data) {
    options.body = JSON.stringify(opts.data);
  }

  const url = baseUrl + opts.url;
  
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const res = await response.json();
  return res;
};

export const get = async (
  url: string,
  options: Omit<RequestOptions, "url" | "method">
) => {
  return request({ url, method: "GET", ...options });
};

export const post = async (
  url: string,
  options: Omit<RequestOptions, "url" | "method">
) => {
  return request({ url, method: "POST",...options });
};
