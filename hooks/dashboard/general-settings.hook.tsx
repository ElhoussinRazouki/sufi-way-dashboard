import APIs from '@/api';
import { GeneralSettingsPatchDTO } from '@/types/general-settings.types';
import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';

export function useGeneralSettings() {
  const queryClient = useQueryClient();

  const { data, ...rest } = useQuery(
    ['general-settings'],
    () => APIs.generalSettings.details(),
    {
      suspense: true,
      retry: false
    }
  );

  const update = useCallback(
    async (data: GeneralSettingsPatchDTO) => {
      return APIs.generalSettings.update(data).then((updated) => {
        queryClient.invalidateQueries('general-settings');
        return updated;
      });
    },
    [queryClient]
  );
  return {
    ...rest,
    details: data,
    update
  };
}
