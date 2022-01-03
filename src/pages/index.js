import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogLink = styled(Link)`
  text-decoration: none;
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: blue;
`

// After the export of const at the bottom data is just passed in props
const IndexPage = ({ data }) => (
  <Layout>
    <Seo title="Home" />
    <div>
      <h1>Yihua Thoughts</h1>
      <h4>{data.allMarkdownRemark.totalCount}</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <BlogLink to={node.fields.slug}>
            <BlogTitle>
              {node.frontmatter.title} - {node.frontmatter.date}
            </BlogTitle>
          </BlogLink>
          <p>{node.excerpt}</p>
        </div>
      ))}
    </div>

    {/* <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["auto", "webp", "avif"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />
    <p>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link> <br />
      <Link to="/using-ssr">Go to "Using SSR"</Link> <br />
      <Link to="/using-dsg">Go to "Using DSG"</Link>
    </p> */}
  </Layout>
)

export default IndexPage

// this is a copy paste from ___graphql
// data structure is the same so it's easy to pull whatever we need
export const query = graphql`
  query GetPosts {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          html
          frontmatter {
            date
            description
            title
          }
          fields {
            slug
          }
          excerpt
        }
      }
      totalCount
    }
  }
`
