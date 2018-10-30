import { statement } from './statement';

const INVOICES = require('../spec/support/fixtures/invoices.json');
const PLAYS = require('../spec/support/fixtures/plays.json');

describe("Statement", () => {
  it('should return a string of information for BigCo', () => {
    const expected = 'Statement for BigCo\n' +
      '  Hamlet: $650.00 (55 seats)\n' +
      '  As You Like It: $580.00 (35 seats)\n' +
      '  Othello: $500.00 (40 seats)\n' +
      'Amount owed is $1,730.00\n' +
      'You earned 47 credits\n';
    const actual = statement(INVOICES[0], PLAYS);
    expect(expected).toEqual(actual);
  });

  it('should return a string of information for SillyCo', () => {
    const expected = 'Statement for SillyCo\n' +
      '  Hamlet: $400.00 (15 seats)\n' +
      '  As You Like It: $10,100.00 (1225 seats)\n' +
      'Amount owed is $10,500.00\n' +
      'You earned 1440 credits\n';
    const actual = statement(INVOICES[1], PLAYS);
    expect(expected).toEqual(actual);
  });

  it('should return a string of information for OtherCo', () => {
    const expected = 'Statement for OtherCo\n' +
      '  Hamlet: $3,650.00 (355 seats)\n' +
      'Amount owed is $3,650.00\n' +
      'You earned 325 credits\n';
    const actual = statement(INVOICES[2], PLAYS);
    expect(expected).toEqual(actual);
  });

  it('should return a string of information for AnotherCo', () => {
    const expected = 'Statement for AnotherCo\n' +
      '  Hamlet: $1,650.00 (155 seats)\n' +
      '  As You Like It: $1,380.00 (135 seats)\n' +
      '  Othello: $1,500.00 (140 seats)\n' +
      'Amount owed is $4,530.00\n' +
      'You earned 367 credits\n';
    const actual = statement(INVOICES[3], PLAYS);
    expect(expected).toEqual(actual);
  });

  it('should throw an unknown type error with the type', () => {
    expect(() => {
      const actual = statement(INVOICES[4], PLAYS);
    }).toThrow(new Error(`unknown type: drama`));
  })
});
