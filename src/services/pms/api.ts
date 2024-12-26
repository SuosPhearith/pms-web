import { request } from '@umijs/max';
import API from './typings';

// :::::::::::::: Auth ::::::::::::::

export async function login(body: API.LoginPayload, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/auth/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/auth/me/', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function updateProfile(body: API.UpdateProfileData, options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/auth/profile/', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

export async function updatePassword(body: API.UpdatePassword, options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/auth/profile/', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// :::::::::::: End Auth ::::::::::::

// :::::::::::::: Project ::::::::::::::

export async function createProject(body: API.ProjectFormValues, options?: { [key: string]: any }) {
  return request<any>('/api/project/projects/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateProject(body: API.ProjectFormValues, options?: { [key: string]: any }) {
  return request<any>(`/api/project/projects/${body.id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateProjectProgress(
  body: API.ProjectMangerFormValues,
  options?: { [key: string]: any },
) {
  return request<any>(`/api/project/update-progress/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function deleteBulkProject(body: API.DeleteBulk, options?: { [key: string]: any }) {
  return request<any>('/api/project/projects/bulk-delete/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// :::::::::::: End Project ::::::::::::

// :::::::::::: End User ::::::::::::

export async function createUser(body: API.UserFormValues, options?: { [key: string]: any }) {
  return request<any>('/api/auth/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateUser(body: API.UserFormValues, options?: { [key: string]: any }) {
  return request<any>('/api/user/update/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function resetUser(body: API.UserResetPassword, options?: { [key: string]: any }) {
  return request<any>('/api/user/update/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function banUser(body: API.UserBan, options?: { [key: string]: any }) {
  return request<any>('/api/auth/ban/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// :::::::::::: End User ::::::::::::

// :::::::::::: End Task :::::::::::::::

export async function createTask(body: API.TaskFormValues, options?: { [key: string]: any }) {
  return request<any>('/api/task/tasks/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateTask(body: API.TaskFormValues, options?: { [key: string]: any }) {
  return request<any>(`/api/task/tasks/${body.id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function deleteBulkTask(body: API.DeleteBulk, options?: { [key: string]: any }) {
  return request<any>('/api/task/tasks/bulk-delete/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// :::::::::::: End Task :::::::::::::::

// :::::::::::: End Option :::::::::::::

export async function optionManagers(options?: { [key: string]: any }) {
  return request<API.OptionValue[]>('/api/option/list-managers/', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function optionProjects(options?: { [key: string]: any }) {
  return request<API.OptionValue[]>('/api/option/list-projects/', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function optionDevelopers(
  body?: { projectId: number },
  options?: { [key: string]: any },
) {
  return request<API.OptionValue[]>(`/api/option/list-developers/?projectId=${body?.projectId || ''}`, {
    method: 'GET',
    ...(options || {}),
  });
}

// :::::::::::: End Option ::::::::::::

// :::::::::::: End Todo ::::::::::::

export async function updateTodoStatus(
  body: API.TodoUpdateStatus,
  options?: { [key: string]: any },
) {
  return request<any>(`/api/todo/update/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function createRemark(body: API.TodoCreateRemark, options?: { [key: string]: any }) {
  return request<any>(`/api/todo/update/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// :::::::::::: End Todo ::::::::::::
