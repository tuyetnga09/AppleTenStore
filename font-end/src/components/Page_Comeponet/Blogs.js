export default function Blogs() {

	// Adding Dummy Data to pass as props
	const postData = [
		{
			department: "Web Tech",
			title: "Top 7 JavaScript One liners",
			author: "Amit Singh",
			designation: "TCE",
			info: `This post tells you about best approaches
				to write single line codes in JavaScript.
				Use this post as a quick guide to
					short but important JS codes`,
		},
		{
			department: "DSA",
			title: "Top Interview DSA Questions",
			author: "Jatin Sharma",
			designation: "TCE",
			info: `No need to worry about technical round interviews
				as this post will guide you step by step to
				prepare for DSA round`,
		},
		{
			department: "Cotent",
			title: "Best Antiviruses of 2023",
			author: "Shobhit Sharma",
			designation: "TCE",
			info: `Worried about your PC safety? No Problem,
				this post tells you about the best antiviruses
				to choose in 2023`,
		}
	]
	return (
		<div >
		
			<div className='grid grid-cols-3 gap-4 p-8'>
				{postData.map((e) => {
					
				})}
			</div>

		</div>
	)
}
