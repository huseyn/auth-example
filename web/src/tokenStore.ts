// src/tokenStore.ts
export let accessToken: string | null = null;
export let currentUser: any = null; // user obyektini bootstrap üçün saxlayırıq

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}


export function setBootstrapUser(user: any) {
  currentUser = user;
}
