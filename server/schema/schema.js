const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
 } = graphql;

// dummy data
var comments_list = [
  { id:'1', comment_text: 'Many people are lying!', image_url: '/asset/img/liars.jpg', author: '1'},
  { id:'2', comment_text: 'How can I get this done? Impossible', image_url: '/asset/img/impossible.jpg', author: '2'},
  { id:'3', comment_text: 'The evil lie in the details!', image_url: '/asset/img/evil.jpg', author: '1'},
  { id:'4', comment_text: 'I would like to travel to Italy next month. Is that OK?', image_url: '/asset/img/italy.jpg', author: '3'},
];

var authors_list = [
  {id:'1', name: 'Magdalena Stranner', email: 'magda.stranner@gmail.com'},
  {id:'2', name: 'Bernard Adanlessossi', email: 'ben.adanlessossi@gmail.com'},
  {id:'3', name: 'Martin Fowler', email: 'martin.fowler@gmail.com'},
]

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: {type: GraphQLString},
    comment_text: {type: GraphQLString},
    image_url: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log('Parent: ' + parent.args);
        return _.find(authors_list, {id: parent.id});
        //return Author.findById(parent.authorid)
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        return _.filter(comments_list, {author: parent.id});
        //return Book.find({authorid: parent.id})
      }
    }
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
    },
    author: {
      type: AuthorType,
      args: {id: { type: GraphQLString }},
      resolve(parent, args){
        // code to get data from db
        return _.find(authors, {id: args.id});
        //return Author.findById(args.id);
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args){
        return comments_list;
        //return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return authors_list;
      }
    }
  }
});

module.exports = new GraphQLSchema ({
  query: RootQuery
});
