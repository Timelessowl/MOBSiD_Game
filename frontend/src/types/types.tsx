
export type userType = {
  email: string;
  username: string;
  isSuperUser: boolean;
}

interface JSONValue extends Array<number|boolean> { }

export interface JSONObject {
  [x: string]: JSONValue;
}


