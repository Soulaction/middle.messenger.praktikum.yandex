import store from '../core/Store.ts';
import resourceApi from '../api/ResourceApi/ResourceApi.ts';
import messageController from './MessageController.ts';

export class ResourceController {

  public async sendPhotoInMessage(file: FileList): Promise<void> {
    try {
      const formData = new FormData();
      formData.set('resource', file[0]);
      const { id } = await resourceApi.saveResource(formData);
      messageController.sendMessage(id.toString(), 'file');
    } catch (e) {
      store.set('message.error', (e as XMLHttpRequest).response.reason);
    }
  }
}

export default new ResourceController();
