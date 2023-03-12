export const apis = {
  LOGIN: "auth/login",
  PROFILE: "auth/profile",
  
  FIRM_LIST: "company",
  FIRM_DETAIL: (id) => !!id ? `company/detail?firm=${id}` : 'company/detail',

  EMPLOYEE_LIST: (id) => !!id ? `employee?firm=${id}` : 'employee',
  EMPLOYEE_DETAIL: (id) => `employee/${id}`,

  CLIENT_LIST: (id) => !!id ? `company/clients?firm=${id}` : 'company/clients',
  CLIENT_DETAIL: (id) => `company/client/${id}`,
  CLIENT_FOLDERS: (id) => `folder?client=${id}`,
  CLIENT_ASSIGNMENT_LIST: (employee, firm) => `client-assignment?${!!employee ? `employee=${employee}` : ''}${(!!employee && !!firm) ? "&" : ""}${!!firm ? `firm=${firm}` : ""}`,
  CREATE_CLIENT_ASSIGNMENT: 'client-assignment',

  ACTION_LIST: "action"
};
