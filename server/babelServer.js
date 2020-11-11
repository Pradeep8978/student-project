/* eslint-disable no-undef */
require('@babel/register')({
	plugins: ['@babel/plugin-proposal-object-rest-spread']
});
require('@babel/polyfill');

try {
	
	require('./app.js');
} catch (err) {
	// eslint-disable-next-line no-console
	console.error('****************PARSING ERROR*********', err);
}