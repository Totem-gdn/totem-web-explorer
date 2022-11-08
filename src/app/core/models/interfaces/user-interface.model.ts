export interface UserEntity {
  email?: string;
  name?: string;
  profileImage?: string;
  wallet?: string;
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
};
