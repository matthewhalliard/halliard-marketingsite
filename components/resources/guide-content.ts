// The media planning guide's text, written for Halliard's original site and
// carried over with light edits. Inline **bold** and [links](/path) are
// rendered by the guide page.

export type GuideBlock =
  | { t: 'h2' | 'h3'; text: string; id: string }
  | { t: 'h4' | 'p'; text: string }
  | { t: 'ul'; items: string[] }

export const GUIDE: GuideBlock[] = [
  {
    "t": "h2",
    "text": "What is media planning?",
    "id": "what-is-media-planning"
  },
  {
    "t": "p",
    "text": "Media planning is the process of identifying, analyzing, and choosing the right advertising channels and media platforms to connect with your target audience. A media plan specifies the audience, geography, frequency of ads, timing, budget, and the campaign’s ultimate goal."
  },
  {
    "t": "p",
    "text": "Media planners are often additionally tasked with media buying. They are media specialists who understand how to formulate a strategic plan, which includes researching and choosing the right channels for the audience, implementing advertising campaigns, and tracking ad performance against desired metrics."
  },
  {
    "t": "p",
    "text": "While we often think of digital channels as the whole of the advertising landscape, traditional media has a place here as well and is largely unhindered by data regulation. Unfortunately, traditional media, like television, radio, and outdoor or out-of-home (OOH) advertising, can also be hard to track. However, they still play a role and are essential in helping marketers extend the value and reach of their campaigns."
  },
  {
    "t": "p",
    "text": "Multi-channel digital marketing enables brands to target highly specific audiences, opening up segmentation, personalization, and advanced analytics tools to ensure your message hits home with the right people. Depending on the audience, traditional channels may also be appropriate and can be a highly successful adjunct to online ads."
  },
  {
    "t": "p",
    "text": "Media planning illuminates the potential of every possible platform based on the audience, helping marketers achieve a more focused strategy that resonates with the right people, maximizing engagement, awareness, and ROI."
  },
  {
    "t": "h3",
    "text": "Media planning key concepts and benefits",
    "id": "media-planning-key-concepts-and-benefits"
  },
  {
    "t": "p",
    "text": "Customers today engage across multiple media channels. For maximum reach, marketers should aim to put their ads in places where their audience is more likely to look. Traditional channels like television, radio, print, and OOH advertising are still valid but may be more challenging to measure. Digital advertising can be more precisely targeted and tracked, but brands risk overspending or falling short of their campaign goals without the right strategy and management."
  },
  {
    "t": "p",
    "text": "Ultimately, you want to create content audiences want to consume and deliver it on channels and platforms they love. Sounds simple enough, right? With the proper strategy, it can be!"
  },
  {
    "t": "p",
    "text": "With that in mind, here are the top three concepts in media planning:"
  },
  {
    "t": "h4",
    "text": "Identify the target audience"
  },
  {
    "t": "p",
    "text": "Media planners conduct extensive market and consumer data research to illuminate the ideal audience, their preferences, and online behaviors. Understanding the audience allows marketers to craft advertising that resonates with the right people, driving engagement and conversions. Audience identification is accomplished through extensive research, through which brands develop customer personas to guide their messaging."
  },
  {
    "t": "h4",
    "text": "Maximize reach"
  },
  {
    "t": "p",
    "text": "Ad placement, frequency, and timing are critical. When you get it right, you’ll increase audience engagement and conversions. Audience research is essential to accomplish this goal. Based on this research, media planners can choose the most appropriate channels and times to ensure the campaign reaches the target audience on their terms. Reach can be maximized through a strategic mix of channels, formats, and media properties, helping to build trust with the audience as you gain brand visibility."
  },
  {
    "t": "h4",
    "text": "Optimize budget"
  },
  {
    "t": "p",
    "text": "A big part of media planning is analyzing the costs and effectiveness of various media channels based on audience data. When your ads are shown to the right people at the right times on the right platforms, marketing ROI increases, campaign results are more predictable, and brands can reduce unnecessary spending on ineffective channels."
  },
  {
    "t": "h3",
    "text": "The benefits of media planning",
    "id": "the-benefits-of-media-planning"
  },
  {
    "t": "p",
    "text": "What works for each brand will depend on many things. Marketers can’t rely on a cookie-cutter approach. Extensive research is vital as it informs channel selection, the ultimate goal of which is to reach as many people as possible with a seamless, consistent message. Consistency drives brand recognition, encouraging consumer trust. Trust builds loyalty, and loyal customers lower the cost of acquisition, driving marketing ROI."
  },
  {
    "t": "p",
    "text": "Media planning helps you:"
  },
  {
    "t": "ul",
    "items": [
      "Understand your audience better",
      "Choose the right channels to reach them",
      "Determine the frequency and timing of your ads and other marketing content",
      "Stay on top of shifting trends in online media, technology, and digital advertising",
      "Stay on budget as you achieve measurable results",
      "Measure the success of your media planning efforts"
    ]
  },
  {
    "t": "h3",
    "text": "Types of media planning",
    "id": "types-of-media-planning"
  },
  {
    "t": "p",
    "text": "We start with an overall media plan at the channel level, then break each channel down into its own sub-plan, which may include:"
  },
  {
    "t": "ul",
    "items": [
      "Television plan",
      "Radio plan",
      "Social media plan",
      "Paid digital advertising plan",
      "Print media plan",
      "OOH media plan"
    ]
  },
  {
    "t": "p",
    "text": "A media plan helps to align people and efforts across multiple channels, ensuring a streamlined, consistent message no matter where it appears. Consistency builds trust; your messaging may miss the mark if you can’t establish that."
  },
  {
    "t": "h2",
    "text": "Setting a strategy",
    "id": "setting-a-strategy"
  },
  {
    "t": "p",
    "text": "Now that we’ve established the core concepts and benefits of media planning, let’s discuss how to do it."
  },
  {
    "t": "p",
    "text": "Research is the first and most critical task. Knowing what you want to accomplish is also important. Your research will help you determine the best ways to achieve those goals."
  },
  {
    "t": "h3",
    "text": "Audience research",
    "id": "audience-research"
  },
  {
    "t": "p",
    "text": "Every media planning process starts with research. Knowing your customers and market landscape is vital, as is keeping an open mind. Even if you have established buyer personas, consumer preferences, attitudes, and online behaviors change frequently. New platforms, technology, and trends are constantly popping up, so getting into the customer’s minds and on top of what’s hot will ensure you stay there."
  },
  {
    "t": "p",
    "text": "When you understand these details, it’s easier to create a media plan that resonates, meaning it will be clicked, shared, and seen by the right people."
  },
  {
    "t": "p",
    "text": "Chances are your research will reveal several segments to target, some of which you may have otherwise ignored."
  },
  {
    "t": "p",
    "text": "For example, let’s say you’re a supplement company and discover that 35% of your target audience learn about new products on television, 80% make product choices based on online reviews, and only 15% trust branded ads on Instagram. While you may not have considered TV a viable outlet, 35% is a significant percentage of people. Reducing your ad spend on Instagram, creating a TV campaign, and paying more attention to your reviews and social proof might be the way to go."
  },
  {
    "t": "p",
    "text": "Research may also reveal what social media platforms they prefer, the streaming services they subscribe to, podcasts they listen to, and even what devices they use to access content. This data should inform the type of media you create and how to format it for the best possible customer experience."
  },
  {
    "t": "p",
    "text": "And what if your customers aren’t necessarily online? Depending on your audience, they may respond better to more traditional media. Earned media, PR, and OOH advertising could help you capture that demographic and can also support and reinforce your online efforts."
  },
  {
    "t": "p",
    "text": "Some brands have had tremendous success with OOH using out-of-the-box thinking. Examples include [Coca-Cola’s “Share a Coke”](https://www.historyoasis.com/post/share-a-coke) campaign, which put people’s names on Coke labels. An [Amstel Radler installment](https://lbbonline.com/news/amstel-radler-and-publips-serviceplans-lemon-stuffed-billboard-keeps-passersby-guessing/) was made entirely out of real lemons, and passers-by were invited to guess how many to win a year’s supply of the beer."
  },
  {
    "t": "p",
    "text": "Other examples include interactive signs or displays encouraging engagement or simply putting your ads where your people tend to go. An Uber ad in a nightclub bathroom, a drink brand’s ad on charging stations at the airport, or a local restaurant advertising on a local dry cleaner’s hangers are all excellent examples of how OOH can hit home with the right audience at the right time."
  },
  {
    "t": "p",
    "text": "The more detailed your market research, the more precise your answers about where to focus your efforts and budget."
  },
  {
    "t": "h3",
    "text": "Setting objectives",
    "id": "setting-objectives"
  },
  {
    "t": "p",
    "text": "Media planning aims to narrow down the best possible combination of outlets and strategies to support your marketing campaign, product, service, or brand."
  },
  {
    "t": "p",
    "text": "But before you create and launch any marketing campaign, you need to know why you’re doing it. What’s the goal? Do you want to drive brand awareness? Are you launching a new product? Are you hoping to generate leads?"
  },
  {
    "t": "p",
    "text": "Any of the above are valid objectives. Establishing clear and concise numbers around each one is most important as it gives you something to shoot for. Without a target, it will be challenging to measure success."
  },
  {
    "t": "p",
    "text": "Marketing objectives should always align with long and short-term business goals. Such objectives are usually quite broad but should inform every decision in the media planning journey."
  },
  {
    "t": "p",
    "text": "Here are a few examples of objectives and related key performance indicators (KPIs):"
  },
  {
    "t": "ul",
    "items": [
      "**Increase sales of a product by 30% within a set timeframe.** Your KPIs might include CTRs from your online ads, the number of online reviews, and actual sales data.",
      "**Generate XXX new qualified leads for a product or service within a set timeframe**. Track CTRs that result in a trial download or request for a callback. You can also track your acquisition cost.",
      "**Increase awareness of the brand or a new product**. Here, you’d track impressions or engagement through online ads, QR codes, or direct inquiries."
    ]
  },
  {
    "t": "p",
    "text": "Once you’ve established your objectives, you’ll know what KPIs to track. KPIs are the measurable results of your efforts. You can choose several KPIs to track per objective but resist the urge to measure everything. Choosing two or three relevant metrics will give you more meaningful and concise results."
  },
  {
    "t": "p",
    "text": "Going overboard with KPIs (because there are so many you can track) will complicate the process and muddy your results. It’s a much better approach to just choose the most meaningful metrics so your team doesn’t get bogged down in numbers that may be irrelevant—even if they are interesting. In other words, just because you can measure something doesn’t mean you ought to. Prioritize what’s most important, give weight to your top two or three, and carry on."
  },
  {
    "t": "h3",
    "text": "Understanding the consumer journey",
    "id": "understanding-the-consumer-journey"
  },
  {
    "t": "p",
    "text": "The customer journey is how your audience interacts with and experiences your brand. From awareness to engagement, conversion, and loyalty, every interaction is an opportunity to create a positive experience."
  },
  {
    "t": "p",
    "text": "A good customer journey supports marketing and media planning efforts, helping to maximize engagement and ensuring a seamless customer experience."
  },
  {
    "t": "p",
    "text": "This is how customer personas support media planning. The better you know your customers, the easier it is to choose channels and strategies that resonate the most. As your campaigns mature, the data you collect will inform ongoing improvements, help you enhance your personas, and optimize targeting."
  },
  {
    "t": "p",
    "text": "Understanding your customer and the psychology of their journey is foundational to your media plan. Many media planners create a customer journey map to identify bottlenecks, inconsistencies, and redundancies that may become conversion barriers."
  },
  {
    "t": "p",
    "text": "In best practice, you should create your journey map before launching any media, as it will help you understand what needs to occur and when. Missing elements may challenge the customer experience, but knowing where the gaps are will inform where improvements should be made.."
  },
  {
    "t": "p",
    "text": "Here are some points to consider when creating your journey map:"
  },
  {
    "t": "ul",
    "items": [
      "Define and develop customer personas.",
      "Establish primary and secondary segments within these personas for media targeting.",
      "Articulate your unique value proposition.",
      "What differentiates your brand/product/service from the competition?",
      "Are there any value-added incentives you can offer to support adoption/conversion?",
      "What media outlets and types will resonate with your audience?",
      "Plan a retargeting strategy to re-engage customers in the consideration phase.",
      "Budget media spending based on touchpoints in the customer journey.",
      "Optimize landing pages to facilitate conversions.",
      "Simplify the conversion process; remove friction."
    ]
  },
  {
    "t": "p",
    "text": "The better the customer experience is, the easier it will be to convert. The more customer-centric your strategy, the less challenging it will be to engage. Be top of mind, but put your customer first, and loyalty will ensue."
  },
  {
    "t": "h2",
    "text": "Understanding your audience",
    "id": "understanding-your-audience"
  },
  {
    "t": "p",
    "text": "Now that you know how important it is to understand your audience, let’s discuss how to do it. This section will define audience targeting and show how media planners can target customers most likely to convert."
  },
  {
    "t": "p",
    "text": "The better your strategy, the less time, energy, and resources you’ll waste on people who simply aren’t interested in what you’re selling."
  },
  {
    "t": "h3",
    "text": "Building a strategic audience",
    "id": "building-a-strategic-audience"
  },
  {
    "t": "p",
    "text": "Audience strategies are built on data, and that data informs segmentation. Collecting, organizing, and analyzing data is the first step, as this will acquaint you with the customer behaviors and preferences that indicate intent."
  },
  {
    "t": "p",
    "text": "Interpreting intent isn’t always straightforward, but the more precisely you can do this, the more successful your media strategy will be. Relevance is key. When you serve content customers connect with, you’ll gain their attention and win a competitive advantage."
  },
  {
    "t": "p",
    "text": "Consumer panels, or paid surveys, are an excellent way to collect first-party audience data. Panels can be paid or unpaid and are designed to provide you with direct feedback on the product, service, or more general insights on the broader market. As cookies disappear, consumer panels are taking on new importance as they delve into customer motivations and what drives their decisions."
  },
  {
    "t": "p",
    "text": "[Data management platforms](/how-it-works) are essential to this process, as you’ll need to consider vast amounts of consumer data to arrive at an informed conclusion. The quality of the data and the size of the samples are also crucial, so choosing an unbiased platform that uses a broad sample from your target demographic is critical."
  },
  {
    "t": "p",
    "text": "A solid segmentation strategy helps you build highly relevant, personalized content that improves conversion likelihood. A data management platform also helps you create audiences within audiences, enabling you to target specific customer personas more precisely."
  },
  {
    "t": "h4",
    "text": "Leverage third-party data to build digital audiences"
  },
  {
    "t": "p",
    "text": "Next, we’ll leverage third-party data to flesh out audience intent further. You can pull third-party data from search platforms like Google Ads and Facebook. Search intent is keyword-driven. Knowing what search terms your target audience uses will help you further optimize your content and tell you which audience segments perform better based on keywords and key phrases."
  },
  {
    "t": "p",
    "text": "While search engines segment audiences based on search terms, ad platforms like Facebook segment customer groups based on lifestyle, hobbies, interests, and demographic data. Both are relevant."
  },
  {
    "t": "p",
    "text": "Leveraging first-party data (from your data management platform) and third-party data (from Google, Facebook, etc.), you can create various audience segments based on custom intent, affinity, and the customer journey and build outreach strategies to deliver personalized content targeted to each segment."
  },
  {
    "t": "h3",
    "text": "Selecting channels",
    "id": "selecting-channels"
  },
  {
    "t": "p",
    "text": "At a fundamental level, there are two types of media channels:"
  },
  {
    "t": "ul",
    "items": [
      "**Offline media**, such as cable television, radio, print media (newspapers and magazines), and OOH advertising, like billboards, signs, events, direct mail, and other real-world ad surfaces.",
      "**Television** ads can be very effective for some brands as they are highly visual and allow advertisers to tell their stories more engagingly. TV ads can also cover streaming television channels, cable, and YouTube, as these formats are often viewed on a television.",
      "**Magazines** are an excellent offline channel as they tend to stick around longer. People keep magazines after they’ve been read (anyone who’s ever been in a doctor’s waiting room can attest to this), so magazine ads have a particular appeal. Because of the tactile quality of magazines, there is a high level of trust associated with magazine ads versus other media types. Consumers are also less likely to tune out magazine ads as they are often related to niche interests related to the magazine’s content. The advertiser gains a secondary audience when magazines are passed along to others—family, friends, colleagues, or people in waiting rooms.",
      "**Newspapers** are an excellent choice for brands looking to make a local impact. Advertisers can choose what section their ad appears in to improve their target audience visibility (i.e., a yoga studio advertising in the Lifestyle section or a theater advertising in the Entertainment section). Newspaper readers have a particular demographic. Many are high earners, are professionals, and have college degrees, which may tie into your audience profile.",
      "**Radio** advertising is locally targeted and is a way to gain traction and awareness in multiple markets. Radio ads also have a shorter lead time so that you can get your ads into circulation quickly at a significantly lower cost than other traditional media.",
      "**Out-of-home (OOH/outdoor media)** can include billboards, in-store displays, clubs, restaurants, trade show booths, events, store packaging, direct mail, flyers, luggage carts at the airport, and myriad innovative surfaces where ads might be seen.",
      "**Online media** includes websites, social media, online video, display advertising, search engine advertising, streaming service ads, and other forms of digital advertising.",
      "**Pay-per-click (PPC)** ads are online ads targeted to a specific audience, keywords, etc. PPC also enables retargeting, wherein advertisers can serve their ads to people who have visited their site or clicked on the ad but did not convert.",
      "**Social media advertising** can be very cost-effective and targeted, much like PPC. While there are many advantages to targeting and tracking social ads, consumers today are so bombarded with advertisements that they tend to tune them out. Advertisers must stay on top of trends and create compelling content that stands out, as the space is highly competitive.",
      "**Digital magazines** can be an excellent way to reach a niche audience, much like a print publication. They have a known circulation and can track open rates to help you gain insight into your ad’s performance. This method can be excellent for lead generation, especially for local small businesses. For example, local services advertising in an HOA publication.",
      "**Programmatic advertising** serves your digital ad across multiple platforms using a bidding process. However, the space can be very competitive, and if you are outbid for specific keywords, you might not get the traction you expect."
    ]
  },
  {
    "t": "p",
    "text": "While online media might be more appropriate for some advertisers, offline media can be incredibly lucrative, too. The channel strategy you choose should be informed by your research and what the target audience responds to. Define your audiences and segments, know their preferences, and budget your media spending based on what will work best."
  },
  {
    "t": "p",
    "text": "A data-driven approach is essential to ensure ROI. Getting the right mix is what media planning is all about."
  },
  {
    "t": "h3",
    "text": "Selecting properties and formats",
    "id": "selecting-properties-and-formats"
  },
  {
    "t": "p",
    "text": "In recent years, many brands have taken advantage of the ease and availability of online platforms and myriad other digital opportunities, embracing a “more is better” philosophy. Unfortunately, this approach wastes a lot of resources without any discernible benefit."
  },
  {
    "t": "p",
    "text": "Just because your ad is “out there” doesn’t mean the right people are seeing it. Taking a more intentional approach helps you reduce unnecessary ad spend and enables you to focus on results and make every effort count."
  },
  {
    "t": "p",
    "text": "When we talk about where to put ad dollars, we want to focus on two concepts: properties and formats."
  },
  {
    "t": "p",
    "text": "Broadly, **properties** refer to the real estate where ads appear, like billboards, news publications, or any space where you purchase ad space. In the digital realm, a property could also be a website, blog, podcast, the New York Times, ABC News, or a billboard in Times Square."
  },
  {
    "t": "p",
    "text": "On the other hand, **formats** describe the medium itself or how the content is presented. Examples could include a giant billboard, a half-page newspaper ad, or a 30-second video/TV ad."
  },
  {
    "t": "p",
    "text": "The key is to choose the right mix of properties and formats to drive campaign results. Your research will guide you to the right choices. The core idea here is to ensure you’re reaching the right people on their turf—meaning you want your ads to appear where they already go, on their devices, when and where you’ll get their attention."
  },
  {
    "t": "h2",
    "text": "Putting the plan together",
    "id": "putting-the-plan-together"
  },
  {
    "t": "p",
    "text": "The most successful media plans capture the essence of a brand and its unique value proposition. For marketers, this goes beyond the message itself, focusing instead on how it is communicated."
  },
  {
    "t": "p",
    "text": "Whether you tell your story emotionally with television ads, embrace the interactivity of social media, the brief, punchy messaging of radio spots, or all of the above, each aspect of the plan should enforce the brand identity and, ultimately, create a cohesive, streamlined message that’s recognizable no matter where the consumer sees it."
  },
  {
    "t": "h3",
    "text": "Understanding how channels work together",
    "id": "understanding-how-channels-work-together"
  },
  {
    "t": "p",
    "text": "The synergy between media channels amplifies the messaging and can produce a more impactful result."
  },
  {
    "t": "p",
    "text": "The traditional ‘rule of seven’ suggests that a consumer needs to hear a marketing message at least seven times before taking action. If you’ve ever wondered why marketers focus on multiple channels, that’s the gist of it. Of course, when you have campaigns running on various platforms, formats, and properties, it’s even more critical to ensure consistency, as the consumer needs to be able to connect what they see on each platform back to a common source."
  },
  {
    "t": "p",
    "text": "Some channels work very well together, especially when considering consumer device preferences and their behaviors at certain times of the day."
  },
  {
    "t": "p",
    "text": "For example:"
  },
  {
    "t": "ul",
    "items": [
      "**Desktop and Mobile**: Best during weekday working hours. Most people are at work and on their phones for business and personal reasons. Activity drops off on the weekends.",
      "**Television and Mobile**: Peaks during evening hours, after work through bedtime (5 PM to 11 PM).",
      "**Radio and TV**: Peaks on weekday mornings.",
      "**Computer and Radio**: Has decent traction during the week but drops off after 5 PM.",
      "**Mobile and Radio**: Better volumes than computer/radio but also drops off on weekends."
    ]
  },
  {
    "t": "p",
    "text": "Multi-channel strategies combine well on digital formats. More touch points invite customers to use their preferred device or medium to connect on their terms, increasing the potential for conversion. It also lets marketers collect more data, helping you understand what works best for your audience."
  },
  {
    "t": "p",
    "text": "For example, you may gain some ground with organic search engine results, but paired with PPC and search engine ads, you may see up to 420% more interest. If TV ads are added to the mix, the number goes up to 526%."
  },
  {
    "t": "p",
    "text": "Adding OOH advertising further reinforces the message, allowing you to reach consumers while walking, driving, scrolling through their devices, or watching television at home. Data shows that a multi-channel strategy that includes OOH increases campaign ROI significantly, sometimes up to 25%."
  },
  {
    "t": "p",
    "text": "OOH advertising makes a strong statement and is often more trusted than online ads. Though consumers will see your ads online, the reinforcement of a billboard or store signage instills confidence. Plus, when interactive features are integrated, OOH advertising can be highly engaging, encouraging consumers to lean in and learn more. Interactive elements can include touchscreens, QR codes, or website/social URLs."
  },
  {
    "t": "p",
    "text": "Further benefits of multi-channel strategies are that they are cost effective and help marketers optimize budgets. For example, TV ads are more costly than digital but potentially provide more exposure, while OOH ads represent a significantly lower cost per impression."
  },
  {
    "t": "p",
    "text": "In terms of quantification, multi-channel mixes provide a range of measurable data that can be collected in various ways. Digital channels offer more concise insights, while ratings and listenership can gauge TV and radio reach. OOH is measured by footfall. These results should help you understand channel performance and inform future media planning decisions."
  },
  {
    "t": "h3",
    "text": "Grouping channels by objective",
    "id": "grouping-channels-by-objective"
  },
  {
    "t": "p",
    "text": "Let’s categorize various channels by what they’re best at accomplishing."
  },
  {
    "t": "ul",
    "items": [
      "**Generating Brand Awareness**: Television, radio, and out-of-home advertising is best for mass brand awareness. The extensive nature of their reach means your ads will be in front of more people than almost any other method",
      "**Driving Traffic and Sales**: Digital marketing, especially search and social media ads, is excellent for driving engagement, web traffic, and conversions through direct sales.",
      "**Engaging Your Audience**: Social media, content marketing, and online reviews are opportunities to foster deeper connections with your audience and encourage interactivity."
    ]
  },
  {
    "t": "h3",
    "text": "Ad frequency",
    "id": "ad-frequency"
  },
  {
    "t": "p",
    "text": "Ad frequency refers to how often your ads are served. For instance, on the radio, you might choose to have your ad play three times every hour during peak times and hourly during off-peak times. This approach ensures that the listeners who are most important to you will hear your ad. This is a very basic example of flighting."
  },
  {
    "t": "p",
    "text": "Generally, there are three approaches to choosing ad frequency:"
  },
  {
    "t": "ul",
    "items": [
      "**Flighting** refers to alternating rhythms, where ads run frequently for a set time, followed by a pause, and resumed later. Flighting is an excellent way to optimize ad budgets and is also appropriate for seasonal or limited-time products or offers.",
      "**Continuity** is where ads run on a consistent schedule during the campaign and is best for brands that want to stay top-of-mind with consumers all the time.",
      "**Pulsing** combines the above two strategies. Periods of high-volume frequency followed by low-frequency ads ensure your brand stays visible."
    ]
  },
  {
    "t": "p",
    "text": "Flighting is often the preferred approach as it underscores the point that not all advertising is equally effective throughout the year. Taking a more fluid approach ensures the messaging appeals to consumers year-round."
  },
  {
    "t": "h3",
    "text": "Flighting out your plan",
    "id": "flighting-out-your-plan"
  },
  {
    "t": "p",
    "text": "Compared to always-on, flighting delivers superior ROI. Data shows that flighting after going dark for two weeks generates 91% profit compared to a continuous strategy while returning after a four-week hiatus, which showed 88% in the first week [[source](https://keends.com/flighting-your-advertising-the-ultimate-guide/)]. Ultimately, the four-week flight showed greater profitability than the two-week strategy, but both approaches represented a decrease versus always-on."
  },
  {
    "t": "p",
    "text": "Media planners flight campaigns so they can redirect funds into other channels for the flighted time. Results and net profits should always be weighed against the cost savings of using this approach; in other words, you may see a profit surge during flighting, but the overall benefits might not be as dramatic."
  },
  {
    "t": "p",
    "text": "Some research suggests that net profits from flighting decrease slightly with each flight as the first flighted period will always start a bit lower each time it starts back up."
  },
  {
    "t": "h3",
    "text": "Seasonal considerations",
    "id": "seasonal-considerations"
  },
  {
    "t": "p",
    "text": "Seasonal trends and consumer behaviors should always be considered when flighting a campaign. For example, retail advertisers may want to double down during the holiday shopping season, while travel brands may see better results during spring and summer."
  },
  {
    "t": "h3",
    "text": "Rotating the creative",
    "id": "rotating-the-creative"
  },
  {
    "t": "p",
    "text": "Rotating ad creative is an approach used to test different messages and designs to see what resonates with an audience."
  },
  {
    "t": "p",
    "text": "So, what does this mean? Most campaigns have several versions of the same digital ad running. When you set up your ad, you can choose the order you want each version served. The consumer will then see your ads in the sequential order you choose. This way, you can ramp up the message and change it a little so it’s different each time."
  },
  {
    "t": "p",
    "text": "Another benefit of rotating the creative is the data showing which version performs best. For example, your analytics may show that your first creative version gets a CTR of 20%, while the second gets 10%, and the third only gets 6%. Using tools like [Google Campaign Manager 360](https://support.google.com/campaignmanager/answer/2826489?hl=en) helps you optimize your creative rotation based on these types of results. The system will automatically give weight to higher-performing ads, taking some heavy lifting off your plate."
  },
  {
    "t": "h2",
    "text": "Measuring success",
    "id": "measuring-success"
  },
  {
    "t": "p",
    "text": "A solid measurement framework is crucial for evaluating the success of your media plan. As mentioned in previous sections, we accomplish this by setting clear KPIs and utilizing various tools and platforms to track and analyze performance data."
  },
  {
    "t": "p",
    "text": "Here are a few best-practice methodologies media planners use to quantify campaign success."
  },
  {
    "t": "h4",
    "text": "Marketing mix modeling"
  },
  {
    "t": "p",
    "text": "Marketing mix modeling (MMM) is a powerful data science tool used in integrated media strategies leveraging multiple channels across mediums. MMM analyzes historical data to quantify the impact of marketing activities on sales and then predicts the potential impact of future media plans to inform future efforts."
  },
  {
    "t": "p",
    "text": "Implementing MMM involves sophisticated econometric modeling and statistical analysis. It works best alongside the other measures below rather than on its own. Halliard runs [mix models](/mmm) for agencies and their clients."
  },
  {
    "t": "ul",
    "items": [
      "**Long-and Short-Term Effects**. MMM can help you see a campaign’s immediate effects and any longer-term impact on consumer behavior and sales.",
      "**Attribution of MMM.** By accounting for interactions between media channels, MMM provides a view of how different elements of a media plan contribute to the campaign’s success but should be used with other attribution tools to obtain more meaningful results."
    ]
  },
  {
    "t": "h4",
    "text": "Tools and analytics"
  },
  {
    "t": "p",
    "text": "Use all available tools to measure the effectiveness of your media. Google Analytics, Google Ads, social media insights and your media planning tool all provide data to inform future strategies."
  },
  {
    "t": "p",
    "text": "Today, there are so many options to consider in media planning. Ideally, you’ll want to choose a stack that simplifies processes so you can focus more on making customers happy and less on the intricacies of the channels you choose."
  },
  {
    "t": "p",
    "text": "The philosophy here is that the better informed you are at the outset and through every touchpoint, the better your decisions will be. The world’s most powerful leaders rarely make a move without supporting data, consensus, and industry-leading expertise to inform them."
  },
  {
    "t": "p",
    "text": "Media planning templates and tools help planners visualize the pathways to achieving campaign goals. Here are a few of the top types of tools we recommend."
  },
  {
    "t": "h4",
    "text": "Reach and frequency against your audience"
  },
  {
    "t": "p",
    "text": "Audience measurement companies are popular sources of reach data, telling you how many people your campaign reached. Modern media planning tools like [Halliard](/) build reach and frequency into the plan itself, modelled against your audience before you spend."
  },
  {
    "t": "h4",
    "text": "In-platform measurement"
  },
  {
    "t": "p",
    "text": "Buying tools help you identify and access channels based on your audience, engagement style, and campaign goals. Most support cross-channel budget optimization to help your investment go further; some will even reallocate resources while campaigns run to take advantage of trends and opportunities."
  },
  {
    "t": "h4",
    "text": "Analytics tools"
  },
  {
    "t": "p",
    "text": "Analysis and measurement are essential to every campaign. Without powerful tools to accomplish these tasks, it would be impossible to determine if your efforts were working. In today’s competitive landscape, there is no room for guesswork, and you simply can’t rely on opinions, no matter how well-informed. Data, on the other hand, does not lie. You need the benefit of real-time insights into traffic, engagement, conversions, and the customer journey."
  },
  {
    "t": "p",
    "text": "Google Analytics is a free tool providing highly detailed data into online campaigns. Third-party tools like Sprout Social do the same for your social data."
  },
  {
    "t": "p",
    "text": "OOH can be measured using various location-tracking methods, including sensors, QR codes, eye-tracking technology, and actual conversions. Print media can be tracked based on circulation, subscriptions, and sales data."
  },
  {
    "t": "p",
    "text": "Larger OOH properties, like billboards and signs, can be assessed using location measurement tools, usually provided by the property’s owner. For example, suppose your ad is inside a nightclub. In that case, the club can provide an estimate of attendance, which can help you gauge impressions versus conversions (i.e., people who engaged with the ad or took the desired action, like visiting a website, tagging the brand on social media, or engaging with an interactive feature)."
  },
  {
    "t": "h4",
    "text": "Tracking codes and phone numbers on your ads"
  },
  {
    "t": "p",
    "text": "Conversion tracking tools help you understand how well your media planning strategies are working. For example, directing consumers to visit a website, scan a QR code, or call a number when they see an ad. Tracking these responses provide insights into your ad performance."
  },
  {
    "t": "h4",
    "text": "GeoLift"
  },
  {
    "t": "p",
    "text": "GeoLift is an open-source tool used to measure marketing lift from a geographical standpoint. Similar to A/B testing, it allows media planners to see how well their ads are reaching a target audience in a specific area compared to a control group in another region, i.e., Chicago versus Boston. The object is to see if the campaign is more impactful in one group over the other, which would then inform strategic improvements."
  },
  {
    "t": "p",
    "text": "Here’s the process for setting up a GeoLift study:"
  },
  {
    "t": "ul",
    "items": [
      "Define your audience and their attributes.",
      "Choose a control group–they should be similar to your defined audience but not exposed to your campaign.",
      "Create and launch your campaign in the target region.",
      "Measure and compare results between the two groups.",
      "Calculate lift in your target compared to the control group."
    ]
  },
  {
    "t": "h3",
    "text": "Adapting and refining the plan",
    "id": "adapting-and-refining-the-plan"
  },
  {
    "t": "p",
    "text": "As with any winning game plan, you can’t predict everything that may occur. Flexibility is key. Observe campaign performance and audience behavior, be ready to act quickly, and adapt to ensure maximum impact."
  },
  {
    "t": "p",
    "text": "The key here is to continuously monitor your campaigns and ad data using well-defined tools and methods. One of the most significant benefits of today’s highly digitized media landscape is that we have this data at our fingertips—so let’s use it!"
  },
  {
    "t": "h3",
    "text": "Staying agile",
    "id": "staying-agile"
  },
  {
    "t": "p",
    "text": "Considering how media and consumer behaviors have evolved in recent years, marketers and media planners have struggled to find balance in a roiling sea that never seems to settle. Just when you think you have a handle on things, new technology, social attitudes, shopping preferences, security, legal, and regulatory concerns swoop in to stir the pot."
  },
  {
    "t": "p",
    "text": "As a result, agility has become an essential attribute for media planners, who must now be keenly alert to what’s going on in the world—within the marketing industry and with the general public. It’s the only way to ensure they’re always hitting their marks."
  },
  {
    "t": "p",
    "text": "As such, the media plan should be seen as a living document constantly adjusting and evolving to ensure relevance and alignment to short and long-term goals. Being ready to pivot strategies based on real-time data ensures you don’t miss any opportunities, but it’s a constant effort. Use every tool at your disposal to illuminate blind spots, hone your strategy, and adapt the approach as needed."
  },
  {
    "t": "h2",
    "text": "What makes a plan successful",
    "id": "what-makes-a-plan-successful"
  },
  {
    "t": "p",
    "text": "Your media planning is complete. You’ve profiled and segmented your audiences, mapped the customer journey, and optimized every touchpoint."
  },
  {
    "t": "p",
    "text": "Then, you’ve strategically chosen media platforms and properties, designed ads to align with business goals, created and optimized content, and established your budget."
  },
  {
    "t": "p",
    "text": "You know what you want from the campaign and have chosen specific KPIs to support the business goals."
  },
  {
    "t": "p",
    "text": "But how do you know if all that work is hitting the mark?"
  },
  {
    "t": "p",
    "text": "Success in media planning is a dynamic concept. And while the measure of success may change with shifting audience preferences, technological advances, and ever-evolving rules, parameters, and features of individual media channels, you can’t gauge success without knowing what to measure and how to measure it."
  },
  {
    "t": "p",
    "text": "Complicating matters, you can’t measure across-the-board planning success with a single process. Each format—digital and offline—has its own parameters. You also need to measure how your marketing mix is performing to determine what works best for the brand."
  },
  {
    "t": "p",
    "text": "So, what does media planning success look like? In general, successful media planning achieves these key outcomes:"
  },
  {
    "t": "ul",
    "items": [
      "**Reaching the Right Audience**. A well-executed media plan should ensure your content is seen by the people who are most likely to convert.",
      "**Driving Desired Actions**. Whether it’s about convincing the consumer to click a link, sign up for a service, engage with an ad, enter a contest, or make a purchase, no matter what the goal, media planning success is measured by how well it converts audience attention into actions.",
      "**Improving Brand Awareness**. Effective media planning doesn’t just drive immediate actions but also contributes to long-term brand building and loyalty. While long-term results are hard to measure in the short term, there are ways to gauge how well your campaign hits home.",
      "**Optimizing Ad Spend**. Successful media planning means getting the most out of your budget. The entire process is geared toward minimizing waste and maximizing ROI."
    ]
  },
  {
    "t": "p",
    "text": "The above outcomes can be measured in various ways, depending on the channels you’re using and the goals you’ve set for your campaigns."
  },
  {
    "t": "p",
    "text": "How and what you measure may vary, depending on what you’re measuring. Here’s some insight into what metrics are most applicable to each media approach."
  },
  {
    "t": "h3",
    "text": "Digital measurement",
    "id": "digital-measurement"
  },
  {
    "t": "p",
    "text": "Digital measurement tools are essential for understanding campaign success and determining ROI. Today’s ad and analytic platforms provide scads of possibilities in terms of what you can measure. Measure what’s most important to the campaign goal and any variables that might influence it."
  },
  {
    "t": "p",
    "text": "Here are some key metrics to consider:"
  },
  {
    "t": "ul",
    "items": [
      "**Click-Through Rates (CTR)**. CTR measures the number of clicks against the number of impressions. A high CTR can indicate you’re serving up a compelling message and that your placement is on the mark. To calculate your CTR percentage, divide the number of clicks by the number of impressions. For example, if you have 10,000 impressions and 400 clicks, that gives you a CTR of 4%. A good CTR is anywhere from 2-5%, depending on your industry.",
      "**Conversion Rates**. This metric tells you how good you are at turning clicks into desired actions, like sales, signups, downloads, or whatever result you’re encouraging. Divide the number of conversions by the number of ad interactions to obtain your conversion rate percentage. 60 conversions ÷ 1500 interactions = 4%.",
      "**Cost Per Action (CPA)**. CPA gives you a view of what each conversion costs, helping you gauge the value of your efforts and enabling better and more precise investment decisions. Divide the total cost of conversions by the number of conversions to reach a dollar amount."
    ]
  },
  {
    "t": "p",
    "text": "Digital analytics platforms like Meta’s Business Suite or Google Analytics can capture the above measurements."
  },
  {
    "t": "p",
    "text": "Engagement and interactions can be measured using methods like pixel tracking, in which a single pixel is added to a webpage to collect data and send it back to the tracking system; UTM tags, which add custom code to a URL for tracking purposes; and customer relationship management systems (CMS), which help you collect customer data and track brand interactions across a range of touchpoints."
  },
  {
    "t": "h3",
    "text": "Offline measurement",
    "id": "offline-measurement"
  },
  {
    "t": "p",
    "text": "Offline media is a powerful communication tool, especially when integrated and combined within a strategic channel mix. While you might not think it’s as easy to track offline data, you’d be surprised at the wealth of insights you can pull with the right media type and a well-conceived campaign."
  },
  {
    "t": "p",
    "text": "Here are a few metrics to measure to inform offline success."
  },
  {
    "t": "ul",
    "items": [
      "**Foot Traffic/Phone Calls**. For brick-and-mortar stores, increased foot traffic strongly indicates offline success. However, physical traffic doesn’t always tell the whole story. Knowing what brought the customer in is key. Ads with special in-store offers, discounts, or incentives help you illuminate and track this metric. Ultimately, this underscores the need for a strong call-to-action (CTA) on all campaign assets, both online and offline.",
      "**Redemption Rates**. Coupons or discount redemption rates can reveal how many people saw and acted upon your offer. These could be redeemed in-store or online and offered as a discount code, limited-time offer, or another method directly attributable to the campaign. To segment results from specific ads, you can change the landing page URL, discount code, or offer based on location or ad type.",
      "**Interactions**. Interactive displays are hugely popular today. Depending on the type of asset and its capability, interactions could be based on direct engagement with the media (like a touch screen or AR magic mirror), accessing a QR code, visiting a website, or using a specific hashtag on social media."
    ]
  },
  {
    "t": "p",
    "text": "Traffic for offline ads can be measured in various ways, too. For example, localized tools, like sensors built into the property, can measure impressions and give you a decent estimate of how many people have seen your ad."
  },
  {
    "t": "p",
    "text": "Print advertising impressions, like newspapers and magazines, can be measured using circulation and sales metrics. Combined with interaction data from the ads themselves, you can end up with some pretty accurate numbers."
  },
  {
    "t": "h3",
    "text": "Measurement challenges",
    "id": "measurement-challenges"
  },
  {
    "t": "p",
    "text": "Recent industry shifts, including the third-party cookie phase-out, pose new challenges for marketers. Measuring the success of media planning is essential, but the process will be challenging if you don’t have enough quality data to inform decisions."
  },
  {
    "t": "p",
    "text": "The following represent the most significant challenges plaguing marketers today."
  },
  {
    "t": "h4",
    "text": "The cookie conundrum"
  },
  {
    "t": "p",
    "text": "Cookies enable personalization, better user experiences, and valuable data collection on consumer online behavior. With third-party cookies in decline across browsers, marketers are reimagining how they collect and analyze data."
  },
  {
    "t": "p",
    "text": "Though websites still collect first-party cookies to enable better on-site experiences (users must accept or decline when they land on the site), such as to retain login information, the tracking ends as soon as they leave the site. First-party cookies can still tell marketers a lot about elements of their campaigns, such as landing sites, user experience, customer journey, etc."
  },
  {
    "t": "p",
    "text": "Marketers currently leverage third-party cookies for remarketing, ad targeting (based on interests and browsing history), and retargeting, so losing them will be a massive change. Ad technology is evolving to address the changes. Privacy sandboxes, for example, will shield personal data while still providing high-level analytics, but what will happen in the next few months and years is anybody’s guess."
  },
  {
    "t": "p",
    "text": "In best practice, start looking at new technologies, take a hard look at your budget (especially regarding third-party data), and adjust your tactics to lean more on first-party data."
  },
  {
    "t": "p",
    "text": "Cookieless attribution is an approach that collects data through other sources, such as device fingerprinting (which collects data through software on devices), and can be especially meaningful for both marketers and customers when applied to connected TV viewing."
  },
  {
    "t": "p",
    "text": "Common applications for device fingerprinting are related to online security and are used to detect potential fraud. Still, marketers can apply this data to gain insights into how consumers are connecting to their ads, i.e., what browsers, devices, and general data that isn’t connected to personally identifiable information."
  },
  {
    "t": "h4",
    "text": "The privacy paradigm"
  },
  {
    "t": "p",
    "text": "Stricter data privacy regulations require a more careful approach to tracking customer behavior and metrics. Emerging and evolving data privacy legislation, especially as it pertains to AI and AI development, is one of the main concerns. Ultimately, it’s about ensuring customer safety and privacy."
  },
  {
    "t": "p",
    "text": "Brands that overstep these boundaries, whether legal, ethical, or both, will face consequences from legislators and consumers. Recent studies show that 80% of consumers will cease interactions with a company that has used their data without permission."
  },
  {
    "t": "p",
    "text": "The onus is on marketers to let customers know precisely how their data is used. If the customer gives you permission, you can still track them—but you must have their blessing via an opt-in. Brands will also have to maintain data transparency in case data use is called into question. Many use identity management tools to facilitate these processes, enabling them to remove data or show their work if asked."
  },
  {
    "t": "p",
    "text": "By implementing tools to manage data and privacy, marketers can ensure compliance as they continue to build trust with the public."
  },
  {
    "t": "h4",
    "text": "The multi-touch maze"
  },
  {
    "t": "p",
    "text": "As multi-channel marketing continues to track, campaign attribution becomes more complex—especially without the benefit of cookies."
  },
  {
    "t": "p",
    "text": "Challenges in tracking multi-channel campaigns can arise when marketers lack the right analytical tools or are measuring the wrong things. Even when advanced tools are applied, the ability to connect and integrate those tools is critical. Trying to analyze and assess disparate data from multiple platforms creates its own issues, leading to unnecessary complexities and missed opportunities."
  },
  {
    "t": "p",
    "text": "Suffice it to say tackling the above challenges requires a combination of innovative measurement techniques, a robust understanding of consumer privacy, the right software, and an agile approach to data analysis."
  },
  {
    "t": "h3",
    "text": "The role of AI and data in measurement",
    "id": "the-role-of-ai-and-data-in-measurement"
  },
  {
    "t": "p",
    "text": "Artificial intelligence (AI) and big data are revolutionizing how we measure media planning success. Here’s how:"
  },
  {
    "t": "ul",
    "items": [
      "**Predictive Analytics**. AI can sift through massive data sets to predict future trends and campaign impacts, allowing for more proactive adjustments and real-time optimization.",
      "**Personalization at Scale**. AI can help tailor media plans to individual preferences, increasing the chances of reaching the right audience at the right time with the right message.",
      "**Automated Reporting**. AI tools can provide instant, in-depth reports on campaign performance, leaving more time for analysis and strategic decision-making."
    ]
  },
  {
    "t": "p",
    "text": "Adopting AI and big data in media planning measurement requires investment in the right technology. It also requires expertise to interpret the data and apply the insights effectively. AI is powerful, but it’s still in a nascent phase. While most software includes an AI element, marketers should be mindful of data sources in generative AI and also how it makes its decisions."
  },
  {
    "t": "h3",
    "text": "Measuring engagement and brand perception",
    "id": "measuring-engagement-and-brand-perception"
  },
  {
    "t": "p",
    "text": "In the digital era, measuring beyond the numbers is as important as tracking KPIs. To understand the impact of your media planning, it’s essential to gauge audience engagement and perception."
  },
  {
    "t": "p",
    "text": "Here are a few ways to do that."
  },
  {
    "t": "ul",
    "items": [
      "**Social Media Listening**. Social media listening tools can track mentions, interactions, and sentiment around your brand, providing qualitative insights into how your audience perceives your message on social media. Such insights are essential to stay on top of because social messaging can proliferate quickly. Customer sentiments can also let you know what customers respond to, both positively and negatively.",
      "**Surveys and Focus Groups**. Traditional market research methods remain valuable for marketers because they capture the holistic impact of your media plan on brand perception. Contextual surveys, such as you would serve a customer following a sale or an interaction on your website, track sentiments in the moment, while focus groups provide detailed insights from customers who are present for the sole purpose of giving honest feedback about your media plan.",
      "**Brand studies** survey people who saw your ads against people who didn’t, so you can see what your media did for awareness and perception. Halliard runs [brand studies](/brand-studies) for agencies."
    ]
  },
  {
    "t": "p",
    "text": "Focusing on these qualitative measures alongside quantitative metrics helps you develop a more complete picture of your media planning success."
  },
  {
    "t": "h3",
    "text": "Leveraging benchmarks and industry standards",
    "id": "leveraging-benchmarks-and-industry-standards"
  },
  {
    "t": "p",
    "text": "Successful campaigns don’t happen in a vacuum. Marketers have tools, techniques, and tactics available today that didn’t exist just a few years ago. Though the landscape is as old as the hills in some ways, it’s still nascent in others, especially where new technology and consumer trends are concerned."
  },
  {
    "t": "p",
    "text": "We learn and evolve through observation, watching the competition, and maintaining open customer dialog. Data, of course, is the key ingredient enabling marketing success despite the complexities. Even though privacy laws limit our access to customer data, there are still so many tools and strategies at our disposal to ensure success."
  },
  {
    "t": "p",
    "text": "Comparing marketing performance against broader industry benchmarks is another way to contextualize your success and identify areas for improvement."
  },
  {
    "t": "p",
    "text": "Here are a few benchmarking concepts to consider."
  },
  {
    "t": "ul",
    "items": [
      "**Standardized Metrics**. Using widely accepted industry metrics allows marketers to directly compare their results with competitors and industry averages. Unless what you’re doing is so incredibly unique that you have no peers, this is an excellent approach.",
      "**Industry Reports**. Many sectors publish periodic reports with data on what success looks like in their respective media planning efforts. Staying dialed into these insights should help to frame your approach and stay on top of emerging trends.",
      "**In-House Benchmarking**. Developing in-house benchmarks over time can give you a precise understanding of what success means for your brand, independent of industry standards. This approach can also help you gauge progress over time and identify areas ripe for growth."
    ]
  },
  {
    "t": "p",
    "text": "Incorporating benchmarks into your measurement strategy provides an external perspective that can inform objective assessments of your media planning success."
  },
  {
    "t": "p",
    "text": "Media planning is data-driven and scientific and can be an incredibly complex undertaking. Done right, it’s a way for marketers to gain insight and consistency despite emerging challenges."
  },
  {
    "t": "h3",
    "text": "Final thoughts",
    "id": "final-thoughts"
  },
  {
    "t": "p",
    "text": "We hope this guide has given you some food for thought and an actionable blueprint to inform your media planning journey."
  },
  {
    "t": "p",
    "text": "To summarize what we’ve shared today, media planning is the bedrock of any successful advertising campaign. It involves setting a strategy, understanding your audience, selecting the proper channels and properties, and putting all the pieces together to reach your objectives."
  },
  {
    "t": "p",
    "text": "Additionally, measuring success is crucial in determining the effectiveness of your plan and essential to inform necessary adjustments and optimizations to improve future campaigns."
  },
  {
    "t": "p",
    "text": "Considering the constantly evolving digital landscape and consumer behavior, media planners must stay on top of new technologies, trends, and platforms. As cookies become obsolete and data privacy becomes a growing concern for regulators and consumers, it will be even more challenging to measure engagement and success accurately."
  },
  {
    "t": "p",
    "text": "However, with the right tools and techniques, media planners can still gather valuable insights to inform their strategies and make meaningful connections with their audiences."
  },
  {
    "t": "p",
    "text": "Effective media planning requires a deep understanding of consumer behavior and the strategic use of available channels to foster relationships built on trust and authority."
  },
  {
    "t": "p",
    "text": "In creating a well-rounded media plan with clear objectives and utilizing various complementary channels, marketers can continue to enhance and grow their reach as they engage with their ideal customers. By prioritizing tracking and measuring results, they can continue to refine their strategies as they gain market share."
  },
  {
    "t": "p",
    "text": "In an era where the marketing landscape is more sophisticated and competitive than ever, the ability to measure and adapt media planning with precision and agility is the hallmark of success. Invest time in building a comprehensive media plan, stay up-to-date with industry changes, and consistently monitor results, adjusting as needed to ensure the results are as brilliant as your plan promises."
  }
]
