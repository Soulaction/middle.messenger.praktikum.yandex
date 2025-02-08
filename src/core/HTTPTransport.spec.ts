import { createSandbox, SinonStub } from 'sinon';
import { HTTPTransport, queryStringify } from './HTTPTransport.ts';
import { expect } from 'chai';


describe('Проверка функциональности модуля HTTPTransport', () => {
  const sandbox = createSandbox();
  let http: HTTPTransport;
  let request: SinonStub;

  beforeEach(() => {
    http = new HTTPTransport('');
    request = sandbox.stub(http, 'request');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Вызов метода request', async () => {
    await http.request('');
    expect(request.calledOnce).to.eql(true);
  });


  it('Проверка функции queryStringifySpy (преобразование объекта в url строку)', () => {
    const params = { key1: 'value1', key2: 'value2' };
    const expectedQuery = '?key1=value1&key2=value2';

    const queryStringifySpy = sandbox.spy(queryStringify);
    const query = queryStringifySpy(params);

    expect(queryStringifySpy.calledOnce).to.eql(true);
    expect(query).to.equal(expectedQuery);
  });

  it('Вызов метода GET', async () => {
    const url = '';
    const options = { data: 'data' };

    await http.get(url, options);

    expect(request.getCall(0).args).to.deep.equal([url, {
      ...options,
      method: 'GET',
    }]);
  });

  it('Вызов метода POST', async () => {
    const url = '';
    const options = { data: 'data' };

    await http.post(url, options);

    expect(request.getCall(0).args).to.deep.equal([url, {
      ...options,
      method: 'POST',
    }]);
  });

  it('Вызов метода PUT', async () => {
    const url = '';
    const options = { data: 'data' };

    await http.put(url, options);

    expect(request.getCall(0).args).to.deep.equal([url, {
      ...options,
      method: 'PUT',
    }]);
  });

  it('Вызов метода DELETE', async () => {
    const url = '';
    const options = { data: 'data' };

    await http.delete(url, options);

    expect(request.getCall(0).args).to.deep.equal([url, {
      ...options,
      method: 'DELETE',
    }]);
  });
});
