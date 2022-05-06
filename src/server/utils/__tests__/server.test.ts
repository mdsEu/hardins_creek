import * as server from '../server';

const originalEnv = process.env;




describe('Utils server', () => {
  afterEach(() => process.env = originalEnv);

  describe('getPortNumber function', () => {
    it('Should return default port if this is not a number', () => {
      setEnvironmentParameter('PORT', 'kkk');
      expect(server.getPortNumber()).toEqual(3000)
    })

    it('Should return environment port if this is a valid number', () => {
      setEnvironmentParameter('PORT', 9000);
      expect(server.getPortNumber()).toEqual(9000)
    })
  })

  describe('isEnvironment function', () => {
    it('Should return true if the NODE_ENV is equal to the environment sending to the function', () => {
      setEnvironmentParameter('NODE_ENV', 'unit_test');
      expect(server.isEnvironment('unit_test')).toBeTruthy
    })

    it('Should return false if the NODE_ENV is not equal to the environment sending to the function', () => {
      setEnvironmentParameter('NODE_ENV', 'no_unit_test');
      expect(server.isEnvironment('unit_test')).toBeFalsy
    })
  })
})


function setEnvironmentParameter (key: string, value : any) {
  process.env = {
    ...originalEnv,
    [key]: value
  }
}
