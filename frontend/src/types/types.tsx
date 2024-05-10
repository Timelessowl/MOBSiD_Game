
interface JSONValue extends Array<number|string|boolean> { }

export interface JSONObject {
  [x: string]: JSONValue;
}


