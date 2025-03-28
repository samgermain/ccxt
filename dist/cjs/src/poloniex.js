'use strict';

var poloniex$1 = require('./abstract/poloniex.js');
var errors = require('./base/errors.js');
var Precise = require('./base/Precise.js');
var number = require('./base/functions/number.js');
var sha256 = require('./static_dependencies/noble-hashes/sha256.js');

// ----------------------------------------------------------------------------
//  ---------------------------------------------------------------------------
/**
 * @class poloniex
 * @augments Exchange
 */
class poloniex extends poloniex$1 {
    describe() {
        return this.deepExtend(super.describe(), {
            'id': 'poloniex',
            'name': 'Poloniex',
            'countries': ['US'],
            // 200 requests per second for some unauthenticated market endpoints => 1000ms / 200 = 5ms between requests
            'rateLimit': 5,
            'certified': false,
            'pro': true,
            'has': {
                'CORS': undefined,
                'spot': true,
                'margin': undefined,
                'swap': false,
                'future': false,
                'option': false,
                'cancelAllOrders': true,
                'cancelOrder': true,
                'createDepositAddress': true,
                'createMarketBuyOrderWithCost': true,
                'createMarketOrderWithCost': false,
                'createMarketSellOrderWithCost': false,
                'createOrder': true,
                'createStopOrder': true,
                'createTriggerOrder': true,
                'editOrder': true,
                'fetchBalance': true,
                'fetchClosedOrder': false,
                'fetchCurrencies': true,
                'fetchDepositAddress': true,
                'fetchDepositAddresses': false,
                'fetchDepositAddressesByNetwork': false,
                'fetchDeposits': true,
                'fetchDepositsWithdrawals': true,
                'fetchDepositWithdrawFee': 'emulated',
                'fetchDepositWithdrawFees': true,
                'fetchFundingHistory': false,
                'fetchFundingInterval': false,
                'fetchFundingIntervals': false,
                'fetchFundingRate': false,
                'fetchFundingRateHistory': false,
                'fetchFundingRates': false,
                'fetchMarginMode': false,
                'fetchMarkets': true,
                'fetchMyTrades': true,
                'fetchOHLCV': true,
                'fetchOpenInterestHistory': false,
                'fetchOpenOrder': false,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrderBook': true,
                'fetchOrderBooks': false,
                'fetchOrderTrades': true,
                'fetchPosition': false,
                'fetchPositionMode': false,
                'fetchTicker': true,
                'fetchTickers': true,
                'fetchTime': true,
                'fetchTrades': true,
                'fetchTradingFee': false,
                'fetchTradingFees': true,
                'fetchTransactions': 'emulated',
                'fetchTransfer': false,
                'fetchTransfers': false,
                'fetchWithdrawals': true,
                'sandbox': true,
                'transfer': true,
                'withdraw': true,
            },
            'timeframes': {
                '1m': 'MINUTE_1',
                '5m': 'MINUTE_5',
                '10m': 'MINUTE_10',
                '15m': 'MINUTE_15',
                '30m': 'MINUTE_30',
                '1h': 'HOUR_1',
                '2h': 'HOUR_2',
                '4h': 'HOUR_4',
                '6h': 'HOUR_6',
                '12h': 'HOUR_12',
                '1d': 'DAY_1',
                '3d': 'DAY_3',
                '1w': 'WEEK_1',
                '1M': 'MONTH_1',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766817-e9456312-5ee6-11e7-9b3c-b628ca5626a5.jpg',
                'api': {
                    'rest': 'https://api.poloniex.com',
                },
                'test': {
                    'rest': 'https://sand-spot-api-gateway.poloniex.com',
                },
                'www': 'https://www.poloniex.com',
                'doc': 'https://api-docs.poloniex.com/spot/',
                'fees': 'https://poloniex.com/fees',
                'referral': 'https://poloniex.com/signup?c=UBFZJRPJ',
            },
            'api': {
                'public': {
                    'get': {
                        'markets': 20,
                        'markets/{symbol}': 1,
                        'currencies': 20,
                        'currencies/{currency}': 20,
                        'v2/currencies': 20,
                        'v2/currencies/{currency}': 20,
                        'timestamp': 1,
                        'markets/price': 1,
                        'markets/{symbol}/price': 1,
                        'markets/markPrice': 1,
                        'markets/{symbol}/markPrice': 1,
                        'markets/{symbol}/markPriceComponents': 1,
                        'markets/{symbol}/orderBook': 1,
                        'markets/{symbol}/candles': 1,
                        'markets/{symbol}/trades': 20,
                        'markets/ticker24h': 20,
                        'markets/{symbol}/ticker24h': 20,
                        'markets/collateralInfo': 1,
                        'markets/{currency}/collateralInfo': 1,
                        'markets/borrowRatesInfo': 1,
                    },
                },
                'private': {
                    'get': {
                        'accounts': 4,
                        'accounts/balances': 4,
                        'accounts/{id}/balances': 4,
                        'accounts/activity': 20,
                        'accounts/transfer': 20,
                        'accounts/transfer/{id}': 4,
                        'feeinfo': 20,
                        'accounts/interest/history': 1,
                        'subaccounts': 4,
                        'subaccounts/balances': 20,
                        'subaccounts/{id}/balances': 4,
                        'subaccounts/transfer': 20,
                        'subaccounts/transfer/{id}': 4,
                        'wallets/addresses': 20,
                        'wallets/addresses/{currency}': 20,
                        'wallets/activity': 20,
                        'margin/accountMargin': 4,
                        'margin/borrowStatus': 4,
                        'margin/maxSize': 4,
                        'orders': 20,
                        'orders/{id}': 4,
                        'orders/killSwitchStatus': 4,
                        'smartorders': 20,
                        'smartorders/{id}': 4,
                        'orders/history': 20,
                        'smartorders/history': 20,
                        'trades': 20,
                        'orders/{id}/trades': 4,
                    },
                    'post': {
                        'accounts/transfer': 4,
                        'subaccounts/transfer': 20,
                        'wallets/address': 20,
                        'wallets/withdraw': 20,
                        'v2/wallets/withdraw': 20,
                        'orders': 4,
                        'orders/batch': 20,
                        'orders/killSwitch': 4,
                        'smartorders': 4,
                    },
                    'delete': {
                        'orders/{id}': 4,
                        'orders/cancelByIds': 20,
                        'orders': 20,
                        'smartorders/{id}': 4,
                        'smartorders/cancelByIds': 20,
                        'smartorders': 20,
                    },
                    'put': {
                        'orders/{id}': 20,
                        'smartorders/{id}': 20,
                    },
                },
            },
            'fees': {
                'trading': {
                    'feeSide': 'get',
                    // starting from Jan 8 2020
                    'maker': this.parseNumber('0.0009'),
                    'taker': this.parseNumber('0.0009'),
                },
                'funding': {},
            },
            'commonCurrencies': {
                'AIR': 'AirCoin',
                'APH': 'AphroditeCoin',
                'BCC': 'BTCtalkcoin',
                'BCHABC': 'BCHABC',
                'BDG': 'Badgercoin',
                'BTM': 'Bitmark',
                'CON': 'Coino',
                'ETHTRON': 'ETH',
                'GOLD': 'GoldEagles',
                'GPUC': 'GPU',
                'HOT': 'Hotcoin',
                'ITC': 'Information Coin',
                'KEY': 'KEYCoin',
                'MASK': 'NFTX Hashmasks Index',
                'MEME': 'Degenerator Meme',
                'PLX': 'ParallaxCoin',
                'REPV2': 'REP',
                'STR': 'XLM',
                'SOC': 'SOCC',
                'TRADE': 'Unitrade',
                'TRXETH': 'TRX',
                'XAP': 'API Coin',
                // this is not documented in the API docs for Poloniex
                // https://github.com/ccxt/ccxt/issues/7084
                // when the user calls withdraw ('USDT', amount, address, tag, params)
                // with params = { 'currencyToWithdrawAs': 'USDTTRON' }
                // or params = { 'currencyToWithdrawAs': 'USDTETH' }
                // fetchWithdrawals ('USDT') returns the corresponding withdrawals
                // with a USDTTRON or a USDTETH currency id, respectfully
                // therefore we have map them back to the original code USDT
                // otherwise the returned withdrawals are filtered out
                'USDTBSC': 'USDT',
                'USDTTRON': 'USDT',
                'USDTETH': 'USDT',
                'UST': 'USTC',
            },
            'options': {
                'createMarketBuyOrderRequiresPrice': true,
                'networks': {
                    'BEP20': 'BSC',
                    'ERC20': 'ETH',
                    'TRC20': 'TRON',
                },
                'limits': {
                    'cost': {
                        'min': {
                            'BTC': 0.0001,
                            'ETH': 0.0001,
                            'USDT': 1.0,
                            'TRX': 100,
                            'BNB': 0.06,
                            'USDC': 1.0,
                            'USDJ': 1.0,
                            'TUSD': 0.0001,
                            'DAI': 1.0,
                            'PAX': 1.0,
                            'BUSD': 1.0,
                        },
                    },
                },
                'accountsByType': {
                    'spot': 'spot',
                    'future': 'futures',
                },
                'accountsById': {
                    'exchange': 'spot',
                    'futures': 'future',
                },
            },
            'features': {
                'default': {
                    'sandbox': true,
                    'createOrder': {
                        'marginMode': true,
                        'triggerPrice': true,
                        'triggerPriceType': undefined,
                        'triggerDirection': false,
                        'stopLossPrice': false,
                        'takeProfitPrice': false,
                        'attachedStopLossTakeProfit': undefined,
                        'timeInForce': {
                            'IOC': true,
                            'FOK': true,
                            'PO': false,
                            'GTD': false,
                        },
                        'hedged': false,
                        'leverage': false,
                        'marketBuyByCost': true,
                        'marketBuyRequiresPrice': false,
                        'selfTradePrevention': true,
                        'trailing': false,
                        'iceberg': false,
                    },
                    'createOrders': undefined,
                    'fetchMyTrades': {
                        'marginMode': false,
                        'limit': 1000,
                        'daysBack': 100000,
                        'untilDays': 100000,
                        'symbolRequired': false,
                    },
                    'fetchOrder': {
                        'marginMode': false,
                        'trigger': false,
                        'trailing': false,
                        'symbolRequired': false,
                    },
                    'fetchOpenOrders': {
                        'marginMode': false,
                        'limit': 2000,
                        'trigger': false,
                        'trailing': false,
                        'symbolRequired': false,
                    },
                    'fetchOrders': undefined,
                    'fetchClosedOrders': undefined,
                    'fetchOHLCV': {
                        'limit': 500,
                    },
                },
                'spot': {
                    'extends': 'default',
                },
                'swap': {
                    'linear': undefined,
                    'inverse': undefined,
                },
                'future': {
                    'linear': undefined,
                    'inverse': undefined,
                },
            },
            'precisionMode': number.TICK_SIZE,
            'exceptions': {
                'exact': {
                    // General
                    '500': errors.ExchangeNotAvailable,
                    '603': errors.RequestTimeout,
                    '601': errors.BadRequest,
                    '415': errors.ExchangeError,
                    '602': errors.ArgumentsRequired,
                    // Accounts
                    '21604': errors.BadRequest,
                    '21600': errors.AuthenticationError,
                    '21605': errors.AuthenticationError,
                    '21102': errors.ExchangeError,
                    '21100': errors.AuthenticationError,
                    '21704': errors.AuthenticationError,
                    '21700': errors.BadRequest,
                    '21705': errors.BadRequest,
                    '21707': errors.ExchangeError,
                    '21708': errors.BadRequest,
                    '21601': errors.AccountSuspended,
                    '21711': errors.ExchangeError,
                    '21709': errors.InsufficientFunds,
                    '250000': errors.ExchangeError,
                    '250001': errors.BadRequest,
                    '250002': errors.BadRequest,
                    '250003': errors.BadRequest,
                    '250004': errors.BadRequest,
                    '250005': errors.InsufficientFunds,
                    '250008': errors.BadRequest,
                    '250012': errors.ExchangeError,
                    // Trading
                    '21110': errors.BadRequest,
                    '10040': errors.BadSymbol,
                    '10060': errors.ExchangeError,
                    '10020': errors.BadSymbol,
                    '10041': errors.BadSymbol,
                    '21340': errors.OnMaintenance,
                    '21341': errors.InvalidOrder,
                    '21342': errors.InvalidOrder,
                    '21343': errors.InvalidOrder,
                    '21351': errors.AccountSuspended,
                    '21352': errors.BadSymbol,
                    '21353': errors.PermissionDenied,
                    '21354': errors.PermissionDenied,
                    '21359': errors.OrderNotFound,
                    '21360': errors.InvalidOrder,
                    '24106': errors.BadRequest,
                    '24201': errors.ExchangeNotAvailable,
                    // Orders
                    '21301': errors.OrderNotFound,
                    '21302': errors.ExchangeError,
                    '21304': errors.ExchangeError,
                    '21305': errors.OrderNotFound,
                    '21307': errors.ExchangeError,
                    '21309': errors.InvalidOrder,
                    '21310': errors.InvalidOrder,
                    '21311': errors.InvalidOrder,
                    '21312': errors.InvalidOrder,
                    '21314': errors.InvalidOrder,
                    '21315': errors.InvalidOrder,
                    '21317': errors.InvalidOrder,
                    '21319': errors.InvalidOrder,
                    '21320': errors.InvalidOrder,
                    '21321': errors.InvalidOrder,
                    '21322': errors.InvalidOrder,
                    '21324': errors.BadRequest,
                    '21327': errors.InvalidOrder,
                    '21328': errors.InvalidOrder,
                    '21330': errors.InvalidOrder,
                    '21335': errors.InvalidOrder,
                    '21336': errors.InvalidOrder,
                    '21337': errors.InvalidOrder,
                    '21344': errors.InvalidOrder,
                    '21345': errors.InvalidOrder,
                    '21346': errors.InvalidOrder,
                    '21348': errors.InvalidOrder,
                    '21347': errors.InvalidOrder,
                    '21349': errors.InvalidOrder,
                    '21350': errors.InvalidOrder,
                    '21355': errors.ExchangeError,
                    '21356': errors.BadRequest,
                    '21721': errors.InsufficientFunds,
                    '24101': errors.BadSymbol,
                    '24102': errors.InvalidOrder,
                    '24103': errors.InvalidOrder,
                    '24104': errors.InvalidOrder,
                    '24105': errors.InvalidOrder,
                    '25020': errors.InvalidOrder,
                    // Smartorders
                    '25000': errors.InvalidOrder,
                    '25001': errors.InvalidOrder,
                    '25002': errors.InvalidOrder,
                    '25003': errors.ExchangeError,
                    '25004': errors.InvalidOrder,
                    '25005': errors.ExchangeError,
                    '25006': errors.InvalidOrder,
                    '25007': errors.InvalidOrder,
                    '25008': errors.InvalidOrder,
                    '25009': errors.ExchangeError,
                    '25010': errors.PermissionDenied,
                    '25011': errors.InvalidOrder,
                    '25012': errors.ExchangeError,
                    '25013': errors.OrderNotFound,
                    '25014': errors.OrderNotFound,
                    '25015': errors.OrderNotFound,
                    '25016': errors.ExchangeError,
                    '25017': errors.ExchangeError,
                    '25018': errors.BadRequest,
                    '25019': errors.BadSymbol, // Invalid symbol
                },
                'broad': {},
            },
        });
    }
    parseOHLCV(ohlcv, market = undefined) {
        //
        //     [
        //         [
        //             "22814.01",
        //             "22937.42",
        //             "22832.57",
        //             "22937.42",
        //             "3916.58764051",
        //             "0.171199",
        //             "2982.64647063",
        //             "0.130295",
        //             33,
        //             0,
        //             "22877.449915304470460711",
        //             "MINUTE_5",
        //             1659664800000,
        //             1659665099999
        //         ]
        //     ]
        //
        return [
            this.safeInteger(ohlcv, 12),
            this.safeNumber(ohlcv, 2),
            this.safeNumber(ohlcv, 1),
            this.safeNumber(ohlcv, 0),
            this.safeNumber(ohlcv, 3),
            this.safeNumber(ohlcv, 5),
        ];
    }
    /**
     * @method
     * @name poloniex#fetchOHLCV
     * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
     * @see https://api-docs.poloniex.com/spot/api/public/market-data#candles
     * @param {string} symbol unified symbol of the market to fetch OHLCV data for
     * @param {string} timeframe the length of time each candle represents
     * @param {int} [since] timestamp in ms of the earliest candle to fetch
     * @param {int} [limit] the maximum amount of candles to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] timestamp in ms
     * @param {boolean} [params.paginate] default false, when true will automatically paginate by calling this endpoint multiple times. See in the docs all the [availble parameters](https://github.com/ccxt/ccxt/wiki/Manual#pagination-params)
     * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
     */
    async fetchOHLCV(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let paginate = false;
        [paginate, params] = this.handleOptionAndParams(params, 'fetchOHLCV', 'paginate', false);
        if (paginate) {
            return await this.fetchPaginatedCallDeterministic('fetchOHLCV', symbol, since, limit, timeframe, params, 500);
        }
        const market = this.market(symbol);
        let request = {
            'symbol': market['id'],
            'interval': this.safeString(this.timeframes, timeframe, timeframe),
        };
        if (since !== undefined) {
            request['startTime'] = since;
        }
        if (limit !== undefined) {
            // limit should in between 100 and 500
            request['limit'] = limit;
        }
        [request, params] = this.handleUntilOption('endTime', request, params);
        const response = await this.publicGetMarketsSymbolCandles(this.extend(request, params));
        //
        //     [
        //         [
        //             "22814.01",
        //             "22937.42",
        //             "22832.57",
        //             "22937.42",
        //             "3916.58764051",
        //             "0.171199",
        //             "2982.64647063",
        //             "0.130295",
        //             33,
        //             0,
        //             "22877.449915304470460711",
        //             "MINUTE_5",
        //             1659664800000,
        //             1659665099999
        //         ]
        //     ]
        //
        return this.parseOHLCVs(response, market, timeframe, since, limit);
    }
    async loadMarkets(reload = false, params = {}) {
        const markets = await super.loadMarkets(reload, params);
        const currenciesByNumericId = this.safeValue(this.options, 'currenciesByNumericId');
        if ((currenciesByNumericId === undefined) || reload) {
            this.options['currenciesByNumericId'] = this.indexBy(this.currencies, 'numericId');
        }
        return markets;
    }
    /**
     * @method
     * @name poloniex#fetchMarkets
     * @description retrieves data on all markets for poloniex
     * @see https://api-docs.poloniex.com/spot/api/public/reference-data#symbol-information
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} an array of objects representing market data
     */
    async fetchMarkets(params = {}) {
        const markets = await this.publicGetMarkets(params);
        //
        //     [
        //         {
        //             "symbol" : "BTS_BTC",
        //             "baseCurrencyName" : "BTS",
        //             "quoteCurrencyName" : "BTC",
        //             "displayName" : "BTS/BTC",
        //             "state" : "NORMAL",
        //             "visibleStartTime" : 1659018816626,
        //             "tradableStartTime" : 1659018816626,
        //             "symbolTradeLimit" : {
        //                 "symbol" : "BTS_BTC",
        //                 "priceScale" : 10,
        //                 "quantityScale" : 0,
        //                 "amountScale" : 8,
        //                 "minQuantity" : "100",
        //                 "minAmount" : "0.00001",
        //                 "highestBid" : "0",
        //                 "lowestAsk" : "0"
        //             }
        //         }
        //     ]
        //
        return this.parseMarkets(markets);
    }
    parseMarket(market) {
        const id = this.safeString(market, 'symbol');
        const baseId = this.safeString(market, 'baseCurrencyName');
        const quoteId = this.safeString(market, 'quoteCurrencyName');
        const base = this.safeCurrencyCode(baseId);
        const quote = this.safeCurrencyCode(quoteId);
        const state = this.safeString(market, 'state');
        const active = state === 'NORMAL';
        const symbolTradeLimit = this.safeValue(market, 'symbolTradeLimit');
        // these are known defaults
        return {
            'id': id,
            'symbol': base + '/' + quote,
            'base': base,
            'quote': quote,
            'settle': undefined,
            'baseId': baseId,
            'quoteId': quoteId,
            'settleId': undefined,
            'type': 'spot',
            'spot': true,
            'margin': false,
            'swap': false,
            'future': false,
            'option': false,
            'active': active,
            'contract': false,
            'linear': undefined,
            'inverse': undefined,
            'contractSize': undefined,
            'expiry': undefined,
            'expiryDatetime': undefined,
            'strike': undefined,
            'optionType': undefined,
            'precision': {
                'amount': this.parseNumber(this.parsePrecision(this.safeString(symbolTradeLimit, 'quantityScale'))),
                'price': this.parseNumber(this.parsePrecision(this.safeString(symbolTradeLimit, 'priceScale'))),
            },
            'limits': {
                'amount': {
                    'min': this.safeNumber(symbolTradeLimit, 'minQuantity'),
                    'max': undefined,
                },
                'price': {
                    'min': undefined,
                    'max': undefined,
                },
                'cost': {
                    'min': this.safeNumber(symbolTradeLimit, 'minAmount'),
                    'max': undefined,
                },
            },
            'created': this.safeInteger(market, 'tradableStartTime'),
            'info': market,
        };
    }
    /**
     * @method
     * @name poloniex#fetchTime
     * @description fetches the current integer timestamp in milliseconds from the exchange server
     * @see https://api-docs.poloniex.com/spot/api/public/reference-data#system-timestamp
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {int} the current integer timestamp in milliseconds from the exchange server
     */
    async fetchTime(params = {}) {
        const response = await this.publicGetTimestamp(params);
        return this.safeInteger(response, 'serverTime');
    }
    parseTicker(ticker, market = undefined) {
        //
        //     {
        //         "symbol" : "BTC_USDT",
        //         "open" : "26053.33",
        //         "low" : "26053.33",
        //         "high" : "26798.02",
        //         "close" : "26447.58",
        //         "quantity" : "6116.210188",
        //         "amount" : "161082122.88450926",
        //         "tradeCount" : "134709",
        //         "startTime" : "1692784440000",
        //         "closeTime" : "1692870839630",
        //         "displayName" : "BTC/USDT",
        //         "dailyChange" : "0.0151",
        //         "bid" : "26447.57",
        //         "bidQuantity" : "0.016313",
        //         "ask" : "26447.58",
        //         "askQuantity" : "0.068307",
        //         "ts" : "1692870845446",
        //         "markPrice" : "26444.11"
        //     }
        //
        const timestamp = this.safeInteger(ticker, 'ts');
        const marketId = this.safeString(ticker, 'symbol');
        market = this.safeMarket(marketId);
        const close = this.safeString(ticker, 'close');
        const relativeChange = this.safeString(ticker, 'dailyChange');
        const percentage = Precise["default"].stringMul(relativeChange, '100');
        const bidVolume = this.safeString(ticker, 'bidQuantity');
        const askVolume = this.safeString(ticker, 'askQuantity');
        return this.safeTicker({
            'id': marketId,
            'symbol': market['symbol'],
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': this.safeString(ticker, 'high'),
            'low': this.safeString(ticker, 'low'),
            'bid': this.safeString(ticker, 'bid'),
            'bidVolume': bidVolume,
            'ask': this.safeString(ticker, 'ask'),
            'askVolume': askVolume,
            'vwap': undefined,
            'open': this.safeString(ticker, 'open'),
            'close': close,
            'last': close,
            'previousClose': undefined,
            'change': undefined,
            'percentage': percentage,
            'average': undefined,
            'baseVolume': this.safeString(ticker, 'quantity'),
            'quoteVolume': this.safeString(ticker, 'amount'),
            'markPrice': this.safeString(ticker, 'markPrice'),
            'info': ticker,
        }, market);
    }
    /**
     * @method
     * @name poloniex#fetchTickers
     * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
     * @see https://api-docs.poloniex.com/spot/api/public/market-data#ticker
     * @param {string[]|undefined} symbols unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    async fetchTickers(symbols = undefined, params = {}) {
        await this.loadMarkets();
        symbols = this.marketSymbols(symbols);
        const response = await this.publicGetMarketsTicker24h(params);
        //
        //     [
        //         {
        //              "symbol" : "BTC_USDT",
        //              "open" : "26053.33",
        //              "low" : "26053.33",
        //              "high" : "26798.02",
        //              "close" : "26447.58",
        //              "quantity" : "6116.210188",
        //              "amount" : "161082122.88450926",
        //              "tradeCount" : "134709",
        //              "startTime" : "1692784440000",
        //              "closeTime" : "1692870839630",
        //              "displayName" : "BTC/USDT",
        //              "dailyChange" : "0.0151",
        //              "bid" : "26447.57",
        //              "bidQuantity" : "0.016313",
        //              "ask" : "26447.58",
        //              "askQuantity" : "0.068307",
        //              "ts" : "1692870845446",
        //              "markPrice" : "26444.11"
        //         }
        //     ]
        //
        return this.parseTickers(response, symbols);
    }
    /**
     * @method
     * @name poloniex#fetchCurrencies
     * @description fetches all available currencies on an exchange
     * @see https://api-docs.poloniex.com/spot/api/public/reference-data#currency-information
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an associative dictionary of currencies
     */
    async fetchCurrencies(params = {}) {
        const response = await this.publicGetCurrencies(this.extend(params, { 'includeMultiChainCurrencies': true }));
        //
        //     [
        //         {
        //             "1CR": {
        //                 "id": 1,
        //                 "name": "1CRedit",
        //                 "description": "BTC Clone",
        //                 "type": "address",
        //                 "withdrawalFee": "0.01000000",
        //                 "minConf": 10000,
        //                 "depositAddress": null,
        //                 "blockchain": "1CR",
        //                 "delisted": false,
        //                 "tradingState": "NORMAL",
        //                 "walletState": "DISABLED",
        //                 "walletDepositState": "DISABLED",
        //                 "walletWithdrawalState": "DISABLED",
        //                 "parentChain": null,
        //                 "isMultiChain": false,
        //                 "isChildChain": false,
        //                 "childChains": []
        //             }
        //         }
        //     ]
        //
        const result = {};
        for (let i = 0; i < response.length; i++) {
            const item = this.safeValue(response, i);
            const ids = Object.keys(item);
            const id = this.safeValue(ids, 0);
            const currency = this.safeValue(item, id);
            const code = this.safeCurrencyCode(id);
            const name = this.safeString(currency, 'name');
            const networkId = this.safeString(currency, 'blockchain');
            let networkCode = undefined;
            if (networkId !== undefined) {
                networkCode = this.networkIdToCode(networkId, code);
            }
            const delisted = this.safeValue(currency, 'delisted');
            const walletEnabled = this.safeString(currency, 'walletState') === 'ENABLED';
            const depositEnabled = this.safeString(currency, 'walletDepositState') === 'ENABLED';
            const withdrawEnabled = this.safeString(currency, 'walletWithdrawalState') === 'ENABLED';
            const active = !delisted && walletEnabled && depositEnabled && withdrawEnabled;
            const numericId = this.safeInteger(currency, 'id');
            const feeString = this.safeString(currency, 'withdrawalFee');
            const parentChain = this.safeValue(currency, 'parentChain');
            const noParentChain = parentChain === undefined;
            if (this.safeValue(result, code) === undefined) {
                result[code] = {
                    'id': id,
                    'code': code,
                    'info': undefined,
                    'name': name,
                    'active': active,
                    'deposit': depositEnabled,
                    'withdraw': withdrawEnabled,
                    'fee': this.parseNumber(feeString),
                    'precision': undefined,
                    'limits': {
                        'amount': {
                            'min': undefined,
                            'max': undefined,
                        },
                        'deposit': {
                            'min': undefined,
                            'max': undefined,
                        },
                        'withdraw': {
                            'min': undefined,
                            'max': undefined,
                        },
                    },
                };
            }
            let minFeeString = this.safeString(result[code], 'fee');
            if (feeString !== undefined) {
                minFeeString = (minFeeString === undefined) ? feeString : Precise["default"].stringMin(feeString, minFeeString);
            }
            let depositAvailable = this.safeValue(result[code], 'deposit');
            depositAvailable = (depositEnabled) ? depositEnabled : depositAvailable;
            let withdrawAvailable = this.safeValue(result[code], 'withdraw');
            withdrawAvailable = (withdrawEnabled) ? withdrawEnabled : withdrawAvailable;
            const networks = this.safeValue(result[code], 'networks', {});
            if (networkCode !== undefined) {
                networks[networkCode] = {
                    'info': currency,
                    'id': networkId,
                    'network': networkCode,
                    'currencyId': id,
                    'numericId': numericId,
                    'deposit': depositEnabled,
                    'withdraw': withdrawEnabled,
                    'active': active,
                    'fee': this.parseNumber(feeString),
                    'precision': undefined,
                    'limits': {
                        'amount': {
                            'min': undefined,
                            'max': undefined,
                        },
                        'withdraw': {
                            'min': undefined,
                            'max': undefined,
                        },
                        'deposit': {
                            'min': undefined,
                            'max': undefined,
                        },
                    },
                };
            }
            result[code]['networks'] = networks;
            const info = this.safeValue(result[code], 'info', []);
            const rawInfo = {};
            rawInfo[id] = currency;
            info.push(rawInfo);
            result[code]['info'] = info;
            if (noParentChain) {
                result[code]['id'] = id;
                result[code]['name'] = name;
            }
            result[code]['active'] = depositAvailable && withdrawAvailable;
            result[code]['deposit'] = depositAvailable;
            result[code]['withdraw'] = withdrawAvailable;
            result[code]['fee'] = this.parseNumber(minFeeString);
        }
        return result;
    }
    /**
     * @method
     * @name poloniex#fetchTicker
     * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
     * @see https://api-docs.poloniex.com/spot/api/public/market-data#ticker
     * @param {string} symbol unified symbol of the market to fetch the ticker for
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    async fetchTicker(symbol, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        const response = await this.publicGetMarketsSymbolTicker24h(this.extend(request, params));
        //
        //     {
        //         "symbol" : "BTC_USDT",
        //         "open" : "26053.33",
        //         "low" : "26053.33",
        //         "high" : "26798.02",
        //         "close" : "26447.58",
        //         "quantity" : "6116.210188",
        //         "amount" : "161082122.88450926",
        //         "tradeCount" : "134709",
        //         "startTime" : "1692784440000",
        //         "closeTime" : "1692870839630",
        //         "displayName" : "BTC/USDT",
        //         "dailyChange" : "0.0151",
        //         "bid" : "26447.57",
        //         "bidQuantity" : "0.016313",
        //         "ask" : "26447.58",
        //         "askQuantity" : "0.068307",
        //         "ts" : "1692870845446",
        //         "markPrice" : "26444.11"
        //     }
        //
        return this.parseTicker(response, market);
    }
    parseTrade(trade, market = undefined) {
        //
        // fetchTrades
        //
        //     {
        //         "id" : "60014521",
        //         "price" : "23162.94",
        //         "quantity" : "0.00009",
        //         "amount" : "2.0846646",
        //         "takerSide" : "SELL",
        //         "ts" : 1659684602042,
        //         "createTime" : 1659684602036
        //     }
        //
        // fetchMyTrades
        //
        //     {
        //         "id": "32164924331503616",
        //         "symbol": "LINK_USDT",
        //         "accountType": "SPOT",
        //         "orderId": "32164923987566592",
        //         "side": "SELL",
        //         "type": "MARKET",
        //         "matchRole": "TAKER",
        //         "createTime": 1648635115525,
        //         "price": "11",
        //         "quantity": "0.5",
        //         "amount": "5.5",
        //         "feeCurrency": "USDT",
        //         "feeAmount": "0.007975",
        //         "pageId": "32164924331503616",
        //         "clientOrderId": "myOwnId-321"
        //     }
        //
        // fetchOrderTrades (taker trades)
        //
        //     {
        //         "id": "30341456333942784",
        //         "symbol": "LINK_USDT",
        //         "accountType": "SPOT",
        //         "orderId": "30249408733945856",
        //         "side": "BUY",
        //         "type": "LIMIT",
        //         "matchRole": "MAKER",
        //         "createTime": 1648200366864,
        //         "price": "3.1",
        //         "quantity": "1",
        //         "amount": "3.1",
        //         "feeCurrency": "LINK",
        //         "feeAmount": "0.00145",
        //         "pageId": "30341456333942784",
        //         "clientOrderId": ""
        //     }
        //
        //
        const id = this.safeString2(trade, 'id', 'tradeID');
        const orderId = this.safeString(trade, 'orderId');
        const timestamp = this.safeInteger2(trade, 'ts', 'createTime');
        const marketId = this.safeString(trade, 'symbol');
        market = this.safeMarket(marketId, market, '_');
        const symbol = market['symbol'];
        const side = this.safeStringLower2(trade, 'side', 'takerSide');
        let fee = undefined;
        const priceString = this.safeString(trade, 'price');
        const amountString = this.safeString(trade, 'quantity');
        const costString = this.safeString(trade, 'amount');
        const feeCurrencyId = this.safeString(trade, 'feeCurrency');
        const feeCostString = this.safeString(trade, 'feeAmount');
        if (feeCostString !== undefined) {
            const feeCurrencyCode = this.safeCurrencyCode(feeCurrencyId);
            fee = {
                'cost': feeCostString,
                'currency': feeCurrencyCode,
            };
        }
        return this.safeTrade({
            'id': id,
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'order': orderId,
            'type': this.safeStringLower(trade, 'type'),
            'side': side,
            'takerOrMaker': this.safeStringLower(trade, 'matchRole'),
            'price': priceString,
            'amount': amountString,
            'cost': costString,
            'fee': fee,
        }, market);
    }
    /**
     * @method
     * @name poloniex#fetchTrades
     * @description get the list of most recent trades for a particular symbol
     * @see https://api-docs.poloniex.com/spot/api/public/market-data#trades
     * @param {string} symbol unified symbol of the market to fetch trades for
     * @param {int} [since] timestamp in ms of the earliest trade to fetch
     * @param {int} [limit] the maximum amount of trades to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
     */
    async fetchTrades(symbol, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const trades = await this.publicGetMarketsSymbolTrades(this.extend(request, params));
        //
        //     [
        //         {
        //             "id" : "60014521",
        //             "price" : "23162.94",
        //             "quantity" : "0.00009",
        //             "amount" : "2.0846646",
        //             "takerSide" : "SELL",
        //             "ts" : 1659684602042,
        //             "createTime" : 1659684602036
        //         }
        //     ]
        //
        return this.parseTrades(trades, market, since, limit);
    }
    /**
     * @method
     * @name poloniex#fetchMyTrades
     * @description fetch all trades made by the user
     * @see https://api-docs.poloniex.com/spot/api/private/trade#trade-history
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch trades for
     * @param {int} [limit] the maximum number of trades structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] the latest time in ms to fetch entries for
     * @param {boolean} [params.paginate] default false, when true will automatically paginate by calling this endpoint multiple times. See in the docs all the [availble parameters](https://github.com/ccxt/ccxt/wiki/Manual#pagination-params)
     * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
     */
    async fetchMyTrades(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let paginate = false;
        [paginate, params] = this.handleOptionAndParams(params, 'fetchMyTrades', 'paginate');
        if (paginate) {
            return await this.fetchPaginatedCallDynamic('fetchMyTrades', symbol, since, limit, params);
        }
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
        }
        let request = {
        // 'from': 12345678, // A 'trade Id'. The query begins at ‘from'.
        // 'direction': 'PRE', // PRE, NEXT The direction before or after ‘from'.
        };
        if (since !== undefined) {
            request['startTime'] = since;
        }
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        [request, params] = this.handleUntilOption('endTime', request, params);
        const response = await this.privateGetTrades(this.extend(request, params));
        //
        //     [
        //         {
        //             "id": "32164924331503616",
        //             "symbol": "LINK_USDT",
        //             "accountType": "SPOT",
        //             "orderId": "32164923987566592",
        //             "side": "SELL",
        //             "type": "MARKET",
        //             "matchRole": "TAKER",
        //             "createTime": 1648635115525,
        //             "price": "11",
        //             "quantity": "0.5",
        //             "amount": "5.5",
        //             "feeCurrency": "USDT",
        //             "feeAmount": "0.007975",
        //             "pageId": "32164924331503616",
        //             "clientOrderId": "myOwnId-321"
        //         }
        //     ]
        //
        const result = this.parseTrades(response, market, since, limit);
        return result;
    }
    parseOrderStatus(status) {
        const statuses = {
            'NEW': 'open',
            'PARTIALLY_FILLED': 'open',
            'FILLED': 'closed',
            'PENDING_CANCEL': 'canceled',
            'PARTIALLY_CANCELED': 'canceled',
            'CANCELED': 'canceled',
            'FAILED': 'canceled',
        };
        return this.safeString(statuses, status, status);
    }
    parseOrder(order, market = undefined) {
        //
        // fetchOpenOrder
        //
        //     {
        //         "id" : "7xxxxxxxxxxxxxxx6",
        //         "clientOrderId" : "",
        //         "symbol" : "ETH_USDT",
        //         "state" : "NEW",
        //         "accountType" : "SPOT",
        //         "side" : "BUY",
        //         "type" : "LIMIT",
        //         "timeInForce" : "GTC",
        //         "quantity" : "0.001",
        //         "price" : "1600",
        //         "avgPrice" : "0",
        //         "amount" : "0",
        //         "filledQuantity" : "0",
        //         "filledAmount" : "0",
        //         "createTime" : 16xxxxxxxxx26,
        //         "updateTime" : 16xxxxxxxxx36
        //     }
        //
        // fetchOpenOrders
        //
        //     {
        //         "id": "24993088082542592",
        //         "clientOrderId": "",
        //         "symbol": "ELON_USDC",
        //         "state": "NEW",
        //         "accountType": "SPOT",
        //         "side": "SELL",
        //         "type": "MARKET",
        //         "timeInForce": "GTC",
        //         "quantity": "1.00",
        //         "price": "0.00",
        //         "avgPrice": "0.00",
        //         "amount": "0.00",
        //         "filledQuantity": "0.00",
        //         "filledAmount": "0.00",
        //         "createTime": 1646925216548,
        //         "updateTime": 1646925216548
        //     }
        //
        // createOrder, editOrder
        //
        //     {
        //         "id": "29772698821328896",
        //         "clientOrderId": "1234Abc"
        //     }
        //
        let timestamp = this.safeInteger2(order, 'timestamp', 'createTime');
        if (timestamp === undefined) {
            timestamp = this.parse8601(this.safeString(order, 'date'));
        }
        const marketId = this.safeString(order, 'symbol');
        market = this.safeMarket(marketId, market, '_');
        const symbol = market['symbol'];
        let resultingTrades = this.safeValue(order, 'resultingTrades');
        if (resultingTrades !== undefined) {
            if (!Array.isArray(resultingTrades)) {
                resultingTrades = this.safeValue(resultingTrades, this.safeString(market, 'id', marketId));
            }
        }
        const price = this.safeString2(order, 'price', 'rate');
        const amount = this.safeString(order, 'quantity');
        const filled = this.safeString(order, 'filledQuantity');
        const status = this.parseOrderStatus(this.safeString(order, 'state'));
        const side = this.safeStringLower(order, 'side');
        const rawType = this.safeString(order, 'type');
        const type = this.parseOrderType(rawType);
        const id = this.safeStringN(order, ['orderNumber', 'id', 'orderId']);
        let fee = undefined;
        const feeCurrency = this.safeString(order, 'tokenFeeCurrency');
        let feeCost = undefined;
        let feeCurrencyCode = undefined;
        const rate = this.safeString(order, 'fee');
        if (feeCurrency === undefined) {
            feeCurrencyCode = (side === 'buy') ? market['base'] : market['quote'];
        }
        else {
            // poloniex accepts a 30% discount to pay fees in TRX
            feeCurrencyCode = this.safeCurrencyCode(feeCurrency);
            feeCost = this.safeString(order, 'tokenFee');
        }
        if (feeCost !== undefined) {
            fee = {
                'rate': rate,
                'cost': feeCost,
                'currency': feeCurrencyCode,
            };
        }
        const clientOrderId = this.safeString(order, 'clientOrderId');
        return this.safeOrder({
            'info': order,
            'id': id,
            'clientOrderId': clientOrderId,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'lastTradeTimestamp': this.safeInteger(order, 'updateTime'),
            'status': status,
            'symbol': symbol,
            'type': type,
            'timeInForce': this.safeString(order, 'timeInForce'),
            'postOnly': undefined,
            'side': side,
            'price': price,
            'triggerPrice': this.safeString2(order, 'triggerPrice', 'stopPrice'),
            'cost': undefined,
            'average': this.safeString(order, 'avgPrice'),
            'amount': amount,
            'filled': filled,
            'remaining': undefined,
            'trades': resultingTrades,
            'fee': fee,
        }, market);
    }
    parseOrderType(status) {
        const statuses = {
            'MARKET': 'market',
            'LIMIT': 'limit',
            'STOP-LIMIT': 'limit',
            'STOP-MARKET': 'market',
        };
        return this.safeString(statuses, status, status);
    }
    parseOpenOrders(orders, market, result) {
        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            const extended = this.extend(order, {
                'status': 'open',
                'type': 'limit',
                'side': order['type'],
                'price': order['rate'],
            });
            result.push(this.parseOrder(extended, market));
        }
        return result;
    }
    /**
     * @method
     * @name poloniex#fetchOpenOrders
     * @description fetch all unfilled currently open orders
     * @see https://api-docs.poloniex.com/spot/api/private/order#open-orders
     * @see https://api-docs.poloniex.com/spot/api/private/smart-order#open-orders  // trigger orders
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch open orders for
     * @param {int} [limit] the maximum number of  open orders structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {boolean} [params.trigger] set true to fetch trigger orders instead of regular orders
     * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchOpenOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let market = undefined;
        const request = {};
        if (symbol !== undefined) {
            market = this.market(symbol);
            request['symbol'] = market['id'];
        }
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const isTrigger = this.safeValue2(params, 'trigger', 'stop');
        params = this.omit(params, ['trigger', 'stop']);
        let response = undefined;
        if (isTrigger) {
            response = await this.privateGetSmartorders(this.extend(request, params));
        }
        else {
            response = await this.privateGetOrders(this.extend(request, params));
        }
        //
        //     [
        //         {
        //             "id" : "7xxxxxxxxxxxxxxx6",
        //             "clientOrderId" : "",
        //             "symbol" : "ETH_USDT",
        //             "state" : "NEW",
        //             "accountType" : "SPOT",
        //             "side" : "BUY",
        //             "type" : "LIMIT",
        //             "timeInForce" : "GTC",
        //             "quantity" : "0.001",
        //             "price" : "1600",
        //             "avgPrice" : "0",
        //             "amount" : "0",
        //             "filledQuantity" : "0",
        //             "filledAmount" : "0",
        //             "stopPrice": "3750.00",              // for trigger orders
        //             "createTime" : 16xxxxxxxxx26,
        //             "updateTime" : 16xxxxxxxxx36
        //         }
        //     ]
        //
        const extension = { 'status': 'open' };
        return this.parseOrders(response, market, since, limit, extension);
    }
    /**
     * @method
     * @name poloniex#createOrder
     * @description create a trade order
     * @see https://api-docs.poloniex.com/spot/api/private/order#create-order
     * @see https://api-docs.poloniex.com/spot/api/private/smart-order#create-order  // trigger orders
     * @param {string} symbol unified symbol of the market to create an order in
     * @param {string} type 'market' or 'limit'
     * @param {string} side 'buy' or 'sell'
     * @param {float} amount how much of currency you want to trade in units of base currency
     * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {float} [params.triggerPrice] the price at which a trigger order is triggered at
     * @param {float} [params.cost] *spot market buy only* the quote quantity that can be used as an alternative for the amount
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createOrder(symbol, type, side, amount, price = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        if (!market['spot']) {
            throw new errors.NotSupported(this.id + ' createOrder() does not support ' + market['type'] + ' orders, only spot orders are accepted');
        }
        let request = {
            'symbol': market['id'],
            'side': side,
            // 'timeInForce': timeInForce,
            // 'accountType': 'SPOT',
            // 'amount': amount,
        };
        const triggerPrice = this.safeNumber2(params, 'stopPrice', 'triggerPrice');
        [request, params] = this.orderRequest(symbol, type, side, amount, request, price, params);
        let response = undefined;
        if (triggerPrice !== undefined) {
            response = await this.privatePostSmartorders(this.extend(request, params));
        }
        else {
            response = await this.privatePostOrders(this.extend(request, params));
        }
        //
        //     {
        //         "id" : "78923648051920896",
        //         "clientOrderId" : ""
        //     }
        //
        response = this.extend(response, {
            'type': type,
            'side': side,
        });
        return this.parseOrder(response, market);
    }
    orderRequest(symbol, type, side, amount, request, price = undefined, params = {}) {
        let upperCaseType = type.toUpperCase();
        const isMarket = upperCaseType === 'MARKET';
        const isPostOnly = this.isPostOnly(isMarket, upperCaseType === 'LIMIT_MAKER', params);
        const triggerPrice = this.safeNumber2(params, 'stopPrice', 'triggerPrice');
        params = this.omit(params, ['postOnly', 'triggerPrice', 'stopPrice']);
        if (triggerPrice !== undefined) {
            upperCaseType = (price === undefined) ? 'STOP' : 'STOP_LIMIT';
            request['stopPrice'] = triggerPrice;
        }
        else if (isPostOnly) {
            upperCaseType = 'LIMIT_MAKER';
        }
        request['type'] = upperCaseType;
        if (isMarket) {
            if (side === 'buy') {
                let quoteAmount = undefined;
                let createMarketBuyOrderRequiresPrice = true;
                [createMarketBuyOrderRequiresPrice, params] = this.handleOptionAndParams(params, 'createOrder', 'createMarketBuyOrderRequiresPrice', true);
                const cost = this.safeNumber(params, 'cost');
                params = this.omit(params, 'cost');
                if (cost !== undefined) {
                    quoteAmount = this.costToPrecision(symbol, cost);
                }
                else if (createMarketBuyOrderRequiresPrice) {
                    if (price === undefined) {
                        throw new errors.InvalidOrder(this.id + ' createOrder() requires the price argument for market buy orders to calculate the total cost to spend (amount * price), alternatively set the createMarketBuyOrderRequiresPrice option or param to false and pass the cost to spend (quote quantity) in the amount argument');
                    }
                    else {
                        const amountString = this.numberToString(amount);
                        const priceString = this.numberToString(price);
                        const costRequest = Precise["default"].stringMul(amountString, priceString);
                        quoteAmount = this.costToPrecision(symbol, costRequest);
                    }
                }
                else {
                    quoteAmount = this.costToPrecision(symbol, amount);
                }
                request['amount'] = quoteAmount;
            }
            else {
                request['quantity'] = this.amountToPrecision(symbol, amount);
            }
        }
        else {
            request['quantity'] = this.amountToPrecision(symbol, amount);
            request['price'] = this.priceToPrecision(symbol, price);
        }
        const clientOrderId = this.safeString(params, 'clientOrderId');
        if (clientOrderId !== undefined) {
            request['clientOrderId'] = clientOrderId;
            params = this.omit(params, 'clientOrderId');
        }
        // remember the timestamp before issuing the request
        return [request, params];
    }
    /**
     * @method
     * @name poloniex#editOrder
     * @description edit a trade order
     * @see https://api-docs.poloniex.com/spot/api/private/order#cancel-replace-order
     * @see https://api-docs.poloniex.com/spot/api/private/smart-order#cancel-replace-order
     * @param {string} id order id
     * @param {string} symbol unified symbol of the market to create an order in
     * @param {string} type 'market' or 'limit'
     * @param {string} side 'buy' or 'sell'
     * @param {float} [amount] how much of the currency you want to trade in units of the base currency
     * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {float} [params.triggerPrice] The price at which a trigger order is triggered at
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async editOrder(id, symbol, type, side, amount = undefined, price = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        if (!market['spot']) {
            throw new errors.NotSupported(this.id + ' editOrder() does not support ' + market['type'] + ' orders, only spot orders are accepted');
        }
        let request = {
            'id': id,
            // 'timeInForce': timeInForce,
        };
        const triggerPrice = this.safeNumber2(params, 'stopPrice', 'triggerPrice');
        [request, params] = this.orderRequest(symbol, type, side, amount, request, price, params);
        let response = undefined;
        if (triggerPrice !== undefined) {
            response = await this.privatePutSmartordersId(this.extend(request, params));
        }
        else {
            response = await this.privatePutOrdersId(this.extend(request, params));
        }
        //
        //     {
        //         "id" : "78923648051920896",
        //         "clientOrderId" : ""
        //     }
        //
        response = this.extend(response, {
            'side': side,
            'type': type,
        });
        return this.parseOrder(response, market);
    }
    async cancelOrder(id, symbol = undefined, params = {}) {
        //
        // @method
        // @name poloniex#cancelOrder
        // @description cancels an open order
        // @see https://api-docs.poloniex.com/spot/api/private/order#cancel-order-by-id
        // @see https://api-docs.poloniex.com/spot/api/private/smart-order#cancel-order-by-id  // trigger orders
        // @param {string} id order id
        // @param {string} symbol unified symbol of the market the order was made in
        // @param {object} [params] extra parameters specific to the exchange API endpoint
        // @param {boolean} [params.trigger] true if canceling a trigger order
        // @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
        //
        await this.loadMarkets();
        const request = {};
        const clientOrderId = this.safeValue(params, 'clientOrderId');
        if (clientOrderId !== undefined) {
            id = clientOrderId;
        }
        request['id'] = id;
        const isTrigger = this.safeValue2(params, 'trigger', 'stop');
        params = this.omit(params, ['clientOrderId', 'trigger', 'stop']);
        let response = undefined;
        if (isTrigger) {
            response = await this.privateDeleteSmartordersId(this.extend(request, params));
        }
        else {
            response = await this.privateDeleteOrdersId(this.extend(request, params));
        }
        //
        //   {
        //       "orderId":"210832697138888704",
        //       "clientOrderId":"",
        //       "state":"PENDING_CANCEL",
        //       "code":200,
        //       "message":""
        //   }
        //
        return this.parseOrder(response);
    }
    /**
     * @method
     * @name poloniex#cancelAllOrders
     * @description cancel all open orders
     * @see https://api-docs.poloniex.com/spot/api/private/order#cancel-all-orders
     * @see https://api-docs.poloniex.com/spot/api/private/smart-order#cancel-all-orders  // trigger orders
     * @param {string} symbol unified market symbol, only orders in the market of this symbol are cancelled when symbol is not undefined
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {boolean} [params.trigger] true if canceling trigger orders
     * @returns {object[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async cancelAllOrders(symbol = undefined, params = {}) {
        await this.loadMarkets();
        const request = {
            // 'accountTypes': 'SPOT',
            'symbols': [],
        };
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
            request['symbols'] = [
                market['id'],
            ];
        }
        const isTrigger = this.safeValue2(params, 'trigger', 'stop');
        params = this.omit(params, ['trigger', 'stop']);
        let response = undefined;
        if (isTrigger) {
            response = await this.privateDeleteSmartorders(this.extend(request, params));
        }
        else {
            response = await this.privateDeleteOrders(this.extend(request, params));
        }
        //
        //     [
        //         {
        //             "orderId" : "78xxxxxxxx80",
        //             "clientOrderId" : "",
        //             "state" : "NEW",
        //             "code" : 200,
        //             "message" : ""
        //         }, {
        //             "orderId" : "78xxxxxxxxx80",
        //             "clientOrderId" : "",
        //             "state" : "NEW",
        //             "code" : 200,
        //             "message" : ""
        //         }
        //     ]
        //
        return this.parseOrders(response, market);
    }
    /**
     * @method
     * @name poloniex#fetchOrder
     * @description fetch an order by it's id
     * @see https://api-docs.poloniex.com/spot/api/private/order#order-details
     * @see https://api-docs.poloniex.com/spot/api/private/smart-order#open-orders  // trigger orders
     * @param {string} id order id
     * @param {string} symbol unified market symbol, default is undefined
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {boolean} [params.trigger] true if fetching a trigger order
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchOrder(id, symbol = undefined, params = {}) {
        await this.loadMarkets();
        id = id.toString();
        const request = {
            'id': id,
        };
        const isTrigger = this.safeValue2(params, 'trigger', 'stop');
        params = this.omit(params, ['trigger', 'stop']);
        let response = undefined;
        if (isTrigger) {
            response = await this.privateGetSmartordersId(this.extend(request, params));
            response = this.safeValue(response, 0);
        }
        else {
            response = await this.privateGetOrdersId(this.extend(request, params));
        }
        //
        //     {
        //         "id": "21934611974062080",
        //         "clientOrderId": "123",
        //         "symbol": "TRX_USDC",
        //         "state": "NEW",
        //         "accountType": "SPOT",
        //         "side": "SELL",
        //         "type": "LIMIT",
        //         "timeInForce": "GTC",
        //         "quantity": "1.00",
        //         "price": "10.00",
        //         "avgPrice": "0.00",
        //         "amount": "0.00",
        //         "filledQuantity": "0.00",
        //         "filledAmount": "0.00",
        //         "stopPrice": "3750.00",              // for trigger orders
        //         "createTime": 1646196019020,
        //         "updateTime": 1646196019020
        //     }
        //
        const order = this.parseOrder(response);
        order['id'] = id;
        return order;
    }
    async fetchOrderStatus(id, symbol = undefined, params = {}) {
        await this.loadMarkets();
        const orders = await this.fetchOpenOrders(symbol, undefined, undefined, params);
        const indexed = this.indexBy(orders, 'id');
        return (id in indexed) ? 'open' : 'closed';
    }
    /**
     * @method
     * @name poloniex#fetchOrderTrades
     * @description fetch all the trades made from a single order
     * @see https://api-docs.poloniex.com/spot/api/private/trade#trades-by-order-id
     * @param {string} id order id
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch trades for
     * @param {int} [limit] the maximum number of trades to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
     */
    async fetchOrderTrades(id, symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const request = {
            'id': id,
        };
        const trades = await this.privateGetOrdersIdTrades(this.extend(request, params));
        //
        //     [
        //         {
        //             "id": "30341456333942784",
        //             "symbol": "LINK_USDT",
        //             "accountType": "SPOT",
        //             "orderId": "30249408733945856",
        //             "side": "BUY",
        //             "type": "LIMIT",
        //             "matchRole": "MAKER",
        //             "createTime": 1648200366864,
        //             "price": "3.1",
        //             "quantity": "1",
        //             "amount": "3.1",
        //             "feeCurrency": "LINK",
        //             "feeAmount": "0.00145",
        //             "pageId": "30341456333942784",
        //             "clientOrderId": ""
        //         }
        //     ]
        //
        return this.parseTrades(trades);
    }
    parseBalance(response) {
        const result = {
            'info': response,
            'timestamp': undefined,
            'datetime': undefined,
        };
        for (let i = 0; i < response.length; i++) {
            const account = this.safeValue(response, i, {});
            const balances = this.safeValue(account, 'balances');
            for (let j = 0; j < balances.length; j++) {
                const balance = this.safeValue(balances, j);
                const currencyId = this.safeString(balance, 'currency');
                const code = this.safeCurrencyCode(currencyId);
                const newAccount = this.account();
                newAccount['free'] = this.safeString(balance, 'available');
                newAccount['used'] = this.safeString(balance, 'hold');
                result[code] = newAccount;
            }
        }
        return this.safeBalance(result);
    }
    /**
     * @method
     * @name poloniex#fetchBalance
     * @description query for balance and get the amount of funds available for trading or funds locked in orders
     * @see https://api-docs.poloniex.com/spot/api/private/account#all-account-balances
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
     */
    async fetchBalance(params = {}) {
        await this.loadMarkets();
        const request = {
            'accountType': 'SPOT',
        };
        const response = await this.privateGetAccountsBalances(this.extend(request, params));
        //
        //     [
        //         {
        //             "accountId" : "7xxxxxxxxxx8",
        //             "accountType" : "SPOT",
        //             "balances" : [
        //                 {
        //                     "currencyId" : "214",
        //                     "currency" : "USDT",
        //                     "available" : "2.00",
        //                     "hold" : "0.00"
        //                 }
        //             ]
        //         }
        //     ]
        //
        return this.parseBalance(response);
    }
    /**
     * @method
     * @name poloniex#fetchTradingFees
     * @description fetch the trading fees for multiple markets
     * @see https://api-docs.poloniex.com/spot/api/private/account#fee-info
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of [fee structures]{@link https://docs.ccxt.com/#/?id=fee-structure} indexed by market symbols
     */
    async fetchTradingFees(params = {}) {
        await this.loadMarkets();
        const response = await this.privateGetFeeinfo(params);
        //
        //     {
        //         "trxDiscount" : false,
        //         "makerRate" : "0.00145",
        //         "takerRate" : "0.00155",
        //         "volume30D" : "0.00"
        //     }
        //
        const result = {};
        for (let i = 0; i < this.symbols.length; i++) {
            const symbol = this.symbols[i];
            result[symbol] = {
                'info': response,
                'symbol': symbol,
                'maker': this.safeNumber(response, 'makerRate'),
                'taker': this.safeNumber(response, 'takerRate'),
                'percentage': true,
                'tierBased': true,
            };
        }
        return result;
    }
    /**
     * @method
     * @name poloniex#fetchOrderBook
     * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
     * @see https://api-docs.poloniex.com/spot/api/public/market-data#order-book
     * @param {string} symbol unified symbol of the market to fetch the order book for
     * @param {int} [limit] the maximum amount of order book entries to return
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
     */
    async fetchOrderBook(symbol, limit = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        if (limit !== undefined) {
            request['limit'] = limit; // The default value of limit is 10. Valid limit values are: 5, 10, 20, 50, 100, 150.
        }
        const response = await this.publicGetMarketsSymbolOrderBook(this.extend(request, params));
        //
        //     {
        //         "time" : 1659695219507,
        //         "scale" : "-1",
        //         "asks" : [ "23139.82", "0.317981", "23140", "0.191091", "23170.06", "0.01", "23200", "0.107758", "23230.55", "0.01", "23247.2", "0.154", "23254", "0.005121", "23263", "0.038", "23285.4", "0.308", "23300", "0.108896" ],
        //         "bids" : [ "23139.74", "0.432092", "23139.73", "0.198592", "23123.21", "0.000886", "23123.2", "0.308", "23121.4", "0.154", "23105", "0.000789", "23100", "0.078175", "23069.1", "0.026276", "23068.83", "0.001329", "23051", "0.000048" ],
        //         "ts" : 1659695219513
        //     }
        //
        const timestamp = this.safeInteger(response, 'time');
        const asks = this.safeValue(response, 'asks');
        const bids = this.safeValue(response, 'bids');
        const asksResult = [];
        const bidsResult = [];
        for (let i = 0; i < asks.length; i++) {
            if ((i % 2) < 1) {
                const price = this.safeNumber(asks, i);
                const amount = this.safeNumber(asks, this.sum(i, 1));
                asksResult.push([price, amount]);
            }
        }
        for (let i = 0; i < bids.length; i++) {
            if ((i % 2) < 1) {
                const price = this.safeNumber(bids, i);
                const amount = this.safeNumber(bids, this.sum(i, 1));
                bidsResult.push([price, amount]);
            }
        }
        return {
            'symbol': market['symbol'],
            'bids': this.sortBy(bidsResult, 0, true),
            'asks': this.sortBy(asksResult, 0),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'nonce': undefined,
        };
    }
    /**
     * @method
     * @name poloniex#createDepositAddress
     * @description create a currency deposit address
     * @see https://api-docs.poloniex.com/spot/api/private/wallet#deposit-addresses
     * @param {string} code unified currency code of the currency for the deposit address
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an [address structure]{@link https://docs.ccxt.com/#/?id=address-structure}
     */
    async createDepositAddress(code, params = {}) {
        await this.loadMarkets();
        const currency = this.currency(code);
        const request = {
            'currency': currency['id'],
        };
        const networks = this.safeValue(this.options, 'networks', {});
        let network = this.safeStringUpper(params, 'network'); // this line allows the user to specify either ERC20 or ETH
        network = this.safeString(networks, network, network); // handle ERC20>ETH alias
        if (network !== undefined) {
            request['currency'] = request['currency'] + network; // when network the currency need to be changed to currency+network https://docs.poloniex.com/#withdraw on MultiChain Currencies section
            params = this.omit(params, 'network');
        }
        else {
            if (currency['id'] === 'USDT') {
                throw new errors.ArgumentsRequired(this.id + ' createDepositAddress requires a network parameter for ' + code + '.');
            }
        }
        const response = await this.privatePostWalletsAddress(this.extend(request, params));
        //
        //     {
        //         "address" : "0xfxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxf"
        //     }
        //
        let address = this.safeString(response, 'address');
        let tag = undefined;
        this.checkAddress(address);
        if (currency !== undefined) {
            const depositAddress = this.safeString(currency['info'], 'depositAddress');
            if (depositAddress !== undefined) {
                tag = address;
                address = depositAddress;
            }
        }
        return {
            'currency': code,
            'address': address,
            'tag': tag,
            'network': network,
            'info': response,
        };
    }
    /**
     * @method
     * @name poloniex#fetchDepositAddress
     * @description fetch the deposit address for a currency associated with this account
     * @see https://api-docs.poloniex.com/spot/api/private/wallet#deposit-addresses
     * @param {string} code unified currency code
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an [address structure]{@link https://docs.ccxt.com/#/?id=address-structure}
     */
    async fetchDepositAddress(code, params = {}) {
        await this.loadMarkets();
        const currency = this.currency(code);
        const request = {
            'currency': currency['id'],
        };
        const networks = this.safeValue(this.options, 'networks', {});
        let network = this.safeStringUpper(params, 'network'); // this line allows the user to specify either ERC20 or ETH
        network = this.safeString(networks, network, network); // handle ERC20>ETH alias
        if (network !== undefined) {
            request['currency'] = request['currency'] + network; // when network the currency need to be changed to currency+network https://docs.poloniex.com/#withdraw on MultiChain Currencies section
            params = this.omit(params, 'network');
        }
        else {
            if (currency['id'] === 'USDT') {
                throw new errors.ArgumentsRequired(this.id + ' fetchDepositAddress requires a network parameter for ' + code + '.');
            }
        }
        const response = await this.privateGetWalletsAddresses(this.extend(request, params));
        //
        //     {
        //         "USDTTRON" : "Txxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxp"
        //     }
        //
        let address = this.safeString(response, request['currency']);
        let tag = undefined;
        this.checkAddress(address);
        if (currency !== undefined) {
            const depositAddress = this.safeString(currency['info'], 'depositAddress');
            if (depositAddress !== undefined) {
                tag = address;
                address = depositAddress;
            }
        }
        return {
            'info': response,
            'currency': code,
            'network': network,
            'address': address,
            'tag': tag,
        };
    }
    /**
     * @method
     * @name poloniex#transfer
     * @description transfer currency internally between wallets on the same account
     * @see https://api-docs.poloniex.com/spot/api/private/account#accounts-transfer
     * @param {string} code unified currency code
     * @param {float} amount amount to transfer
     * @param {string} fromAccount account to transfer from
     * @param {string} toAccount account to transfer to
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [transfer structure]{@link https://docs.ccxt.com/#/?id=transfer-structure}
     */
    async transfer(code, amount, fromAccount, toAccount, params = {}) {
        await this.loadMarkets();
        const currency = this.currency(code);
        const accountsByType = this.safeValue(this.options, 'accountsByType', {});
        const fromId = this.safeString(accountsByType, fromAccount, fromAccount);
        const toId = this.safeString(accountsByType, toAccount, fromAccount);
        const request = {
            'amount': this.currencyToPrecision(code, amount),
            'currency': currency['id'],
            'fromAccount': fromId,
            'toAccount': toId,
        };
        const response = await this.privatePostAccountsTransfer(this.extend(request, params));
        //
        //    {
        //        "transferId" : "168041074"
        //    }
        //
        return this.parseTransfer(response, currency);
    }
    parseTransfer(transfer, currency = undefined) {
        //
        //    {
        //        "transferId" : "168041074"
        //    }
        //
        return {
            'info': transfer,
            'id': this.safeString(transfer, 'transferId'),
            'timestamp': undefined,
            'datetime': undefined,
            'currency': this.safeString(currency, 'id'),
            'amount': undefined,
            'fromAccount': undefined,
            'toAccount': undefined,
            'status': undefined,
        };
    }
    /**
     * @method
     * @name poloniex#withdraw
     * @description make a withdrawal
     * @see https://api-docs.poloniex.com/spot/api/private/wallet#withdraw-currency
     * @param {string} code unified currency code
     * @param {float} amount the amount to withdraw
     * @param {string} address the address to withdraw to
     * @param {string} tag
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
     */
    async withdraw(code, amount, address, tag = undefined, params = {}) {
        [tag, params] = this.handleWithdrawTagAndParams(tag, params);
        this.checkAddress(address);
        await this.loadMarkets();
        const currency = this.currency(code);
        const request = {
            'currency': currency['id'],
            'amount': amount,
            'address': address,
        };
        if (tag !== undefined) {
            request['paymentId'] = tag;
        }
        const networks = this.safeValue(this.options, 'networks', {});
        let network = this.safeStringUpper(params, 'network'); // this line allows the user to specify either ERC20 or ETH
        network = this.safeString(networks, network, network); // handle ERC20>ETH alias
        if (network !== undefined) {
            request['currency'] = request['currency'] + network; // when network the currency need to be changed to currency+network https://docs.poloniex.com/#withdraw on MultiChain Currencies section
            params = this.omit(params, 'network');
        }
        const response = await this.privatePostWalletsWithdraw(this.extend(request, params));
        //
        //     {
        //         "response": "Withdrew 1.00000000 USDT.",
        //         "email2FA": false,
        //         "withdrawalNumber": 13449869
        //     }
        //
        return this.parseTransaction(response, currency);
    }
    async fetchTransactionsHelper(code = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const year = 31104000; // 60 * 60 * 24 * 30 * 12 = one year of history, why not
        const now = this.seconds();
        const start = (since !== undefined) ? this.parseToInt(since / 1000) : now - 10 * year;
        const request = {
            'start': start,
            'end': now, // UNIX timestamp, required
        };
        const response = await this.privateGetWalletsActivity(this.extend(request, params));
        //
        //     {
        //         "adjustments":[],
        //         "deposits":[
        //             {
        //                 "currency": "BTC",
        //                 "address": "1MEtiqJWru53FhhHrfJPPvd2tC3TPDVcmW",
        //                 "amount": "0.01063000",
        //                 "confirmations":  1,
        //                 "txid": "952b0e1888d6d491591facc0d37b5ebec540ac1efb241fdbc22bcc20d1822fb6",
        //                 "timestamp":  1507916888,
        //                 "status": "COMPLETE"
        //             },
        //             {
        //                 "currency": "ETH",
        //                 "address": "0x20108ba20b65c04d82909e91df06618107460197",
        //                 "amount": "4.00000000",
        //                 "confirmations": 38,
        //                 "txid": "0x4be260073491fe63935e9e0da42bd71138fdeb803732f41501015a2d46eb479d",
        //                 "timestamp": 1525060430,
        //                 "status": "COMPLETE"
        //             }
        //         ],
        //         "withdrawals":[
        //             {
        //                 "withdrawalNumber":13449869,
        //                 "currency":"USDTTRON", // not documented in API docs, see commonCurrencies in describe()
        //                 "address":"TXGaqPW23JdRWhsVwS2mRsGsegbdnAd3Rw",
        //                 "amount":"1.00000000",
        //                 "fee":"0.00000000",
        //                 "timestamp":1591573420,
        //                 "status":"COMPLETE: dadf427224b3d44b38a2c13caa4395e4666152556ca0b2f67dbd86a95655150f",
        //                 "ipAddress":"x.x.x.x",
        //                 "canCancel":0,
        //                 "canResendEmail":0,
        //                 "paymentID":null,
        //                 "scope":"crypto"
        //             },
        //             {
        //                 "withdrawalNumber": 8224394,
        //                 "currency": "EMC2",
        //                 "address": "EYEKyCrqTNmVCpdDV8w49XvSKRP9N3EUyF",
        //                 "amount": "63.10796020",
        //                 "fee": "0.01000000",
        //                 "timestamp": 1510819838,
        //                 "status": "COMPLETE: d37354f9d02cb24d98c8c4fc17aa42f475530b5727effdf668ee5a43ce667fd6",
        //                 "ipAddress": "x.x.x.x"
        //             },
        //             {
        //                 "withdrawalNumber": 9290444,
        //                 "currency": "ETH",
        //                 "address": "0x191015ff2e75261d50433fbd05bd57e942336149",
        //                 "amount": "0.15500000",
        //                 "fee": "0.00500000",
        //                 "timestamp": 1514099289,
        //                 "status": "COMPLETE: 0x12d444493b4bca668992021fd9e54b5292b8e71d9927af1f076f554e4bea5b2d",
        //                 "ipAddress": "x.x.x.x"
        //             },
        //             {
        //                 "withdrawalNumber": 11518260,
        //                 "currency": "BTC",
        //                 "address": "8JoDXAmE1GY2LRK8jD1gmAmgRPq54kXJ4t",
        //                 "amount": "0.20000000",
        //                 "fee": "0.00050000",
        //                 "timestamp": 1527918155,
        //                 "status": "COMPLETE: 1864f4ebb277d90b0b1ff53259b36b97fa1990edc7ad2be47c5e0ab41916b5ff",
        //                 "ipAddress": "x.x.x.x"
        //             }
        //         ]
        //     }
        //
        return response;
    }
    /**
     * @method
     * @name poloniex#fetchDepositsWithdrawals
     * @description fetch history of deposits and withdrawals
     * @see https://api-docs.poloniex.com/spot/api/private/wallet#wallets-activity-records
     * @param {string} [code] unified currency code for the currency of the deposit/withdrawals, default is undefined
     * @param {int} [since] timestamp in ms of the earliest deposit/withdrawal, default is undefined
     * @param {int} [limit] max number of deposit/withdrawals to return, default is undefined
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a list of [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
     */
    async fetchDepositsWithdrawals(code = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const response = await this.fetchTransactionsHelper(code, since, limit, params);
        let currency = undefined;
        if (code !== undefined) {
            currency = this.currency(code);
        }
        const withdrawals = this.safeValue(response, 'withdrawals', []);
        const deposits = this.safeValue(response, 'deposits', []);
        const withdrawalTransactions = this.parseTransactions(withdrawals, currency, since, limit);
        const depositTransactions = this.parseTransactions(deposits, currency, since, limit);
        const transactions = this.arrayConcat(depositTransactions, withdrawalTransactions);
        return this.filterByCurrencySinceLimit(this.sortBy(transactions, 'timestamp'), code, since, limit);
    }
    /**
     * @method
     * @name poloniex#fetchWithdrawals
     * @description fetch all withdrawals made from an account
     * @see https://api-docs.poloniex.com/spot/api/private/wallet#wallets-activity-records
     * @param {string} code unified currency code
     * @param {int} [since] the earliest time in ms to fetch withdrawals for
     * @param {int} [limit] the maximum number of withdrawals structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
     */
    async fetchWithdrawals(code = undefined, since = undefined, limit = undefined, params = {}) {
        const response = await this.fetchTransactionsHelper(code, since, limit, params);
        let currency = undefined;
        if (code !== undefined) {
            currency = this.currency(code);
        }
        const withdrawals = this.safeValue(response, 'withdrawals', []);
        const transactions = this.parseTransactions(withdrawals, currency, since, limit);
        return this.filterByCurrencySinceLimit(transactions, code, since, limit);
    }
    /**
     * @method
     * @name poloniex#fetchDepositWithdrawFees
     * @description fetch deposit and withdraw fees
     * @see https://api-docs.poloniex.com/spot/api/public/reference-data#currency-information
     * @param {string[]|undefined} codes list of unified currency codes
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [fees structures]{@link https://docs.ccxt.com/#/?id=fee-structure}
     */
    async fetchDepositWithdrawFees(codes = undefined, params = {}) {
        await this.loadMarkets();
        const response = await this.publicGetCurrencies(this.extend(params, { 'includeMultiChainCurrencies': true }));
        //
        //     [
        //         {
        //             "1CR": {
        //                 "id": 1,
        //                 "name": "1CRedit",
        //                 "description": "BTC Clone",
        //                 "type": "address",
        //                 "withdrawalFee": "0.01000000",
        //                 "minConf": 10000,
        //                 "depositAddress": null,
        //                 "blockchain": "1CR",
        //                 "delisted": false,
        //                 "tradingState": "NORMAL",
        //                 "walletState": "DISABLED",
        //                 "parentChain": null,
        //                 "isMultiChain": false,
        //                 "isChildChain": false,
        //                 "childChains": []
        //             }
        //         }
        //     ]
        //
        const data = {};
        for (let i = 0; i < response.length; i++) {
            const entry = response[i];
            const currencies = Object.keys(entry);
            const currencyId = this.safeString(currencies, 0);
            data[currencyId] = entry[currencyId];
        }
        return this.parseDepositWithdrawFees(data, codes);
    }
    parseDepositWithdrawFees(response, codes = undefined, currencyIdKey = undefined) {
        //
        //         {
        //             "1CR": {
        //                 "id": 1,
        //                 "name": "1CRedit",
        //                 "description": "BTC Clone",
        //                 "type": "address",
        //                 "withdrawalFee": "0.01000000",
        //                 "minConf": 10000,
        //                 "depositAddress": null,
        //                 "blockchain": "1CR",
        //                 "delisted": false,
        //                 "tradingState": "NORMAL",
        //                 "walletState": "DISABLED",
        //                 "parentChain": null,
        //                 "isMultiChain": false,
        //                 "isChildChain": false,
        //                 "childChains": []
        //             },
        //         }
        //
        const depositWithdrawFees = {};
        codes = this.marketCodes(codes);
        const responseKeys = Object.keys(response);
        for (let i = 0; i < responseKeys.length; i++) {
            const currencyId = responseKeys[i];
            const code = this.safeCurrencyCode(currencyId);
            const feeInfo = response[currencyId];
            if ((codes === undefined) || (this.inArray(code, codes))) {
                const currency = this.currency(code);
                depositWithdrawFees[code] = this.parseDepositWithdrawFee(feeInfo, currency);
                const childChains = this.safeValue(feeInfo, 'childChains');
                const chainsLength = childChains.length;
                if (chainsLength > 0) {
                    for (let j = 0; j < childChains.length; j++) {
                        let networkId = childChains[j];
                        networkId = networkId.replace(code, '');
                        const networkCode = this.networkIdToCode(networkId);
                        const networkInfo = this.safeValue(response, networkId);
                        const networkObject = {};
                        const withdrawFee = this.safeNumber(networkInfo, 'withdrawalFee');
                        networkObject[networkCode] = {
                            'withdraw': {
                                'fee': withdrawFee,
                                'percentage': (withdrawFee !== undefined) ? false : undefined,
                            },
                            'deposit': {
                                'fee': undefined,
                                'percentage': undefined,
                            },
                        };
                        depositWithdrawFees[code]['networks'] = this.extend(depositWithdrawFees[code]['networks'], networkObject);
                    }
                }
            }
        }
        return depositWithdrawFees;
    }
    parseDepositWithdrawFee(fee, currency = undefined) {
        const depositWithdrawFee = this.depositWithdrawFee({});
        depositWithdrawFee['info'][currency['code']] = fee;
        const networkId = this.safeString(fee, 'blockchain');
        const withdrawFee = this.safeNumber(fee, 'withdrawalFee');
        const withdrawResult = {
            'fee': withdrawFee,
            'percentage': (withdrawFee !== undefined) ? false : undefined,
        };
        const depositResult = {
            'fee': undefined,
            'percentage': undefined,
        };
        depositWithdrawFee['withdraw'] = withdrawResult;
        depositWithdrawFee['deposit'] = depositResult;
        const networkCode = this.networkIdToCode(networkId);
        depositWithdrawFee['networks'][networkCode] = {
            'withdraw': withdrawResult,
            'deposit': depositResult,
        };
        return depositWithdrawFee;
    }
    /**
     * @method
     * @name poloniex#fetchDeposits
     * @description fetch all deposits made to an account
     * @see https://api-docs.poloniex.com/spot/api/private/wallet#wallets-activity-records
     * @param {string} code unified currency code
     * @param {int} [since] the earliest time in ms to fetch deposits for
     * @param {int} [limit] the maximum number of deposits structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
     */
    async fetchDeposits(code = undefined, since = undefined, limit = undefined, params = {}) {
        const response = await this.fetchTransactionsHelper(code, since, limit, params);
        let currency = undefined;
        if (code !== undefined) {
            currency = this.currency(code);
        }
        const deposits = this.safeValue(response, 'deposits', []);
        const transactions = this.parseTransactions(deposits, currency, since, limit);
        return this.filterByCurrencySinceLimit(transactions, code, since, limit);
    }
    parseTransactionStatus(status) {
        const statuses = {
            'COMPLETE': 'ok',
            'COMPLETED': 'ok',
            'AWAITING APPROVAL': 'pending',
            'AWAITING_APPROVAL': 'pending',
            'PENDING': 'pending',
            'PROCESSING': 'pending',
            'COMPLETE ERROR': 'failed',
            'COMPLETE_ERROR': 'failed',
        };
        return this.safeString(statuses, status, status);
    }
    parseTransaction(transaction, currency = undefined) {
        //
        // deposits
        //
        //     {
        //         "txid": "f49d489616911db44b740612d19464521179c76ebe9021af85b6de1e2f8d68cd",
        //         "amount": "49798.01987021",
        //         "status": "COMPLETE",
        //         "address": "DJVJZ58tJC8UeUv9Tqcdtn6uhWobouxFLT",
        //         "currency": "DOGE",
        //         "timestamp": 1524321838,
        //         "confirmations": 3371,
        //         "depositNumber": 134587098
        //     }
        //
        // withdrawals
        //
        //     {
        //         "withdrawalRequestsId": 7397527,
        //         "currency": "ETC",
        //         "address": "0x26419a62055af459d2cd69bb7392f5100b75e304",
        //         "amount": "13.19951600",
        //         "fee": "0.01000000",
        //         "timestamp": 1506010932,
        //         "status": "COMPLETED",
        //         "txid": "343346392f82ac16e8c2604f2a604b7b2382d0e9d8030f673821f8de4b5f5bk",
        //         "ipAddress": "1.2.3.4",
        //         "paymentID": null
        //     }
        //
        // withdraw
        //
        //     {
        //         "withdrawalRequestsId": 33485231
        //     }
        //
        const timestamp = this.safeTimestamp(transaction, 'timestamp');
        const currencyId = this.safeString(transaction, 'currency');
        const code = this.safeCurrencyCode(currencyId);
        let status = this.safeString(transaction, 'status', 'pending');
        status = this.parseTransactionStatus(status);
        const txid = this.safeString(transaction, 'txid');
        const type = ('withdrawalRequestsId' in transaction) ? 'withdrawal' : 'deposit';
        const id = this.safeString2(transaction, 'withdrawalRequestsId', 'depositNumber');
        const address = this.safeString(transaction, 'address');
        const tag = this.safeString(transaction, 'paymentID');
        let amountString = this.safeString(transaction, 'amount');
        const feeCostString = this.safeString(transaction, 'fee');
        if (type === 'withdrawal') {
            amountString = Precise["default"].stringSub(amountString, feeCostString);
        }
        return {
            'info': transaction,
            'id': id,
            'currency': code,
            'amount': this.parseNumber(amountString),
            'network': undefined,
            'address': address,
            'addressTo': undefined,
            'addressFrom': undefined,
            'tag': tag,
            'tagTo': undefined,
            'tagFrom': undefined,
            'status': status,
            'type': type,
            'updated': undefined,
            'txid': txid,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'comment': undefined,
            'internal': undefined,
            'fee': {
                'currency': code,
                'cost': this.parseNumber(feeCostString),
                'rate': undefined,
            },
        };
    }
    nonce() {
        return this.milliseconds();
    }
    sign(path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        let url = this.urls['api']['rest'];
        const query = this.omit(params, this.extractParams(path));
        const implodedPath = this.implodeParams(path, params);
        if (api === 'public') {
            url += '/' + implodedPath;
            if (Object.keys(query).length) {
                url += '?' + this.urlencode(query);
            }
        }
        else {
            this.checkRequiredCredentials();
            const timestamp = this.nonce().toString();
            let auth = method + "\n"; // eslint-disable-line quotes
            url += '/' + implodedPath;
            auth += '/' + implodedPath;
            if ((method === 'POST') || (method === 'PUT') || (method === 'DELETE')) {
                auth += "\n"; // eslint-disable-line quotes
                if (Object.keys(query).length) {
                    body = this.json(query);
                    auth += 'requestBody=' + body + '&';
                }
                auth += 'signTimestamp=' + timestamp;
            }
            else {
                let sortedQuery = this.extend({ 'signTimestamp': timestamp }, query);
                sortedQuery = this.keysort(sortedQuery);
                auth += "\n" + this.urlencode(sortedQuery); // eslint-disable-line quotes
                if (Object.keys(query).length) {
                    url += '?' + this.urlencode(query);
                }
            }
            const signature = this.hmac(this.encode(auth), this.encode(this.secret), sha256.sha256, 'base64');
            headers = {
                'Content-Type': 'application/json',
                'key': this.apiKey,
                'signTimestamp': timestamp,
                'signature': signature,
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }
    handleErrors(code, reason, url, method, headers, body, response, requestHeaders, requestBody) {
        if (response === undefined) {
            return undefined;
        }
        //
        //     {
        //         "code" : 21709,
        //         "message" : "Low available balance"
        //     }
        //
        const responseCode = this.safeString(response, 'code');
        if ((responseCode !== undefined) && (responseCode !== '200')) {
            const codeInner = response['code'];
            const message = this.safeString(response, 'message');
            const feedback = this.id + ' ' + body;
            this.throwExactlyMatchedException(this.exceptions['exact'], codeInner, feedback);
            this.throwBroadlyMatchedException(this.exceptions['broad'], message, feedback);
            throw new errors.ExchangeError(feedback); // unknown message
        }
        return undefined;
    }
}

module.exports = poloniex;
