// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  WEB3AUTH_ID: 'BMUaCGWAqX7ulSauE1dvkhhiGy1OUcVPaDNexeWCj8K9Hs4EFtOMGjhFGMnwxLOypcA4g6UlzAa8UF35POXQFtI',
  TOTEM_BASE_API_URL: 'https://dev-api.totem-explorer.com',
  TOTEM_FAUCET_API_URL: 'https://faucet.totem-explorer.com',
  ASSET_RENDERER_URL: 'https://asset-renderer.totem-explorer.com',
  TRACKING_G_ID: 'G-L6K946DQFY',
  TOTEM_WEB_EXPLORER_URL: 'https://dev.totem-explorer.com',

  BLOCKCHAIN_CONFIG: {
    name: 'mumbai',
    chainId: "0x13881",
    rpcTarget: "https://rpc-mumbai.maticvigil.com",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
