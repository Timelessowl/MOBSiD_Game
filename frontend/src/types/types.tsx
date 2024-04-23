
interface JSONValue extends Array<number|boolean> { }

export interface JSONObject {
  [x: string]: JSONValue;
}


