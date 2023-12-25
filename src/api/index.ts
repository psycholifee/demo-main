import axios, { AxiosInstance, AxiosProgressEvent, AxiosRequestConfig, AxiosResponse } from "axios";

// 文件下载的参数泛型
export interface UploadFileParams<TOtherFormData = Record<string, any>> {
    file: File | Blob;
    fileHash?: string;
    filename?: string;
    filed?: string;
    formData?: TOtherFormData; // 文件其他的参数(对象 key-value 将作为表单数据)
}

/** 默认接口返回结构 */
export interface ResStructure<TResData = any> {
    code: number;
    success: boolean;
    data: TResData;
    msg?: string;
}

/**
 * A wrapper class for making HTTP requests using Axios.
 * @class HttpRequest
 * @example
 * // Usage example:
 * const httpRequest = new HttpRequest({baseURL: 'http://localhost:8888'});
 * httpRequest.get<TReqBodyData, TResData, TResStructure>({ url: '/users/1' })
 *   .then(response => {
 *     console.log(response.name); // logs the name of the user
 *   })
 *   .catch(error => {
 *     console.error(error);
 *   });
 *
 * @property {AxiosInstance} instance - The Axios instance used for making requests.
 */
class HttpRequest {
    private readonly instance: AxiosInstance;

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config);
    }

    /**
     * Sends a request and returns a Promise that resolves with the response data.
     * @template TReqBodyData - The type of the request body.
     * @template TResData - The type of the `data` field in the `{code, data}` response structure.
     * @template TResStructure - The type of the response structure. The default is `{code, data, msg}`.
     * @param {AxiosRequestConfig} [config] - The custom configuration for the request.
     * @returns {Promise<TResStructure>} - A Promise that resolves with the response data.
     * @throws {Error} - If the request fails.
     *
     * @example
     * // Sends a GET request and expects a response with a JSON object.
     * const response = await request<any, {name: string}>({
     *   method: 'GET',
     *   url: '/users/1',
     * });
     * console.log(response.name); // logs the name of the user
     */
    request<TReqBodyData, TResData, TResStructure = ResStructure<TResData>>(
        config: AxiosRequestConfig<TReqBodyData>
    ): Promise<TResStructure> {
        return new Promise<TResStructure>((resolve, reject) => {
            this.instance
                .request<any, AxiosResponse<TResStructure>>(config)
                .then(res => {
                    // 返回接口数据
                    resolve(res?.data);
                })
                .catch(err => reject(err));
        });
    }

    /**
     * 发送 GET 请求
     * @template TReqBodyData 请求体数据类型
     * @template TResData 接口响应 data 字段数据类型
     * @template TResStructure 接口响应结构，默认为 {code, data, msg}
     * @param {AxiosRequestConfig} config 请求配置
     * @returns {Promise} 接口响应结果
     */
    get<TReqBodyData, TResData, TResStructure = ResStructure<TResData>>(
        config?: AxiosRequestConfig<TReqBodyData>
    ): Promise<TResStructure> {
        return this.request({ ...config, method: "GET" });
    }

    /**
     * 发送 post 请求
     * @template TReqBodyData 请求体数据类型
     * @template TResData 接口响应 data 字段数据类型
     * @template TResStructure 接口响应结构，默认为 {code, data, msg}
     * @param {AxiosRequestConfig} config 请求配置
     * @returns {Promise} 接口响应结果
     */
    post<TReqBodyData, TResData, TResStructure = ResStructure<TResData>>(
        config: AxiosRequestConfig<TReqBodyData>
    ): Promise<TResStructure> {
        return this.request({ ...config, method: "POST" });
    }

    patch<TReqBodyData, TResData, TResStructure = ResStructure<TResData>>(
        config: AxiosRequestConfig<TReqBodyData>
    ): Promise<TResStructure> {
        return this.request({ ...config, method: "PATCH" });
    }

    delete<TReqBodyData, TResData, TResStructure = ResStructure<TResData>>(
        config?: AxiosRequestConfig<TReqBodyData>
    ): Promise<TResStructure> {
        return this.request({ ...config, method: "DELETE" });
    }

    /**
     * 获取当前 axios 实例
     */
    getInstance(): AxiosInstance {
        return this.instance;
    }

    /**
     * 文件上传
     * @param {AxiosRequestConfig} config axios 请求配置对象
     * @param {UploadFileParams} params 待上传文件及其一些参数
     * @param {(event: AxiosProgressEvent) => void} uploadProgress 上传进度的回调函数
     * @param {AbortSignal}cancelSignal 取消axios请求的 signal
     * @returns
     */
    uploadFile<TOtherFormData = any>(
        config: AxiosRequestConfig,
        params: UploadFileParams<TOtherFormData>,
        uploadProgress?: (event: AxiosProgressEvent) => void,
        cancelSignal?: AbortSignal
    ) {
        const formData = new window.FormData();

        // 设置默认文件表单字段为 file
        const customFilename = params.filed || "file";

        // 是否指定文件名，没有就用文件本来的名字
        if (params.filename) {
            formData.append(customFilename, params.file, params.filename);
            formData.append("filename", params.filename);
        } else {
            formData.append(customFilename, params.file);
        }
        // 添加文件 hash
        if (params.fileHash) {
            formData.append("fileHash", params.fileHash);
        }

        // 是否有文件的额外信息补充进表单
        if (params.formData) {
            Object.keys(params.formData).forEach(key => {
                const value = params.formData![key as keyof TOtherFormData];
                if (Array.isArray(value)) {
                    value.forEach(item => {
                        // 对象属性值为数组时，表单字段加一个[]
                        formData.append(`${key}[]`, item);
                    });
                    return;
                }
                formData.append(key, value as any);
            });
        }

        return this.instance.request({
            ...config,
            method: "POST",
            timeout: 60 * 60 * 1000, // 60分钟
            data: formData,
            onUploadProgress: uploadProgress,
            signal: cancelSignal,
            headers: {
                "Content-type": "multipart/form-data;charset=UTF-8"
            }
        });
    }
}

export default HttpRequest;