const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })

  // needs parenthesis, no ES6
  return graphql(`
    query GetSlugs {
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
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve("./src/templates/blog-post.js"),
        context: {
          slug: node.fields.slug,
        },
      })
    })
  })
}

const { createFilePath } = require(`gatsby-source-filesystem`)

// hook into build process
exports.onCreateNode = ({ node, getNode, actions }) => {
  // add a new field for graphql
  const { createNodeField } = actions
  // only for markdowns loaded with this plugin
  if (node.internal.type === `MarkdownRemark`) {
    // also gets baseUrl - should lookup docs for more in-depth info
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
