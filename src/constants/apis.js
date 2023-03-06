export const apis = {
  LOGIN: "auth/login",
  PROFILE: "auth/profile",
  
  FIRM_LIST: "company",
  FIRM_DETAIL: (id) => `company/${id}`,

  EMPLOYEE_LIST: (id) => !!id ? `employee?firm=${id}` : 'employee',
  EMPLOYEE_DETAIL: (id) => `employee/${id}`,

  CLIENT_LIST: "company/clients",
  CLIENT_DETAIL: (id) => `company/client/${id}`
};
