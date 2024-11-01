import { fetch } from "@tauri-apps/plugin-http";

export interface RequestOptions {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  headers?: Record<string, string>;
}

// 定义请求控制器
const controller = new AbortController();

// 封装请求函数
export const request = async ({
  url,
  method,
  data,
  headers,
}: RequestOptions) => {
  const options: any = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    signal: controller.signal
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
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
