import { createStatementData } from './createStatementData';

const INVOICES = require('../spec/support/fixtures/invoices.json');
const PLAYS = require('../spec/support/fixtures/plays.json');

describe('createStatementData', () => {
  describe('result', () => {

    let statementData;

    it('should display data structure for BigCo', () => {
      statementData = createStatementData(INVOICES[0], PLAYS);
      expect(statementData.customer).toEqual('BigCo');
      expect(statementData.performances.length).toEqual(3);
      expect(statementData.totalAmount).toEqual(173000);
    });

    it('should display data structure for SillyCo', () => {
      statementData = createStatementData(INVOICES[1], PLAYS);
      expect(statementData.customer).toEqual('SillyCo');
      expect(statementData.performances.length).toEqual(2);
      expect(statementData.totalAmount).toEqual(1050000);
    });

    it('should display data structure for OtherCo', () => {
      statementData = createStatementData(INVOICES[2], PLAYS);
      expect(statementData.customer).toEqual('OtherCo');
      expect(statementData.performances.length).toEqual(1);
      expect(statementData.totalAmount).toEqual(365000);
    });

    it('should display data structure for AnotherCo', () => {
      statementData = createStatementData(INVOICES[3], PLAYS);
      expect(statementData.customer).toEqual('AnotherCo');
      expect(statementData.performances.length).toEqual(3);
      expect(statementData.totalAmount).toEqual(453000);
    });
  });
});
