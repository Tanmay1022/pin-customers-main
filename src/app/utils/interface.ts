import {PrivacyOptions} from "./enum";

export interface customer {
  name: string,
  email:string,
  region: string,
  country?: string,
}

export interface PinData {
  title: string,
  image: string,
  customers: customer[],
  privacy: PrivacyOptions
}
