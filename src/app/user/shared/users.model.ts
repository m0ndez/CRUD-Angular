export interface Users {
  firstname: string;
  lastname: string;
  phonenumber: string;
  email: string;
  _id: string;
  __v: number;
}

export interface Resp {
  resultCode: number;
  data: Users[];
}

