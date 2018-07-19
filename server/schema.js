import {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLList,
	GraphQLString,
	GraphQLInt,
} from 'graphql';


const Query = new GraphQLObjectType({
	name: "Query",
	description: "...",
	fields: () => {
		return {

		}
	}
});

const Schema = new GraphQLSchema({

})

export default Schema;