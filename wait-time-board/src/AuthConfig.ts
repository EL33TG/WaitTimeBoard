export const msalConfig = {
    auth: {
        clientId: "8c7ebf64-5ce0-4936-a1f3-9c22002b8da1",
        authority: "https://login.microsoftonline.com/0b95a125-791c-4f0a-9f9e-99e363117506", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    //   redirectUri: "Enter_the_Redirect_Uri_Here",
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
};

export const loginRequest = {
    scopes: ["User.Read"]
};