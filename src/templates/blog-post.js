import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

// this is a component for gatsby-node so it should be separate from actual react components
export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
      </div>
    </Layout>
  )
}

// this is just a graphql query language, you can click it out in playground
export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
