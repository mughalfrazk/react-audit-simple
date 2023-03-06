export const apis = {
  LOGIN: "auth/login",
  PROFILE: "auth/profile",
  
  FIRM_LIST: "company",
  FIRM_DETAIL: (id) => `company/${id}`,

  EMPLOYEE_LIST: (id) => !!id ? `employee?firm=${id}` : 'employee',
  EMPLOYEE_DETAIL: (id) => `employee/${id}`
};
