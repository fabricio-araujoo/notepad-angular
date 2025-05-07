import {
  HttpResponse,
  HttpStatusCode,
  provideHttpClient,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { IDefaultResponse } from '~/app/core/adapter/http-adapter/http-adapter.interface';
import { HttpAdapterService } from '~/app/core/adapter/http-adapter/http-adapter.service';
import { NotificationAdapterService } from '~/app/core/adapter/notification-adapter/notification-adapter.service';
import { NotesService } from './notes.service';
import {
  IAddNoteParams,
  IAddNoteResponse,
  IGetNotesResponse,
} from './notes.service.interface';

describe('NotesService', () => {
  let service: NotesService;
  let httpAdapter: HttpAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotesService,
        HttpAdapterService,
        NotificationAdapterService,
        MessageService,
        provideHttpClient(),
        provideHttpClientTesting(), // ✅ nova forma recomendada
      ],
    });

    service = TestBed.inject(NotesService);
    httpAdapter = TestBed.inject(HttpAdapterService);
  });

  describe('getListNotes', () => {
    it('should return the current user when is a valid response', async () => {
      const mockListNotes: IGetNotesResponse = {
        notes: [{ _id: '1', title: 'Nota 1', content: 'Conteúdo 1' }],
      };

      const mockResponse: HttpResponse<IDefaultResponse<IGetNotesResponse>> = {
        body: { code: HttpStatusCode.Ok, result: mockListNotes },
      } as HttpResponse<IDefaultResponse<IGetNotesResponse>>;

      // Simulamos retorno de sucesso do método .get
      spyOn(httpAdapter, 'get').and.resolveTo(mockResponse);

      const result = await service.getListNotes();

      expect(result).toEqual(mockListNotes);
      expect(httpAdapter.get).toHaveBeenCalledWith('/v1/notepad/notes/list');
    });

    it('should return undefined when hasError is true', async () => {
      const mockResponse: HttpResponse<IDefaultResponse<IGetNotesResponse>> = {
        body: { code: HttpStatusCode.BadRequest, result: undefined },
      } as HttpResponse<IDefaultResponse<IGetNotesResponse>>;

      spyOn(httpAdapter, 'get').and.resolveTo(mockResponse);

      const result = await service.getListNotes();

      expect(result).toBeUndefined();
    });

    it('should return undefined to generic error', async () => {
      spyOn(httpAdapter, 'get').and.rejectWith(new Error('Erro genérico'));

      const result = await service.getListNotes();

      expect(result).toBeUndefined();
    });
  });

  describe('addNote', () => {
    it('should return note data when is a valid response', async () => {
      const mockParams: IAddNoteParams = {
        title: 'Nova nota',
        content: 'Conteúdo da nota',
      };

      const mockAddNoteResponse: IAddNoteResponse = {
        _id: '1',
        title: 'Nova nota',
        content: 'Conteúdo da nota',
      };

      const mockResponse: HttpResponse<IDefaultResponse<IAddNoteResponse>> = {
        body: { code: HttpStatusCode.Ok, result: mockAddNoteResponse },
      } as HttpResponse<IDefaultResponse<IAddNoteResponse>>;

      spyOn(httpAdapter, 'post').and.resolveTo(mockResponse);

      const result = await service.addNote(mockParams);

      expect(result).toEqual(mockAddNoteResponse);
      expect(httpAdapter.post).toHaveBeenCalledWith(
        '/v1/notepad/notes/create',
        mockParams
      );
    });

    it('should return undefined when hasError is true', async () => {
      const mockParams: IAddNoteParams = {
        title: 'Erro',
        content: 'Com erro',
      };

      const mockResponse: HttpResponse<IDefaultResponse<IAddNoteResponse>> = {
        body: { code: HttpStatusCode.BadRequest, result: undefined },
      } as HttpResponse<IDefaultResponse<IAddNoteResponse>>;

      spyOn(httpAdapter, 'post').and.resolveTo(mockResponse);

      const result = await service.addNote(mockParams);

      expect(result).toBeUndefined();
    });

    it('should return undefined to generic error', async () => {
      const mockParams: IAddNoteParams = {
        title: 'Qualquer',
        content: 'Teste',
      };

      spyOn(httpAdapter, 'post').and.rejectWith(new Error('Erro inesperado'));

      const result = await service.addNote(mockParams);

      expect(result).toBeUndefined();
    });
  });
});
