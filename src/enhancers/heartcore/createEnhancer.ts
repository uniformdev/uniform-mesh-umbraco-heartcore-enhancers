/* eslint-disable no-console */
import {
  ComponentParameterEnhancer,
  LimitPolicy,
  createLimitPolicy,
} from '@uniformdev/canvas';

import {
  isParameterValueDefined,
  parameterIsEntry,
} from './entryParameter';
import { EditorValue } from './entryParameter'
import { Client, Content } from '@umbraco/headless-client';

export type CreateHeartcoreEnhancerOptions = {
  clients: Client;
  limitPolicy?: LimitPolicy;
};

export const CANVAS_Heartcore_PARAMETER_TYPES = Object.freeze(['HeartcoreEntry']);

export function createHeartcoreEnhancer({
  clients,
  limitPolicy,
}: CreateHeartcoreEnhancerOptions): ComponentParameterEnhancer<
  EditorValue,
  Content | null
> {
  if (!clients) {
    throw new Error(
      'No Heartcore clients were provided to the enhancer. You must provide at least one client via the HeartcorefulClientList.'
    );
  }

  const finalLimitPolicy =
    limitPolicy ||
    createLimitPolicy({
      // per https://docs.Heartcore.ai/reference/delivery-api#section/Rate-limitation:
      // there is a rate limit of 100/second and 2000/minute for uncached data.
      // 2000 / 60 = 33.3333
      throttle: {
        limit: 33,
        interval: 1000,
      },
    });

  return {
    enhanceOne: async function HeartcoreEnhancer({ parameter, parameterName, component, context }) {
      if (parameterIsEntry(parameter)) {
        if (!isParameterValueDefined(parameter.value)) {
          return null;
        }

        const client = clients as Client;
        const entryId = parameter.value!.id;

        const entry = await client!.delivery.content.byId(entryId);

        return entry;
      }
    },
    limitPolicy: finalLimitPolicy,
  };
}