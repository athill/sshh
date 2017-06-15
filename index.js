const argv = require('minimist')(process.argv.slice(2));
const config = require('./example-config');

const exit = (handler, code = 1) => {
	const val = (typeof handler === 'function') ? handler() : console.error(handler); 
	process.exit(code)
};

const usage =  () => console.log('usage: sshh [options] <server-mapping>');

if (argv._.length === 0) {
	exit(usage);
}

//// divide arg into app and index
const arg = argv._[0].toString().replace(/(.*[^0-9])([0-9]+)$/, '$1-$2');
const [app, index] = arg.split('-');

//// debug
console.log('** debug **');
console.log('argv', argv);
console.log('config', config);
console.log('[app, index]', app, index);
console.log('** end debug **');

//// verify app exists in config
if (!config[app]) {
	exit(`${app} not in config: [${Object.keys(config).join(', ')}]`);
}

//// convenience
let appconfig = config[app];

//// Wrap string in array
if (typeof appconfig === 'string') {
	appconfig = [appconfig];
}
//// wrap array in object
if (Array.isArray(appconfig)) {
	appconfig = {
		web: appconfig
	}
}
//// 
console.log('appconfig', app, '::', appconfig.web);

