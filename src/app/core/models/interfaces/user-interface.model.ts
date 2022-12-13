export interface UserEntity {
  email?: string;
  name?: string;
  profileImage?: string;
  wallet?: string;
}

export interface UserMessage {
  date: string;
  id: string;
  isRead: boolean;
  isOpened?: boolean;
  isChecked?: boolean;
  message: string;
  subject: string;
  type: string;
}

export interface OpenLoginUserInfo {
  email?: string | undefined;
  name?: string;
  profileImage?: string;
  aggregateVerifier?: string;
  verifier?: string;
  verifierId?: string;
  typeOfLogin?: string;
  dappShare?: string;
  idToken?: string;
  oAuthIdToken?: string;
  oAuthAccessToken?: string;
}
