import dotenv from 'dotenv';
import express from 'express';
import GraphHTTP from 'express-graphql';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import connectSessionSerialize from 'connect-session-sequelize';

import sql from './util/sql';
// import Schema from './schema';
import deserializeUser from './middleware/deserializeUser';

const SessionStore = connectSessionSerialize(session.Store);

// configuration #############################################

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const cookieSecret = process.env.COOKIE_SECRET || "don";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(cookieSecret));
app.use(session({
	store: new SessionStore({ db: sql }),
	secret: cookieSecret,
	resave: false,
}));
app.use(express.static('assets'));
app.use(deserializeUser);


// routing #############################################################

import reactRoute from './routes/react';

if (!process.env.SERVER_ONLY) {
	reactRoute(app);
}

// GraphQL API configuration  #########################################

// app.use('/graphql', GraphHTTP({
// 	schema: Schema,
// 	pretty: true,
// 	graphiql: true,
// }));

// Two server configurations are provided; one with a connected sql database and one without.
// Be sure to comment out whichever is not employed.

// Launch server with sql db configuration ##########################

sql.sync().then(function() {
	console.log("Database synced!");
	app.listen(port, function() {
		console.log("Server up and running on port ", port);
	});
})
.catch((error) => {
	console.error(error);
	console.error("Database failed to sync");
})


// Launch server without db ##########################################

// app.listen(port, function() {
// 	console.log("Server up and running on port ", port);
// });