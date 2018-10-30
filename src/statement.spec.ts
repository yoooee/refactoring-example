import { statement } from './statement';

const INVOICES = require('../spec/support/fixtures/invoices.json');
const PLAYS = require('../spec/support/fixtures/plays.json');

describe("Statement", () => {
  it('should return a string of information', () => {
    const expected = 'Statement for BigCo\n' +
    '  Hamlet: $650.00 (55 seats)\n' +
    '  As You Like It: $580.00 (35 seats)\n' +
    '  Othello: $500.00 (40 seats)\n' +
    'Amount owed is $1,730.00\n' +
    'You earned 47 credits\n';
    const actual = statement(INVOICES[0], PLAYS);
    expect(expected).toEqual(actual); 
  });
});
