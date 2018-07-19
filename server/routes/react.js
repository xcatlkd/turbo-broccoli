import express from 'express';
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config';
const IS_DEV = process.env.NODE_ENV === "development";

export default function(app) {
	const htmlFilePath = path.resolve(__dirname, "../../dist", "index.html");
	let htmlHandler;

	if (IS_DEV) {
		const compiler = webpack(webpackConfig);
		const devMW = webpackDevMiddleware(compiler, {
			publicPath: webpackConfig.output.publicPath,
			contentBase: path.resolve(__dirname, "../../src"),
			hot: true,
			stats: { colors: true },
		});

		app.use(devMW);
		app.use(webpackHotMiddleware(compiler));
		const mfs = devMW.fileSystem;

		console.log("Webpack is building. Please stand by.");
		htmlHandler = (req, res) => {
			devMW.waitUntilValid(() => {
				const html = devMW.fileSystem.readFileSync(htmlFilePath);
				renderHtmlWithReduxState(req, res, html);
			});
		}
	}
	else {
		htmlHandler = (req, res) => {
			try {
				const html = fs.readFileSync(htmlFilePath);
				renderHtmlWithReduxState(req, res, html);
			}
			catch (error) {
				console.error(error);
				res.end("Site is building");
			}
		};
		app.use(express.static(path.resolve(htmlFilePath, "..")));
	}
	app.get("*", htmlHandler);
}

function renderHtmlWithReduxState(req, res, html) {
	const reduxState = {
		user: {
			isLoggedIn: !!req.session.userId,
		}
	};
	const reduxHtml = html.toString().replace("undefined", JSON.stringify(reduxState));
	res.end(reduxHtml);
}