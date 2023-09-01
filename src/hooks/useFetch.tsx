import {useCallback} from 'react';
import {AxiosResponse} from 'axios';
import useFlashMessage from '../hooks/useFlashMessage';
import fetch, {FetchConfig} from '../api/fetch';
import Config from 'react-native-config';

type FetchFn<A> = (args?: A) => Promise<FetchConfig> | FetchConfig;

const waitForInteraction = () => {
  return new Promise(resolve => {
    //@ts-ignore
    requestAnimationFrame(() => resolve());
  });
};

export default function useFetch<A, R>(fetchFn: FetchFn<A>) {
  const {errorMessage} = useFlashMessage();

  const handleFetch = useCallback(
    async (args?: A) => {
      function polyfillFetchConfig(baseConfig: FetchConfig): FetchConfig {
        return {
          baseURL: Config.BASE_URL,
          isShowError: baseConfig.method === 'GET' ? false : true,
          ...baseConfig,
        };
      }

      const _fetchConfig = await fetchFn(args);
      const fetchConfig = polyfillFetchConfig(_fetchConfig);
      await waitForInteraction();
      return fetch<R>(fetchConfig, {}).catch<AxiosResponse<R>>(err => {
        if (err.response) {
          if (fetchConfig.isShowError) {
            errorMessage(err);
          }
        }
        throw err;
      });
    },
    [errorMessage, fetchFn],
  );
  return handleFetch;
}
