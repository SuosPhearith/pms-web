// :::::::::::::: Auth ::::::::::::::

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResult = {
  access: string;
  refresh: string;
  status?: string;
};

export type CurrentUser = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  name: string;
  date_joined: string; 
  role: 'ADMIN' | 'USER' | 'MANAGER'; 
  avatar: string;
};

// :::::::::::: End Auth ::::::::::::


// :::::::::::: From :::::::::::::

export interface ProjectFormValues {
  id?: number;
  name: string; 
  description?: string; 
  start_date: string; 
  end_date: string; 
  status: 'Not Started' | 'In Progress' | 'Completed' | 'On Hold'; 
  priority: 'low' | 'medium' | 'high'; 
  budget: number;
  spent: number;
  risk_level: 'low' | 'medium' | 'high'; 
  tag?: string; 
  manager_id : number;
  manager: User; 
}

export interface TaskFormValues {
  id?: number;
  name: string; 
  description?: string; 
  status: string; 
  due_at: string; 
  status: 'Pending' | 'In Progress' | 'Done';
  stage : 'Backend' | 'Frontend' | 'Deploy' | 'Testing' | 'Launch';
  assigned_to : number,
}

export interface UserFormValues {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password?: string;
  password2?: string;
  role: 'ADMIN' | 'MANAGER' | 'DEVELOPER';
}

// ::::::::::: End From :::::::::::


// ::::::::::: End Option ::::::::::::

export interface OptionValue {
  lable: string;
  value: number
}

export interface DeleteBulk {
  ids: number[]
}

export interface User {
  id: number;
  username: string;
  first_name: string; 
  last_name: string;  
  email: string;
  full_name: string; 
}


// ::::::::::: End Option ::::::::::::


