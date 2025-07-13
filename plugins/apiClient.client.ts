import type { $Fetch } from "nitropack";

declare module "#app" {
  interface NuxtApp {
    $apiClient: $Fetch;
    $userToken: {
      set: (value: string) => string;
      get: () => string | null;
      clear: () => null;
    };
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const apiClient = $fetch.create({
    baseURL: config.public.apiBase || '',
    onRequest({ options }) {

      // * Add the user token to the Authorization header if found
      // * And any other option or header needed to globally extend the api client
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await navigateTo("/login");
      }
    },
  });

  // * Expose to useNuxtApp().$apiClient
  return {
    provide: {
      apiClient,
    },
  };
});
