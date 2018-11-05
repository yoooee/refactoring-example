function createPerformanceCalculator(aPerformance, aPlay) {
  return new PerformanceCalculator(aPerformance, aPlay);
}

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

  get volumeCredits() {
    let result = 0;

    result += Math.max(this._performance.audience - 30, 0);
    if ("comedy" === this._play.type) result += Math.floor(this._performance.audience / 5);

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
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
}
