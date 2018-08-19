const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

// dummy data
var comments_list = [
  {id:'1', comment_text: 'Many people are lying!', image_url: '/asset/img/liars.jpg'},
  {id:'2', comment_text: 'How can I get this done? Impossible', image_url: '/asset/img/impossible.jpg'},
  {id:'3', comment_text: 'The evil lie in the details!', image_url: '/asset/img/evil.jpg'},
  {id:'4', comment_text: 'I would like to travel to Italy next month. Is that OK?', image_url: '/asset/img/italy.jpg'}
];

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: {type: GraphQLString},
    comment_text: {type: GraphQLString},
    image_url: {type: GraphQLString}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    comment: {
      type: CommentType,
      args: {id: {type: GraphQLString}},
      resolve(parent,args){
        // Get data from db
        return _.find(comments_list, {id: args.id});
      }
    }
  }
});

module.exports = new GraphQLSchema ({
  query: RootQuery
});
