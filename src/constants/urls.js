export const urls = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  NOT_FOUND: '/404',

  INDEX: '/',
  FIRMS: '/firms',
  FIRM_DETAIL: (id) => `/firms/${id}`,
  CLIENTS: '/clients',
  CLIENT_DETAIL: (id) => `/clients/${id}`,
  EMPLOYEES: '/employees',
  EMPLOYEE_DETAIL: '/employees/:id',
  ROLES: '/roles',
  ROLE_PERMISSIONS: '/roles/:id',
  PERMISSIONS: '/permissions'
};
