import { API } from "@/Config/Config";
import { CompaniesForAllCompaniesType, ICustomers } from "@/Types";
import axios from "axios";

export const getAllCompanies = async (token: string | null) => {
  const response = axios
    .get(`${API.uri}/companysetup`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => {
      return e;
    });

  return response;
};

export const getCompanyInfo = async (
  token: string | null,
  id: string | null | undefined,
) => {
  const response = axios
    .get(`${API.uri}/companysetup/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => {
      return e;
    });

  return response;
};

export const getAdminLeads = async (token: string | null) => {
  const response = axios
    .get(`${API.uri}/leads`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => {
      return e;
    });

  return response;
};

export const getCompanyLeads = async (
  token: string | null,
  companyId: string | null,
  userId?: string,
) => {
  let params = `/${companyId}`;
  if (userId) {
    params += `/${userId}`;
  }
  const response = axios
    .get(`${API.uri}/leads/companyleads${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => {
      return e;
    });

  return response;
};

export const getCompanyNames = async (token: string | null) => {
  const response = axios
    .get(`${API.uri}/leads/companyNames`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => {
      return e;
    });

  return response;
};

export const getCompanyDetails = async (id: string) => {
  const response = axios
    .get(`${API.uri}/companysetup/companydetails/${id}`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => {
      return e;
    });

  return response;
};

export const getLeadDetails = async (id: string | null) => {
  const response = axios
    .get(`${API.uri}/leads/${id}`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => {
      return e;
    });

  return response;
};

export const getCompanyDetail = (companyId: string) =>
  new Promise<CompaniesForAllCompaniesType>((res, rej) => {
    axios
      .get<CompaniesForAllCompaniesType>(`${API.uri}/form/company/${companyId}`)
      .then((resp) => res(resp.data))
      .then((err) => rej(err));
  });

export const getCustomers = (
  token: string,
  data?: {
    query?: string;
    page?: number;
    limit?: number;
  },
) =>
  new Promise<{
    data: ICustomers[];
    totalPages: number;
    currentPage: number;
    totalRecords: number;
  }>((res, rej) => {
    const url = new URL(`${API.uri}/customers`);
    Object.entries(data ?? {}).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
    axios
      .get<{
        data: ICustomers[];
        totalPages: number;
        currentPage: number;
        totalRecords: number;
      }>(url.toString(), {
        headers: {
          Authorization: "Basic " + token,
        },
      })
      .then((resp) => res(resp.data))
      .then((err) => rej(err));
  });

export const getCustomerById = (token: string, id: string) =>
  new Promise<ICustomers>((res, rej) => {
    const url = new URL(`${API.uri}/customers/${id}`);

    axios
      .get<ICustomers>(url.toString(), {
        headers: {
          Authorization: "Basic " + token,
        },
      })
      .then((resp) => res(resp.data))
      .then((err) => rej(err));
  });
