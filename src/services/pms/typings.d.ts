// :::::::::::::: Auth ::::::::::::::

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResult = {
  access: string;
  refresh: string;
  role: string;
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

export interface UpdateProfileData  {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  name: string;
}

export interface UpdatePassword  {
  current_password : string;
  new_password : string;
  confirm_password : string;
}

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
  dev_ids?: number[]
}
export interface ProjectMangerFormValues {
  id?: number;
  backend_percentage: number;
  frontend_percentage: number;
  deploy_percentage: number;
  testing_percentage: number;
  launch_percentage: number;
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

export interface UserResetPassword {
  id : number;
  password : string;
  password2: string;
}

export interface UserBan {
  userId : number;
}

export interface TodoUpdateStatus {
  taskId : number;
  status : 'pending' | 'InProgress' | 'done';
}
export interface TodoCreateRemark {
  taskId : number;
  remark_status : string;
  remark_note : string;
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


