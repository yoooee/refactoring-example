import { createStatementData } from './createStatementData';

interface Performance {
  playID: string;
  audience: number;
}

function statement (invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText (data) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;

  function usd(aNumber: number) {
    return new Intl.NumberFormat("en-US",
      { style: "currency", currency: "USD",
        minimumFractionDigits: 2 }).format(aNumber/100);
  }
}

export { statement };
