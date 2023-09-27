import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const postData = [
	{
		department: "Web Tech",
		title: "Đánh giá smartphone chip S660, RAM 8 GB, giá 6,99 triệu tại Việt Nam",
		author: "Amit Singh",
		designation: "TCE",
		info: `This post tells you about best approaches
      to write single line codes in JavaScript.
      Use this post as a quick guide to
      short but important JS codes`,
	},
	{
		department: "DSA",
		title: "Khám phá smartphone màn hình gập được đầu tiên của Samsung",
		author: "Jatin Sharma",
		designation: "TCE",
		info: `No need to worry about technical round interviews
      as this post will guide you step by step to
      prepare for DSA round`,
	},
	{
		department: "Content",
		title: "Doanh số iPhone XS và iPhone XR thảm hại, Apple sản xuất lại iPhone X",
		author: "Shobhit Sharma",
		designation: "TCE",
		info: `Worried about your PC safety? No Problem,
      this post tells you about the best antiviruses
      to choose in 2023`,
	},
];

function BlogPost({ post }) {
	return (
		<div className="border p-4 blog-post" style={{ marginBottom: "50px" }}>
			<h2>{post.title}</h2>
			<p>
				<strong>Department:</strong> {post.department}
			</p>
			<p>
				<strong>Author:</strong> {post.author}
			</p>
			<p>{post.info}</p>
		</div>
	);
}

export default function Blogs() {
	return (
		<>
			<Header />
			<div className="container mx-auto py-8">
				<h1 className="text-2xl font-bold mb-4" style={{textAlign: "center", color: "red"}}>Blog Posts</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{postData.map((post, index) => (
						<BlogPost key={index} post={post} />
					))}
				</div>
			</div>
			<Footer />
		</>
	);
}
