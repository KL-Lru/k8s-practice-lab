import ky, {ResponsePromise} from 'ky';

export const api = ky.create({
  prefixUrl: `${process.env.REACT_APP_API_ROOT || ''}/apis`,
  throwHttpErrors: false,
});

export const toJson = async <T>(response: ResponsePromise): Promise<T> => {
  return await response.json();
};

