import React from "react";
import {graphql} from "gatsby";
import Layout from "../components/layout";

export default ({data}) => {
    const post = data.markdownRemark;
    return (
			<Layout>
				<div>
					<h1>{post.frontmatter.title}</h1>
					<div dangerouslySetInnerHTML={{__html: post.html}}/>
				</div>
			</Layout>
		)
};

// query recieves a madatory (!) String
// get back a markdownRemark that matches field to slug value
// pl
export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: {slug: {eq: $slug}}){
            html
            frontmatter {
                title
            }
        }
    }
`;