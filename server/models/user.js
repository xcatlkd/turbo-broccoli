import sql from '../util/sql';
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import path from 'path';
import fs from 'fs-extra';

const User = sql.define('user', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	username: {
		type: Sequelize.STRING,
		notNull: true,
		unique: true,
	}
})

export default User;