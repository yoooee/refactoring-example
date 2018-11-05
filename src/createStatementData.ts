class PerformanceCalculator {
  constructor(private _performance, private _play) { }

  get play() {
    return this._play;
  }

  get amount() {
    let result = 0;

    switch (this._play.type) {
      case "tragedy":
        result = 40000;
        if (this._performance.audience > 30) {
          result += 1000 * (this._performance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (this._performance.audience > 20) {
          result += 10000 + 500 * (this._performance.audience - 20);
        }
        result += 300 * this._performance.audience;
        break;
      default:
        throw new Error(`unknown type: ${this._play.type}`);
    }

    return result;
  }
}

export function createStatementData (invoice, plays) {
  const result = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
    totalAmount: 0,
    totalVolumeCredits: 0
  };

  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);

  return result;

  function enrichPerformance(aPerformance) {
    const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;

    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);

    return result;
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
}
