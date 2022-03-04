import { ExponentialCost, FreeCost, LinearCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";


var id = "sus";
var name = "My Theory";
var description = "Welcome! In this theory, you need to #%&#@=$#=)&*#$";
var authors = "skyhigh173#3120";
var version = 1;


var currency;
var a, b;
var k;

var init = () => {
  currency = theory.createCurrency();
  theory.primaryEquationHeight=100;
  /////////////////
  //Regular Upgrades

  //a
  {
    let getDesc = (level) => "a" + getA(level).toString(0);
    a = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(1, Math.log2(2))));
    a.getDescription = (_) => Utils.getMath(getDesc(a.level));
    a.getInfo = (amount) => Utils.getMathTo(getDesc(a.level),getDesc(a.level + amount));
  }
   //b
  {
    let getDesc = (level) => "b" + getB(level).toString(0);
    b = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(1, Math.log2(2))));
    b.getDescription = (_) => Utils.getMath(getDesc(b.level));
    b.getInfo = (amount) => Utils.getMathTo(getDesc(b.level),getDesc(b.level + amount));
  }
 
  /////////////////
  //Permanent Upgrades
  theory.createPublicationUpgrade(0, currency, 1e7);
  theory.createBuyAllUpgrade(1, currency, 1e8);
  theory.createAutoBuyerUpgrade(2, currency, 1e10);
  
  /////////////////
  //Milestone Upgrades
  theory.setMilestoneCost(new LinearCost(20, 20));

    {
        a = theory.createMilestoneUpgrade(0, 1);
        a.description = Localization.getUpgradeIncCustomExpDesc("a", `${aExp}`);
        a.info = Localization.getUpgradeIncCustomExpInfo("a", `${aExp}`);
        a.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

  
  
  /////////////////
  //// Achievements

  ///////////////////
  //// Story chapters
  
  updateAvailability();
}
var updateAvailability = () => {
    
}
var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;

    let k = getQ1(q1.level) ** 2

    var exponentialSum = getSummation(n.level);

    var tickSum = bonus * dt * k * a * b;
    currency.value += tickSum;

    theory.invalidatePrimaryEquation();
}

var getPrimaryEquation = () => {
  let result = "a\\sqrt{a}^b";
  return result;
}
init();
