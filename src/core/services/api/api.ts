import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { Config } from '@/core/config'
import JwtService from '@/vendor/vuero/services/JwtService'

/**
 * service to call HTTP request via Axios
 */
class ApiService {
  /**
   * initialize vue axios
   */
  public static init() {
    axios.defaults.baseURL = Config.getApiHost()
  }

  /**
   * set the default HTTP request headers
   */
  public static setHeader(): void {
    axios.defaults.headers.common['Authorization'] = `Token ${JwtService.getToken()}`
    axios.defaults.headers.common['Accept'] = 'application/json'
  }

  /**
   * send the GET HTTP request
   *
   * @param {string} resource
   * @param {AxiosRequestConfig} params
   * @returns {Promise<AxiosResponse>}
   */
  public static query(resource: string, params: AxiosRequestConfig): Promise<AxiosResponse> {
    return axios.get(resource, params)
  }

  /**
   * send the GET HTTP request
   *
   * @param {string} resource
   * @returns {Promise<AxiosResponse>}
   */
  public static get(resource: string): Promise<AxiosResponse> {
    return axios.get(resource).catch(error => {
      throw new Error(`[KT] ApiService ${error}`)
    })
  }

  /**
   * set the POST HTTP request
   *
   * @param {string} resource
   * @param {AxiosRequestConfig} params
   * @returns {Promise<AxiosResponse>}
   */
  public static post(resource: string, params: AxiosRequestConfig): Promise<AxiosResponse> {
    axios.defaults.baseURL = Config.getApiHost()
    return axios.post(`${resource}`, params)
  }

  /**
   * send the UPDATE HTTP request
   *
   * @param {string} resource
   * @param {string} slug
   * @param {AxiosRequestConfig} params
   * @returns {Promise<AxiosResponse>}
   */
  public static update(resource: string, slug: string, params: AxiosRequestConfig): Promise<AxiosResponse> {
    return axios.put(`${resource}/${slug}`, params)
  }

  /**
   * Send the PUT HTTP request
   *
   * @param {string} resource
   * @param {AxiosRequestConfig} params
   * @returns {Promise<AxiosResponse>}
   */
  public static put(resource: string, params: AxiosRequestConfig): Promise<AxiosResponse> {
    return axios.put(`${resource}`, params)
  }

  /**
   * Send the DELETE HTTP request
   *
   * @param {string} resource
   * @returns {Promise<AxiosResponse>}
   */
  public static delete(resource: string): Promise<AxiosResponse> {
    return axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  }
}

export default ApiService
