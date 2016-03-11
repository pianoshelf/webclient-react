import nock from 'nock';
import config from '../../config';

const ADDRESS = `http://localhost:${config.ports.django}`;

/**
 * Test utility function that mocks a specific API call, and allows returning a status code and
 * value.
 */
export default function mockApiCall({
  method,
  path,
  params,
  returnCode = 200,
  returnData = {},
  returnMeta = {},
}) {
  const returnValue = {
    data: returnData,
    meta: {
      ...returnMeta,
      code: returnCode,
    },
  };
  if (method === 'get') {
    if (params) {
      return nock(ADDRESS)
        .get(path).query(params).reply(returnCode, returnValue);
    }
    return nock(ADDRESS)
      .get(path).reply(returnCode, returnValue);
  }
  return nock(ADDRESS)[method.toLowerCase()](path, params)
    .reply(returnCode, returnValue);
}
