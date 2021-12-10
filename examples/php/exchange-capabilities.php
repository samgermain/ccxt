<?php

$root = dirname (dirname (dirname (__FILE__)));

include $root . '/ccxt.php';

// TODO
const asTable     = require ('as-table').configure ({ delimiter: ' | ', /* print: require ('string.ify').noPretty  */ })
    , log         = require ('ololog').noLocate
    , ansi        = require ('ansicolor').nice

date_default_timezone_set('UTC');
echo "CCXT v." . \ccxt\Exchange::VERSION . "\n";    

$total = 0;
$missing = 0;
$ignored = 0;
$implemented = 0;
$emulated = 0;

log (asTable ($ccxt->exchanges->map ($id => new ccxt[$id]())->map ($exchange => {

    $result = array();

    [
        'publicAPI',
        'privateAPI',
        'CORS',
        'fetchCurrencies',
        'fetchFundingFees',
        'fetchFundingRate',
        'fetchFundingRates',
        'fetchFundingRateHistory',
        'fetchIndexOHLCV',
        'fetchMarkOHLCV',
        'fetchMarkets',
        'fetchOHLCV',
        'fetchOrderBook',
        'fetchOrderBooks',
        'fetchStatus',
        'fetchTicker',
        'fetchTickers',
        'fetchTime',
        'fetchTrades',
        'fetchTradingLimits',
        'cancelAllOrders',
        'cancelOrder',
        'cancelOrders',
        'createDepositAddress',
        'createOrder',
        'deposit',
        'editOrder',
        'fetchAccounts',
        'fetchBalance',
        'fetchBorrowRate',
        'fetchBorrowRates',
        'fetchCanceledOrders',
        'fetchClosedOrder',
        'fetchClosedOrders',
        'fetchDeposit',
        'fetchDepositAddress',
        'fetchDepositAddresses',
        'fetchDeposits',
        'fetchFees',
        'fetchFundingFee',
        'fetchFundingHistory',
        'fetchIsolatedPositions',
        'fetchLedger',
        'fetchLedgerEntry',
        'fetchMyTrades',
        'fetchOpenOrder',
        'fetchOpenOrders',
        'fetchOrder',
        'fetchOrderTrades',
        'fetchOrders',
        'fetchPosition',
        'fetchPositions',
        'fetchPremiumIndexOHLCV',
        'fetchTradingFee',
        'fetchTradingFees',
        'fetchTransactions',
        'fetchTransfers',
        'fetchWithdrawal',
        'fetchWithdrawals',
        'setLeverage',
        'setMarginMode',
        'signIn',
        'transfer',
        'withdraw',
    ].forEach ($key => {

        $total += 1

        $capability = $exchange->has[$key]

        if ($capability === null) {
            $capability = $exchange->id->red
            $missing += 1
        } else if ($capability === false) {
            $capability = $exchange->id->red->dim
            $ignored += 1
        } else if ($capability.toString () === 'emulated') {
            $capability = $exchange->id->yellow
            $emulated += 1
        } else {
            $capability = $exchange->id->green
            $implemented += 1
        }

        $result[$key] = $capability
    })

    return $result
})))

log ('Summary:',
    $ccxt->exchanges->length->toString (), 'exchanges,',
    $implemented.toString ()->green, 'methods implemented,',
    $emulated.toString ()->yellow, 'emulated,',
    $ignored.toString ()->red->dim, 'ignored,',
    $missing.toString ()->red, 'missing,',
    $total.toString (), 'total'
)

log("\nMessy? Try piping to less (e.g. node script.js | less -S -R)\n"->red)

?>