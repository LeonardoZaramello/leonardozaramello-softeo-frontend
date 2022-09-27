export interface user {
  _id: string
  userName: string
  email: string
  service: string
  value: number
  instalment: number
  firsPaymentDay: Date
  payed: boolean
  createdAt: Date
  updatedAt: Date
  instalmentInfos: userInstalmentInfosType[]
}

export interface userInstalmentInfosType extends nestedType {
  parcela: number
  valor: number
  dia: string
  pago: string
}

export interface DataType {
  key: React.Key
  cliente: string
  email: string
  serviço: string
  valor: number
  parcelas: number
  data: string
}
export interface nestedDataType {
  key: React.Key
  parcela: number
  valor: number
  dia: string
  pago: string
}

export interface nestedType {
  number: number
  value: number
  paymentDay: string
  payed: boolean
}
