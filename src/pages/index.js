import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

// Destructure 'data' object from graphql
const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <div>
      <h1>Richard's Musings</h1>
      <h4>{data.allMarkdownRemark.totalCount}</h4>
      {
        data.allMarkdownRemark.edges.map(({node}) => (
          <div key={node.id}>
            <span>{node.frontmatter.title} - {node.frontmatter.date}</span>
            <p>{node.excerpt}</p>
          </div>
        ))
      }
    </div>
  </Layout>
)

export default IndexPage

export const query = graphql`
         query {
           allMarkdownRemark {
             edges {
               node {
                 frontmatter {
                   description
                   date
                   title
                 }
                 id
                 excerpt
               }
             }
             pageInfo {
               perPage
             }
             totalCount
           }
         }
       `
