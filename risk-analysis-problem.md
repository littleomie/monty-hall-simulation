**MonkeyDevs** builds websites for companies that offers technical services such as installation, repair, configuration, and maintance of devices, ranging from electrical devices, electronics, computers and etc.

MonkeyDevs developed a prototype of a web-based system that features innovative design and modern Ui and UX, which has a potential to capture a significant share of the local market.

assume the following values:

> Selling Price = $5,000 (1 Year Subscription)  
> Administrative Cost = $40,000  
> Advertising Cost = $55,000

the above assumptions are considered constants and are called **parameters** of the model.

the cost for Direct Labor, Cost of Parts, and the first-year demain are not known with certainty and are considered **probabilistic inputs**.

let
```
DLC = Direct Labor Cost  
COP = Cost of Parts  
X First-year demand  
```

estimated:  
DLC = `250`  
COP = `1000`  
X = `100`  

> Profit = (5000 - DLC - COP) * X - 95000

```javascript
const profit = function(directLaborCost, costOfParts, demand){
    let administrativeCost = 40000;
    let advertisingCost = 55000;
    let sellingPrice = 5000;
    return ((sellingPrice - directLaborCost - costOfParts) * demand) - administrativeCost - advertisingCost;
}

// RANDOM GENERATOR
const getRandom = max => Math.floor(Math.random() * Math.floor(max));
```

Ranges:
DLC = 250 to 236
COP = 1000 t0 1035
X = 20 to 100

