import React, {LegacyRef, Suspense, useEffect, useRef} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {persistQueryClient} from '@tanstack/react-query-persist-client';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import {StatusBar} from 'react-native';
import {RecoilRoot} from 'recoil';
import AppNavigation from './navigation/AppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';

export default function AppContainer() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minute
        cacheTime: 1000 * 60 * 15, // 15 minutes
        networkMode: 'online',
        retry: false,
      },
    },
  });

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  persistQueryClient({
    queryClient,
    persister: asyncStoragePersister,
    dehydrateOptions: {
      shouldDehydrateQuery: query => {
        const shouldPersist = (query?.meta?.persist as boolean) ?? false;
        return shouldPersist;
      },
    },
  });
  const flashMessageRef = useRef<LegacyRef<FlashMessage> | undefined>();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <RecoilRoot>
            <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
            <FlashMessage position="top" ref={flashMessageRef.current} />
            <AppNavigation />
          </RecoilRoot>
        </Suspense>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
