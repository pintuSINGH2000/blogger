import React from "react";
import Header from "../Component/Header/Header";
import HomepageSection1 from "./../Component/Homepage/HomepageSection1/HomepageSection1";
import HomepageSection2 from "./../Component/Homepage/HomepageSection2/HomepageSection2";
import myblog from "../assest/Images/myblog.png";
import world from "../assest/Images/world.png";
import paid from "../assest/Images/paid.png";
import memory from "../assest/Images/memory.png";
import map from "../assest/Images/map.png";
import HomepageSection3 from "../Component/Homepage/HomepageSection3/HomepageSection3";
import HomepageFooter from './../Component/Homepage/HomepageFooter/HomepageFooter';

const Homepage = () => {
  return (
    <div>
      <Header />
      <HomepageSection1 />
      <HomepageSection2
        imgSrc={myblog}
        heading="Choose the perfect design"
        text="
          Create a beautiful blog that fits your style. Choose from a selection of easy-to-use templates – all with flexible layouts and hundreds of background images – or design something new.
        "
        isReverse={true}
        backgroundColor="orange"
      />
      <HomepageSection2
        imgSrc={world}
        heading="Improve branding"
        text="By consistently putting out high-quality content, you are helping to build trust with your target audience. As this trust grows, so does brand loyalty. People are more likely to do business with a company they know and trust than a company they have never heard of before."
        backgroundColor="#bc382e"
      />
      <HomepageSection2
        imgSrc={paid}
        heading="Earn money"
        text="Get paid for your hard work. Google AdSense can automatically display relevant targeted ads on your blog so that you can earn income by posting about your passion."
        isReverse={true}
        backgroundColor="#388d80"
      />
      <HomepageSection2
        imgSrc={memory}
        heading="Hang onto your memories"
        text="Save the moments that matter. Blogger lets you safely store thousands of posts, photos, and more with Google."
        backgroundColor="#577783"
      />
      <HomepageSection2
        imgSrc={map}
        heading="Know your audience"
        text="Find out which posts are a hit with Blogger’s built-in analytics. You’ll see where your audience is coming from and what they’re interested in. You can even connect your blog directly to Google Analytics for a more detailed look."
        backgroundColor="#4583aa"
        isReverse={true}
      />
      <HomepageSection3 />
      <HomepageFooter/>
    </div>
  );
};

export default Homepage;
