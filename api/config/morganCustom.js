// setup the logger
const rfs = require("rotating-file-stream");
const path = require("path");
const morgan = require("morgan");
const chalk = require("chalk");
var moment = require('moment'); // require
moment().format('LL');
moment.locale('ru'); // 'русский'
var accessLogStream = rfs.createStream('express.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, './../storage/logs')
})
exports.morganMiddlewareConsole = morgan(function (tokens, req, res) {
    morgan.token('statusColor', (req, res, args) => {
        // get the status code if response written
        var status = (typeof res.headersSent !== 'boolean' ? Boolean(res.header) : res.headersSent)
            ? res.statusCode
            : undefined
        // get status color
        var color = status >= 500 ? 31 // red
            : status >= 400 ? 34 // blue
                : status >= 300 ? 32 // green
                    : status >= 200 ? 32 // green
                        : 0; // no color

        return '\x1b[' + color + 'm' + status + '\x1b[0m';
    });
    var statuses = tokens['statusColor'](req, res);
    var date = tokens.date(req, res);
    var http_version = tokens['http-version'](req, res);
    var method = tokens.method(req, res);
    var referrer = tokens.referrer(req, res);
    var remote_addr = tokens['remote-addr'](req, res);
    var remote_user = tokens['remote-user'](req, res);
    var response_time = tokens['response-time'](req, res, '5');
    var Res = tokens.res(req, res, 'content-length');
    var total_time = tokens['total-time'](req, res, '5');
    var url = tokens['url'](req, res);
    var user_agent = tokens['user-agent'](req, res);
    var chalk_blue = chalk.hex('#34ACE0FF').bold;
    //var chalk_red = chalk.hex('#a00814').bold;
    //var chalk_green = chalk.hex('#39d30c').bold;
    var chalk_blue2 = chalk.hex('#083fc9').bold;
    var chalk_yellow = chalk.hex('#e0dd06').bold;
    return [
        chalk_blue('<-- Лог запроса --> \n'),
        chalk_blue('Текущая дата и время в UTC - ') + chalk_yellow(moment(date).format('L LTS') + '\n'),
        chalk_blue('HTTP-версия запроса - ') + chalk_blue2('HTTP/') + chalk_blue2(http_version + '\n'),
        chalk_blue('HTTP-метод запроса - ') + chalk_yellow(method + '\n'),
        chalk_blue('Заголовок ссылки запроса - ') + chalk_blue2(referrer + '\n'),
        chalk_blue('Удаленный адрес запроса - ') + chalk_blue2(remote_addr + '\n'),
        chalk_blue('Пользователь прошел аутентификацию как часть базовой аутентификации для запроса - ') + chalk_blue2(remote_user + '\n'),
        chalk_blue('Время между поступлением запроса в morgan и написанием заголовков ответов в миллисекундах - ') + chalk_yellow(response_time + ' мс.\n'),
        chalk_blue('Длина запроса - ') + chalk_yellow(Res + '\n'),
        chalk_blue('Статус запроса - ') + (statuses + '\n'),
        chalk_blue('Время запроса - ') + chalk_yellow(total_time + ' мс.\n'),
        chalk_blue('URL-адрес запроса - ') + chalk_blue2(url + '\n'),
        chalk_blue('Содержимое заголовка Агента пользователя запроса - ') + chalk_blue2(user_agent + '\n'),
        chalk_blue('<-----------------> \n'),
    ].join('')
})
exports.morganMiddlewareLogFile = morgan(function (tokens, req, res) {
        var status = tokens.status(req, res);
        var date = tokens.date(req, res);
        var http_version = tokens['http-version'](req, res);
        var method = tokens.method(req, res);
        var referrer = tokens.referrer(req, res);
        var remote_addr = tokens['remote-addr'](req, res);
        var remote_user = tokens['remote-user'](req, res);
        var response_time = tokens['response-time'](req, res, '5');
        var Res = tokens.res(req, res, 'content-length');
        var total_time = tokens['total-time'](req, res, '5');
        var url = tokens['url'](req, res);
        var user_agent = tokens['user-agent'](req, res);
        return [
            ('<-- Лог запроса --> \n'),
            ('Текущая дата и время в UTC - ') + (moment(date).format('L LTS') + '\n'),
            ('HTTP-версия запроса - HTTP/') + (http_version + '\n'),
            ('HTTP-метод запроса - ') + (method + '\n'),
            ('Заголовок ссылки запроса - ') + (referrer + '\n'),
            ('Удаленный адрес запроса - ') + (remote_addr + '\n'),
            ('Пользователь прошел аутентификацию как часть базовой аутентификации для запроса - ') + (remote_user + '\n'),
            ('Время между поступлением запроса в morgan и написанием заголовков ответов в миллисекундах - ') + (response_time + ' мс.\n'),
            ('Длина запроса - ') + (Res + '\n'),
            ('Статус запроса - ') + (status + '\n'),
            ('Время запроса - ') + (total_time + ' мс.\n'),
            ('URL-адрес запроса - ') + (url + '\n'),
            ('Содержимое заголовка Агента пользователя запроса - ') + (user_agent + '\n'),
            ('<-----------------> \n'),
        ].join('')
    }, {stream: accessLogStream}
)