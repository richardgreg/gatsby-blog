/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path");
const {createFilePath} = require(`gatsby-source-filesystem`);

// get the node property when it is being created
exports.onCreateNode = ({ node, getNode, actions}) => {
    // node types can be File, ImageSharp, MarkdownRemark
    // getNode is a fxn that pulls the actual node obj representation of a file
    // Dynamically build out slug and attach to node as a field
    const {createNodeField} = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({node, getNode});

        // With this we append unto the created node a new slug property
        createNodeField({
            node,
            name: `slug`,
            value: slug
        })
    };
};

exports.createPages = ({graphql, actions}) => {
	// creatPage is an action that lets us actually build the pages inside the
	// app based on whatever property we pass to it from graphql. See below
	const {createPage} = actions;
	// return a graphql query that gives us all of our markdown remarks and
	// iterate over it while calling createpages on markdown nodes
	return graphql(`
	{
		allMarkdownRemark {
			edges {
				node {
					fields {
						slug
					}
				}
			}
		}
	}
  `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({node}) => {
        createPage({
          path: node.fields.slug,
					component: path.resolve(`./src/templates/blog-post.js`),
					context: {
						slug: node.fields.slug
					}
        })
      });
  })
}
