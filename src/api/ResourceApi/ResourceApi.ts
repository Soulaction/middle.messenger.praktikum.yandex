import { BaseApi } from '../BaseApi.ts';
import { BASE_URL_HTTP } from '../../utils/const.ts';
import { Resource } from './types/Resource.ts';

class ResourceApi extends BaseApi {

  saveResource(formData: FormData): Promise<Resource> {
    return this.http.post<Resource>('', { data: formData, credentials: true });
  }
}

export default new ResourceApi(BASE_URL_HTTP + '/resources');
