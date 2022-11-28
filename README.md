# Prints out

```
% bash multilang.sh -v binance fetchTime           
2022-11-28T22:42:29.957Z Node.js: v18.4.0 CCXT v2.2.40 binance.fetchTime () fetch Request: binance GET https://api.binance.com/api/v3/time RequestHeaders: {} RequestBody: undefined handleRestResponse: binance GET https://api.binance.com/api/v3/time 200 OK ResponseHeaders: { 'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-cache, no-store, must-revalidate', Connection: 'keep-alive', 'Content-Length': '28', 'Content-Security-Policy': "default-src 'self'", 'Content-Type': 'application/json;charset=UTF-8', Date: 'Mon, 28 Nov 2022 22:42:30 GMT', Expires: '0', Pragma: 'no-cache', Server: 'nginx', 'Strict-Transport-Security': 'max-age=31536000; includeSubdomains', Via: '1.1 890304274d84dce52c3c8a65cb402758.cloudfront.net (CloudFront)', 'X-Amz-Cf-Id': 'FonCX3HiFMiuQuAfggj93TBVUvLJmypXHuB18r2UtBUbrIM35g4P-A==', 'X-Amz-Cf-Pop': 'YTO50-P2', 'X-Cache': 'Miss from cloudfront', 'X-Content-Security-Policy': "default-src 'self'", 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'SAMEORIGIN', 'X-Mbx-Used-Weight': '4', 'X-Mbx-Used-Weight-1m': '4', 'X-Mbx-Uuid': '8edbfa20-469f-47d9-a695-1697d130b952', 'X-Webkit-Csp': "default-src 'self'", 'X-Xss-Protection': '1; mode=block' } ResponseBody: {"serverTime":1669675350596} 2022-11-28T22:42:30.452Z iteration 0 passed in 391 ms 1669675350596 2022-11-28T22:42:30.452Z iteration 1 passed in 391 ms
node completed
Python v3.10.4 CCXT v2.2.40 binance.fetchTime() fetch Request: binance GET https://api.binance.com/api/v3/time RequestHeaders: {'User-Agent': 'python-requests/2.27.1', 'Accept-Encoding': 'gzip, deflate'} RequestBody: None fetch Response: binance GET https://api.binance.com/api/v3/time 200 ResponseHeaders: {'Content-Type': 'application/json;charset=UTF-8', 'Content-Length': '28', 'Connection': 'keep-alive', 'Date': 'Mon, 28 Nov 2022 22:42:31 GMT', 'Server': 'nginx', 'x-mbx-uuid': '42853d93-18d0-421c-a009-fd1ede58a131', 'x-mbx-used-weight': '5', 'x-mbx-used-weight-1m': '5', 'Strict-Transport-Security': 'max-age=31536000; includeSubdomains', 'X-Frame-Options': 'SAMEORIGIN', 'X-Xss-Protection': '1; mode=block', 'X-Content-Type-Options': 'nosniff', 'Content-Security-Policy': "default-src 'self'", 'X-Content-Security-Policy': "default-src 'self'", 'X-WebKit-CSP': "default-src 'self'", 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache', 'Expires': '0', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS', 'X-Cache': 'Miss from cloudfront', 'Via': '1.1 6589108eb8812ce79de8a8eef3f72bee.cloudfront.net (CloudFront)', 'X-Amz-Cf-Pop': 'YTO50-P2', 'X-Amz-Cf-Id': 'MPj7FWkBgMTnwmqZ7ZGvY8N8erlFnMEYQS882rTlX0Ibuesjn83QsA=='} ResponseBody: {"serverTime":1669675351630} 1669675351630
python3 completed
1
php ./examples/php/cli.php --verbose binance fetchTime
PHP v8.1.7 CCXT version :2.2.40 binance->fetchTime() Array ( [0] => fetch Request: [1] => binance [2] => GET [3] => https://api.binance.com/api/v3/time [4] => RequestHeaders: [5] => Array ( ) [6] => RequestBody: [7] => ) Array ( [0] => fetch Response: [1] => binance [2] => GET [3] => https://api.binance.com/api/v3/time [4] => 200 [5] => ResponseHeaders: [6] => Array ( [Content-Type] => application/json;charset=UTF-8 [Content-Length] => 28 [Connection] => close [Date] => Mon, 28 Nov 2022 22:42:32 GMT [Server] => nginx [x-mbx-uuid] => 6750a983-5ecc-47ba-838e-5a5eeada29a6 [x-mbx-used-weight] => 6 [x-mbx-used-weight-1m] => 6 [Strict-Transport-Security] => max-age=31536000; includeSubdomains [X-Frame-Options] => SAMEORIGIN [X-Xss-Protection] => 1; mode=block [X-Content-Type-Options] => nosniff [Content-Security-Policy] => default-src 'self' [X-Content-Security-Policy] => default-src 'self' [X-WebKit-CSP] => default-src 'self' [Cache-Control] => no-cache, no-store, must-revalidate [Pragma] => no-cache [Expires] => 0 [Access-Control-Allow-Origin] => CODEOWNERS CONTRIBUTING.md Dockerfile ISSUE_TEMPLATE.md LICENSE.txt README.md SECURITY.md appveyor.yml build ccxt.browser.js ccxt.d.ts ccxt.js ccxt.php cleanup.sh composer-install.sh composer.json composer.lock dist doc docker-compose.yml examples exchanges.cfg exchanges.json gource.sh index.html js keys.json keys.local.json multilang.sh node_modules package-lock.json package.json php phpunit.xml.dist postinstall.js python run-tests-ws.js run-tests.js setup.cfg temp.txt vendor wiki [Access-Control-Allow-Methods] => GET, HEAD, OPTIONS [X-Cache] => Miss from cloudfront [Via] => 1.1 3340b5a392e45fce453c4d978abfd6be.cloudfront.net (CloudFront) [X-Amz-Cf-Pop] => YTO50-P2 [X-Amz-Cf-Id] => t0WfC0beWI84L99xZ06M_OHLaKKbkbYbjMEZ7XJqBql3BLZJyNFwXQ== ) [7] => ResponseBody: [8] => {"serverTime":1669675352351} ) 1669675352351
Node.js: v18.4.0
CCXT v2.2.40
binance.fetchTime ()
fetch Request:
 binance GET https://api.binance.com/api/v3/time 
RequestHeaders:
 {} 
RequestBody:
 undefined 
handleRestResponse:
 binance GET https://api.binance.com/api/v3/time 200 OK 
ResponseHeaders:
 {
 'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
 'Access-Control-Allow-Origin': '*',
 'Cache-Control': 'no-cache, no-store, must-revalidate',
 Connection: 'keep-alive',
 'Content-Length': '28',
 'Content-Security-Policy': "default-src 'self'",
 'Content-Type': 'application/json;charset=UTF-8',
 Date: 'Mon, 28 Nov 2022 22:42:30 GMT',
 Expires: '0',
 Pragma: 'no-cache',
 Server: 'nginx',
 'Strict-Transport-Security': 'max-age=31536000; includeSubdomains',
 Via: '1.1 890304274d84dce52c3c8a65cb402758.cloudfront.net (CloudFront)',
 'X-Amz-Cf-Id': 'FonCX3HiFMiuQuAfggj93TBVUvLJmypXHuB18r2UtBUbrIM35g4P-A==',
 'X-Amz-Cf-Pop': 'YTO50-P2',
 'X-Cache': 'Miss from cloudfront',
 'X-Content-Security-Policy': "default-src 'self'",
 'X-Content-Type-Options': 'nosniff',
 'X-Frame-Options': 'SAMEORIGIN',
 'X-Mbx-Used-Weight': '4',
 'X-Mbx-Used-Weight-1m': '4',
 'X-Mbx-Uuid': '8edbfa20-469f-47d9-a695-1697d130b952',
 'X-Webkit-Csp': "default-src 'self'",
 'X-Xss-Protection': '1; mode=block'
} 
ResponseBody:
 {"serverTime":1669675350596} 
1669675350596
```