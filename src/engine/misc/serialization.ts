export interface Serialized {
  id: string
}

export interface Serializable {
  serialize(...args: any[]): Serialized
}
