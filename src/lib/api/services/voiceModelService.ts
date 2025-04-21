
import { httpClient } from '../httpClient';
import { ENDPOINTS } from '../config';

export interface VoiceModel {
  id: string;
  name: string;
  accent: string;
  gender: string;
  status: 'Active' | 'Inactive';
  dateAdded: string;
}

export const voiceModelService = {
  getAll: () => httpClient.get<VoiceModel[]>(ENDPOINTS.VOICE_MODELS.GET_ALL),
  
  getById: (id: string) => httpClient.get<VoiceModel>(ENDPOINTS.VOICE_MODELS.GET_BY_ID(id)),
  
  create: (data: Omit<VoiceModel, 'id' | 'dateAdded'>) => 
    httpClient.post<VoiceModel>(ENDPOINTS.VOICE_MODELS.CREATE, data),
    
  update: (id: string, data: Partial<VoiceModel>) => 
    httpClient.put<VoiceModel>(ENDPOINTS.VOICE_MODELS.UPDATE(id), data),
    
  delete: (id: string) => httpClient.delete(ENDPOINTS.VOICE_MODELS.DELETE(id)),

  toggleStatus: (id: string) => 
    httpClient.put<VoiceModel>(ENDPOINTS.VOICE_MODELS.TOGGLE_STATUS(id), {}),
};