import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const BlogLink = styled(Link)`
  text-decoration: none;
`;

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: blue;
`;

// Destructure 'data' object from graphql
const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <div>
      <h2>Interesting articles by some of the greatest Richards.</h2>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
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
  </Layout>
)

export default IndexPage

export const query = graphql`
    query {
      allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
        edges {
          node {
            frontmatter {
              description
              date
              title
            }
            fields{
              slug
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
