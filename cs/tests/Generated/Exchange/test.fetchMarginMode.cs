using ccxt;
namespace Tests;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


public partial class testMainClass : BaseTest
{
    async static public Task<object> testFetchMarginMode(Exchange exchange, object skippedProperties, object symbol)
    {
        object method = "fetchMarginMode";
        object marginMode = await exchange.fetchMarginMode(symbol);
        testMarginMode(exchange, skippedProperties, method, marginMode);
        return true;
    }

}